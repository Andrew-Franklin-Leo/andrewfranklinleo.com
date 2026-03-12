import { adminDb } from '@/lib/firebase/admin';
import { AgentEvent } from './types';

type EventHandler = (event: AgentEvent) => void | Promise<void>;

const handlers = new Map<string, Set<EventHandler>>();
const wildcardHandlers = new Set<EventHandler>();

function generateId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const eventBus = {
  subscribe(eventType: string, handler: EventHandler): () => void {
    if (!handlers.has(eventType)) handlers.set(eventType, new Set());
    handlers.get(eventType)!.add(handler);
    return () => handlers.get(eventType)?.delete(handler);
  },

  subscribeAll(handler: EventHandler): () => void {
    wildcardHandlers.add(handler);
    return () => wildcardHandlers.delete(handler);
  },

  async emit(event: Omit<AgentEvent, 'id' | 'timestamp'>): Promise<AgentEvent> {
    const full: AgentEvent = {
      ...event,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };

    // Persist to Firestore for cross-service consumption
    try {
      await adminDb.collection('agent_events').doc(full.id).set(full);
    } catch {
      // Continue even if persistence fails — in-process delivery still works
    }

    // In-process delivery
    const typeHandlers = handlers.get(full.type);
    if (typeHandlers) {
      for (const h of typeHandlers) {
        try { await h(full); } catch (err) {
          console.error(`[EventBus] Handler error for ${full.type}:`, err);
        }
      }
    }
    for (const h of wildcardHandlers) {
      try { await h(full); } catch (err) {
        console.error(`[EventBus] Wildcard handler error:`, err);
      }
    }

    return full;
  },

  async getEvents(options: {
    type?: string;
    source?: string;
    since?: string;
    limit?: number;
  } = {}): Promise<AgentEvent[]> {
    let query = adminDb.collection('agent_events')
      .orderBy('timestamp', 'desc')
      .limit(options.limit ?? 100);

    if (options.type) query = query.where('type', '==', options.type);
    if (options.source) query = query.where('source', '==', options.source);
    if (options.since) query = query.where('timestamp', '>=', options.since);

    const snap = await query.get();
    return snap.docs.map(d => d.data() as AgentEvent);
  },
};
