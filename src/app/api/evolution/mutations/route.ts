import { NextRequest, NextResponse } from 'next/server';
import { mutationEngine } from '@/lib/evolution';

export async function GET(req: NextRequest) {
  try {
    const status = new URL(req.url).searchParams.get('status') ?? undefined;
    const mutations = await mutationEngine.listMutations(status as never);
    return NextResponse.json({ mutations });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
