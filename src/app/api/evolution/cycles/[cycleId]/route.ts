import { NextRequest, NextResponse } from 'next/server';
import { evolutionLoop } from '@/lib/evolution';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ cycleId: string }> }) {
  try {
    const { cycleId } = await params;
    const cycle = await evolutionLoop.getCycle(cycleId);
    if (!cycle) return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
    return NextResponse.json(cycle);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
