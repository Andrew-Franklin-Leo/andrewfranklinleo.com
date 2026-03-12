import { NextRequest, NextResponse } from 'next/server';
import { enterpriseFactory } from '@/lib/ainef';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ enterpriseId: string }> }) {
  try {
    const { enterpriseId } = await params;
    const health = await enterpriseFactory.assessHealth(enterpriseId);
    return NextResponse.json(health);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
