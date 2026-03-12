import { NextRequest, NextResponse } from 'next/server';
import { missionManager } from '@/lib/tower';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ missionId: string }> }) {
  try {
    const { missionId } = await params;
    const report = await missionManager.detectDrift(missionId);
    return NextResponse.json(report);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
