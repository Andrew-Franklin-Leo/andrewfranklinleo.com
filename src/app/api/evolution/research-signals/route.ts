import { NextRequest, NextResponse } from 'next/server';
import { evolutionLoop } from '@/lib/evolution';

// POST: ingest a research signal and trigger evolution
export async function POST(req: NextRequest) {
  try {
    const signal = await req.json();
    if (!signal.id || !signal.source || !signal.title) {
      return NextResponse.json({ error: 'id, source, and title required' }, { status: 400 });
    }
    const cycle = await evolutionLoop.processResearchSignal({
      ...signal,
      processedAt: null,
      createdAt: signal.createdAt ?? new Date().toISOString(),
    });
    return NextResponse.json(cycle, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
