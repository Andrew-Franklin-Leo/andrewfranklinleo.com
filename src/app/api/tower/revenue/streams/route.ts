import { NextResponse } from 'next/server';
import { revenueMonitor } from '@/lib/tower';

export async function GET() {
  try {
    const streams = await revenueMonitor.getStreams();
    return NextResponse.json({ streams });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
