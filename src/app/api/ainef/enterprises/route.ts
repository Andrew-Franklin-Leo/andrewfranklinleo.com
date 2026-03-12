import { NextRequest, NextResponse } from 'next/server';
import { enterpriseFactory } from '@/lib/ainef';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status') as 'running' | 'degraded' | 'terminated' | undefined;
    const vertical = url.searchParams.get('vertical') as string | undefined;
    const enterprises = await enterpriseFactory.list({
      status: status ?? undefined,
      vertical: vertical as never,
    });
    return NextResponse.json({ enterprises });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.vertical || !body.clientId || !body.clientName || !body.name || !body.capitalAllocated) {
      return NextResponse.json({ error: 'vertical, clientId, clientName, name, and capitalAllocated required' }, { status: 400 });
    }
    const enterprise = await enterpriseFactory.instantiate({
      templateId: body.templateId,
      vertical: body.vertical,
      clientId: body.clientId,
      clientName: body.clientName,
      name: body.name,
      capitalAllocated: body.capitalAllocated,
      sprintId: body.sprintId,
    });
    return NextResponse.json(enterprise, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
