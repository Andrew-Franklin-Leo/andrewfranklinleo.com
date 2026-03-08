import { NextRequest, NextResponse } from 'next/server';
import { createSubscriptionCheckout, type SubscriptionTier, type SupportedCurrency, SUPPORTED_CURRENCIES } from '@/lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {
            tier: SubscriptionTier;
            email?: string;
            currency?: SupportedCurrency;
            coupon?: string;
            referralCode?: string;
            billing?: 'monthly' | 'annual';
        };

        let tier = body.tier;

        // Handle billing period toggle
        if (body.billing === 'annual' && tier === 'practitioner_monthly') tier = 'practitioner_annual' as SubscriptionTier;
        if (body.billing === 'annual' && tier === 'operator_monthly') tier = 'operator_annual' as SubscriptionTier;

        const currency = body.currency && SUPPORTED_CURRENCIES.includes(body.currency) ? body.currency : 'usd';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const session = await createSubscriptionCheckout({
            tier,
            email: body.email,
            currency,
            coupon: body.coupon,
            referralCode: body.referralCode,
            successUrl: `${baseUrl}/portal?session_id={CHECKOUT_SESSION_ID}&status=success`,
            cancelUrl: `${baseUrl}/subscribe?status=cancelled`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Checkout error:', error);
        const message = error instanceof Error ? error.message : 'Failed to create checkout session';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
