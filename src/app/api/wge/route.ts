import { NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET() {
  try {
    const dashboard = await sprintEngine.getDashboard();
    return NextResponse.json(dashboard);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
