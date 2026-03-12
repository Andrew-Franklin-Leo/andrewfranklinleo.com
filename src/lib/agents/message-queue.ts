import { adminDb } from '@/lib/firebase/admin';
import { AgentMessage } from './types';

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const messageQueue = {
  async send(from: string, to: string, type: string, payload: Record<string, unknown>): Promise<AgentMessage> {
    const msg: AgentMessage = {
      id: generateId(),
      from,
      to,
      type,
      payload,
      timestamp: new Date().toISOString(),
      acknowledged: false,
    };
    await adminDb.collection('agent_messages').doc(msg.id).set(msg);
    return msg;
  },

  async getInbox(agentId: string, options: { unreadOnly?: boolean; limit?: number } = {}): Promise<AgentMessage[]> {
    let query = adminDb.collection('agent_messages')
      .where('to', '==', agentId)
      .orderBy('timestamp', 'desc')
      .limit(options.limit ?? 50);

    if (options.unreadOnly) {
      query = query.where('acknowledged', '==', false);
    }

    const snap = await query.get();
    return snap.docs.map(d => d.data() as AgentMessage);
  },

  async getSent(agentId: string, limit = 50): Promise<AgentMessage[]> {
    const snap = await adminDb.collection('agent_messages')
      .where('from', '==', agentId)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map(d => d.data() as AgentMessage);
  },

  async acknowledge(messageId: string): Promise<void> {
    await adminDb.collection('agent_messages').doc(messageId).update({
      acknowledged: true,
    });
  },
};
