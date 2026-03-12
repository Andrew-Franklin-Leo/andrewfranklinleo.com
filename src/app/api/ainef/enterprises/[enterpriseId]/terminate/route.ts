import { NextRequest, NextResponse } from 'next/server';
import { enterpriseFactory } from '@/lib/ainef';

export async function POST(req: NextRequest, { params }: { params: Promise<{ enterpriseId: string }> }) {
  try {
    const { enterpriseId } = await params;
    const body = await req.json();
    const sequence = await enterpriseFactory.terminate({
      enterpriseId,
      reason: body.reason ?? 'manual',
      requestedBy: body.requestedBy ?? 'api',
      notes: body.notes,
      gracePeriodMs: body.gracePeriodMs ?? 0,
    });
    return NextResponse.json(sequence);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
