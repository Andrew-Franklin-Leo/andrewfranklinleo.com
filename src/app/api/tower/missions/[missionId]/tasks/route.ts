import { NextRequest, NextResponse } from 'next/server';
import { missionManager } from '@/lib/tower';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ missionId: string }> }) {
  try {
    const { missionId } = await params;
    const tasks = await missionManager.getTasks(missionId);
    return NextResponse.json({ tasks });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ missionId: string }> }) {
  try {
    const { missionId } = await params;
    const body = await req.json();
    const task = await missionManager.createTask({
      missionId,
      objectiveId: body.objectiveId ?? '',
      description: body.description,
      status: 'pending',
      assignedTo: body.assignedTo,
      dependencies: body.dependencies ?? [],
      estimatedHours: body.estimatedHours ?? 0,
      actualHours: 0,
      dueDate: body.dueDate ?? '',
    });
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
