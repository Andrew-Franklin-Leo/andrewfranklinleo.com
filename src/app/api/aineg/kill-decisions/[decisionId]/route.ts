import { NextRequest, NextResponse } from 'next/server';
import { portfolioGovernor } from '@/lib/aineg';

export async function POST(req: NextRequest, { params }: { params: Promise<{ decisionId: string }> }) {
  try {
    const { decisionId } = await params;
    const body = await req.json();
    if (!body.decision || !body.reviewedBy) {
      return NextResponse.json({ error: 'decision (approved|rejected) and reviewedBy required' }, { status: 400 });
    }
    const result = await portfolioGovernor.reviewKill(decisionId, body.decision, body.reviewedBy, body.notes);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
