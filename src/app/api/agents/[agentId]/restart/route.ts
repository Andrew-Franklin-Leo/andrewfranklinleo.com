import { NextRequest, NextResponse } from 'next/server';
import { agentRuntime } from '@/lib/agents';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const instance = await agentRuntime.restart(agentId);
    return NextResponse.json(instance);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
