import { NextRequest, NextResponse } from 'next/server';
import { policyEngine } from '@/lib/governance';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ policyId: string }> }) {
  try {
    const { policyId } = await params;
    const policy = await policyEngine.get(policyId);
    if (!policy) return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
    return NextResponse.json(policy);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ policyId: string }> }) {
  try {
    const { policyId } = await params;
    const body = await req.json();
    await policyEngine.update(policyId, body);
    const updated = await policyEngine.get(policyId);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ policyId: string }> }) {
  try {
    const { policyId } = await params;
    await policyEngine.delete(policyId);
    return NextResponse.json({ deleted: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
