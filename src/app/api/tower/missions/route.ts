import { NextRequest, NextResponse } from 'next/server';
import { missionManager } from '@/lib/tower';

export async function GET(req: NextRequest) {
  try {
    const status = new URL(req.url).searchParams.get('status') as Parameters<typeof missionManager.list>[0];
    const missions = await missionManager.list(status ?? undefined);
    return NextResponse.json({ missions });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, objectives, kpis, owner, budget, startDate, targetDate, killConditions } = body;
    if (!name || !owner) return NextResponse.json({ error: 'name and owner required' }, { status: 400 });
    const mission = await missionManager.create({
      name,
      description: description ?? '',
      status: 'proposed',
      objectives: objectives ?? [],
      kpis: kpis ?? [],
      owner,
      budget: budget ?? 0,
      startDate: startDate ?? new Date().toISOString(),
      targetDate: targetDate ?? '',
      killConditions: killConditions ?? [],
    });
    return NextResponse.json(mission, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
