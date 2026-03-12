import { NextResponse } from 'next/server';
import { healthMonitor } from '@/lib/agents';

export async function GET() {
  try {
    const reports = await healthMonitor.getAllReports();
    const healthy = reports.filter(r => r.healthy).length;
    const unhealthy = reports.filter(r => !r.healthy).length;
    return NextResponse.json({
      status: unhealthy === 0 ? 'healthy' : 'degraded',
      totalAgents: reports.length,
      healthy,
      unhealthy,
      reports,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
