import { NextRequest, NextResponse } from 'next/server';
import { policyEngine } from '@/lib/governance';

export async function GET() {
  try {
    const policies = await policyEngine.list(false);
    return NextResponse.json({ policies });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, scope, scopeTarget, conditions, effect, priority, active } = body;
    if (!name || !scope || !effect) {
      return NextResponse.json({ error: 'name, scope, and effect are required' }, { status: 400 });
    }
    const policy = await policyEngine.create({
      name,
      description: description ?? '',
      scope,
      scopeTarget,
      conditions: conditions ?? [],
      effect,
      priority: priority ?? 0,
      active: active ?? true,
    });
    return NextResponse.json(policy, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
