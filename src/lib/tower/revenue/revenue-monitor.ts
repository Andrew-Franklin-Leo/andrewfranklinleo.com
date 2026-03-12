import { adminDb } from '@/lib/firebase/admin';
import { RevenueStream, RevenueStreamType, RevenueForecast, RevenueLeakage, RevenueAlert } from './types';
import { eventBus } from '@/lib/agents/event-bus';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// Revenue stream definitions matching the 9 streams in CLAUDE.md
const STREAM_DEFINITIONS: { type: RevenueStreamType; name: string }[] = [
  { type: 'subscription', name: 'Subscriptions ($0-$149/mo)' },
  { type: 'speaking', name: 'Speaking ($1.5K-$75K)' },
  { type: 'events', name: 'Events ($250-$75K)' },
  { type: 'council', name: 'Council ($500-$2.5K/yr)' },
  { type: 'intelligence', name: 'Intelligence ($500-$100K/yr)' },
  { type: 'case_study', name: 'Case Studies ($25-$8K)' },
  { type: 'licensing', name: 'Podcast ($5K-$15K/episode)' },
  { type: 'referral', name: 'Referrals (zero-cost)' },
  { type: 'one_time', name: 'Institutional ($5K-$25K/yr)' },
];

export const revenueMonitor = {
  async snapshot(): Promise<RevenueStream[]> {
    // Pull real data from Firestore collections
    const [stakeholders, purchases] = await Promise.all([
      adminDb.collection('stakeholders').get(),
      adminDb.collection('purchases').get(),
    ]);

    // Calculate subscription MRR from active stakeholders
    const tierPricing: Record<string, number> = {
      free: 0, practitioner: 19, operator: 49, institutional: 149, analyst: 99, council: 99,
    };

    let subscriptionMRR = 0;
    let subscriberCount = 0;
    stakeholders.docs.forEach(d => {
      const data = d.data();
      const price = tierPricing[data.tier] ?? 0;
      if (price > 0) { subscriptionMRR += price; subscriberCount++; }
    });

    const streams: RevenueStream[] = STREAM_DEFINITIONS.map(def => ({
      id: generateId('stream'),
      type: def.type,
      name: def.name,
      currentMRR: def.type === 'subscription' ? subscriptionMRR : 0,
      targetMRR: 0,
      churnRate: 0,
      growthRate: 0,
      customerCount: def.type === 'subscription' ? subscriberCount : 0,
      lastUpdated: new Date().toISOString(),
    }));

    // Persist snapshots
    const batch = adminDb.batch();
    for (const s of streams) {
      batch.set(adminDb.collection('tower_revenue_streams').doc(s.type), s);
    }
    await batch.commit();

    return streams;
  },

  async getStreams(): Promise<RevenueStream[]> {
    const snap = await adminDb.collection('tower_revenue_streams').get();
    if (snap.empty) return this.snapshot(); // auto-initialize
    return snap.docs.map(d => d.data() as RevenueStream);
  },

  async forecast(months = 6): Promise<RevenueForecast[]> {
    const streams = await this.getStreams();
    const forecasts: RevenueForecast[] = [];

    const now = new Date();
    for (let i = 1; i <= months; i++) {
      const futureDate = new Date(now);
      futureDate.setMonth(futureDate.getMonth() + i);
      const period = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}`;

      const projected = streams.map(s => {
        const growth = 1 + (s.growthRate || 0.05); // default 5% monthly growth
        const churn = 1 - (s.churnRate || 0.02); // default 2% monthly churn
        const base = s.currentMRR * Math.pow(growth * churn, i);
        return {
          type: s.type,
          projected: Math.round(base * 100) / 100,
          confidence: Math.max(0.5, 1 - (i * 0.08)), // confidence decays with time
        };
      });

      forecasts.push({
        period,
        streams: projected,
        totalProjected: projected.reduce((sum, p) => sum + p.projected, 0),
        generatedAt: new Date().toISOString(),
      });
    }

    // Persist forecasts
    for (const f of forecasts) {
      await adminDb.collection('tower_revenue_forecasts').doc(f.period).set(f);
    }

    return forecasts;
  },

  async detectLeakage(): Promise<RevenueLeakage[]> {
    const leaks: RevenueLeakage[] = [];

    // Check for failed payments not followed up
    const stakeholders = await adminDb.collection('stakeholders')
      .where('paymentFailed', '==', true)
      .get();

    stakeholders.docs.forEach(d => {
      const data = d.data();
      leaks.push({
        id: generateId('leak'),
        type: 'failed_payment',
        description: `Failed payment for ${data.email} (${data.tier} tier)`,
        estimatedLoss: data.tier === 'institutional' ? 149 : data.tier === 'analyst' ? 99 : 49,
        detectedAt: new Date().toISOString(),
        affectedEntity: d.id,
        suggestedAction: 'Send payment retry email and update payment method',
        resolved: false,
      });
    });

    // Check for subscribers with no recent activity (churn risk)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
    const inactive = await adminDb.collection('stakeholders')
      .where('lastActiveAt', '<', thirtyDaysAgo)
      .get();

    inactive.docs.forEach(d => {
      const data = d.data();
      if (data.tier && data.tier !== 'free') {
        leaks.push({
          id: generateId('leak'),
          type: 'churn_risk',
          description: `Inactive paid subscriber: ${data.email} (${data.tier}, 30+ days)`,
          estimatedLoss: data.tier === 'institutional' ? 149 : data.tier === 'analyst' ? 99 : 49,
          detectedAt: new Date().toISOString(),
          affectedEntity: d.id,
          suggestedAction: 'Send re-engagement email with exclusive content',
          resolved: false,
        });
      }
    });

    // Persist detected leakage
    for (const leak of leaks) {
      await adminDb.collection('tower_revenue_leakage').doc(leak.id).set(leak);
    }

    if (leaks.length > 0) {
      await eventBus.emit({
        type: 'RevenueLeakageDetected',
        source: 'tower-revenue',
        payload: { count: leaks.length, totalEstimatedLoss: leaks.reduce((s, l) => s + l.estimatedLoss, 0) },
      });
    }

    return leaks;
  },

  async getDashboard(): Promise<{
    totalMRR: number;
    streamCount: number;
    streams: RevenueStream[];
    leakageCount: number;
    estimatedLeakage: number;
  }> {
    const streams = await this.getStreams();
    const leakSnap = await adminDb.collection('tower_revenue_leakage')
      .where('resolved', '==', false)
      .get();

    const leaks = leakSnap.docs.map(d => d.data() as RevenueLeakage);

    return {
      totalMRR: streams.reduce((s, st) => s + st.currentMRR, 0),
      streamCount: streams.length,
      streams,
      leakageCount: leaks.length,
      estimatedLeakage: leaks.reduce((s, l) => s + l.estimatedLoss, 0),
    };
  },
};
