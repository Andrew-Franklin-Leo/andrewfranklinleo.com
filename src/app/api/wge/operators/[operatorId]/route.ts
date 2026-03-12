import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ operatorId: string }> }) {
  try {
    const { operatorId } = await params;
    const op = await sprintEngine.getOperator(operatorId);
    if (!op) return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
    return NextResponse.json(op);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
