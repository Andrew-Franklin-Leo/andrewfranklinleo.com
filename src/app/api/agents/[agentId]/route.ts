import { NextRequest, NextResponse } from 'next/server';
import { agentRegistry, agentRuntime } from '@/lib/agents';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const instance = await agentRegistry.getInstance(agentId);
    const def = await agentRegistry.getDefinition(instance.definitionId);
    return NextResponse.json({ instance, definition: def });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 404 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const body = await req.json();
    await agentRegistry.updateInstance(agentId, body);
    const updated = await agentRegistry.getInstance(agentId);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const retired = await agentRuntime.retire(agentId);
    return NextResponse.json(retired);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
