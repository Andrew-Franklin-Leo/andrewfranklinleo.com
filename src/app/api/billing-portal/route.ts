import { NextRequest, NextResponse } from 'next/server';
import { createBillingPortalSession } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json() as { email: string };
        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        const stakeholders = await adminDb.collection('stakeholders')
            .where('email', '==', email.toLowerCase())
            .limit(1)
            .get();

        if (stakeholders.empty) {
            return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
        }

        const data = stakeholders.docs[0].data();
        const customerId = data.stripeCustomerId;

        if (!customerId) {
            return NextResponse.json({ error: 'No billing account found' }, { status: 404 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const session = await createBillingPortalSession(customerId, `${baseUrl}/portal`);

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Billing portal error:', error);
        return NextResponse.json({ error: 'Failed to create billing portal session' }, { status: 500 });
    }
}
