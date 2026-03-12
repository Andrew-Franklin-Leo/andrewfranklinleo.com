import { NextRequest, NextResponse } from 'next/server';
import { enterpriseFactory } from '@/lib/ainef';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const { entityId } = await params;
    const enterprise = await enterpriseFactory.get(entityId);
    if (!enterprise) return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    return NextResponse.json(enterprise);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
