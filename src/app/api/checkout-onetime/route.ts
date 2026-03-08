import { NextRequest, NextResponse } from 'next/server';
import { createOnetimeCheckout, type OnetimeProduct, type SupportedCurrency, SUPPORTED_CURRENCIES } from '@/lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {
            product: OnetimeProduct;
            email?: string;
            currency?: SupportedCurrency;
            quantity?: number;
        };

        if (!body.product) {
            return NextResponse.json({ error: 'Product required' }, { status: 400 });
        }

        const currency = body.currency && SUPPORTED_CURRENCIES.includes(body.currency) ? body.currency : 'usd';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const session = await createOnetimeCheckout({
            product: body.product,
            email: body.email,
            currency,
            quantity: body.quantity || 1,
            successUrl: `${baseUrl}/portal?purchase=success&product=${body.product}`,
            cancelUrl: `${baseUrl}/?purchase=cancelled`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('One-time checkout error:', error);
        const message = error instanceof Error ? error.message : 'Failed to create checkout';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
