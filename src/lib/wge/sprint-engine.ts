import { adminDb } from '@/lib/firebase/admin';
import { eventBus } from '@/lib/agents/event-bus';
import {
  Sprint, SprintType, SprintStatus, SprintTask, SprintTaskStatus,
  SprintKPI, SprintScope, SprintReport, SprintKillCondition,
  IntakeRequest, ExpansionOffer, Operator, OperatorStatus,
} from './types';
import { SPRINT_DEFINITIONS } from './sprint-definitions';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const VALID_TRANSITIONS: Record<SprintStatus, SprintStatus[]> = {
  intake: ['scoping', 'killed'],
  scoping: ['approved', 'killed'],
  approved: ['active', 'killed'],
  active: ['tracking', 'failed', 'killed'],
  tracking: ['completed', 'failed', 'killed'],
  completed: ['expanded'],
  failed: [],
  killed: [],
  expanded: [],
};

export const sprintEngine = {
  // --- Intake ---

  async intake(request: IntakeRequest): Promise<Sprint> {
    const sprintType = request.preferredSprintType ?? this.classifyComplaint(request.complaint, request.industry);
    const def = SPRINT_DEFINITIONS.find(d => d.type === sprintType) ?? SPRINT_DEFINITIONS[0];

    const sprint: Sprint = {
      id: generateId('sprint'),
      type: sprintType,
      status: 'intake',
      clientId: generateId('client'),
      clientName: request.clientName,
      complaint: request.complaint,
      scope: {
        problem: request.complaint,
        hypothesis: '',
        deliverables: [],
        exclusions: [],
        successCriteria: [],
      },
      budget: request.estimatedBudget ?? def.defaultBudget,
      revenueShare: 0.15, // 15% default revenue share
      operators: [],
      kpis: def.kpiTargets.map(k => ({
        name: k.name,
        metric: k.metric,
        baseline: k.baselineValue,
        target: k.targetValue,
        current: k.baselineValue,
        unit: k.unit,
        history: [],
      })),
      killConditions: def.killConditions,
      startDate: null,
      endDate: null,
      targetDate: new Date(Date.now() + def.durationDays * 86400000).toISOString(),
      proofDeliveredAt: null,
      expandedToLicense: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await adminDb.collection('wge_sprints').doc(sprint.id).set(sprint);

    await eventBus.emit({
      type: 'SprintIntakeCreated',
      source: 'wge',
      payload: { sprintId: sprint.id, type: sprintType, client: request.clientName },
    });

    return sprint;
  },

  classifyComplaint(complaint: string, industry: string): SprintType {
    const lower = (complaint + ' ' + industry).toLowerCase();
    if (lower.includes('production') || lower.includes('otif') || lower.includes('manufacturing') || lower.includes('inventory')) return 'production_stability';
    if (lower.includes('fleet') || lower.includes('logistics') || lower.includes('transport') || lower.includes('route')) return 'fleet_utilization';
    if (lower.includes('margin') || lower.includes('profit') || lower.includes('pricing') || lower.includes('procurement')) return 'margin_recovery';
    if (lower.includes('capital') || lower.includes('cash') || lower.includes('payable') || lower.includes('treasury')) return 'working_capital';
    if (lower.includes('receivable') || lower.includes('dso') || lower.includes('collection') || lower.includes('aging')) return 'receivables';
    if (lower.includes('decision') || lower.includes('approval') || lower.includes('bottleneck') || lower.includes('governance')) return 'decision_latency';
    return 'production_stability'; // default
  },

  // --- Scoping ---

  async scope(sprintId: string, scope: SprintScope): Promise<Sprint> {
    await this.transition(sprintId, 'scoping');
    await adminDb.collection('wge_sprints').doc(sprintId).update({
      scope,
      updatedAt: new Date().toISOString(),
    });
    return this.get(sprintId) as Promise<Sprint>;
  },

  async approve(sprintId: string): Promise<Sprint> {
    return this.transition(sprintId, 'approved');
  },

  // --- Execution ---

  async activate(sprintId: string): Promise<Sprint> {
    const sprint = await this.transition(sprintId, 'active');
    const now = new Date().toISOString();
    const def = SPRINT_DEFINITIONS.find(d => d.type === sprint.type)!;

    await adminDb.collection('wge_sprints').doc(sprintId).update({
      startDate: now,
      endDate: new Date(Date.now() + def.durationDays * 86400000).toISOString(),
      updatedAt: now,
    });

    // Auto-generate initial tasks from sprint type
    const tasks = this.generateTasks(sprintId, sprint.type);
    for (const task of tasks) {
      await this.createTask(task);
    }

    await eventBus.emit({
      type: 'SprintActivated',
      source: 'wge',
      payload: { sprintId, type: sprint.type, taskCount: tasks.length },
    });

    return this.get(sprintId) as Promise<Sprint>;
  },

  generateTasks(sprintId: string, type: SprintType): Omit<SprintTask, 'id' | 'createdAt'>[] {
    const baseTasks: Omit<SprintTask, 'id' | 'createdAt'>[] = [
      { sprintId, description: 'Baseline measurement and data collection', status: 'pending', dependencies: [], estimatedHours: 16, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Current state assessment and gap analysis', status: 'pending', dependencies: [], estimatedHours: 24, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Deploy monitoring agents and telemetry', status: 'pending', dependencies: [], estimatedHours: 8, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Implement intervention plan', status: 'pending', dependencies: [], estimatedHours: 40, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Week 4 checkpoint and KPI review', status: 'pending', dependencies: [], estimatedHours: 4, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Optimization and tuning cycle', status: 'pending', dependencies: [], estimatedHours: 32, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Week 8 checkpoint and kill condition review', status: 'pending', dependencies: [], estimatedHours: 4, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Final measurement and proof documentation', status: 'pending', dependencies: [], estimatedHours: 16, actualHours: 0, dueDate: '' },
      { sprintId, description: 'Client presentation and expansion proposal', status: 'pending', dependencies: [], estimatedHours: 8, actualHours: 0, dueDate: '' },
    ];

    // Add type-specific tasks
    const typeSpecific: Record<SprintType, string[]> = {
      production_stability: ['Production scheduling optimization', 'Supplier lead time analysis', 'Buffer stock calibration', 'Expediting process redesign'],
      fleet_utilization: ['Route optimization model deployment', 'Load consolidation analysis', 'Driver scheduling optimization', 'Fuel consumption monitoring'],
      margin_recovery: ['Pricing waterfall analysis', 'Procurement category review', 'Waste stream mapping', 'Cost-to-serve segmentation'],
      working_capital: ['Cash flow forecasting model', 'Payment term renegotiation', 'Inventory turn optimization', 'Capital allocation review'],
      receivables: ['Aging bucket analysis', 'Collection process redesign', 'Credit policy optimization', 'Dispute resolution streamlining'],
      decision_latency: ['Decision tree mapping', 'Approval matrix simplification', 'Governance process automation', 'Escalation path optimization'],
    };

    for (const desc of (typeSpecific[type] ?? [])) {
      baseTasks.push({ sprintId, description: desc, status: 'pending', dependencies: [], estimatedHours: 16, actualHours: 0, dueDate: '' });
    }

    return baseTasks;
  },

  // --- Task Management ---

  async createTask(task: Omit<SprintTask, 'id' | 'createdAt'>): Promise<SprintTask> {
    const full: SprintTask = { ...task, id: generateId('stask'), createdAt: new Date().toISOString() };
    await adminDb.collection('wge_sprint_tasks').doc(full.id).set(full);
    return full;
  },

  async getTasks(sprintId: string): Promise<SprintTask[]> {
    const snap = await adminDb.collection('wge_sprint_tasks')
      .where('sprintId', '==', sprintId)
      .orderBy('createdAt', 'asc')
      .get();
    return snap.docs.map(d => d.data() as SprintTask);
  },

  async updateTask(taskId: string, updates: Partial<SprintTask>): Promise<void> {
    await adminDb.collection('wge_sprint_tasks').doc(taskId).update(updates);
  },

  async completeTask(taskId: string, output?: Record<string, unknown>): Promise<void> {
    await adminDb.collection('wge_sprint_tasks').doc(taskId).update({
      status: 'completed' as SprintTaskStatus,
      completedAt: new Date().toISOString(),
      output,
    });
  },

  // --- KPI Tracking ---

  async updateKPI(sprintId: string, metric: string, value: number): Promise<void> {
    const sprint = await this.get(sprintId);
    if (!sprint) throw new Error(`Sprint not found: ${sprintId}`);

    const kpis = sprint.kpis.map(k => {
      if (k.metric === metric) {
        return {
          ...k,
          current: value,
          history: [...k.history, { date: new Date().toISOString(), value }],
        };
      }
      return k;
    });

    await adminDb.collection('wge_sprints').doc(sprintId).update({ kpis, updatedAt: new Date().toISOString() });

    await eventBus.emit({
      type: 'SprintKPIUpdated',
      source: 'wge',
      payload: { sprintId, metric, value },
    });
  },

  // --- Kill Condition Monitoring ---

  async checkKillConditions(sprintId: string): Promise<{ triggered: string[]; shouldKill: boolean }> {
    const sprint = await this.get(sprintId);
    if (!sprint || !sprint.startDate) return { triggered: [], shouldKill: false };

    const daysElapsed = (Date.now() - new Date(sprint.startDate).getTime()) / 86400000;
    const triggered: string[] = [];

    for (const kc of sprint.killConditions) {
      if (daysElapsed < kc.checkAfterDays) continue;

      const kpi = sprint.kpis.find(k => k.metric === kc.metric);
      if (!kpi) continue;

      let met = false;
      switch (kc.operator) {
        case 'lt': met = kpi.current < kc.threshold; break;
        case 'gt': met = kpi.current > kc.threshold; break;
        case 'eq': met = kpi.current === kc.threshold; break;
      }
      if (met) triggered.push(kc.description);
    }

    if (triggered.length > 0) {
      await eventBus.emit({
        type: 'SprintKillConditionTriggered',
        source: 'wge',
        payload: { sprintId, triggered },
      });
    }

    return { triggered, shouldKill: triggered.length > 0 };
  },

  // --- Progress Report ---

  async getReport(sprintId: string): Promise<SprintReport> {
    const sprint = await this.get(sprintId);
    if (!sprint) throw new Error(`Sprint not found: ${sprintId}`);

    const daysElapsed = sprint.startDate ? (Date.now() - new Date(sprint.startDate).getTime()) / 86400000 : 0;
    const def = SPRINT_DEFINITIONS.find(d => d.type === sprint.type)!;
    const daysRemaining = Math.max(0, def.durationDays - daysElapsed);

    const kpiProgress = sprint.kpis.map(k => {
      const range = Math.abs(k.target - k.baseline) || 1;
      const progress = Math.abs(k.current - k.baseline) / range * 100;
      const expectedProgress = (daysElapsed / def.durationDays) * 100;
      return {
        name: k.name,
        baseline: k.baseline,
        target: k.target,
        current: k.current,
        progressPercent: Math.min(100, Math.round(progress * 10) / 10),
        onTrack: progress >= expectedProgress * 0.8,
      };
    });

    const { triggered } = await this.checkKillConditions(sprintId);
    const offTrackCount = kpiProgress.filter(k => !k.onTrack).length;

    return {
      sprintId,
      status: sprint.status,
      daysElapsed: Math.round(daysElapsed),
      daysRemaining: Math.round(daysRemaining),
      kpiProgress,
      killConditionsTriggered: triggered,
      overallHealth: triggered.length > 0 ? 'red' : offTrackCount > kpiProgress.length / 2 ? 'yellow' : 'green',
      generatedAt: new Date().toISOString(),
    };
  },

  // --- Expansion (Proof → License) ---

  async proposeExpansion(sprintId: string, annualValue: number, licenseType: 'annual' | 'multi_year' | 'enterprise' = 'annual'): Promise<ExpansionOffer> {
    const sprint = await this.get(sprintId);
    if (!sprint) throw new Error(`Sprint not found: ${sprintId}`);

    const offer: ExpansionOffer = {
      id: generateId('expand'),
      sprintId,
      clientId: sprint.clientId,
      licenseType,
      annualValue,
      proposedAt: new Date().toISOString(),
      status: 'proposed',
    };

    await adminDb.collection('wge_expansions').doc(offer.id).set(offer);

    await eventBus.emit({
      type: 'ExpansionProposed',
      source: 'wge',
      payload: { sprintId, offerId: offer.id, annualValue, licenseType },
    });

    return offer;
  },

  async acceptExpansion(offerId: string): Promise<ExpansionOffer> {
    const doc = await adminDb.collection('wge_expansions').doc(offerId).get();
    if (!doc.exists) throw new Error(`Expansion offer not found: ${offerId}`);

    const offer = doc.data() as ExpansionOffer;
    const now = new Date().toISOString();

    await adminDb.collection('wge_expansions').doc(offerId).update({ status: 'accepted', acceptedAt: now });
    await adminDb.collection('wge_sprints').doc(offer.sprintId).update({ expandedToLicense: true, status: 'expanded', updatedAt: now });

    await eventBus.emit({
      type: 'ExpansionAccepted',
      source: 'wge',
      payload: { offerId, sprintId: offer.sprintId, annualValue: offer.annualValue },
    });

    return { ...offer, status: 'accepted', acceptedAt: now };
  },

  // --- Operator Management ---

  async assignOperator(sprintId: string, operatorId: string): Promise<void> {
    const sprint = await this.get(sprintId);
    if (!sprint) throw new Error(`Sprint not found: ${sprintId}`);

    const operators = [...sprint.operators, operatorId];
    await adminDb.collection('wge_sprints').doc(sprintId).update({ operators, updatedAt: new Date().toISOString() });

    await adminDb.collection('wge_operators').doc(operatorId).update({
      status: 'assigned',
      activeSprintIds: [...((await this.getOperator(operatorId))?.activeSprintIds ?? []), sprintId],
    });
  },

  async createOperator(op: Omit<Operator, 'id' | 'createdAt'>): Promise<Operator> {
    const full: Operator = { ...op, id: generateId('op'), createdAt: new Date().toISOString() };
    await adminDb.collection('wge_operators').doc(full.id).set(full);
    return full;
  },

  async getOperator(id: string): Promise<Operator | null> {
    const doc = await adminDb.collection('wge_operators').doc(id).get();
    return doc.exists ? (doc.data() as Operator) : null;
  },

  async listOperators(status?: OperatorStatus): Promise<Operator[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('wge_operators');
    if (status) query = query.where('status', '==', status);
    const snap = await query.get();
    return snap.docs.map(d => d.data() as Operator);
  },

  async matchOperators(sprintId: string): Promise<Operator[]> {
    const sprint = await this.get(sprintId);
    if (!sprint) return [];

    const def = SPRINT_DEFINITIONS.find(d => d.type === sprint.type);
    if (!def) return [];

    const available = await this.listOperators('available');
    return available.filter(op =>
      def.requiredCapabilities.some(cap => op.capabilities.includes(cap))
    ).sort((a, b) => b.rating - a.rating);
  },

  // --- CRUD ---

  async get(id: string): Promise<Sprint | null> {
    const doc = await adminDb.collection('wge_sprints').doc(id).get();
    return doc.exists ? (doc.data() as Sprint) : null;
  },

  async list(filters: { status?: SprintStatus; type?: SprintType; clientId?: string } = {}): Promise<Sprint[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('wge_sprints')
      .orderBy('createdAt', 'desc');
    if (filters.status) query = query.where('status', '==', filters.status);
    if (filters.type) query = query.where('type', '==', filters.type);
    const snap = await query.limit(200).get();
    return snap.docs.map(d => d.data() as Sprint);
  },

  async transition(sprintId: string, to: SprintStatus): Promise<Sprint> {
    const sprint = await this.get(sprintId);
    if (!sprint) throw new Error(`Sprint not found: ${sprintId}`);
    if (!VALID_TRANSITIONS[sprint.status]?.includes(to)) {
      throw new Error(`Invalid transition: ${sprint.status} → ${to}`);
    }
    await adminDb.collection('wge_sprints').doc(sprintId).update({ status: to, updatedAt: new Date().toISOString() });

    await eventBus.emit({
      type: 'SprintStatusChanged',
      source: 'wge',
      payload: { sprintId, from: sprint.status, to },
    });

    return { ...sprint, status: to };
  },

  // --- Dashboard ---

  async getDashboard(): Promise<{
    activeSprints: number;
    totalSprints: number;
    totalRevenue: number;
    expansionRate: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    const sprints = await this.list();
    const expansions = await adminDb.collection('wge_expansions')
      .where('status', '==', 'accepted').get();

    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    sprints.forEach(s => {
      byType[s.type] = (byType[s.type] ?? 0) + 1;
      byStatus[s.status] = (byStatus[s.status] ?? 0) + 1;
    });

    const completed = sprints.filter(s => s.status === 'completed' || s.status === 'expanded').length;
    const expanded = sprints.filter(s => s.expandedToLicense).length;

    return {
      activeSprints: sprints.filter(s => s.status === 'active' || s.status === 'tracking').length,
      totalSprints: sprints.length,
      totalRevenue: sprints.reduce((s, sp) => s + sp.budget, 0),
      expansionRate: completed > 0 ? (expanded / completed) * 100 : 0,
      byType,
      byStatus,
    };
  },
};
