import { NextRequest, NextResponse } from 'next/server';
import { messageQueue } from '@/lib/agents';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const messages = await messageQueue.getInbox(agentId);
    return NextResponse.json({ messages });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const { from, type, payload } = await req.json();
    if (!from || !type) return NextResponse.json({ error: 'from and type required' }, { status: 400 });
    const msg = await messageQueue.send(from, agentId, type, payload ?? {});
    return NextResponse.json(msg, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
