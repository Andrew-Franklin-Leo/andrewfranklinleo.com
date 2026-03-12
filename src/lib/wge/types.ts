export type SprintType = 'production_stability' | 'fleet_utilization' | 'margin_recovery' | 'working_capital' | 'receivables' | 'decision_latency';
export type SprintStatus = 'intake' | 'scoping' | 'approved' | 'active' | 'tracking' | 'completed' | 'failed' | 'killed' | 'expanded';
export type OperatorStatus = 'available' | 'assigned' | 'active' | 'on_leave' | 'retired';
export type SprintTaskStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed' | 'blocked';

export interface SprintDefinition {
  type: SprintType;
  name: string;
  description: string;
  defaultBudget: number;
  durationDays: number;
  kpiTargets: KPITarget[];
  killConditions: SprintKillCondition[];
  requiredCapabilities: string[];
}

export interface KPITarget {
  name: string;
  metric: string;
  baselineValue: number;
  targetValue: number;
  unit: string;
  measurementFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface SprintKillCondition {
  metric: string;
  operator: 'lt' | 'gt' | 'eq';
  threshold: number;
  checkAfterDays: number;
  description: string;
}

export interface Sprint {
  id: string;
  type: SprintType;
  status: SprintStatus;
  clientId: string;
  clientName: string;
  enterpriseId?: string;
  complaint: string;
  scope: SprintScope;
  budget: number;
  revenueShare: number;
  operators: string[];
  kpis: SprintKPI[];
  killConditions: SprintKillCondition[];
  startDate: string | null;
  endDate: string | null;
  targetDate: string;
  proofDeliveredAt: string | null;
  expandedToLicense: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SprintScope {
  problem: string;
  hypothesis: string;
  deliverables: string[];
  exclusions: string[];
  successCriteria: string[];
}

export interface SprintKPI {
  name: string;
  metric: string;
  baseline: number;
  target: number;
  current: number;
  unit: string;
  history: { date: string; value: number }[];
}

export interface SprintTask {
  id: string;
  sprintId: string;
  description: string;
  status: SprintTaskStatus;
  assignedTo?: string;
  agentId?: string;
  dependencies: string[];
  estimatedHours: number;
  actualHours: number;
  dueDate: string;
  completedAt?: string;
  output?: Record<string, unknown>;
  createdAt: string;
}

export interface Operator {
  id: string;
  name: string;
  email: string;
  status: OperatorStatus;
  capabilities: string[];
  certifications: string[];
  activeSprintIds: string[];
  completedSprints: number;
  successRate: number;
  rating: number;
  hourlyRate: number;
  createdAt: string;
}

export interface IntakeRequest {
  clientName: string;
  clientEmail: string;
  industry: string;
  complaint: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedBudget?: number;
  preferredSprintType?: SprintType;
}

export interface ExpansionOffer {
  id: string;
  sprintId: string;
  clientId: string;
  licenseType: 'annual' | 'multi_year' | 'enterprise';
  annualValue: number;
  proposedAt: string;
  status: 'proposed' | 'accepted' | 'rejected' | 'expired';
  acceptedAt?: string;
}

export interface SprintReport {
  sprintId: string;
  status: SprintStatus;
  daysElapsed: number;
  daysRemaining: number;
  kpiProgress: {
    name: string;
    baseline: number;
    target: number;
    current: number;
    progressPercent: number;
    onTrack: boolean;
  }[];
  killConditionsTriggered: string[];
  overallHealth: 'green' | 'yellow' | 'red';
  generatedAt: string;
}
