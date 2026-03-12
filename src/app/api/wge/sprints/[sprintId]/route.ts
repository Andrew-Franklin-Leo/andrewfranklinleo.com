import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sprintId: string }> }) {
  try {
    const { sprintId } = await params;
    const sprint = await sprintEngine.get(sprintId);
    if (!sprint) return NextResponse.json({ error: 'Sprint not found' }, { status: 404 });
    return NextResponse.json(sprint);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ sprintId: string }> }) {
  try {
    const { sprintId } = await params;
    const { action, scope, metric, value } = await req.json();
    if (action === 'scope') return NextResponse.json(await sprintEngine.scope(sprintId, scope));
    if (action === 'approve') return NextResponse.json(await sprintEngine.approve(sprintId));
    if (action === 'activate') return NextResponse.json(await sprintEngine.activate(sprintId));
    if (action === 'update_kpi') { await sprintEngine.updateKPI(sprintId, metric, value); return NextResponse.json({ updated: true }); }
    if (action === 'transition') { const { status } = await req.json(); return NextResponse.json(await sprintEngine.transition(sprintId, status)); }
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
