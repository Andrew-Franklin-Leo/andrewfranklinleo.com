import { NextResponse } from 'next/server';
import { ratificationRouter } from '@/lib/governance';

export async function GET() {
  try {
    const pending = await ratificationRouter.listPending();
    return NextResponse.json({ pending, count: pending.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
