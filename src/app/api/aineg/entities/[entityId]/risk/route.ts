import { NextRequest, NextResponse } from 'next/server';
import { portfolioGovernor } from '@/lib/aineg';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const { entityId } = await params;
    const risk = await portfolioGovernor.assessEntityRisk(entityId);
    return NextResponse.json(risk);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
