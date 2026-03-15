// Fitness Evaluator — measures organism health across 5 dimensions
// This is the "val_bpb" equivalent from autoresearch

import { adminDb } from '@/lib/firebase/admin';
import { FitnessScore } from './types';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const WEIGHTS = {
  portfolioHealth: 0.25,
  revenueEfficiency: 0.25,
  agentUptime: 0.20,
  sprintCompletion: 0.15,
  governanceCompliance: 0.15,
};

export const fitnessEvaluator = {
  async measure(): Promise<FitnessScore> {
    const [portfolio, agents, sprints, governance] = await Promise.all([
      this.measurePortfolioHealth(),
      this.measureAgentUptime(),
      this.measureSprintCompletion(),
      this.measureGovernanceCompliance(),
    ]);

    const revenueEfficiency = await this.measureRevenueEfficiency();

    const dimensions = {
      portfolioHealth: portfolio,
      revenueEfficiency,
      agentUptime: agents,
      sprintCompletion: sprints,
      governanceCompliance: governance,
    };

    const overall = Math.round(
      dimensions.portfolioHealth * WEIGHTS.portfolioHealth +
      dimensions.revenueEfficiency * WEIGHTS.revenueEfficiency +
      dimensions.agentUptime * WEIGHTS.agentUptime +
      dimensions.sprintCompletion * WEIGHTS.sprintCompletion +
      dimensions.governanceCompliance * WEIGHTS.governanceCompliance
    );

    const score: FitnessScore = {
      overall,
      dimensions,
      measuredAt: new Date().toISOString(),
    };

    // Persist for historical tracking
    await adminDb.collection('evolution_fitness').doc(generateId('fit')).set(score);

    return score;
  },

  async measurePortfolioHealth(): Promise<number> {
    const healthDocs = await adminDb.collection('ainef_health').get();
    if (healthDocs.empty) return 50; // baseline when no enterprises exist
    const scores = healthDocs.docs.map(d => d.data().overallScore ?? 50);
    return Math.round(scores.reduce((s, v) => s + v, 0) / scores.length);
  },

  async measureRevenueEfficiency(): Promise<number> {
    const enterprises = await adminDb.collection('ainef_enterprises').get();
    if (enterprises.empty) return 50;
    let totalRevenue = 0;
    let totalCapital = 0;
    enterprises.docs.forEach(d => {
      totalRevenue += d.data().revenueGenerated ?? 0;
      totalCapital += d.data().capitalConsumed ?? 1;
    });
    if (totalCapital === 0) return 50;
    // Ratio > 1 means profitable. Normalize to 0-100 scale
    const ratio = totalRevenue / totalCapital;
    return Math.min(100, Math.round(ratio * 50));
  },

  async measureAgentUptime(): Promise<number> {
    const agents = await adminDb.collection('agent_instances').get();
    if (agents.empty) return 50;
    const running = agents.docs.filter(d => d.data().status === 'running').length;
    return Math.round((running / agents.size) * 100);
  },

  async measureSprintCompletion(): Promise<number> {
    const sprints = await adminDb.collection('wge_sprints').get();
    if (sprints.empty) return 50;
    const completed = sprints.docs.filter(d =>
      d.data().status === 'completed' || d.data().status === 'expanded'
    ).length;
    const failed = sprints.docs.filter(d => d.data().status === 'killed').length;
    const total = completed + failed;
    if (total === 0) return 50;
    return Math.round((completed / total) * 100);
  },

  async measureGovernanceCompliance(): Promise<number> {
    const [allowed, denied] = await Promise.all([
      adminDb.collection('governance_audit').where('result', '==', 'allowed').get(),
      adminDb.collection('governance_audit').where('result', '==', 'denied').get(),
    ]);
    const total = allowed.size + denied.size;
    if (total === 0) return 100;
    return Math.round((allowed.size / total) * 100);
  },

  async getHistory(limit = 50): Promise<FitnessScore[]> {
    const snap = await adminDb.collection('evolution_fitness')
      .orderBy('measuredAt', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map(d => d.data() as FitnessScore);
  },
};
