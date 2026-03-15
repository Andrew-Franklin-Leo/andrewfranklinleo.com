// Evolution Loop — the closed-loop autoresearch cycle
// Mutate → Execute → Evaluate → Accept/Discard → Repeat
// Runs daily via cron, triggered by research signals, or manually

import { adminDb } from '@/lib/firebase/admin';
import { eventBus } from '@/lib/agents/event-bus';
import { mutationEngine } from './mutation-engine';
import { fitnessEvaluator } from './fitness-evaluator';
import {
  EvolutionCycle, EvolutionConfig, EvolutionDashboard,
  ResearchSignal, Mutation,
} from './types';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const DEFAULT_CONFIG: EvolutionConfig = {
  mutationsPerCycle: 3,
  fitnessThreshold: 0.5,
  maxGenerations: 1000,
  evaluationWindowMs: 300000, // 5 minutes
  enableAutoAccept: true,
  enableAutoPrune: true,
};

export const evolutionLoop = {
  // Run one complete evolution cycle
  async runCycle(
    trigger: EvolutionCycle['trigger'] = 'scheduled',
    config: Partial<EvolutionConfig> = {}
  ): Promise<EvolutionCycle> {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const generation = await mutationEngine.getCurrentGeneration();

    // Step 1: Measure current fitness (baseline)
    const fitnessBefore = await fitnessEvaluator.measure();

    const cycle: EvolutionCycle = {
      id: generateId('evo'),
      generation,
      status: 'running',
      mutationsProposed: 0,
      mutationsApplied: 0,
      mutationsAccepted: 0,
      mutationsRejected: 0,
      fitnessBefore,
      fitnessAfter: null,
      fitnessImprovement: 0,
      startedAt: new Date().toISOString(),
      completedAt: null,
      trigger,
    };

    await adminDb.collection('evolution_cycles').doc(cycle.id).set(cycle);

    await eventBus.emit({
      type: 'EvolutionCycleStarted',
      source: 'evolution',
      payload: { cycleId: cycle.id, generation, fitnessBefore: fitnessBefore.overall },
    });

    try {
      // Step 2: Generate candidate mutations
      const candidates = await mutationEngine.generateMutations(cfg.mutationsPerCycle);
      cycle.mutationsProposed = candidates.length;

      // Step 3: Apply mutations one at a time, evaluate each
      for (const mutation of candidates) {
        mutation.fitnessBefore = fitnessBefore.overall;

        // Apply
        await mutationEngine.apply(mutation);
        cycle.mutationsApplied++;

        // Step 4: Evaluate (measure fitness after mutation)
        // In production, we'd wait for evaluationWindowMs
        // For now, measure immediately (Firestore state reflects changes)
        const fitnessAfterMutation = await fitnessEvaluator.measure();
        const improvement = fitnessAfterMutation.overall - fitnessBefore.overall;

        // Step 5: Accept or reject
        if (improvement >= cfg.fitnessThreshold && cfg.enableAutoAccept) {
          await mutationEngine.accept(mutation.id, fitnessAfterMutation.overall);
          cycle.mutationsAccepted++;
        } else if (improvement < -cfg.fitnessThreshold && cfg.enableAutoPrune) {
          await mutationEngine.reject(mutation.id, fitnessAfterMutation.overall);
          cycle.mutationsRejected++;
        } else {
          // Marginal change — accept but flag for review
          await mutationEngine.accept(mutation.id, fitnessAfterMutation.overall);
          cycle.mutationsAccepted++;
        }

        await this.updateCycle(cycle);
      }

      // Step 6: Final fitness measurement
      const fitnessAfter = await fitnessEvaluator.measure();
      cycle.fitnessAfter = fitnessAfter;
      cycle.fitnessImprovement = fitnessAfter.overall - fitnessBefore.overall;
      cycle.status = 'completed';
      cycle.completedAt = new Date().toISOString();

      await this.updateCycle(cycle);

      await eventBus.emit({
        type: 'EvolutionCycleCompleted',
        source: 'evolution',
        payload: {
          cycleId: cycle.id,
          generation,
          improvement: cycle.fitnessImprovement,
          accepted: cycle.mutationsAccepted,
          rejected: cycle.mutationsRejected,
        },
      });

    } catch (err) {
      cycle.status = 'failed';
      cycle.completedAt = new Date().toISOString();
      await this.updateCycle(cycle);

      await eventBus.emit({
        type: 'EvolutionCycleFailed',
        source: 'evolution',
        payload: { cycleId: cycle.id, error: String(err) },
      });
    }

    return cycle;
  },

  // Process a research signal into mutations and run a targeted cycle
  async processResearchSignal(signal: ResearchSignal): Promise<EvolutionCycle> {
    // Save signal
    await adminDb.collection('evolution_research_signals').doc(signal.id).set(signal);

    // Generate mutations from signal
    const mutations = await mutationEngine.fromResearchSignal(signal);

    if (mutations.length === 0) {
      // Mark signal as processed with no actionable mutations
      await adminDb.collection('evolution_research_signals').doc(signal.id).update({
        processedAt: new Date().toISOString(),
      });
      // Return a no-op cycle
      const fitnessBefore = await fitnessEvaluator.measure();
      return {
        id: generateId('evo'),
        generation: await mutationEngine.getCurrentGeneration(),
        status: 'completed',
        mutationsProposed: 0,
        mutationsApplied: 0,
        mutationsAccepted: 0,
        mutationsRejected: 0,
        fitnessBefore,
        fitnessAfter: fitnessBefore,
        fitnessImprovement: 0,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        trigger: 'research_signal',
      };
    }

    // Run cycle with research-derived mutations
    const cycle = await this.runCycle('research_signal');

    await adminDb.collection('evolution_research_signals').doc(signal.id).update({
      processedAt: new Date().toISOString(),
    });

    return cycle;
  },

  // Dashboard — full evolution overview
  async getDashboard(): Promise<EvolutionDashboard> {
    const [cycles, mutations, fitnessHistory] = await Promise.all([
      adminDb.collection('evolution_cycles')
        .orderBy('startedAt', 'desc').limit(20).get(),
      adminDb.collection('evolution_mutations')
        .orderBy('createdAt', 'desc').limit(50).get(),
      fitnessEvaluator.getHistory(100),
    ]);

    const allMutations = mutations.docs.map(d => d.data() as Mutation);
    const allCycles = cycles.docs.map(d => d.data() as EvolutionCycle);

    const accepted = allMutations.filter(m => m.status === 'accepted');
    const totalDecided = allMutations.filter(m =>
      m.status === 'accepted' || m.status === 'rejected'
    ).length;

    const topPerforming = accepted
      .filter(m => m.fitnessImprovement !== null)
      .sort((a, b) => (b.fitnessImprovement ?? 0) - (a.fitnessImprovement ?? 0))
      .slice(0, 10);

    return {
      currentGeneration: allCycles[0]?.generation ?? 0,
      totalMutations: allMutations.length,
      acceptanceRate: totalDecided > 0 ? Math.round((accepted.length / totalDecided) * 100) : 0,
      fitnessHistory: fitnessHistory.map((f, i) => ({
        generation: fitnessHistory.length - i,
        fitness: f.overall,
        timestamp: f.measuredAt,
      })),
      activeMutations: allMutations.filter(m =>
        m.status === 'applied' || m.status === 'evaluating'
      ),
      recentCycles: allCycles.slice(0, 10),
      topPerformingMutations: topPerforming,
    };
  },

  async getCycle(id: string): Promise<EvolutionCycle | null> {
    const doc = await adminDb.collection('evolution_cycles').doc(id).get();
    return doc.exists ? (doc.data() as EvolutionCycle) : null;
  },

  async updateCycle(cycle: EvolutionCycle): Promise<void> {
    await adminDb.collection('evolution_cycles').doc(cycle.id).set(cycle);
  },
};
