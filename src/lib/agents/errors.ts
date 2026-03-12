export class AgentError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AgentError';
  }
}

export class AgentNotFoundError extends AgentError {
  constructor(id: string) {
    super(`Agent not found: ${id}`, 'AGENT_NOT_FOUND');
  }
}

export class InvalidTransitionError extends AgentError {
  constructor(from: string, to: string) {
    super(`Invalid status transition: ${from} -> ${to}`, 'INVALID_TRANSITION');
  }
}

export class MaxRestartsExceededError extends AgentError {
  constructor(id: string, max: number) {
    super(`Agent ${id} exceeded max restarts (${max})`, 'MAX_RESTARTS_EXCEEDED');
  }
}

export class GovernanceDeniedError extends AgentError {
  constructor(agentId: string, action: string, reasons: string[]) {
    super(`Action denied for agent ${agentId}: ${action} — ${reasons.join('; ')}`, 'GOVERNANCE_DENIED');
  }
}

export class KillSwitchActiveError extends AgentError {
  constructor(targetId: string) {
    super(`Kill switch active for: ${targetId}`, 'KILL_SWITCH_ACTIVE');
  }
}
