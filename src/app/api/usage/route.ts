import { NextRequest, NextResponse } from 'next/server';
import { getUsageSummary, checkRateLimit } from '@/lib/usage';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json() as { email: string };
        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        // Get user tier
        const stakeholders = await adminDb.collection('stakeholders')
            .where('email', '==', email.toLowerCase())
            .limit(1)
            .get();

        const tier = stakeholders.empty ? 'free' : (stakeholders.docs[0].data().tier || 'free');

        const [usage, rateLimit] = await Promise.all([
            getUsageSummary(email),
            checkRateLimit(email, tier),
        ]);

        return NextResponse.json({
            tier,
            usage,
            rateLimit: {
                limit: rateLimit.limit,
                used: rateLimit.used,
                remaining: rateLimit.remaining,
                window: '1 minute',
            },
        });
    } catch (error) {
        console.error('Usage retrieval error:', error);
        return NextResponse.json({ error: 'Failed to retrieve usage' }, { status: 500 });
    }
}
