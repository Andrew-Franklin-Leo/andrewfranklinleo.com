import { NextResponse } from 'next/server';
import { portfolioGovernor } from '@/lib/aineg';

export async function GET() {
  try {
    const summary = await portfolioGovernor.getSummary();
    return NextResponse.json(summary);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
