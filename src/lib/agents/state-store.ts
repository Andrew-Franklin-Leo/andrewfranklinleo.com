import { adminDb } from '@/lib/firebase/admin';

export const stateStore = {
  async get(agentId: string, key: string): Promise<unknown> {
    const doc = await adminDb.collection('agent_instances').doc(agentId)
      .collection('state').doc(key).get();
    return doc.exists ? doc.data()?.value : undefined;
  },

  async set(agentId: string, key: string, value: unknown): Promise<void> {
    await adminDb.collection('agent_instances').doc(agentId)
      .collection('state').doc(key).set({ value, updatedAt: new Date().toISOString() });
  },

  async getAll(agentId: string): Promise<Record<string, unknown>> {
    const snap = await adminDb.collection('agent_instances').doc(agentId)
      .collection('state').get();
    const state: Record<string, unknown> = {};
    snap.docs.forEach(d => { state[d.id] = d.data().value; });
    return state;
  },

  async delete(agentId: string, key: string): Promise<void> {
    await adminDb.collection('agent_instances').doc(agentId)
      .collection('state').doc(key).delete();
  },

  async clear(agentId: string): Promise<void> {
    const snap = await adminDb.collection('agent_instances').doc(agentId)
      .collection('state').get();
    const batch = adminDb.batch();
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
  },
};
