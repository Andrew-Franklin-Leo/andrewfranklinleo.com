import { NextRequest, NextResponse } from 'next/server';
import { graphStore } from '@/lib/tower';

export async function GET(req: NextRequest) {
  try {
    const type = new URL(req.url).searchParams.get('type') as Parameters<typeof graphStore.findNodes>[0];
    const nodes = await graphStore.findNodes(type ?? undefined);
    return NextResponse.json({ entities: nodes });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, properties, confidence, source } = body;
    if (!type || !name) return NextResponse.json({ error: 'type and name required' }, { status: 400 });
    const node = await graphStore.addNode({
      type,
      name,
      properties: properties ?? {},
      confidence: confidence ?? 1.0,
      source: source ?? 'api',
    });
    return NextResponse.json(node, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
