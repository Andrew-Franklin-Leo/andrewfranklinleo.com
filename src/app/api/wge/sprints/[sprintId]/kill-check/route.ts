import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sprintId: string }> }) {
  try {
    const { sprintId } = await params;
    const result = await sprintEngine.checkKillConditions(sprintId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
