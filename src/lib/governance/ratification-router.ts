import { adminDb } from '@/lib/firebase/admin';
import { RatificationRequest, RatificationStatus } from './types';
import { eventBus } from '@/lib/agents/event-bus';

function generateId(): string {
  return `rat_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const DEFAULT_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const ratificationRouter = {
  async create(params: {
    agentId: string;
    action: string;
    reason: string;
    severity: 'high' | 'critical';
    expiryMs?: number;
  }): Promise<RatificationRequest> {
    const now = new Date();
    const req: RatificationRequest = {
      id: generateId(),
      agentId: params.agentId,
      action: params.action,
      reason: params.reason,
      severity: params.severity,
      status: 'pending',
      requestedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + (params.expiryMs ?? DEFAULT_EXPIRY_MS)).toISOString(),
    };

    await adminDb.collection('governance_ratifications').doc(req.id).set(req);

    await eventBus.emit({
      type: 'RatificationRequested',
      source: 'eagl-governance',
      payload: { ratificationId: req.id, agentId: params.agentId, action: params.action, severity: params.severity },
    });

    return req;
  },

  async decide(id: string, decision: 'approved' | 'rejected', decidedBy: string, notes?: string): Promise<RatificationRequest> {
    const doc = await adminDb.collection('governance_ratifications').doc(id).get();
    if (!doc.exists) throw new Error(`Ratification not found: ${id}`);

    const req = doc.data() as RatificationRequest;
    if (req.status !== 'pending') throw new Error(`Ratification ${id} already decided: ${req.status}`);

    const updated: Partial<RatificationRequest> = {
      status: decision === 'approved' ? 'approved' : 'rejected',
      decidedAt: new Date().toISOString(),
      decidedBy,
      decision,
      notes,
    };

    await adminDb.collection('governance_ratifications').doc(id).update(updated);

    await eventBus.emit({
      type: decision === 'approved' ? 'RatificationApproved' : 'RatificationRejected',
      source: 'eagl-governance',
      payload: { ratificationId: id, agentId: req.agentId, action: req.action, decidedBy },
    });

    return { ...req, ...updated } as RatificationRequest;
  },

  async listPending(): Promise<RatificationRequest[]> {
    const snap = await adminDb.collection('governance_ratifications')
      .where('status', '==', 'pending')
      .orderBy('requestedAt', 'desc')
      .get();
    return snap.docs.map(d => d.data() as RatificationRequest);
  },

  async expireStale(): Promise<number> {
    const now = new Date().toISOString();
    const snap = await adminDb.collection('governance_ratifications')
      .where('status', '==', 'pending')
      .where('expiresAt', '<', now)
      .get();

    const batch = adminDb.batch();
    snap.docs.forEach(d => {
      batch.update(d.ref, { status: 'expired' as RatificationStatus });
    });
    await batch.commit();

    return snap.size;
  },
};
