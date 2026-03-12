import { NextRequest, NextResponse } from 'next/server';
import { auditLogger } from '@/lib/governance';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const entries = await auditLogger.query({
      agentId: searchParams.get('agentId') ?? undefined,
      result: (searchParams.get('result') as 'allowed' | 'denied' | 'ratification_pending') ?? undefined,
      since: searchParams.get('since') ?? undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100,
    });
    return NextResponse.json({ entries, count: entries.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
