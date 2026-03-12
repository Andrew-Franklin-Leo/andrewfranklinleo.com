import { NextRequest, NextResponse } from 'next/server';
import { healthMonitor } from '@/lib/agents';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const report = await healthMonitor.getReport(agentId);
    if (!report) return NextResponse.json({ error: 'No health report' }, { status: 404 });
    return NextResponse.json(report);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
