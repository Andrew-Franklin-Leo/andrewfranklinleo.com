import { adminDb } from '@/lib/firebase/admin';
import { AgentDefinition, AgentInstance, AgentStatus } from './types';
import { AgentNotFoundError } from './errors';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const agentRegistry = {
  // --- Definitions ---

  async createDefinition(def: Omit<AgentDefinition, 'id' | 'createdAt' | 'updatedAt'>): Promise<AgentDefinition> {
    const now = new Date().toISOString();
    const full: AgentDefinition = {
      ...def,
      id: generateId('def'),
      createdAt: now,
      updatedAt: now,
    };
    await adminDb.collection('agent_definitions').doc(full.id).set(full);
    return full;
  },

  async getDefinition(id: string): Promise<AgentDefinition> {
    const doc = await adminDb.collection('agent_definitions').doc(id).get();
    if (!doc.exists) throw new AgentNotFoundError(id);
    return doc.data() as AgentDefinition;
  },

  async listDefinitions(): Promise<AgentDefinition[]> {
    const snap = await adminDb.collection('agent_definitions').orderBy('createdAt', 'desc').get();
    return snap.docs.map(d => d.data() as AgentDefinition);
  },

  // --- Instances ---

  async createInstance(definitionId: string): Promise<AgentInstance> {
    await this.getDefinition(definitionId); // validate exists
    const instance: AgentInstance = {
      id: generateId('agent'),
      definitionId,
      status: 'created',
      startedAt: null,
      stoppedAt: null,
      lastHeartbeat: null,
      restartCount: 0,
      consecutiveFailures: 0,
      metadata: {},
    };
    await adminDb.collection('agent_instances').doc(instance.id).set(instance);
    return instance;
  },

  async getInstance(id: string): Promise<AgentInstance> {
    const doc = await adminDb.collection('agent_instances').doc(id).get();
    if (!doc.exists) throw new AgentNotFoundError(id);
    return doc.data() as AgentInstance;
  },

  async updateInstance(id: string, updates: Partial<AgentInstance>): Promise<void> {
    await adminDb.collection('agent_instances').doc(id).update(updates);
  },

  async listInstances(filters: { status?: AgentStatus; engine?: string } = {}): Promise<AgentInstance[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('agent_instances')
      .orderBy('startedAt', 'desc');

    if (filters.status) query = query.where('status', '==', filters.status);

    const snap = await query.limit(200).get();
    return snap.docs.map(d => d.data() as AgentInstance);
  },

  async getRunningCount(): Promise<number> {
    const snap = await adminDb.collection('agent_instances')
      .where('status', '==', 'running').get();
    return snap.size;
  },
};
