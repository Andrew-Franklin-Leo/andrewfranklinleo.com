import { NextRequest, NextResponse } from 'next/server';
import { ratificationRouter } from '@/lib/governance';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {
  try {
    const { requestId } = await params;
    const { decision, decidedBy, notes } = await req.json();
    if (!decision || !decidedBy) {
      return NextResponse.json({ error: 'decision and decidedBy required' }, { status: 400 });
    }
    const result = await ratificationRouter.decide(requestId, decision, decidedBy, notes);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
