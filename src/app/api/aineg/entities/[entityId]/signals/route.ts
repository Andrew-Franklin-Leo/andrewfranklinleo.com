import { NextRequest, NextResponse } from 'next/server';
import { portfolioGovernor } from '@/lib/aineg';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const { entityId } = await params;
    const signals = await portfolioGovernor.getSignals(entityId);
    return NextResponse.json({ signals });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const { entityId } = await params;
    const body = await req.json();
    const signal = await portfolioGovernor.emitSignal({
      enterpriseId: entityId,
      type: body.type,
      severity: body.severity,
      source: body.source ?? 'api',
      title: body.title,
      description: body.description,
      data: body.data ?? {},
    });
    return NextResponse.json(signal, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
