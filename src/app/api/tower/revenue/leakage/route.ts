import { NextResponse } from 'next/server';
import { revenueMonitor } from '@/lib/tower';

export async function GET() {
  try {
    const leakage = await revenueMonitor.detectLeakage();
    return NextResponse.json({
      leakage,
      count: leakage.length,
      totalEstimatedLoss: leakage.reduce((s, l) => s + l.estimatedLoss, 0),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
