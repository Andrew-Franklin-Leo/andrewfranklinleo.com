import { NextRequest, NextResponse } from 'next/server';
import { portfolioGovernor } from '@/lib/aineg';

export async function GET(req: NextRequest) {
  try {
    const status = new URL(req.url).searchParams.get('status') as 'proposed' | 'approved' | 'rejected' | 'executed' | undefined;
    const decisions = await portfolioGovernor.listKillDecisions(status ?? undefined);
    return NextResponse.json({ decisions });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.enterpriseId || !body.reason || !body.severity || !body.proposedBy) {
      return NextResponse.json({ error: 'enterpriseId, reason, severity, and proposedBy required' }, { status: 400 });
    }
    const decision = await portfolioGovernor.proposeKill({
      enterpriseId: body.enterpriseId,
      reason: body.reason,
      evidence: body.evidence ?? [],
      severity: body.severity,
      proposedBy: body.proposedBy,
    });
    return NextResponse.json(decision, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
