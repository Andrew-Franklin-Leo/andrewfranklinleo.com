export type PolicyScope = 'global' | 'engine' | 'agent' | 'action';
export type PolicyEffect = 'allow' | 'deny' | 'require_ratification';
export type RatificationStatus = 'pending' | 'approved' | 'rejected' | 'expired';
export type KillSwitchScope = 'freeze' | 'shutdown' | 'quarantine';
export type PCIStatus = 'healthy' | 'elevated' | 'warning' | 'critical' | 'existential';

export interface PolicyCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'contains';
  value: unknown;
}

export interface GovernancePolicy {
  id: string;
  name: string;
  description: string;
  scope: PolicyScope;
  scopeTarget?: string;
  conditions: PolicyCondition[];
  effect: PolicyEffect;
  priority: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationRequest {
  agentId: string;
  action: {
    type: string;
    target: string;
    parameters: Record<string, unknown>;
  };
  context: Record<string, unknown>;
}

export interface ValidationResult {
  allowed: boolean;
  effect: PolicyEffect;
  matchedPolicies: string[];
  ratificationRequired: boolean;
  ratificationId?: string;
  reasons: string[];
  timestamp: string;
}

export interface PCIScore {
  entityId: string;
  entityType: string;
  score: number;
  dimensions: {
    decisionAuthority: number;
    resourceControl: number;
    informationAccess: number;
    revenueConcentration: number;
  };
  status: PCIStatus;
  calculatedAt: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  agentId: string;
  action: string;
  target: string;
  result: 'allowed' | 'denied' | 'ratification_pending';
  matchedPolicies: string[];
  pciAtTime?: number;
  correlationId: string;
  immutable: true;
}

export interface RatificationRequest {
  id: string;
  agentId: string;
  action: string;
  reason: string;
  severity: 'high' | 'critical';
  status: RatificationStatus;
  requestedAt: string;
  expiresAt: string;
  decidedAt?: string;
  decidedBy?: string;
  decision?: 'approved' | 'rejected';
  notes?: string;
}

export interface KillSwitchActivation {
  id: string;
  targetType: 'agent' | 'engine' | 'system';
  targetId: string;
  reason: string;
  activatedBy: string;
  activatedAt: string;
  scope: KillSwitchScope;
  active: boolean;
}
