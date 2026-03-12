import { NextRequest, NextResponse } from 'next/server';
import { agentRuntime, agentRegistry } from '@/lib/agents';

export async function GET() {
  try {
    const instances = await agentRegistry.listInstances();
    return NextResponse.json({ agents: instances });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type, engine, version, config, policies, maxRestarts, heartbeatIntervalMs, entrypoint, deathClause } = body;

    if (!name || !type || !engine) {
      return NextResponse.json({ error: 'name, type, and engine are required' }, { status: 400 });
    }

    const result = await agentRuntime.create({
      name,
      type: type ?? 'execution',
      engine: engine ?? 'standalone',
      version: version ?? '1.0.0',
      config: config ?? {},
      policies: policies ?? [],
      maxRestarts: maxRestarts ?? 3,
      heartbeatIntervalMs: heartbeatIntervalMs ?? 30000,
      entrypoint: entrypoint ?? '',
      deathClause,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
