import { NextRequest, NextResponse } from 'next/server';
import { missionManager } from '@/lib/tower';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ missionId: string }> }) {
  try {
    const { missionId } = await params;
    const progress = await missionManager.calculateProgress(missionId);
    return NextResponse.json(progress);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
