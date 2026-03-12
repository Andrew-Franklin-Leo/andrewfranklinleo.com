import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sprintId: string }> }) {
  try {
    const { sprintId } = await params;
    const tasks = await sprintEngine.getTasks(sprintId);
    return NextResponse.json({ tasks });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ sprintId: string }> }) {
  try {
    const { sprintId } = await params;
    const body = await req.json();
    const task = await sprintEngine.createTask({ sprintId, ...body, status: 'pending', dependencies: body.dependencies ?? [], estimatedHours: body.estimatedHours ?? 0, actualHours: 0, dueDate: body.dueDate ?? '' });
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
