// Organism Evolution Engine — Types
// Closes the autoresearch loop: mutate → execute → evaluate → accept/discard

export type MutationTarget = 'template' | 'sprint_definition' | 'policy' | 'agent_config' | 'governance_threshold';

export type MutationStrategy = 'tweak' | 'recombine' | 'inject' | 'prune';

export type MutationStatus = 'proposed' | 'applied' | 'evaluating' | 'accepted' | 'rejected' | 'rolled_back';

export type EvolutionCycleStatus = 'running' | 'completed' | 'failed';

export interface Mutation {
  id: string;
  target: MutationTarget;
  strategy: MutationStrategy;
  status: MutationStatus;
  description: string;
  targetId: string;
  // The actual change
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  // Fitness
  fitnessBefore: number;
  fitnessAfter: number | null;
  fitnessImprovement: number | null;
  // Lineage
  parentMutationId: string | null;
  generation: number;
  createdAt: string;
  evaluatedAt: string | null;
  decidedAt: string | null;
}

export interface FitnessScore {
  overall: number; // 0-100
  dimensions: {
    portfolioHealth: number;      // AINEG portfolio health (weight: 25%)
    revenueEfficiency: number;    // revenue / capital consumed (weight: 25%)
    agentUptime: number;          // healthy agents / total agents (weight: 20%)
    sprintCompletion: number;     // completed sprints / total sprints (weight: 15%)
    governanceCompliance: number; // 1 - (violations / total actions) (weight: 15%)
  };
  measuredAt: string;
}

export interface EvolutionCycle {
  id: string;
  generation: number;
  status: EvolutionCycleStatus;
  mutationsProposed: number;
  mutationsApplied: number;
  mutationsAccepted: number;
  mutationsRejected: number;
  fitnessBefore: FitnessScore;
  fitnessAfter: FitnessScore | null;
  fitnessImprovement: number;
  startedAt: string;
  completedAt: string | null;
  trigger: 'scheduled' | 'manual' | 'research_signal';
}

export interface EvolutionConfig {
  mutationsPerCycle: number;       // How many mutations to try per cycle (default: 3)
  fitnessThreshold: number;        // Min improvement to accept (default: 0.5)
  maxGenerations: number;          // Stop after N generations (default: 1000)
  evaluationWindowMs: number;      // How long to wait before measuring (default: 300000 = 5min)
  enableAutoAccept: boolean;       // Auto-accept improvements (default: true)
  enableAutoPrune: boolean;        // Auto-reject regressions (default: true)
}

export interface ResearchSignal {
  id: string;
  source: 'github' | 'arxiv' | 'internal';
  title: string;
  description: string;
  relevanceScore: number; // 1-10
  suggestedMutations: Array<{
    target: MutationTarget;
    strategy: MutationStrategy;
    description: string;
    parameters: Record<string, unknown>;
  }>;
  processedAt: string | null;
  createdAt: string;
}

export interface EvolutionDashboard {
  currentGeneration: number;
  totalMutations: number;
  acceptanceRate: number;
  fitnessHistory: Array<{ generation: number; fitness: number; timestamp: string }>;
  activeMutations: Mutation[];
  recentCycles: EvolutionCycle[];
  topPerformingMutations: Mutation[];
}
