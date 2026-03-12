import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function POST(req: NextRequest) {
  try {
    const { sprintId, annualValue, licenseType, action, offerId } = await req.json();
    if (action === 'accept' && offerId) {
      const offer = await sprintEngine.acceptExpansion(offerId);
      return NextResponse.json(offer);
    }
    if (!sprintId || !annualValue) return NextResponse.json({ error: 'sprintId and annualValue required' }, { status: 400 });
    const offer = await sprintEngine.proposeExpansion(sprintId, annualValue, licenseType);
    return NextResponse.json(offer, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
