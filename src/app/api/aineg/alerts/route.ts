import { NextResponse } from 'next/server';
import { portfolioGovernor } from '@/lib/aineg';

export async function GET() {
  try {
    const recommendations = await portfolioGovernor.getRebalanceRecommendations();
    return NextResponse.json({ recommendations });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
