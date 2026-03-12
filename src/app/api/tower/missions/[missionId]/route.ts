import { NextRequest, NextResponse } from 'next/server';
import { missionManager } from '@/lib/tower';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ missionId: string }> }) {
  try {
    const { missionId } = await params;
    const mission = await missionManager.get(missionId);
    if (!mission) return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    return NextResponse.json(mission);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ missionId: string }> }) {
  try {
    const { missionId } = await params;
    const body = await req.json();
    if (body.status) {
      await missionManager.transition(missionId, body.status);
    } else {
      await missionManager.update(missionId, body);
    }
    const updated = await missionManager.get(missionId);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
