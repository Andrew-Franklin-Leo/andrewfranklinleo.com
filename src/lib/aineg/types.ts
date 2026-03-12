export type PortfolioAlertSeverity = 'info' | 'warning' | 'critical' | 'existential';
export type KillDecisionStatus = 'proposed' | 'under_review' | 'approved' | 'rejected' | 'executed';
export type SignalType = 'risk' | 'regulatory' | 'financial' | 'operational' | 'governance' | 'reputational';

export interface PortfolioSummary {
  totalEnterprises: number;
  running: number;
  degraded: number;
  critical: number;
  suspended: number;
  totalCapitalDeployed: number;
  totalRevenueGenerated: number;
  averageHealthScore: number;
  topRisks: PortfolioRisk[];
  generatedAt: string;
}

export interface PortfolioRisk {
  enterpriseId: string;
  enterpriseName: string;
  vertical: string;
  riskType: string;
  severity: PortfolioAlertSeverity;
  description: string;
  detectedAt: string;
  mitigationSuggested: string;
}

export interface EntityRiskProfile {
  enterpriseId: string;
  enterpriseName: string;
  vertical: string;
  healthScore: number;
  pciScore: number;
  capitalRunwayDays: number;
  agentFailureRate: number;
  governanceViolations: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  signals: GovernanceSignal[];
  assessedAt: string;
}

export interface GovernanceSignal {
  id: string;
  enterpriseId: string;
  type: SignalType;
  severity: PortfolioAlertSeverity;
  source: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  acknowledged: boolean;
  resolvedAt?: string;
  createdAt: string;
}

export interface KillDecision {
  id: string;
  enterpriseId: string;
  enterpriseName: string;
  reason: string;
  evidence: string[];
  severity: 'critical' | 'existential';
  status: KillDecisionStatus;
  proposedBy: string;
  proposedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  decision?: 'approved' | 'rejected';
  notes?: string;
  executedAt?: string;
}

export interface CascadeAnalysis {
  triggerEnterpriseId: string;
  affectedEnterprises: {
    enterpriseId: string;
    enterpriseName: string;
    impactType: 'direct' | 'indirect';
    impactSeverity: PortfolioAlertSeverity;
    description: string;
  }[];
  totalImpactEstimate: number;
  analyzedAt: string;
}

export interface PortfolioRebalanceRecommendation {
  type: 'redistribute_capital' | 'merge_enterprises' | 'terminate' | 'scale_up' | 'scale_down';
  enterpriseIds: string[];
  description: string;
  estimatedImpact: number;
  priority: number;
}
