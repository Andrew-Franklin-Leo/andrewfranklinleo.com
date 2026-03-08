import { NextRequest, NextResponse } from 'next/server';
import { getStripeInstance } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase/admin';
import { sendWelcomeEmail, sendGiftNotification, sendPaymentFailedEmail, sendInvoiceEmail, sendSubscriptionCancelledEmail, sendReferralRewardEmail } from '@/lib/email';
import Stripe from 'stripe';

const REFERRAL_REWARDS = [
    { count: 1, reward: '"Atomic Constraint" framework PDF (annotated)' },
    { count: 3, reward: '1-month free Practitioner upgrade' },
    { count: 5, reward: '"Obligation Infrastructure" book' },
    { count: 10, reward: 'Quarterly Constraint Roundtable invitation' },
];

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const stripe = getStripeInstance();
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    try {
        switch (event.type) {
            // ─── New Subscription ──────────────────────────────────────
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const email = session.customer_email;
                const tier = session.metadata?.tier || 'practitioner';
                const isGift = session.metadata?.type === 'gift';
                const referralCode = session.metadata?.referral_code;
                const giftRecipientEmail = session.metadata?.gift_recipient_email;
                const giftRecipientName = session.metadata?.gift_recipient_name;
                const giftMessage = session.metadata?.gift_message;
                const product = session.metadata?.product; // for one-time purchases

                if (email) {
                    const stakeholders = adminDb.collection('stakeholders');
                    const existing = await stakeholders.where('email', '==', email.toLowerCase()).get();

                    if (existing.empty) {
                        await stakeholders.add({
                            email: email.toLowerCase(),
                            tier: product ? 'free' : tier, // one-time purchases don't grant tier
                            stripeCustomerId: session.customer,
                            stripeSubscriptionId: session.subscription,
                            referralCode: Math.random().toString(36).slice(2, 10).toUpperCase(),
                            referralCount: 0,
                            createdAt: new Date().toISOString(),
                            active: true,
                        });
                    } else {
                        const updateData: Record<string, unknown> = {
                            stripeCustomerId: session.customer,
                            active: true,
                            updatedAt: new Date().toISOString(),
                        };
                        if (!product) {
                            updateData.tier = tier;
                            updateData.stripeSubscriptionId = session.subscription;
                        }
                        await existing.docs[0].ref.update(updateData);
                    }

                    // Update subscriber record
                    const subscribers = await adminDb.collection('subscribers')
                        .where('email', '==', email.toLowerCase()).get();
                    if (!subscribers.empty) {
                        await subscribers.docs[0].ref.update({ tier: product ? undefined : tier, active: true });
                    }

                    // Log to incentive ledger
                    await adminDb.collection('incentive_ledger').add({
                        email: email.toLowerCase(),
                        event: product ? 'purchase_completed' : 'subscription_started',
                        tier: product || tier,
                        amount: session.amount_total,
                        currency: session.currency,
                        timestamp: new Date().toISOString(),
                    });

                    // Record one-time purchase
                    if (product) {
                        await adminDb.collection('purchases').add({
                            email: email.toLowerCase(),
                            product,
                            amount: session.amount_total,
                            currency: session.currency,
                            status: 'completed',
                            stripeSessionId: session.id,
                            timestamp: new Date().toISOString(),
                        });
                    }

                    // Send welcome email
                    if (!product) {
                        await sendWelcomeEmail(email, tier);
                    }

                    // Handle gift subscriptions
                    if (isGift && giftRecipientEmail) {
                        await sendGiftNotification(
                            giftRecipientEmail,
                            email,
                            tier,
                            giftMessage || undefined
                        );

                        // Create gift record
                        await adminDb.collection('gifts').add({
                            purchaserEmail: email.toLowerCase(),
                            recipientEmail: giftRecipientEmail.toLowerCase(),
                            recipientName: giftRecipientName || '',
                            tier,
                            message: giftMessage || '',
                            stripeSessionId: session.id,
                            status: 'sent',
                            createdAt: new Date().toISOString(),
                        });

                        // Create/update recipient stakeholder
                        const recipientExists = await stakeholders.where('email', '==', giftRecipientEmail.toLowerCase()).get();
                        if (recipientExists.empty) {
                            await stakeholders.add({
                                email: giftRecipientEmail.toLowerCase(),
                                tier,
                                giftedBy: email.toLowerCase(),
                                referralCode: Math.random().toString(36).slice(2, 10).toUpperCase(),
                                referralCount: 0,
                                createdAt: new Date().toISOString(),
                                active: true,
                            });
                        } else {
                            await recipientExists.docs[0].ref.update({
                                tier,
                                giftedBy: email.toLowerCase(),
                                active: true,
                                updatedAt: new Date().toISOString(),
                            });
                        }
                    }

                    // Process referral
                    if (referralCode && !isGift) {
                        const referrer = await stakeholders
                            .where('referralCode', '==', referralCode.toUpperCase())
                            .limit(1)
                            .get();

                        if (!referrer.empty) {
                            const referrerDoc = referrer.docs[0];
                            const currentCount = (referrerDoc.data().referralCount || 0) + 1;

                            await referrerDoc.ref.update({
                                referralCount: currentCount,
                                updatedAt: new Date().toISOString(),
                            });

                            // Log referral
                            await adminDb.collection('referrals').add({
                                referrerEmail: referrerDoc.data().email,
                                referredEmail: email.toLowerCase(),
                                referralCode: referralCode.toUpperCase(),
                                tier,
                                amount: session.amount_total,
                                commission: Math.round((session.amount_total || 0) * 0.1), // 10%
                                currency: session.currency,
                                status: 'pending',
                                timestamp: new Date().toISOString(),
                            });

                            // Check for reward milestones
                            const reward = REFERRAL_REWARDS.find((r) => r.count === currentCount);
                            if (reward) {
                                await sendReferralRewardEmail(
                                    referrerDoc.data().email,
                                    reward.reward,
                                    currentCount
                                );
                            }
                        }
                    }
                }
                break;
            }

            // ─── Subscription Updated (upgrade/downgrade) ─────────────
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;
                const newTier = subscription.metadata?.tier || '';

                if (newTier) {
                    const stakeholders = await adminDb.collection('stakeholders')
                        .where('stripeCustomerId', '==', customerId).get();

                    if (!stakeholders.empty) {
                        const oldTier = stakeholders.docs[0].data().tier;
                        await stakeholders.docs[0].ref.update({
                            tier: newTier,
                            updatedAt: new Date().toISOString(),
                        });

                        await adminDb.collection('incentive_ledger').add({
                            email: stakeholders.docs[0].data().email,
                            event: 'subscription_changed',
                            from: oldTier,
                            to: newTier,
                            timestamp: new Date().toISOString(),
                        });
                    }
                }
                break;
            }

            // ─── Subscription Cancelled ────────────────────────────────
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const stakeholders = await adminDb.collection('stakeholders')
                    .where('stripeCustomerId', '==', customerId).get();

                if (!stakeholders.empty) {
                    const data = stakeholders.docs[0].data();
                    await stakeholders.docs[0].ref.update({
                        tier: 'free',
                        active: false,
                        cancelledAt: new Date().toISOString(),
                    });

                    await sendSubscriptionCancelledEmail(data.email, data.tier);

                    await adminDb.collection('incentive_ledger').add({
                        email: data.email,
                        event: 'subscription_cancelled',
                        tier: data.tier,
                        timestamp: new Date().toISOString(),
                    });
                }
                break;
            }

            // ─── Payment Succeeded ─────────────────────────────────────
            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                if (invoice.customer_email) {
                    await adminDb.collection('incentive_ledger').add({
                        email: invoice.customer_email.toLowerCase(),
                        event: 'payment_received',
                        amount: invoice.amount_paid,
                        currency: invoice.currency,
                        invoiceId: invoice.id,
                        timestamp: new Date().toISOString(),
                    });

                    // Send invoice email if PDF available
                    if (invoice.invoice_pdf) {
                        const amount = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: invoice.currency.toUpperCase(),
                        }).format(invoice.amount_paid / 100);
                        await sendInvoiceEmail(invoice.customer_email, invoice.invoice_pdf, amount);
                    }
                }
                break;
            }

            // ─── Payment Failed (Dunning) ──────────────────────────────
            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                if (invoice.customer_email) {
                    const stakeholders = await adminDb.collection('stakeholders')
                        .where('email', '==', invoice.customer_email.toLowerCase())
                        .limit(1)
                        .get();

                    const tier = stakeholders.empty ? 'unknown' : (stakeholders.docs[0].data().tier || 'unknown');

                    await sendPaymentFailedEmail(invoice.customer_email, tier);

                    await adminDb.collection('incentive_ledger').add({
                        email: invoice.customer_email.toLowerCase(),
                        event: 'payment_failed',
                        amount: invoice.amount_due,
                        currency: invoice.currency,
                        attemptCount: invoice.attempt_count,
                        timestamp: new Date().toISOString(),
                    });

                    // Mark stakeholder as payment_failing after 2nd attempt
                    if (!stakeholders.empty && (invoice.attempt_count || 0) >= 2) {
                        await stakeholders.docs[0].ref.update({
                            payment_status: 'failing',
                            payment_failed_at: new Date().toISOString(),
                        });
                    }
                }
                break;
            }

            // ─── Subscription Trial Ending ─────────────────────────────
            case 'customer.subscription.trial_will_end': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const stakeholders = await adminDb.collection('stakeholders')
                    .where('stripeCustomerId', '==', customerId)
                    .limit(1)
                    .get();

                if (!stakeholders.empty) {
                    await adminDb.collection('incentive_ledger').add({
                        email: stakeholders.docs[0].data().email,
                        event: 'trial_ending',
                        tier: subscription.metadata?.tier || '',
                        trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : '',
                        timestamp: new Date().toISOString(),
                    });
                }
                break;
            }
        }
    } catch (err) {
        console.error('Webhook processing error:', err);
    }

    return NextResponse.json({ received: true });
}
