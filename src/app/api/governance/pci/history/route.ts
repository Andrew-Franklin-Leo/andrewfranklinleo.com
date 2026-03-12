import { NextRequest, NextResponse } from 'next/server';
import { pciMonitor } from '@/lib/governance';

export async function GET(req: NextRequest) {
  try {
    const entityId = new URL(req.url).searchParams.get('entityId');
    if (!entityId) return NextResponse.json({ error: 'entityId required' }, { status: 400 });
    const history = await pciMonitor.getHistory(entityId);
    return NextResponse.json({ history });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
