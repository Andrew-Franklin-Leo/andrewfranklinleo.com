import { NextRequest, NextResponse } from 'next/server';
import { graphStore } from '@/lib/tower';

export async function POST(req: NextRequest) {
  try {
    const query = await req.json();
    const result = await graphStore.query(query);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = await graphStore.getStats();
    return NextResponse.json(stats);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
