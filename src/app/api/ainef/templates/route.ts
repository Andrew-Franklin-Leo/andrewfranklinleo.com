import { NextResponse } from 'next/server';
import { ENTERPRISE_TEMPLATES } from '@/lib/ainef';

export async function GET() {
  return NextResponse.json({ templates: ENTERPRISE_TEMPLATES });
}
