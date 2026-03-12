import { NextRequest, NextResponse } from 'next/server';
import { sprintEngine } from '@/lib/wge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, industry, complaint, urgency, estimatedBudget, preferredSprintType } = body;
    if (!clientName || !complaint) return NextResponse.json({ error: 'clientName and complaint required' }, { status: 400 });
    const sprint = await sprintEngine.intake({ clientName, clientEmail, industry: industry ?? '', complaint, urgency: urgency ?? 'medium', estimatedBudget, preferredSprintType });
    return NextResponse.json(sprint, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
