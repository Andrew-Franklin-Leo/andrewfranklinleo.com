import { NextResponse } from 'next/server';
import { evolutionLoop } from '@/lib/evolution';

export async function GET() {
  try {
    const dashboard = await evolutionLoop.getDashboard();
    return NextResponse.json(dashboard);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
