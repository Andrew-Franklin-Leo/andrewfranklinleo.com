import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sprintId: string }> }) {
  try {
    const { sprintId } = await params;
    const report = await sprintEngine.getReport(sprintId);
    return NextResponse.json(report);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
