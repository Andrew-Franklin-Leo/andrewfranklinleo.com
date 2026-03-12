export type RevenueStreamType = 'subscription' | 'one_time' | 'licensing' | 'referral' | 'speaking' | 'events' | 'council' | 'intelligence' | 'case_study';

export interface RevenueStream {
  id: string;
  type: RevenueStreamType;
  name: string;
  currentMRR: number;
  targetMRR: number;
  churnRate: number;
  growthRate: number;
  customerCount: number;
  lastUpdated: string;
}

export interface RevenueForecast {
  period: string;
  streams: {
    type: RevenueStreamType;
    projected: number;
    confidence: number;
  }[];
  totalProjected: number;
  generatedAt: string;
}

export interface RevenueLeakage {
  id: string;
  type: 'missed_billing' | 'underpricing' | 'churn_risk' | 'expired_trial' | 'failed_payment';
  description: string;
  estimatedLoss: number;
  detectedAt: string;
  affectedEntity?: string;
  suggestedAction: string;
  resolved: boolean;
}

export interface RevenueAlert {
  id: string;
  type: 'leakage' | 'churn_spike' | 'growth_stall' | 'target_miss';
  stream: RevenueStreamType;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: string;
  acknowledged: boolean;
}
