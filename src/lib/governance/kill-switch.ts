import { adminDb } from '@/lib/firebase/admin';
import { KillSwitchActivation, KillSwitchScope } from './types';
import { agentRuntime } from '@/lib/agents/agent-runtime';
import { eventBus } from '@/lib/agents/event-bus';
import { auditLogger } from './audit-logger';

function generateId(): string {
  return `kill_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const killSwitch = {
  async activate(params: {
    targetType: 'agent' | 'engine' | 'system';
    targetId: string;
    reason: string;
    activatedBy: string;
    scope: KillSwitchScope;
  }): Promise<KillSwitchActivation> {
    const activation: KillSwitchActivation = {
      id: generateId(),
      ...params,
      activatedAt: new Date().toISOString(),
      active: true,
    };

    await adminDb.collection('governance_kill_switch').doc(activation.id).set(activation);

    // Execute the kill
    if (params.targetType === 'agent') {
      agentRuntime.activateKillSwitch(params.targetId);
    } else if (params.targetType === 'engine') {
      // Stop all agents belonging to this engine
      const snap = await adminDb.collection('agent_instances')
        .where('status', '==', 'running')
        .get();
      for (const doc of snap.docs) {
        const instance = doc.data();
        const defDoc = await adminDb.collection('agent_definitions').doc(instance.definitionId).get();
        if (defDoc.data()?.engine === params.targetId) {
          agentRuntime.activateKillSwitch(instance.id);
        }
      }
    } else if (params.targetType === 'system') {
      // Emergency: stop everything
      const snap = await adminDb.collection('agent_instances')
        .where('status', '==', 'running')
        .get();
      for (const doc of snap.docs) {
        agentRuntime.activateKillSwitch(doc.id);
      }
    }

    await eventBus.emit({
      type: 'KillSwitchActivated',
      source: 'eagl-governance',
      payload: { ...params, activationId: activation.id },
    });

    await auditLogger.log({
      agentId: params.activatedBy,
      action: 'kill_switch_activate',
      target: params.targetId,
      result: 'allowed',
      matchedPolicies: [],
      correlationId: activation.id,
    });

    return activation;
  },

  async deactivate(activationId: string, deactivatedBy: string): Promise<void> {
    const doc = await adminDb.collection('governance_kill_switch').doc(activationId).get();
    if (!doc.exists) throw new Error(`Kill switch activation not found: ${activationId}`);

    const activation = doc.data() as KillSwitchActivation;
    await adminDb.collection('governance_kill_switch').doc(activationId).update({ active: false });

    if (activation.targetType === 'agent') {
      agentRuntime.deactivateKillSwitch(activation.targetId);
    }

    await eventBus.emit({
      type: 'KillSwitchDeactivated',
      source: 'eagl-governance',
      payload: { activationId, targetId: activation.targetId, deactivatedBy },
    });
  },

  async getActive(): Promise<KillSwitchActivation[]> {
    const snap = await adminDb.collection('governance_kill_switch')
      .where('active', '==', true)
      .orderBy('activatedAt', 'desc')
      .get();
    return snap.docs.map(d => d.data() as KillSwitchActivation);
  },

  async getHistory(limit = 50): Promise<KillSwitchActivation[]> {
    const snap = await adminDb.collection('governance_kill_switch')
      .orderBy('activatedAt', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map(d => d.data() as KillSwitchActivation);
  },
};
