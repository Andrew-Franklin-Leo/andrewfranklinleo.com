import { adminDb } from '@/lib/firebase/admin';
import { eventBus } from '@/lib/agents/event-bus';
import { enterpriseFactory } from '@/lib/ainef/enterprise-factory';
import { pciMonitor } from '@/lib/governance/pci-monitor';
import {
  PortfolioSummary, PortfolioRisk, EntityRiskProfile, GovernanceSignal,
  KillDecision, KillDecisionStatus, CascadeAnalysis,
  PortfolioRebalanceRecommendation,
} from './types';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

let monitorInterval: ReturnType<typeof setInterval> | null = null;

export const portfolioGovernor = {
  // --- Portfolio Overview ---

  async getSummary(): Promise<PortfolioSummary> {
    const enterprises = await enterpriseFactory.list();
    const healthDocs = await adminDb.collection('ainef_health').get();
    const healthMap = new Map(healthDocs.docs.map(d => [d.id, d.data()]));

    const risks: PortfolioRisk[] = [];
    let totalHealth = 0;

    for (const ent of enterprises) {
      const health = healthMap.get(ent.id);
      const score = health?.overallScore ?? 50;
      totalHealth += score;

      if (score < 50) {
        risks.push({
          enterpriseId: ent.id,
          enterpriseName: ent.name,
          vertical: ent.vertical,
          riskType: score < 20 ? 'terminal' : 'degraded',
          severity: score < 20 ? 'existential' : score < 35 ? 'critical' : 'warning',
          description: `Health score ${score}/100. ${health?.status ?? 'unknown'} status.`,
          detectedAt: new Date().toISOString(),
          mitigationSuggested: score < 20 ? 'Consider immediate termination' : 'Investigate degraded agents and capital burn',
        });
      }

      // Capital runway risk
      if (ent.capitalBurnRate > 0) {
        const runway = (ent.capitalAllocated - ent.capitalConsumed) / ent.capitalBurnRate;
        if (runway < 30) {
          risks.push({
            enterpriseId: ent.id,
            enterpriseName: ent.name,
            vertical: ent.vertical,
            riskType: 'capital_exhaustion',
            severity: runway < 7 ? 'existential' : 'critical',
            description: `Capital runway: ${Math.round(runway)} days remaining`,
            detectedAt: new Date().toISOString(),
            mitigationSuggested: 'Inject capital or reduce burn rate',
          });
        }
      }
    }

    risks.sort((a, b) => {
      const sevOrder: Record<string, number> = { existential: 0, critical: 1, warning: 2, info: 3 };
      return (sevOrder[a.severity] ?? 4) - (sevOrder[b.severity] ?? 4);
    });

    return {
      totalEnterprises: enterprises.length,
      running: enterprises.filter(e => e.status === 'running').length,
      degraded: enterprises.filter(e => e.status === 'degraded').length,
      critical: enterprises.filter(e => {
        const h = healthMap.get(e.id);
        return h?.status === 'critical' || h?.status === 'terminal';
      }).length,
      suspended: enterprises.filter(e => e.status === 'suspended').length,
      totalCapitalDeployed: enterprises.reduce((s, e) => s + e.capitalAllocated, 0),
      totalRevenueGenerated: enterprises.reduce((s, e) => s + e.revenueGenerated, 0),
      averageHealthScore: enterprises.length > 0 ? Math.round(totalHealth / enterprises.length) : 0,
      topRisks: risks.slice(0, 20),
      generatedAt: new Date().toISOString(),
    };
  },

  // --- Entity Risk Assessment ---

  async assessEntityRisk(enterpriseId: string): Promise<EntityRiskProfile> {
    const enterprise = await enterpriseFactory.get(enterpriseId);
    if (!enterprise) throw new Error(`Enterprise not found: ${enterpriseId}`);

    const health = await enterpriseFactory.assessHealth(enterpriseId);
    const pci = await pciMonitor.getScore(enterpriseId);
    const signals = await this.getSignals(enterpriseId);

    const capitalRunwayDays = enterprise.capitalBurnRate > 0
      ? Math.round((enterprise.capitalAllocated - enterprise.capitalConsumed) / enterprise.capitalBurnRate)
      : 999;

    const agentFailureRate = health.agentHealth.length > 0
      ? health.agentHealth.filter(a => !a.healthy).length / health.agentHealth.length
      : 0;

    const violations = await adminDb.collection('governance_audit')
      .where('result', '==', 'denied')
      .get();

    const riskLevel: EntityRiskProfile['riskLevel'] =
      health.overallScore < 20 ? 'critical' :
      health.overallScore < 50 ? 'high' :
      health.overallScore < 75 ? 'medium' : 'low';

    const profile: EntityRiskProfile = {
      enterpriseId,
      enterpriseName: enterprise.name,
      vertical: enterprise.vertical,
      healthScore: health.overallScore,
      pciScore: pci?.score ?? 0,
      capitalRunwayDays,
      agentFailureRate: Math.round(agentFailureRate * 100) / 100,
      governanceViolations: violations.size,
      riskLevel,
      signals: signals.filter(s => !s.resolvedAt).slice(0, 20),
      assessedAt: new Date().toISOString(),
    };

    await adminDb.collection('aineg_risk_profiles').doc(enterpriseId).set(profile);
    return profile;
  },

  // --- Governance Signals ---

  async emitSignal(signal: Omit<GovernanceSignal, 'id' | 'createdAt' | 'acknowledged'>): Promise<GovernanceSignal> {
    const full: GovernanceSignal = {
      ...signal,
      id: generateId('sig'),
      acknowledged: false,
      createdAt: new Date().toISOString(),
    };

    await adminDb.collection('aineg_signals').doc(full.id).set(full);

    await eventBus.emit({
      type: 'GovernanceSignalEmitted',
      source: 'aineg',
      payload: { signalId: full.id, enterpriseId: signal.enterpriseId, type: signal.type, severity: signal.severity },
    });

    return full;
  },

  async getSignals(enterpriseId?: string, limit = 100): Promise<GovernanceSignal[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('aineg_signals')
      .orderBy('createdAt', 'desc')
      .limit(limit);
    if (enterpriseId) query = query.where('enterpriseId', '==', enterpriseId);
    const snap = await query.get();
    return snap.docs.map(d => d.data() as GovernanceSignal);
  },

  async acknowledgeSignal(signalId: string): Promise<void> {
    await adminDb.collection('aineg_signals').doc(signalId).update({ acknowledged: true });
  },

  async resolveSignal(signalId: string): Promise<void> {
    await adminDb.collection('aineg_signals').doc(signalId).update({
      acknowledged: true,
      resolvedAt: new Date().toISOString(),
    });
  },

  // --- Kill Decisions ---

  async proposeKill(params: {
    enterpriseId: string;
    reason: string;
    evidence: string[];
    severity: 'critical' | 'existential';
    proposedBy: string;
  }): Promise<KillDecision> {
    const enterprise = await enterpriseFactory.get(params.enterpriseId);
    if (!enterprise) throw new Error(`Enterprise not found: ${params.enterpriseId}`);

    const decision: KillDecision = {
      id: generateId('kill'),
      enterpriseId: params.enterpriseId,
      enterpriseName: enterprise.name,
      reason: params.reason,
      evidence: params.evidence,
      severity: params.severity,
      status: 'proposed',
      proposedBy: params.proposedBy,
      proposedAt: new Date().toISOString(),
    };

    await adminDb.collection('aineg_kill_decisions').doc(decision.id).set(decision);

    await eventBus.emit({
      type: 'KillDecisionProposed',
      source: 'aineg',
      payload: { decisionId: decision.id, enterpriseId: params.enterpriseId, severity: params.severity },
    });

    // Auto-execute existential threats
    if (params.severity === 'existential') {
      await this.executeKill(decision.id, 'aineg-auto', 'Auto-executed: existential threat');
    }

    return decision;
  },

  async reviewKill(decisionId: string, decision: 'approved' | 'rejected', reviewedBy: string, notes?: string): Promise<KillDecision> {
    const doc = await adminDb.collection('aineg_kill_decisions').doc(decisionId).get();
    if (!doc.exists) throw new Error(`Kill decision not found: ${decisionId}`);

    const kd = doc.data() as KillDecision;
    const updates: Partial<KillDecision> = {
      status: decision === 'approved' ? 'approved' : 'rejected',
      reviewedBy,
      reviewedAt: new Date().toISOString(),
      decision,
      notes,
    };

    await adminDb.collection('aineg_kill_decisions').doc(decisionId).update(updates);

    if (decision === 'approved') {
      await this.executeKill(decisionId, reviewedBy, notes ?? '');
    }

    return { ...kd, ...updates } as KillDecision;
  },

  async executeKill(decisionId: string, executedBy: string, notes: string): Promise<void> {
    const doc = await adminDb.collection('aineg_kill_decisions').doc(decisionId).get();
    if (!doc.exists) throw new Error(`Kill decision not found: ${decisionId}`);

    const kd = doc.data() as KillDecision;

    await enterpriseFactory.terminate({
      enterpriseId: kd.enterpriseId,
      reason: 'governance_violation',
      requestedBy: executedBy,
      notes: `Kill decision ${decisionId}: ${kd.reason}. ${notes}`,
      gracePeriodMs: 0,
    });

    await adminDb.collection('aineg_kill_decisions').doc(decisionId).update({
      status: 'executed' as KillDecisionStatus,
      executedAt: new Date().toISOString(),
    });

    await eventBus.emit({
      type: 'KillDecisionExecuted',
      source: 'aineg',
      payload: { decisionId, enterpriseId: kd.enterpriseId },
    });
  },

  async listKillDecisions(status?: KillDecisionStatus): Promise<KillDecision[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('aineg_kill_decisions')
      .orderBy('proposedAt', 'desc');
    if (status) query = query.where('status', '==', status);
    const snap = await query.limit(100).get();
    return snap.docs.map(d => d.data() as KillDecision);
  },

  // --- Cascade Analysis ---

  async analyzeCascade(enterpriseId: string): Promise<CascadeAnalysis> {
    const enterprise = await enterpriseFactory.get(enterpriseId);
    if (!enterprise) throw new Error(`Enterprise not found: ${enterpriseId}`);

    const allEnterprises = await enterpriseFactory.list({ status: 'running' });
    const affected: CascadeAnalysis['affectedEnterprises'] = [];

    // Check for shared operators
    for (const other of allEnterprises) {
      if (other.id === enterpriseId) continue;
      const sharedAgents = other.agentIds.filter(a => enterprise.agentIds.includes(a));
      if (sharedAgents.length > 0) {
        affected.push({
          enterpriseId: other.id,
          enterpriseName: other.name,
          impactType: 'direct',
          impactSeverity: 'critical',
          description: `Shares ${sharedAgents.length} agents — will lose capability if source enterprise terminates`,
        });
      }

      // Same vertical = indirect dependency (market impact)
      if (other.vertical === enterprise.vertical) {
        affected.push({
          enterpriseId: other.id,
          enterpriseName: other.name,
          impactType: 'indirect',
          impactSeverity: 'warning',
          description: `Same vertical (${enterprise.vertical}) — market reputation impact`,
        });
      }
    }

    const analysis: CascadeAnalysis = {
      triggerEnterpriseId: enterpriseId,
      affectedEnterprises: affected,
      totalImpactEstimate: affected.reduce((s, a) => {
        const ent = allEnterprises.find(e => e.id === a.enterpriseId);
        return s + (ent?.capitalAllocated ?? 0) * (a.impactType === 'direct' ? 0.5 : 0.1);
      }, 0),
      analyzedAt: new Date().toISOString(),
    };

    return analysis;
  },

  // --- Rebalancing ---

  async getRebalanceRecommendations(): Promise<PortfolioRebalanceRecommendation[]> {
    const enterprises = await enterpriseFactory.list();
    const recommendations: PortfolioRebalanceRecommendation[] = [];

    for (const ent of enterprises) {
      if (ent.status === 'terminated') continue;

      // Capital exhaustion → inject or terminate
      const runway = ent.capitalBurnRate > 0
        ? (ent.capitalAllocated - ent.capitalConsumed) / ent.capitalBurnRate
        : 999;

      if (runway < 14 && ent.revenueGenerated > 0) {
        recommendations.push({
          type: 'redistribute_capital',
          enterpriseIds: [ent.id],
          description: `${ent.name}: ${Math.round(runway)}d runway but generating revenue. Inject capital.`,
          estimatedImpact: ent.revenueGenerated * 12,
          priority: runway < 7 ? 100 : 80,
        });
      } else if (runway < 14 && ent.revenueGenerated === 0) {
        recommendations.push({
          type: 'terminate',
          enterpriseIds: [ent.id],
          description: `${ent.name}: ${Math.round(runway)}d runway, zero revenue. Terminate.`,
          estimatedImpact: -(ent.capitalAllocated - ent.capitalConsumed),
          priority: 90,
        });
      }

      // Underperforming → scale down
      const health = await adminDb.collection('ainef_health').doc(ent.id).get();
      if (health.exists && health.data()?.overallScore < 30 && ent.status === 'running') {
        recommendations.push({
          type: 'scale_down',
          enterpriseIds: [ent.id],
          description: `${ent.name}: health score ${health.data()?.overallScore}. Reduce agents and resources.`,
          estimatedImpact: ent.capitalBurnRate * 0.3 * 30,
          priority: 70,
        });
      }
    }

    recommendations.sort((a, b) => b.priority - a.priority);
    return recommendations;
  },

  // --- Continuous Monitoring ---

  start(intervalMs = 300000): void {
    if (monitorInterval) return;
    monitorInterval = setInterval(async () => {
      try {
        const enterprises = await enterpriseFactory.list({ status: 'running' });
        for (const ent of enterprises) {
          const profile = await this.assessEntityRisk(ent.id);

          // Auto-emit signals for high-risk entities
          if (profile.riskLevel === 'critical') {
            await this.emitSignal({
              enterpriseId: ent.id,
              type: 'risk',
              severity: 'critical',
              source: 'aineg-monitor',
              title: `Critical risk: ${ent.name}`,
              description: `Health score ${profile.healthScore}, PCI ${profile.pciScore}, runway ${profile.capitalRunwayDays}d`,
              data: { healthScore: profile.healthScore, pciScore: profile.pciScore },
            });
          }
        }
      } catch (err) {
        console.error('[AINEG] Monitor error:', err);
      }
    }, intervalMs);
    console.log(`[AINEG] Portfolio monitoring started (interval: ${intervalMs}ms)`);
  },

  stop(): void {
    if (monitorInterval) {
      clearInterval(monitorInterval);
      monitorInterval = null;
    }
  },
};
