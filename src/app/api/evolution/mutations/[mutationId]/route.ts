import { NextRequest, NextResponse } from 'next/server';
import { mutationEngine } from '@/lib/evolution';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ mutationId: string }> }) {
  try {
    const { mutationId } = await params;
    const mutation = await mutationEngine.getMutation(mutationId);
    if (!mutation) return NextResponse.json({ error: 'Mutation not found' }, { status: 404 });
    return NextResponse.json(mutation);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST: rollback a mutation
export async function POST(req: NextRequest, { params }: { params: Promise<{ mutationId: string }> }) {
  try {
    const { mutationId } = await params;
    const body = await req.json();
    if (body.action === 'rollback') {
      await mutationEngine.rollback(mutationId);
      return NextResponse.json({ status: 'rolled_back' });
    }
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
