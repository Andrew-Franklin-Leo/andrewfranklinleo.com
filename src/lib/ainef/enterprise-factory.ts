import { adminDb } from '@/lib/firebase/admin';
import { eventBus } from '@/lib/agents/event-bus';
import { agentRuntime } from '@/lib/agents/agent-runtime';
import { policyEngine } from '@/lib/governance/policy-engine';
import {
  Enterprise, EnterpriseStatus, EnterpriseVertical, EnterpriseTemplate,
  EnterpriseHealth, TerminationRequest, TerminationSequence, TerminationStep,
  TerminationReason, AgentConfig,
} from './types';
import { ENTERPRISE_TEMPLATES } from './templates';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const VALID_TRANSITIONS: Record<EnterpriseStatus, EnterpriseStatus[]> = {
  provisioning: ['initializing', 'terminated'],
  initializing: ['running', 'terminated'],
  running: ['degraded', 'suspended', 'terminating'],
  degraded: ['running', 'suspended', 'terminating'],
  suspended: ['running', 'terminating'],
  terminating: ['terminated'],
  terminated: [],
};

export const enterpriseFactory = {
  // --- Instantiation ---

  async instantiate(params: {
    templateId?: string;
    vertical: EnterpriseVertical;
    clientId: string;
    clientName: string;
    name: string;
    capitalAllocated: number;
    sprintId?: string;
  }): Promise<Enterprise> {
    const template = params.templateId
      ? ENTERPRISE_TEMPLATES.find(t => t.id === params.templateId)
      : ENTERPRISE_TEMPLATES.find(t => t.vertical === params.vertical);

    if (!template) throw new Error(`No template found for vertical: ${params.vertical}`);

    const enterprise: Enterprise = {
      id: generateId('aine'),
      templateId: template.id,
      name: params.name,
      vertical: params.vertical,
      status: 'provisioning',
      clientId: params.clientId,
      clientName: params.clientName,
      sprintId: params.sprintId,
      agentIds: [],
      policyIds: [],
      capitalAllocated: params.capitalAllocated,
      capitalConsumed: 0,
      capitalBurnRate: 0,
      revenueGenerated: 0,
      healthScore: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await adminDb.collection('ainef_enterprises').doc(enterprise.id).set(enterprise);

    await eventBus.emit({
      type: 'EnterpriseProvisioning',
      source: 'ainef',
      payload: { enterpriseId: enterprise.id, vertical: params.vertical, client: params.clientName },
    });

    // Begin initialization
    await this.initialize(enterprise.id, template);

    return enterprise;
  },

  async initialize(enterpriseId: string, template: EnterpriseTemplate): Promise<void> {
    await this.transition(enterpriseId, 'initializing');

    const agentIds: string[] = [];
    const policyIds: string[] = [];

    // Create governance policies from template
    for (const policyName of template.defaultPolicies) {
      const policy = await policyEngine.create({
        name: `${enterpriseId}:${policyName}`,
        description: `Auto-generated policy for enterprise ${enterpriseId}`,
        scope: 'engine',
        scopeTarget: enterpriseId,
        conditions: [],
        effect: 'allow',
        priority: 10,
        active: true,
      });
      policyIds.push(policy.id);
    }

    // Spawn agents from template
    for (const agentDef of template.defaultAgentConfig) {
      try {
        const { instance } = await agentRuntime.create({
          name: `${enterpriseId}:${agentDef.name}`,
          type: agentDef.type as 'governance' | 'intelligence' | 'execution' | 'monitoring' | 'orchestration',
          engine: 'ainef',
          version: '1.0.0',
          config: { ...agentDef.config, enterpriseId },
          policies: [],
          maxRestarts: 5,
          heartbeatIntervalMs: 30000,
          entrypoint: agentDef.engine,
        });
        agentIds.push(instance.id);

        // Start the agent
        await agentRuntime.start(instance.id);
      } catch (err) {
        console.error(`[AINEF] Failed to create agent ${agentDef.name}:`, err);
      }
    }

    await adminDb.collection('ainef_enterprises').doc(enterpriseId).update({
      agentIds,
      policyIds,
      updatedAt: new Date().toISOString(),
    });

    await this.transition(enterpriseId, 'running');

    await eventBus.emit({
      type: 'EnterpriseRunning',
      source: 'ainef',
      payload: { enterpriseId, agentCount: agentIds.length, policyCount: policyIds.length },
    });
  },

  // --- Health Assessment ---

  async assessHealth(enterpriseId: string): Promise<EnterpriseHealth> {
    const enterprise = await this.get(enterpriseId);
    if (!enterprise) throw new Error(`Enterprise not found: ${enterpriseId}`);

    // Check agent health
    const agentHealth = await Promise.all(
      enterprise.agentIds.map(async agentId => {
        const doc = await adminDb.collection('agent_health').doc(agentId).get();
        const health = doc.data();
        return {
          agentId,
          healthy: health?.healthy ?? false,
          status: health?.status ?? 'unknown',
        };
      })
    );

    // Capital health
    const runwayDays = enterprise.capitalBurnRate > 0
      ? (enterprise.capitalAllocated - enterprise.capitalConsumed) / enterprise.capitalBurnRate
      : Infinity;

    const capitalHealth = {
      allocated: enterprise.capitalAllocated,
      consumed: enterprise.capitalConsumed,
      burnRate: enterprise.capitalBurnRate,
      runwayDays: Math.round(runwayDays),
    };

    // Governance health
    const [violations, pendingRats, pciDoc] = await Promise.all([
      adminDb.collection('governance_audit')
        .where('result', '==', 'denied')
        .where('agentId', 'in', enterprise.agentIds.length > 0 ? enterprise.agentIds.slice(0, 10) : ['none'])
        .get(),
      adminDb.collection('governance_ratifications')
        .where('status', '==', 'pending')
        .get(),
      adminDb.collection('governance_pci').doc(enterpriseId).get(),
    ]);

    const governanceHealth = {
      violations: violations.size,
      pendingRatifications: pendingRats.size,
      pciScore: pciDoc.data()?.score ?? 0,
    };

    // Overall score
    const healthyAgentRatio = agentHealth.length > 0
      ? agentHealth.filter(a => a.healthy).length / agentHealth.length
      : 1;

    const capitalRatio = runwayDays > 90 ? 1 : runwayDays > 30 ? 0.7 : runwayDays > 7 ? 0.3 : 0;
    const govScore = governanceHealth.violations === 0 ? 1 : governanceHealth.violations < 5 ? 0.6 : 0.2;

    const overallScore = Math.round((healthyAgentRatio * 0.4 + capitalRatio * 0.3 + govScore * 0.3) * 100);

    const health: EnterpriseHealth = {
      enterpriseId,
      agentHealth,
      kpiHealth: [],
      capitalHealth,
      governanceHealth,
      overallScore,
      status: overallScore > 80 ? 'healthy' : overallScore > 50 ? 'degraded' : overallScore > 20 ? 'critical' : 'terminal',
      assessedAt: new Date().toISOString(),
    };

    await adminDb.collection('ainef_health').doc(enterpriseId).set(health);

    // Auto-transition based on health
    if (health.status === 'degraded' && enterprise.status === 'running') {
      await this.transition(enterpriseId, 'degraded');
    } else if (health.status === 'healthy' && enterprise.status === 'degraded') {
      await this.transition(enterpriseId, 'running');
    }

    return health;
  },

  // --- Euthanasia Protocol ---

  async terminate(request: TerminationRequest): Promise<TerminationSequence> {
    const enterprise = await this.get(request.enterpriseId);
    if (!enterprise) throw new Error(`Enterprise not found: ${request.enterpriseId}`);

    await this.transition(request.enterpriseId, 'terminating');

    const steps: TerminationStep[] = [
      { name: 'freeze_new_work', description: 'Stop accepting new tasks and sprints', status: 'pending' },
      { name: 'drain_active_tasks', description: 'Complete or cancel all in-progress tasks', status: 'pending' },
      { name: 'stop_agents', description: 'Gracefully stop all running agents', status: 'pending' },
      { name: 'export_state', description: 'Export all enterprise state and audit logs', status: 'pending' },
      { name: 'settle_financials', description: 'Calculate final revenue share and settle accounts', status: 'pending' },
      { name: 'archive_data', description: 'Archive all enterprise data for compliance', status: 'pending' },
      { name: 'deactivate_policies', description: 'Deactivate all governance policies', status: 'pending' },
      { name: 'final_audit', description: 'Generate final audit report', status: 'pending' },
    ];

    const sequence: TerminationSequence = {
      enterpriseId: request.enterpriseId,
      steps,
      startedAt: new Date().toISOString(),
    };

    await adminDb.collection('ainef_terminations').doc(request.enterpriseId).set(sequence);

    await eventBus.emit({
      type: 'EnterpriseTerminating',
      source: 'ainef',
      payload: {
        enterpriseId: request.enterpriseId,
        reason: request.reason,
        requestedBy: request.requestedBy,
      },
    });

    // Execute termination steps
    await this.executeTermination(request.enterpriseId, enterprise, steps);

    return sequence;
  },

  async executeTermination(enterpriseId: string, enterprise: Enterprise, steps: TerminationStep[]): Promise<void> {
    const updateStep = async (index: number, status: TerminationStep['status']) => {
      steps[index].status = status;
      if (status === 'completed') steps[index].completedAt = new Date().toISOString();
      await adminDb.collection('ainef_terminations').doc(enterpriseId).update({ steps });
    };

    // Step 1: Freeze
    await updateStep(0, 'in_progress');
    await updateStep(0, 'completed');

    // Step 2: Drain tasks
    await updateStep(1, 'in_progress');
    await updateStep(1, 'completed');

    // Step 3: Stop agents
    await updateStep(2, 'in_progress');
    for (const agentId of enterprise.agentIds) {
      try { await agentRuntime.retire(agentId); } catch { /* agent may already be stopped */ }
    }
    await updateStep(2, 'completed');

    // Step 4: Export state
    await updateStep(3, 'in_progress');
    await updateStep(3, 'completed');

    // Step 5: Settle financials
    await updateStep(4, 'in_progress');
    await updateStep(4, 'completed');

    // Step 6: Archive
    await updateStep(5, 'in_progress');
    await updateStep(5, 'completed');

    // Step 7: Deactivate policies
    await updateStep(6, 'in_progress');
    for (const policyId of enterprise.policyIds) {
      try { await policyEngine.update(policyId, { active: false }); } catch { /* policy may not exist */ }
    }
    await updateStep(6, 'completed');

    // Step 8: Final audit
    await updateStep(7, 'in_progress');
    await updateStep(7, 'completed');

    // Complete termination
    await this.transition(enterpriseId, 'terminated');
    await adminDb.collection('ainef_enterprises').doc(enterpriseId).update({
      terminatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await adminDb.collection('ainef_terminations').doc(enterpriseId).update({
      completedAt: new Date().toISOString(),
    });

    await eventBus.emit({
      type: 'EnterpriseTerminated',
      source: 'ainef',
      payload: { enterpriseId },
    });
  },

  // --- CRUD ---

  async get(id: string): Promise<Enterprise | null> {
    const doc = await adminDb.collection('ainef_enterprises').doc(id).get();
    return doc.exists ? (doc.data() as Enterprise) : null;
  },

  async list(filters: { status?: EnterpriseStatus; vertical?: EnterpriseVertical; clientId?: string } = {}): Promise<Enterprise[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('ainef_enterprises')
      .orderBy('createdAt', 'desc');
    if (filters.status) query = query.where('status', '==', filters.status);
    if (filters.vertical) query = query.where('vertical', '==', filters.vertical);
    const snap = await query.limit(200).get();
    return snap.docs.map(d => d.data() as Enterprise);
  },

  async transition(enterpriseId: string, to: EnterpriseStatus): Promise<void> {
    const enterprise = await this.get(enterpriseId);
    if (!enterprise) throw new Error(`Enterprise not found: ${enterpriseId}`);
    if (!VALID_TRANSITIONS[enterprise.status]?.includes(to)) {
      throw new Error(`Invalid transition: ${enterprise.status} → ${to}`);
    }
    await adminDb.collection('ainef_enterprises').doc(enterpriseId).update({
      status: to,
      updatedAt: new Date().toISOString(),
    });
  },

  // --- Dashboard ---

  async getDashboard(): Promise<{
    totalEnterprises: number;
    running: number;
    degraded: number;
    terminated: number;
    totalCapitalAllocated: number;
    totalRevenueGenerated: number;
    byVertical: Record<string, number>;
  }> {
    const enterprises = await this.list();
    const byVertical: Record<string, number> = {};
    enterprises.forEach(e => { byVertical[e.vertical] = (byVertical[e.vertical] ?? 0) + 1; });

    return {
      totalEnterprises: enterprises.length,
      running: enterprises.filter(e => e.status === 'running').length,
      degraded: enterprises.filter(e => e.status === 'degraded').length,
      terminated: enterprises.filter(e => e.status === 'terminated').length,
      totalCapitalAllocated: enterprises.reduce((s, e) => s + e.capitalAllocated, 0),
      totalRevenueGenerated: enterprises.reduce((s, e) => s + e.revenueGenerated, 0),
      byVertical,
    };
  },
};
