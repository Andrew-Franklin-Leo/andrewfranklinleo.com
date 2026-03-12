import { NextRequest, NextResponse } from 'next/server';
import { killSwitch } from '@/lib/governance';

export async function GET() {
  try {
    const active = await killSwitch.getActive();
    return NextResponse.json({ active, count: active.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { targetType, targetId, reason, activatedBy, scope } = await req.json();
    if (!targetType || !targetId || !reason || !activatedBy) {
      return NextResponse.json({ error: 'targetType, targetId, reason, activatedBy required' }, { status: 400 });
    }
    const activation = await killSwitch.activate({
      targetType,
      targetId,
      reason,
      activatedBy,
      scope: scope ?? 'shutdown',
    });
    return NextResponse.json(activation, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
