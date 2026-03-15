// Mutation Engine — generates, applies, and rolls back mutations
// This is the "modify train.py" equivalent from autoresearch

import { adminDb } from '@/lib/firebase/admin';
import { eventBus } from '@/lib/agents/event-bus';
import {
  Mutation, MutationTarget, MutationStrategy, MutationStatus,
  ResearchSignal,
} from './types';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// Mutation generators per target type
const MUTATION_GENERATORS: Record<MutationTarget, () => Promise<Array<{
  description: string;
  strategy: MutationStrategy;
  targetId: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
}>>> = {
  template: async () => {
    const snap = await adminDb.collection('ainef_enterprises')
      .where('status', '==', 'running').limit(10).get();
    const mutations: Array<{
      description: string; strategy: MutationStrategy;
      targetId: string; before: Record<string, unknown>; after: Record<string, unknown>;
    }> = [];

    for (const doc of snap.docs) {
      const ent = doc.data();
      // Tweak: adjust capital burn rate tolerance
      const currentBurn = ent.capitalBurnRate ?? 0;
      if (currentBurn > 0) {
        mutations.push({
          description: `Optimize capital allocation for ${ent.name}: reduce burn rate by 10%`,
          strategy: 'tweak',
          targetId: doc.id,
          before: { capitalBurnRate: currentBurn },
          after: { capitalBurnRate: Math.round(currentBurn * 0.9) },
        });
      }
    }
    return mutations;
  },

  sprint_definition: async () => {
    const snap = await adminDb.collection('wge_sprints')
      .where('status', 'in', ['active', 'tracking']).limit(10).get();
    const mutations: Array<{
      description: string; strategy: MutationStrategy;
      targetId: string; before: Record<string, unknown>; after: Record<string, unknown>;
    }> = [];

    for (const doc of snap.docs) {
      const sprint = doc.data();
      // Tweak: tighten KPI targets for high-performing sprints
      if (sprint.progress > 80) {
        mutations.push({
          description: `Tighten KPI targets for sprint ${sprint.name} (performing at ${sprint.progress}%)`,
          strategy: 'tweak',
          targetId: doc.id,
          before: { kpiTargetMultiplier: 1.0 },
          after: { kpiTargetMultiplier: 1.15 },
        });
      }
      // Prune: mark stalled sprints for kill review
      if (sprint.progress < 20 && sprint.status === 'active') {
        mutations.push({
          description: `Flag stalled sprint ${sprint.name} for kill review (${sprint.progress}% progress)`,
          strategy: 'prune',
          targetId: doc.id,
          before: { flaggedForKill: false },
          after: { flaggedForKill: true },
        });
      }
    }
    return mutations;
  },

  policy: async () => {
    const snap = await adminDb.collection('governance_policies')
      .where('active', '==', true).limit(10).get();
    const mutations: Array<{
      description: string; strategy: MutationStrategy;
      targetId: string; before: Record<string, unknown>; after: Record<string, unknown>;
    }> = [];

    for (const doc of snap.docs) {
      const policy = doc.data();
      // Tweak: adjust policy priority based on violation history
      mutations.push({
        description: `Re-prioritize policy "${policy.name}" based on enforcement patterns`,
        strategy: 'tweak',
        targetId: doc.id,
        before: { priority: policy.priority },
        after: { priority: Math.max(1, policy.priority - 1) },
      });
    }
    return mutations;
  },

  agent_config: async () => {
    const snap = await adminDb.collection('agent_instances')
      .where('status', '==', 'running').limit(10).get();
    const mutations: Array<{
      description: string; strategy: MutationStrategy;
      targetId: string; before: Record<string, unknown>; after: Record<string, unknown>;
    }> = [];

    for (const doc of snap.docs) {
      const agent = doc.data();
      const healthDoc = await adminDb.collection('agent_health').doc(doc.id).get();
      const health = healthDoc.data();

      // Tweak: adjust heartbeat for agents with frequent timeouts
      if (health && !health.healthy) {
        const currentInterval = agent.heartbeatIntervalMs ?? 30000;
        mutations.push({
          description: `Increase heartbeat interval for unhealthy agent ${agent.definitionId} (reduce monitoring pressure)`,
          strategy: 'tweak',
          targetId: doc.id,
          before: { heartbeatIntervalMs: currentInterval },
          after: { heartbeatIntervalMs: Math.min(120000, currentInterval * 1.5) },
        });
      }
    }
    return mutations;
  },

  governance_threshold: async () => {
    const pciDocs = await adminDb.collection('governance_pci').limit(10).get();
    const mutations: Array<{
      description: string; strategy: MutationStrategy;
      targetId: string; before: Record<string, unknown>; after: Record<string, unknown>;
    }> = [];

    for (const doc of pciDocs.docs) {
      const pci = doc.data();
      // If PCI score is dangerously high, tighten the threshold
      if (pci.score > 70) {
        mutations.push({
          description: `Tighten PCI threshold for ${doc.id}: score ${pci.score} exceeds safe range`,
          strategy: 'tweak',
          targetId: doc.id,
          before: { pciThreshold: 80 },
          after: { pciThreshold: 65 },
        });
      }
    }
    return mutations;
  },
};

