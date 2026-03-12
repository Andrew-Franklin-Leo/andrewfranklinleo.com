import { NextRequest, NextResponse } from 'next/server';
import { graphStore } from '@/lib/tower';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const { entityId } = await params;
    const node = await graphStore.getNode(entityId);
    if (!node) return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    const edges = await graphStore.getEdgesFrom(entityId);
    const inEdges = await graphStore.getEdgesTo(entityId);
    return NextResponse.json({ entity: node, outgoing: edges, incoming: inEdges });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const { entityId } = await params;
    const body = await req.json();
    await graphStore.updateNode(entityId, body);
    const updated = await graphStore.getNode(entityId);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ entityId: string }> }) {
  try {
    const { entityId } = await params;
    await graphStore.deleteNode(entityId);
    return NextResponse.json({ deleted: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
