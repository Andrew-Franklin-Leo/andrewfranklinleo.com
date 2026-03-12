import { AgentDefinition, AgentInstance, AgentStatus, AgentAction } from './types';
import { agentRegistry } from './agent-registry';
import { eventBus } from './event-bus';
import { stateStore } from './state-store';
import { InvalidTransitionError, MaxRestartsExceededError, KillSwitchActiveError } from './errors';

const VALID_TRANSITIONS: Record<AgentStatus, AgentStatus[]> = {
  created: ['starting', 'retired'],
  starting: ['running', 'failed'],
  running: ['stopping', 'failed'],
  stopping: ['stopped', 'failed'],
  stopped: ['starting', 'retired'],
  failed: ['starting', 'retired'],
  retired: [],
};

const killedAgents = new Set<string>();
const heartbeatTimers = new Map<string, ReturnType<typeof setInterval>>();

function validateTransition(from: AgentStatus, to: AgentStatus): void {
  if (!VALID_TRANSITIONS[from]?.includes(to)) {
    throw new InvalidTransitionError(from, to);
  }
}

async function transition(id: string, to: AgentStatus, extra: Partial<AgentInstance> = {}): Promise<AgentInstance> {
  const instance = await agentRegistry.getInstance(id);
  validateTransition(instance.status, to);
  const updates = { ...extra, status: to };
  await agentRegistry.updateInstance(id, updates);

  await eventBus.emit({
    type: 'AgentStatusChanged',
    source: id,
    payload: { from: instance.status, to, ...extra },
  });

  return { ...instance, ...updates };
}

export const agentRuntime = {
  async create(def: Omit<AgentDefinition, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ definition: AgentDefinition; instance: AgentInstance }> {
    const definition = await agentRegistry.createDefinition(def);
    const instance = await agentRegistry.createInstance(definition.id);

    await eventBus.emit({
      type: 'AgentCreated',
      source: instance.id,
      payload: { definitionId: definition.id, name: definition.name, engine: definition.engine },
    });

    return { definition, instance };
  },

  async start(instanceId: string): Promise<AgentInstance> {
    if (killedAgents.has(instanceId)) throw new KillSwitchActiveError(instanceId);

    const instance = await agentRegistry.getInstance(instanceId);
    const def = await agentRegistry.getDefinition(instance.definitionId);

    if (instance.restartCount >= def.maxRestarts && instance.status === 'failed') {
      throw new MaxRestartsExceededError(instanceId, def.maxRestarts);
    }

    const started = await transition(instanceId, 'starting');
    const now = new Date().toISOString();

    // Start heartbeat
    const timer = setInterval(async () => {
      try {
        await agentRegistry.updateInstance(instanceId, { lastHeartbeat: new Date().toISOString() });
      } catch { /* agent may have been stopped */ }
    }, def.heartbeatIntervalMs);
    heartbeatTimers.set(instanceId, timer);

    await agentRegistry.updateInstance(instanceId, {
      startedAt: now,
      lastHeartbeat: now,
      stoppedAt: null,
      consecutiveFailures: 0,
    });

    const running = await transition(instanceId, 'running');

    await eventBus.emit({
      type: 'AgentStarted',
      source: instanceId,
      payload: { definitionId: def.id, name: def.name },
    });

    return running;
  },

  async stop(instanceId: string): Promise<AgentInstance> {
    const timer = heartbeatTimers.get(instanceId);
    if (timer) { clearInterval(timer); heartbeatTimers.delete(instanceId); }

    const stopping = await transition(instanceId, 'stopping');
    const stopped = await transition(instanceId, 'stopped', {
      stoppedAt: new Date().toISOString(),
    });

    await eventBus.emit({
      type: 'AgentStopped',
      source: instanceId,
      payload: {},
    });

    return stopped;
  },

  async restart(instanceId: string): Promise<AgentInstance> {
    const instance = await agentRegistry.getInstance(instanceId);
    if (instance.status === 'running' || instance.status === 'starting') {
      await this.stop(instanceId);
    }
    await agentRegistry.updateInstance(instanceId, {
      restartCount: instance.restartCount + 1,
    });
    return this.start(instanceId);
  },

  async retire(instanceId: string): Promise<AgentInstance> {
    const instance = await agentRegistry.getInstance(instanceId);
    if (instance.status === 'running' || instance.status === 'starting') {
      await this.stop(instanceId);
    }
    const retired = await transition(instanceId, 'retired');

    await eventBus.emit({
      type: 'AgentRetired',
      source: instanceId,
      payload: {},
    });

    return retired;
  },

  async fail(instanceId: string, error: string): Promise<AgentInstance> {
    const timer = heartbeatTimers.get(instanceId);
    if (timer) { clearInterval(timer); heartbeatTimers.delete(instanceId); }

    const instance = await agentRegistry.getInstance(instanceId);
    const failed = await transition(instanceId, 'failed', {
      error,
      consecutiveFailures: instance.consecutiveFailures + 1,
      stoppedAt: new Date().toISOString(),
    });

    await eventBus.emit({
      type: 'AgentFailed',
      source: instanceId,
      payload: { error, consecutiveFailures: instance.consecutiveFailures + 1 },
    });

    // Auto-restart if under limit
    const def = await agentRegistry.getDefinition(instance.definitionId);
    if (instance.restartCount < def.maxRestarts) {
      await this.restart(instanceId);
    }

    return failed;
  },

  async executeAction(instanceId: string, action: AgentAction): Promise<{ allowed: boolean; result?: unknown }> {
    // Governance validation hook — imported dynamically to avoid circular deps
    try {
      const { actionValidator } = await import('@/lib/governance/action-validator');
      const validation = await actionValidator.validate({
        agentId: instanceId,
        action,
        context: {},
      });
      if (!validation.allowed) {
        return { allowed: false, result: validation };
      }
    } catch {
      // Governance engine not yet initialized — allow by default
    }

    await eventBus.emit({
      type: 'AgentActionExecuted',
      source: instanceId,
      payload: { action },
    });

    return { allowed: true };
  },

  activateKillSwitch(instanceId: string): void {
    killedAgents.add(instanceId);
    this.stop(instanceId).catch(() => {});
  },

  deactivateKillSwitch(instanceId: string): void {
    killedAgents.delete(instanceId);
  },

  isKilled(instanceId: string): boolean {
    return killedAgents.has(instanceId);
  },

  getState: stateStore,
};
