import { adminDb } from '@/lib/firebase/admin';
import { AgentInstance, AgentHealthReport } from './types';
import { agentRuntime } from './agent-runtime';
import { eventBus } from './event-bus';

const HEARTBEAT_TIMEOUT_MULTIPLIER = 3;
let monitorInterval: ReturnType<typeof setInterval> | null = null;

async function checkHealth(): Promise<AgentHealthReport[]> {
  const snap = await adminDb.collection('agent_instances')
    .where('status', '==', 'running')
    .get();

  const reports: AgentHealthReport[] = [];
  const now = Date.now();

  for (const doc of snap.docs) {
    const instance = doc.data() as AgentInstance;
    const def = await adminDb.collection('agent_definitions').doc(instance.definitionId).get();
    const heartbeatInterval = def.data()?.heartbeatIntervalMs ?? 30000;
    const threshold = heartbeatInterval * HEARTBEAT_TIMEOUT_MULTIPLIER;

    const lastBeat = instance.lastHeartbeat ? new Date(instance.lastHeartbeat).getTime() : 0;
    const elapsed = now - lastBeat;
    const healthy = elapsed < threshold;

    const report: AgentHealthReport = {
      agentId: instance.id,
      status: instance.status,
      lastHeartbeat: instance.lastHeartbeat ?? 'never',
      uptimeMs: instance.startedAt ? now - new Date(instance.startedAt).getTime() : 0,
      taskCount: 0,
      errorCount: instance.consecutiveFailures,
      healthy,
    };

    reports.push(report);

    // Write health snapshot
    await adminDb.collection('agent_health').doc(instance.id).set(report);

    if (!healthy) {
      await eventBus.emit({
        type: 'AgentUnhealthy',
        source: 'health-monitor',
        payload: { agentId: instance.id, elapsed, threshold },
      });

      // Auto-restart unhealthy agents
      try {
        await agentRuntime.fail(instance.id, `Heartbeat timeout: ${elapsed}ms > ${threshold}ms`);
      } catch {
        // Agent may have already been stopped
      }
    }
  }

  return reports;
}

export const healthMonitor = {
  start(intervalMs = 60000): void {
    if (monitorInterval) return;
    monitorInterval = setInterval(() => {
      checkHealth().catch(err => console.error('[HealthMonitor] Check failed:', err));
    }, intervalMs);
    console.log(`[HealthMonitor] Started (interval: ${intervalMs}ms)`);
  },

  stop(): void {
    if (monitorInterval) {
      clearInterval(monitorInterval);
      monitorInterval = null;
      console.log('[HealthMonitor] Stopped');
    }
  },

  checkNow: checkHealth,

  async getReport(agentId: string): Promise<AgentHealthReport | null> {
    const doc = await adminDb.collection('agent_health').doc(agentId).get();
    return doc.exists ? (doc.data() as AgentHealthReport) : null;
  },

  async getAllReports(): Promise<AgentHealthReport[]> {
    const snap = await adminDb.collection('agent_health').get();
    return snap.docs.map(d => d.data() as AgentHealthReport);
  },
};
