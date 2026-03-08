import Stripe from 'stripe';

function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
        throw new Error('STRIPE_SECRET_KEY is not configured. Set it in .env.local');
    }
    return new Stripe(key, {
        apiVersion: '2026-02-25.clover',
    });
}

let _stripe: Stripe | null = null;
export function getStripeInstance() {
    if (!_stripe) _stripe = getStripe();
    return _stripe;
}

// ─── Subscription Price IDs ────────────────────────────────────────
export const PRICE_IDS = {
    practitioner_monthly: process.env.STRIPE_PRICE_PRACTITIONER_MONTHLY || '',
    practitioner_annual: process.env.STRIPE_PRICE_PRACTITIONER_ANNUAL || '',
    operator_monthly: process.env.STRIPE_PRICE_OPERATOR_MONTHLY || '',
    operator_annual: process.env.STRIPE_PRICE_OPERATOR_ANNUAL || '',
    atomicCircle: process.env.STRIPE_PRICE_ATOMIC_CIRCLE_YEARLY || '',
    earlyOperator: process.env.STRIPE_PRICE_EARLY_OPERATOR_YEARLY || '',
    council_associate: process.env.STRIPE_PRICE_COUNCIL_ASSOCIATE || '',
    council_fellow: process.env.STRIPE_PRICE_COUNCIL_FELLOW || '',
    council_senior: process.env.STRIPE_PRICE_COUNCIL_SENIOR || '',
    newsletter_daily: process.env.STRIPE_PRICE_NEWSLETTER_DAILY || '',
    obligation_monitor: process.env.STRIPE_PRICE_OBLIGATION_MONITOR || '',
} as const;

export type SubscriptionTier = keyof typeof PRICE_IDS;

// ─── One-Time Product Price IDs ────────────────────────────────────
export const ONETIME_PRICE_IDS = {
    case_study_standard: process.env.STRIPE_PRICE_CASE_STUDY_STANDARD || '',
    case_study_premium: process.env.STRIPE_PRICE_CASE_STUDY_PREMIUM || '',
    teaching_licence: process.env.STRIPE_PRICE_TEACHING_LICENCE || '',
    corporate_bundle_50: process.env.STRIPE_PRICE_CORPORATE_BUNDLE_50 || '',
    corporate_bundle_100: process.env.STRIPE_PRICE_CORPORATE_BUNDLE_100 || '',
    event_summit_standard: process.env.STRIPE_PRICE_EVENT_SUMMIT_STANDARD || '',
    event_summit_executive: process.env.STRIPE_PRICE_EVENT_SUMMIT_EXECUTIVE || '',
    event_certification: process.env.STRIPE_PRICE_EVENT_CERTIFICATION || '',
    event_roundtable: process.env.STRIPE_PRICE_EVENT_ROUNDTABLE || '',
    event_replay: process.env.STRIPE_PRICE_EVENT_REPLAY || '',
    podcast_sponsor_single: process.env.STRIPE_PRICE_PODCAST_SPONSOR_SINGLE || '',
    podcast_sponsor_quarterly: process.env.STRIPE_PRICE_PODCAST_SPONSOR_QUARTERLY || '',
    podcast_sponsor_annual: process.env.STRIPE_PRICE_PODCAST_SPONSOR_ANNUAL || '',
    licensing_editorial: process.env.STRIPE_PRICE_LICENSING_EDITORIAL || '',
    licensing_data: process.env.STRIPE_PRICE_LICENSING_DATA || '',
    licensing_enterprise: process.env.STRIPE_PRICE_LICENSING_ENTERPRISE || '',
    licensing_academic: process.env.STRIPE_PRICE_LICENSING_ACADEMIC || '',
    sector_intel_financial: process.env.STRIPE_PRICE_SECTOR_INTEL_FINANCIAL || '',
    sector_intel_healthcare: process.env.STRIPE_PRICE_SECTOR_INTEL_LEGAL || '',
    sector_intel_legal: process.env.STRIPE_PRICE_SECTOR_INTEL_LEGAL || '',
} as const;

export type OnetimeProduct = keyof typeof ONETIME_PRICE_IDS;

// ─── Trial Configuration ───────────────────────────────────────────
export const TRIAL_DAYS: Partial<Record<SubscriptionTier, number>> = {
    practitioner_monthly: 14,
    practitioner_annual: 14,
    operator_monthly: 7,
    operator_annual: 7,
};

