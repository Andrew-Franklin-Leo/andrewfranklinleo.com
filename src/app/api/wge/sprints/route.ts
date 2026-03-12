import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') ?? undefined;
    const type = searchParams.get('type') ?? undefined;
    const sprints = await sprintEngine.list({ status, type } as never);
    return NextResponse.json({ sprints });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
