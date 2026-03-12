import { NextRequest, NextResponse } from 'next/server';
import { pciMonitor } from '@/lib/governance';

export async function GET(req: NextRequest) {
  try {
    const entityId = new URL(req.url).searchParams.get('entityId');
    if (entityId) {
      const score = await pciMonitor.getScore(entityId);
      if (!score) return NextResponse.json({ error: 'No PCI score' }, { status: 404 });
      return NextResponse.json(score);
    }
    const scores = await pciMonitor.calculateAll();
    return NextResponse.json({ scores });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
