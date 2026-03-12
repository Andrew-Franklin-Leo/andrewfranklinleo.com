import { NextRequest, NextResponse } from 'next/server';
import { enterpriseFactory } from '@/lib/ainef';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ enterpriseId: string }> }) {
  try {
    const { enterpriseId } = await params;
    const enterprise = await enterpriseFactory.get(enterpriseId);
    if (!enterprise) return NextResponse.json({ error: 'Enterprise not found' }, { status: 404 });
    return NextResponse.json(enterprise);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
