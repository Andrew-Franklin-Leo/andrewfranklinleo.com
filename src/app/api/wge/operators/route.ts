import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET(req: NextRequest) {
  try {
    const status = new URL(req.url).searchParams.get('status') as 'available' | 'assigned' | undefined;
    const operators = await sprintEngine.listOperators(status ?? undefined);
    return NextResponse.json({ operators });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const op = await sprintEngine.createOperator({
      name: body.name,
      email: body.email,
      status: 'available',
      capabilities: body.capabilities ?? [],
      certifications: body.certifications ?? [],
      activeSprintIds: [],
      completedSprints: 0,
      successRate: 100,
      rating: 5.0,
      hourlyRate: body.hourlyRate ?? 150,
    });
    return NextResponse.json(op, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
