import { NextRequest, NextResponse } from 'next/server';
import { revenueMonitor } from '@/lib/tower';

export async function GET(req: NextRequest) {
  try {
    const months = parseInt(new URL(req.url).searchParams.get('months') ?? '6');
    const forecasts = await revenueMonitor.forecast(months);
    return NextResponse.json({ forecasts });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
