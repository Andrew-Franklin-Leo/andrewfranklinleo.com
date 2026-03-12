import { adminDb } from '@/lib/firebase/admin';
import { PCIScore, PCIStatus } from './types';
import { eventBus } from '@/lib/agents/event-bus';

function calculateStatus(score: number): PCIStatus {
  if (score <= 0.2) return 'healthy';
  if (score <= 0.4) return 'elevated';
  if (score <= 0.6) return 'warning';
  if (score <= 0.8) return 'critical';
  return 'existential';
}

let monitorInterval: ReturnType<typeof setInterval> | null = null;

export const pciMonitor = {
  async calculate(entityId: string, entityType: string): Promise<PCIScore> {
    // Gather telemetry from audit logs and agent events
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 86400000).toISOString();

    // Decision authority: what fraction of recent actions belong to this entity?
    const [entityActions, totalActions] = await Promise.all([
      adminDb.collection('governance_audit')
        .where('agentId', '==', entityId)
        .where('timestamp', '>=', oneDayAgo)
        .get(),
      adminDb.collection('governance_audit')
        .where('timestamp', '>=', oneDayAgo)
        .get(),
    ]);

    const decisionAuthority = totalActions.size > 0
      ? entityActions.size / totalActions.size
      : 0;

    // Resource control: agent instances owned by this entity vs total
    const [entityInstances, totalInstances] = await Promise.all([
      adminDb.collection('agent_instances')
        .where('definitionId', '==', entityId)
        .where('status', '==', 'running')
        .get(),
      adminDb.collection('agent_instances')
        .where('status', '==', 'running')
        .get(),
    ]);

    const resourceControl = totalInstances.size > 0
      ? entityInstances.size / totalInstances.size
      : 0;

    // Information access: events emitted by entity vs total
    const [entityEvents, totalEvents] = await Promise.all([
      adminDb.collection('agent_events')
        .where('source', '==', entityId)
        .where('timestamp', '>=', oneDayAgo)
        .get(),
      adminDb.collection('agent_events')
        .where('timestamp', '>=', oneDayAgo)
        .get(),
    ]);

    const informationAccess = totalEvents.size > 0
      ? entityEvents.size / totalEvents.size
      : 0;

    // Revenue concentration: from stakeholders/purchases if applicable
    const revenueConcentration = 0; // Phase 2: integrate with Stripe data

    const dimensions = { decisionAuthority, resourceControl, informationAccess, revenueConcentration };
    const score = (decisionAuthority * 0.35) + (resourceControl * 0.25) +
                  (informationAccess * 0.25) + (revenueConcentration * 0.15);

    const pci: PCIScore = {
      entityId,
      entityType,
      score: Math.round(score * 1000) / 1000,
      dimensions,
      status: calculateStatus(score),
      calculatedAt: now.toISOString(),
    };

    // Write current snapshot
    await adminDb.collection('governance_pci').doc(entityId).set(pci);

    // Write to history
    await adminDb.collection('governance_pci_history').add(pci);

    // Emit alert if elevated
    if (pci.status !== 'healthy') {
      await eventBus.emit({
        type: 'PCIAlert',
        source: 'pci-monitor',
        payload: { entityId, score: pci.score, status: pci.status, dimensions },
      });
    }

    return pci;
  },

  async calculateAll(): Promise<PCIScore[]> {
    const snap = await adminDb.collection('agent_instances')
      .where('status', '==', 'running')
      .get();

    const scores: PCIScore[] = [];
    for (const doc of snap.docs) {
      const instance = doc.data();
      const pci = await this.calculate(instance.id, 'agent');
      scores.push(pci);
    }
    return scores;
  },

  async getScore(entityId: string): Promise<PCIScore | null> {
    const doc = await adminDb.collection('governance_pci').doc(entityId).get();
    return doc.exists ? (doc.data() as PCIScore) : null;
  },

  async getHistory(entityId: string, limit = 100): Promise<PCIScore[]> {
    const snap = await adminDb.collection('governance_pci_history')
      .where('entityId', '==', entityId)
      .orderBy('calculatedAt', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map(d => d.data() as PCIScore);
  },

  start(intervalMs = 300000): void { // default: 5 minutes
    if (monitorInterval) return;
    monitorInterval = setInterval(() => {
      this.calculateAll().catch(err => console.error('[PCI] Calculation error:', err));
    }, intervalMs);
    console.log(`[PCI Monitor] Started (interval: ${intervalMs}ms)`);
  },

  stop(): void {
    if (monitorInterval) {
      clearInterval(monitorInterval);
      monitorInterval = null;
    }
  },
};
