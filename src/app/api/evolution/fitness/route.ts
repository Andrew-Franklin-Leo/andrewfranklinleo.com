import { NextResponse } from 'next/server';
import { fitnessEvaluator } from '@/lib/evolution';

// GET: current fitness + history
export async function GET() {
  try {
    const [current, history] = await Promise.all([
      fitnessEvaluator.measure(),
      fitnessEvaluator.getHistory(50),
    ]);
    return NextResponse.json({ current, history });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