export const mutationEngine = {
  // Generate candidate mutations across all targets
  async generateMutations(limit = 3): Promise<Mutation[]> {
    const allCandidates: Mutation[] = [];
    const generation = await this.getCurrentGeneration();

    for (const [target, generator] of Object.entries(MUTATION_GENERATORS)) {
      try {
        const candidates = await generator();
        for (const c of candidates) {
          allCandidates.push({
            id: generateId('mut'),
            target: target as MutationTarget,
            strategy: c.strategy,
            status: 'proposed',
            description: c.description,
            targetId: c.targetId,
            before: c.before,
            after: c.after,
            fitnessBefore: 0,
            fitnessAfter: null,
            fitnessImprovement: null,
            parentMutationId: null,
            generation,
            createdAt: new Date().toISOString(),
            evaluatedAt: null,
            decidedAt: null,
          });
        }
      } catch (err) {
        console.error(`[Evolution] Failed to generate mutations for ${target}:`, err);
      }
    }

    // Select top N candidates (prioritize prune > tweak > inject > recombine)
    const strategyOrder: Record<MutationStrategy, number> = { prune: 0, tweak: 1, inject: 2, recombine: 3 };
    allCandidates.sort((a, b) => (strategyOrder[a.strategy] ?? 9) - (strategyOrder[b.strategy] ?? 9));

    return allCandidates.slice(0, limit);
  },

  // Generate mutations from research signals
  async fromResearchSignal(signal: ResearchSignal): Promise<Mutation[]> {
    const generation = await this.getCurrentGeneration();
    return signal.suggestedMutations.map(sm => ({
      id: generateId('mut'),
      target: sm.target,
      strategy: sm.strategy,
      status: 'proposed' as MutationStatus,
      description: `[Research] ${sm.description} (from: ${signal.title})`,
      targetId: signal.id,
      before: {},
      after: sm.parameters,
      fitnessBefore: 0,
      fitnessAfter: null,
      fitnessImprovement: null,
      parentMutationId: null,
      generation,
      createdAt: new Date().toISOString(),
      evaluatedAt: null,
      decidedAt: null,
    }));
  },

  // Apply a mutation to the system
  async apply(mutation: Mutation): Promise<void> {
    const collection = this.getTargetCollection(mutation.target);
    if (!collection) throw new Error(`Unknown target: ${mutation.target}`);

    // Store the mutation
    await adminDb.collection('evolution_mutations').doc(mutation.id).set({
      ...mutation,
      status: 'applied',
    });

    // Apply the change
    if (mutation.targetId && mutation.after) {
      try {
        await adminDb.collection(collection).doc(mutation.targetId).update(mutation.after);
      } catch {
        // Document may not exist for new mutations
        console.warn(`[Evolution] Could not apply mutation ${mutation.id} to ${collection}/${mutation.targetId}`);
      }
    }

    await eventBus.emit({
      type: 'MutationApplied',
      source: 'evolution',
      payload: { mutationId: mutation.id, target: mutation.target, strategy: mutation.strategy },
    });
  },

  // Rollback a mutation
  async rollback(mutationId: string): Promise<void> {
    const doc = await adminDb.collection('evolution_mutations').doc(mutationId).get();
    if (!doc.exists) throw new Error(`Mutation not found: ${mutationId}`);

    const mutation = doc.data() as Mutation;
    const collection = this.getTargetCollection(mutation.target);

    if (collection && mutation.targetId && mutation.before) {
      try {
        await adminDb.collection(collection).doc(mutation.targetId).update(mutation.before);
      } catch {
        console.warn(`[Evolution] Could not rollback mutation ${mutationId}`);
      }
    }

    await adminDb.collection('evolution_mutations').doc(mutationId).update({
      status: 'rolled_back',
      decidedAt: new Date().toISOString(),
    });

    await eventBus.emit({
      type: 'MutationRolledBack',
      source: 'evolution',
      payload: { mutationId },
    });
  },

  // Accept a mutation
  async accept(mutationId: string, fitnessAfter: number): Promise<void> {
    const doc = await adminDb.collection('evolution_mutations').doc(mutationId).get();
    if (!doc.exists) throw new Error(`Mutation not found: ${mutationId}`);
    const mutation = doc.data() as Mutation;

    await adminDb.collection('evolution_mutations').doc(mutationId).update({
      status: 'accepted',
      fitnessAfter,
      fitnessImprovement: fitnessAfter - mutation.fitnessBefore,
      evaluatedAt: new Date().toISOString(),
      decidedAt: new Date().toISOString(),
    });

    await eventBus.emit({
      type: 'MutationAccepted',
      source: 'evolution',
      payload: { mutationId, improvement: fitnessAfter - mutation.fitnessBefore },
    });
  },

  // Reject a mutation (and rollback)
  async reject(mutationId: string, fitnessAfter: number): Promise<void> {
    const doc = await adminDb.collection('evolution_mutations').doc(mutationId).get();
    if (!doc.exists) throw new Error(`Mutation not found: ${mutationId}`);
    const mutation = doc.data() as Mutation;

    await this.rollback(mutationId);

    await adminDb.collection('evolution_mutations').doc(mutationId).update({
      status: 'rejected',
      fitnessAfter,
      fitnessImprovement: fitnessAfter - mutation.fitnessBefore,
      evaluatedAt: new Date().toISOString(),
    });
  },

  async getCurrentGeneration(): Promise<number> {
    const snap = await adminDb.collection('evolution_cycles')
      .orderBy('generation', 'desc').limit(1).get();
    if (snap.empty) return 1;
    return (snap.docs[0].data().generation ?? 0) + 1;
  },

  async getMutation(id: string): Promise<Mutation | null> {
    const doc = await adminDb.collection('evolution_mutations').doc(id).get();
    return doc.exists ? (doc.data() as Mutation) : null;
  },

  async listMutations(status?: MutationStatus, limit = 50): Promise<Mutation[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('evolution_mutations')
      .orderBy('createdAt', 'desc').limit(limit);
    if (status) query = query.where('status', '==', status);
    const snap = await query.get();
    return snap.docs.map(d => d.data() as Mutation);
  },

  getTargetCollection(target: MutationTarget): string | null {
    const map: Record<MutationTarget, string> = {
      template: 'ainef_enterprises',
      sprint_definition: 'wge_sprints',
      policy: 'governance_policies',
      agent_config: 'agent_instances',
      governance_threshold: 'governance_pci',
    };
    return map[target] ?? null;
  },
};
