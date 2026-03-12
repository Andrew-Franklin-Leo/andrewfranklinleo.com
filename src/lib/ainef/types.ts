export type EnterpriseStatus = 'provisioning' | 'initializing' | 'running' | 'degraded' | 'suspended' | 'terminating' | 'terminated';
export type EnterpriseVertical = 'manufacturing' | 'healthcare' | 'finance' | 'logistics' | 'professional_services' | 'government' | 'general';
export type TerminationReason = 'kill_condition' | 'governance_violation' | 'capital_exhaustion' | 'client_request' | 'regulatory_order' | 'manual';

export interface EnterpriseTemplate {
  id: string;
  vertical: EnterpriseVertical;
  name: string;
  description: string;
  defaultAgentConfig: AgentConfig[];
  defaultPolicies: string[];
  requiredCapabilities: string[];
  estimatedMonthlyCost: number;
  createdAt: string;
}

export interface AgentConfig {
  name: string;
  type: string;
  engine: string;
  config: Record<string, unknown>;
  required: boolean;
}

export interface Enterprise {
  id: string;
  templateId: string;
  name: string;
  vertical: EnterpriseVertical;
  status: EnterpriseStatus;
  clientId: string;
  clientName: string;
  sprintId?: string;
  agentIds: string[];
  policyIds: string[];
  capitalAllocated: number;
  capitalConsumed: number;
  capitalBurnRate: number;
  revenueGenerated: number;
  healthScore: number;
  terminationReason?: TerminationReason;
  terminatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseHealth {
  enterpriseId: string;
  agentHealth: { agentId: string; healthy: boolean; status: string }[];
  kpiHealth: { kpi: string; value: number; target: number; onTrack: boolean }[];
  capitalHealth: { allocated: number; consumed: number; burnRate: number; runwayDays: number };
  governanceHealth: { violations: number; pendingRatifications: number; pciScore: number };
  overallScore: number;
  status: 'healthy' | 'degraded' | 'critical' | 'terminal';
  assessedAt: string;
}

export interface TerminationRequest {
  enterpriseId: string;
  reason: TerminationReason;
  requestedBy: string;
  notes: string;
  gracePeriodMs: number;
}

export interface TerminationSequence {
  enterpriseId: string;
  steps: TerminationStep[];
  startedAt: string;
  completedAt?: string;
}

export interface TerminationStep {
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  completedAt?: string;
}
