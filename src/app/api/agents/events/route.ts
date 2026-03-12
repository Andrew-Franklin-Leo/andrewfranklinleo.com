import { NextRequest, NextResponse } from 'next/server';
import { eventBus } from '@/lib/agents';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const events = await eventBus.getEvents({
      type: searchParams.get('type') ?? undefined,
      source: searchParams.get('source') ?? undefined,
      since: searchParams.get('since') ?? undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
    });
    return NextResponse.json({ events });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { type, source, payload, correlationId } = await req.json();
    if (!type || !source) return NextResponse.json({ error: 'type and source required' }, { status: 400 });
    const event = await eventBus.emit({ type, source, payload: payload ?? {}, correlationId });
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
