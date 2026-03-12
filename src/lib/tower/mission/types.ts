export type MissionStatus = 'proposed' | 'approved' | 'active' | 'tracking' | 'completed' | 'failed' | 'archived';
export type TaskStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed' | 'blocked';

export interface MissionKPI {
  name: string;
  target: number;
  current: number;
  unit: string;
  threshold: number;
}

export interface KillCondition {
  metric: string;
  operator: 'lt' | 'gt';
  threshold: number;
  byDate: string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  status: MissionStatus;
  objectives: Objective[];
  kpis: MissionKPI[];
  owner: string;
  budget: number;
  startDate: string;
  targetDate: string;
  killConditions: KillCondition[];
  createdAt: string;
  updatedAt: string;
}

export interface Objective {
  id: string;
  missionId: string;
  description: string;
  weight: number;
  progress: number;
}

export interface MissionTask {
  id: string;
  missionId: string;
  objectiveId: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string;
  dependencies: string[];
  estimatedHours: number;
  actualHours: number;
  dueDate: string;
  completedAt?: string;
  createdAt: string;
}

export interface DriftReport {
  missionId: string;
  driftDetected: boolean;
  driftingKPIs: {
    kpi: string;
    expected: number;
    actual: number;
    deviation: number;
  }[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  generatedAt: string;
}
