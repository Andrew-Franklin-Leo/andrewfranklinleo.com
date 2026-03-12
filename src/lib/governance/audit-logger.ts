import { adminDb } from '@/lib/firebase/admin';
import { AuditEntry } from './types';

function generateId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const auditLogger = {
  async log(entry: Omit<AuditEntry, 'id' | 'timestamp' | 'immutable'>): Promise<AuditEntry> {
    const full: AuditEntry = {
      ...entry,
      id: generateId(),
      timestamp: new Date().toISOString(),
      immutable: true,
    };

    // Audit entries are append-only — never update or delete
    await adminDb.collection('governance_audit').doc(full.id).set(full);
    return full;
  },

  async query(options: {
    agentId?: string;
    action?: string;
    result?: 'allowed' | 'denied' | 'ratification_pending';
    since?: string;
    until?: string;
    limit?: number;
  } = {}): Promise<AuditEntry[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('governance_audit')
      .orderBy('timestamp', 'desc')
      .limit(options.limit ?? 100);

    if (options.agentId) query = query.where('agentId', '==', options.agentId);
    if (options.result) query = query.where('result', '==', options.result);
    if (options.since) query = query.where('timestamp', '>=', options.since);

    const snap = await query.get();
    return snap.docs.map(d => d.data() as AuditEntry);
  },

  async getByCorrelation(correlationId: string): Promise<AuditEntry[]> {
    const snap = await adminDb.collection('governance_audit')
      .where('correlationId', '==', correlationId)
      .orderBy('timestamp', 'asc')
      .get();
    return snap.docs.map(d => d.data() as AuditEntry);
  },

  async count(filters: { result?: string; since?: string } = {}): Promise<number> {
    let query: FirebaseFirestore.Query = adminDb.collection('governance_audit');
    if (filters.result) query = query.where('result', '==', filters.result);
    if (filters.since) query = query.where('timestamp', '>=', filters.since);
    const snap = await query.get();
    return snap.size;
  },
};
