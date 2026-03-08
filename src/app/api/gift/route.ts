import { NextRequest, NextResponse } from 'next/server';
import { createGiftCheckout, type SubscriptionTier } from '@/lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {
            tier: SubscriptionTier;
            purchaserEmail: string;
            recipientEmail: string;
            recipientName?: string;
            message?: string;
        };

        if (!body.purchaserEmail || !body.recipientEmail || !body.tier) {
            return NextResponse.json({ error: 'Purchaser email, recipient email, and tier required' }, { status: 400 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const session = await createGiftCheckout({
            tier: body.tier,
            purchaserEmail: body.purchaserEmail,
            recipientEmail: body.recipientEmail,
            recipientName: body.recipientName,
            message: body.message,
            successUrl: `${baseUrl}/gift/success?recipient=${encodeURIComponent(body.recipientEmail)}`,
            cancelUrl: `${baseUrl}/gift?status=cancelled`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Gift checkout error:', error);
        const message = error instanceof Error ? error.message : 'Failed to create gift checkout';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
