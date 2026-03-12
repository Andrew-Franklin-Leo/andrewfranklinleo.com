import { adminDb } from '@/lib/firebase/admin';
import { Mission, MissionStatus, MissionTask, TaskStatus, Objective, DriftReport } from './types';
import { eventBus } from '@/lib/agents/event-bus';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const missionManager = {
  // --- Missions ---

  async create(mission: Omit<Mission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Mission> {
    const now = new Date().toISOString();
    const full: Mission = { ...mission, id: generateId('msn'), createdAt: now, updatedAt: now };
    await adminDb.collection('tower_missions').doc(full.id).set(full);

    await eventBus.emit({
      type: 'MissionCreated',
      source: 'tower-control',
      payload: { missionId: full.id, name: full.name, owner: full.owner },
    });

    return full;
  },

  async get(id: string): Promise<Mission | null> {
    const doc = await adminDb.collection('tower_missions').doc(id).get();
    return doc.exists ? (doc.data() as Mission) : null;
  },

  async update(id: string, updates: Partial<Mission>): Promise<void> {
    await adminDb.collection('tower_missions').doc(id).update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  },

  async list(status?: MissionStatus): Promise<Mission[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('tower_missions')
      .orderBy('createdAt', 'desc');
    if (status) query = query.where('status', '==', status);
    const snap = await query.limit(100).get();
    return snap.docs.map(d => d.data() as Mission);
  },

  async transition(id: string, newStatus: MissionStatus): Promise<void> {
    const mission = await this.get(id);
    if (!mission) throw new Error(`Mission not found: ${id}`);

    await this.update(id, { status: newStatus });

    await eventBus.emit({
      type: 'MissionStatusChanged',
      source: 'tower-control',
      payload: { missionId: id, from: mission.status, to: newStatus },
    });
  },

  // --- Tasks ---

  async createTask(task: Omit<MissionTask, 'id' | 'createdAt'>): Promise<MissionTask> {
    const full: MissionTask = { ...task, id: generateId('task'), createdAt: new Date().toISOString() };
    await adminDb.collection('tower_mission_tasks').doc(full.id).set(full);
    return full;
  },

  async getTasks(missionId: string): Promise<MissionTask[]> {
    const snap = await adminDb.collection('tower_mission_tasks')
      .where('missionId', '==', missionId)
      .orderBy('createdAt', 'asc')
      .get();
    return snap.docs.map(d => d.data() as MissionTask);
  },

  async updateTask(id: string, updates: Partial<MissionTask>): Promise<void> {
    await adminDb.collection('tower_mission_tasks').doc(id).update(updates);
  },

  async completeTask(id: string): Promise<void> {
    await this.updateTask(id, {
      status: 'completed' as TaskStatus,
      completedAt: new Date().toISOString(),
    });
  },

  // --- Progress ---

  async calculateProgress(missionId: string): Promise<{ overall: number; byObjective: Record<string, number> }> {
    const mission = await this.get(missionId);
    if (!mission) throw new Error(`Mission not found: ${missionId}`);

    const tasks = await this.getTasks(missionId);
    const byObjective: Record<string, number> = {};

    for (const obj of mission.objectives) {
      const objTasks = tasks.filter(t => t.objectiveId === obj.id);
      const completed = objTasks.filter(t => t.status === 'completed').length;
      byObjective[obj.id] = objTasks.length > 0 ? (completed / objTasks.length) * 100 : 0;
    }

    const overall = mission.objectives.reduce((sum, obj) => {
      return sum + (byObjective[obj.id] ?? 0) * obj.weight;
    }, 0) / mission.objectives.reduce((sum, obj) => sum + obj.weight, 0) || 0;

    return { overall: Math.round(overall * 10) / 10, byObjective };
  },

  // --- Drift Detection ---

  async detectDrift(missionId: string): Promise<DriftReport> {
    const mission = await this.get(missionId);
    if (!mission) throw new Error(`Mission not found: ${missionId}`);

    const driftingKPIs: DriftReport['driftingKPIs'] = [];
    const recommendations: string[] = [];

    for (const kpi of mission.kpis) {
      const deviation = ((kpi.current - kpi.target) / kpi.target) * 100;
      if (Math.abs(deviation) > kpi.threshold) {
        driftingKPIs.push({
          kpi: kpi.name,
          expected: kpi.target,
          actual: kpi.current,
          deviation: Math.round(deviation * 10) / 10,
        });
        recommendations.push(
          `${kpi.name}: ${deviation > 0 ? 'above' : 'below'} target by ${Math.abs(deviation).toFixed(1)}%. Review resource allocation.`
        );
      }
    }

    // Check kill conditions
    const now = new Date();
    for (const kill of mission.killConditions) {
      const deadline = new Date(kill.byDate);
      if (now > deadline) {
        const kpi = mission.kpis.find(k => k.name === kill.metric);
        if (kpi) {
          const shouldKill = kill.operator === 'lt' ? kpi.current < kill.threshold : kpi.current > kill.threshold;
          if (shouldKill) {
            recommendations.push(`KILL CONDITION MET: ${kill.metric} ${kill.operator} ${kill.threshold}. Consider terminating mission.`);
          }
        }
      }
    }

    const severity: DriftReport['severity'] =
      driftingKPIs.length === 0 ? 'low' :
      driftingKPIs.some(k => Math.abs(k.deviation) > 50) ? 'critical' :
      driftingKPIs.some(k => Math.abs(k.deviation) > 25) ? 'high' :
      'medium';

    const report: DriftReport = {
      missionId,
      driftDetected: driftingKPIs.length > 0,
      driftingKPIs,
      recommendations,
      severity,
      generatedAt: new Date().toISOString(),
    };

    if (report.driftDetected) {
      await eventBus.emit({
        type: 'MissionDriftDetected',
        source: 'tower-control',
        payload: { missionId, severity, driftingKPIs: driftingKPIs.length },
      });
    }

    return report;
  },
};
