import { NextRequest, NextResponse } from 'next/server';
import { eventBus } from '@/lib/agents';

export async function GET(req: NextRequest) {
  try {
    const since = new URL(req.url).searchParams.get('since') ?? new Date(Date.now() - 86400000).toISOString();
    const alertTypes = ['PCIAlert', 'AgentUnhealthy', 'AgentFailed', 'KillSwitchActivated', 'MissionDriftDetected', 'RevenueLeakageDetected', 'PolicyViolation'];

    const events = await eventBus.getEvents({ since, limit: 200 });
    const alerts = events.filter(e => alertTypes.includes(e.type));

    return NextResponse.json({
      alerts,
      count: alerts.length,
      since,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
