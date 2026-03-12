import { NextResponse } from 'next/server';
import { enterpriseFactory } from '@/lib/ainef';

export async function GET() {
  try {
    const dashboard = await enterpriseFactory.getDashboard();
    return NextResponse.json(dashboard);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
