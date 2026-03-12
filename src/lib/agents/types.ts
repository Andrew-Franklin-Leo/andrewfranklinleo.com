export type AgentStatus = 'created' | 'starting' | 'running' | 'stopping' | 'stopped' | 'failed' | 'retired';
export type AgentType = 'governance' | 'intelligence' | 'execution' | 'monitoring' | 'orchestration';
export type EngineName = 'eagl' | 'tower-control' | 'wge' | 'agent-runtime' | 'standalone';

export interface AgentPolicy {
  id: string;
  name: string;
  type: 'allow' | 'deny' | 'require_approval';
  condition: string;
  action: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
}

export interface DeathClause {
  maxAgeMs: number;
  maxConsecutiveFailures: number;
  killConditions: string[];
}

export interface AgentDefinition {
  id: string;
  name: string;
  type: AgentType;
  engine: EngineName;
  version: string;
  config: Record<string, unknown>;
  policies: AgentPolicy[];
  maxRestarts: number;
  heartbeatIntervalMs: number;
  deathClause?: DeathClause;
  entrypoint: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentInstance {
  id: string;
  definitionId: string;
  status: AgentStatus;
  startedAt: string | null;
  stoppedAt: string | null;
  lastHeartbeat: string | null;
  restartCount: number;
  consecutiveFailures: number;
  metadata: Record<string, unknown>;
  error?: string;
}

export interface AgentEvent {
  id: string;
  type: string;
  source: string;
  timestamp: string;
  payload: Record<string, unknown>;
  correlationId?: string;
}

export interface AgentMessage {
  id: string;
  from: string;
  to: string;
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
  acknowledged: boolean;
}

export interface AgentHealthReport {
  agentId: string;
  status: AgentStatus;
  lastHeartbeat: string;
  uptimeMs: number;
  taskCount: number;
  errorCount: number;
  healthy: boolean;
}

export interface AgentAction {
  type: string;
  target: string;
  parameters: Record<string, unknown>;
}
