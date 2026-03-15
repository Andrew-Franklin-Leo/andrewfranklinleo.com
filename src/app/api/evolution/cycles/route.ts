import { NextRequest, NextResponse } from 'next/server';
import { evolutionLoop } from '@/lib/evolution';

// GET: list recent cycles
export async function GET() {
  try {
    const dashboard = await evolutionLoop.getDashboard();
    return NextResponse.json({ cycles: dashboard.recentCycles });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST: trigger a new evolution cycle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const trigger = body.trigger ?? 'manual';
    const config = body.config ?? {};
    const cycle = await evolutionLoop.runCycle(trigger, config);
    return NextResponse.json(cycle, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
