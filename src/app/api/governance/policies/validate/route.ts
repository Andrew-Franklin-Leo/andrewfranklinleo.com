import { NextRequest, NextResponse } from 'next/server';
import { actionValidator } from '@/lib/governance';

export async function POST(req: NextRequest) {
  try {
    const { agentId, action, context } = await req.json();
    if (!agentId || !action) {
      return NextResponse.json({ error: 'agentId and action required' }, { status: 400 });
    }
    const result = await actionValidator.validate({ agentId, action, context: context ?? {} });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