// ─── Currency Configuration ────────────────────────────────────────
export const SUPPORTED_CURRENCIES = ['usd', 'gbp', 'eur', 'aud', 'sgd'] as const;
export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

// ─── Billing Portal ────────────────────────────────────────────────
export async function createBillingPortalSession(customerId: string, returnUrl: string) {
    const stripe = getStripeInstance();
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
    return session;
}

// ─── Subscription Checkout ─────────────────────────────────────────
export async function createSubscriptionCheckout(opts: {
    tier: SubscriptionTier;
    email?: string;
    currency?: SupportedCurrency;
    coupon?: string;
    referralCode?: string;
    giftRecipientEmail?: string;
    successUrl: string;
    cancelUrl: string;
}) {
    const stripe = getStripeInstance();
    const priceId = PRICE_IDS[opts.tier];
    if (!priceId) throw new Error(`Invalid subscription tier: ${opts.tier}`);

    const trialDays = TRIAL_DAYS[opts.tier];

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: opts.email || undefined,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: opts.successUrl,
        cancel_url: opts.cancelUrl,
        allow_promotion_codes: true,
        automatic_tax: { enabled: true },
        tax_id_collection: { enabled: true },
        metadata: {
            tier: opts.tier,
            referral_code: opts.referralCode || '',
            gift_recipient: opts.giftRecipientEmail || '',
        },
        subscription_data: {
            metadata: { tier: opts.tier },
            ...(trialDays ? { trial_period_days: trialDays } : {}),
        },
    };

    if (opts.coupon) {
        sessionParams.discounts = [{ coupon: opts.coupon }];
        delete (sessionParams as Record<string, unknown>).allow_promotion_codes;
    }

    if (opts.currency && opts.currency !== 'usd') {
        sessionParams.currency = opts.currency;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return session;
}

// ─── One-Time Payment Checkout ─────────────────────────────────────
export async function createOnetimeCheckout(opts: {
    product: OnetimeProduct;
    email?: string;
    currency?: SupportedCurrency;
    quantity?: number;
    successUrl: string;
    cancelUrl: string;
}) {
    const stripe = getStripeInstance();
    const priceId = ONETIME_PRICE_IDS[opts.product];
    if (!priceId) throw new Error(`Invalid product: ${opts.product}`);

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: opts.email || undefined,
        line_items: [{ price: priceId, quantity: opts.quantity || 1 }],
        success_url: opts.successUrl,
        cancel_url: opts.cancelUrl,
        allow_promotion_codes: true,
        automatic_tax: { enabled: true },
        tax_id_collection: { enabled: true },
        invoice_creation: { enabled: true },
        metadata: { product: opts.product },
    });
    return session;
}

// ─── Invoice Retrieval ─────────────────────────────────────────────
export async function getCustomerInvoices(customerId: string, limit = 10) {
    const stripe = getStripeInstance();
    const invoices = await stripe.invoices.list({
        customer: customerId,
        limit,
        status: 'paid',
    });
    return invoices.data.map((inv) => ({
        id: inv.id,
        number: inv.number,
        amount: inv.amount_paid,
        currency: inv.currency,
        date: inv.created ? new Date(inv.created * 1000).toISOString() : '',
        pdf: inv.invoice_pdf,
        hosted_url: inv.hosted_invoice_url,
    }));
}

// ─── Gift Subscription ─────────────────────────────────────────────
export async function createGiftCheckout(opts: {
    tier: SubscriptionTier;
    purchaserEmail: string;
    recipientEmail: string;
    recipientName?: string;
    message?: string;
    successUrl: string;
    cancelUrl: string;
}) {
    const stripe = getStripeInstance();
    const priceId = PRICE_IDS[opts.tier];
    if (!priceId) throw new Error(`Invalid gift tier: ${opts.tier}`);

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: opts.purchaserEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: opts.successUrl,
        cancel_url: opts.cancelUrl,
        automatic_tax: { enabled: true },
        metadata: {
            type: 'gift',
            tier: opts.tier,
            gift_recipient_email: opts.recipientEmail,
            gift_recipient_name: opts.recipientName || '',
            gift_message: opts.message || '',
        },
        subscription_data: {
            metadata: {
                tier: opts.tier,
                type: 'gift',
                gift_recipient_email: opts.recipientEmail,
            },
        },
    });
    return session;
}
