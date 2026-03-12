import { NextRequest, NextResponse } from 'next/server';
import { graphStore } from '@/lib/tower';

export async function POST(req: NextRequest) {
  try {
    const { type, sourceNodeId, targetNodeId, properties, weight, confidence } = await req.json();
    if (!type || !sourceNodeId || !targetNodeId) {
      return NextResponse.json({ error: 'type, sourceNodeId, targetNodeId required' }, { status: 400 });
    }
    const edge = await graphStore.addEdge({
      type,
      sourceNodeId,
      targetNodeId,
      properties: properties ?? {},
      weight: weight ?? 1.0,
      confidence: confidence ?? 1.0,
    });
    return NextResponse.json(edge, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
