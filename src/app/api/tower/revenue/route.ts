import { NextResponse } from 'next/server';
import { revenueMonitor } from '@/lib/tower';

export async function GET() {
  try {
    const dashboard = await revenueMonitor.getDashboard();
    return NextResponse.json(dashboard);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
