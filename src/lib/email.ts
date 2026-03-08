// Email utility — sends transactional emails via configured provider
// Supports: welcome, gift notification, payment failed, invoice, referral reward

const SENDER = 'noreply@andrewfranklinleo.com';
const SENDER_NAME = 'andrewfranklinleo.com';

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

async function sendEmail(payload: EmailPayload): Promise<boolean> {
    const apiKey = process.env.EMAIL_API_KEY;
    const provider = process.env.EMAIL_PROVIDER || 'resend';

    if (!apiKey) {
        console.warn('[Email] No EMAIL_API_KEY configured — email not sent:', payload.subject);
        return false;
    }

    try {
        if (provider === 'resend') {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: `${SENDER_NAME} <${SENDER}>`,
                    to: [payload.to],
                    subject: payload.subject,
                    html: payload.html,
                    text: payload.text,
                }),
            });
            return res.ok;
        }

        if (provider === 'sendgrid') {
            const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    personalizations: [{ to: [{ email: payload.to }] }],
                    from: { email: SENDER, name: SENDER_NAME },
                    subject: payload.subject,
                    content: [
                        { type: 'text/html', value: payload.html },
                        ...(payload.text ? [{ type: 'text/plain', value: payload.text }] : []),
                    ],
                }),
            });
            return res.ok;
        }

        console.warn(`[Email] Unknown provider: ${provider}`);
        return false;
    } catch (err) {
        console.error('[Email] Send failed:', err);
        return false;
    }
}

// ─── Email Templates ───────────────────────────────────────────────

const BASE_STYLE = `
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    background: #0D1117; color: #F0F0F0; padding: 40px 20px;
`;

function wrap(content: string) {
    return `
    <div style="${BASE_STYLE}">
        <div style="max-width: 560px; margin: 0 auto;">
            <div style="font-size: 14px; font-weight: 700; color: #F5A623; margin-bottom: 24px; letter-spacing: 1px;">
                ANDREWFRANKLINLEO.COM
            </div>
            ${content}
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #21262d; font-size: 12px; color: #6b7280;">
                andrewfranklinleo.com — Obligation Intelligence Across Every Industry, Every Country
            </div>
        </div>
    </div>`;
}

export async function sendWelcomeEmail(email: string, tier: string) {
    return sendEmail({
        to: email,
        subject: `Welcome to andrewfranklinleo.com — ${tier} Access Activated`,
        html: wrap(`
            <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome to Obligation Intelligence</h1>
            <p style="line-height: 1.7; opacity: 0.85;">Your <strong style="color: #F5A623;">${tier}</strong> subscription is now active.</p>
            <p style="line-height: 1.7; opacity: 0.85;">You now have access to governance frameworks, regulatory intelligence, and accountability architecture used by enterprise operators across 50+ jurisdictions.</p>
            <div style="margin: 24px 0;">
                <a href="https://andrewfranklinleo.com/portal" style="display: inline-block; padding: 12px 24px; background: #F5A623; color: #0D1117; font-weight: 600; text-decoration: none; border-radius: 8px;">Access Your Dashboard</a>
            </div>
            <p style="line-height: 1.7; opacity: 0.85;">Quick links:</p>
            <ul style="line-height: 2; opacity: 0.85;">
                <li><a href="https://andrewfranklinleo.com/essays" style="color: #4A9EFF;">Framework Archive</a></li>
                <li><a href="https://andrewfranklinleo.com/intelligence" style="color: #4A9EFF;">Governance Intelligence</a></li>
                <li><a href="https://andrewfranklinleo.com/rankings" style="color: #4A9EFF;">Proprietary Rankings</a></li>
                <li><a href="https://andrewfranklinleo.com/tracker" style="color: #4A9EFF;">Regulatory Tracker</a></li>
            </ul>
        `),
    });
}

export async function sendGiftNotification(recipientEmail: string, senderName: string, tier: string, message?: string) {
    return sendEmail({
        to: recipientEmail,
        subject: `You've received a gift: ${tier} subscription to andrewfranklinleo.com`,
        html: wrap(`
            <h1 style="font-size: 24px; margin-bottom: 16px;">You've Received a Gift</h1>
            <p style="line-height: 1.7; opacity: 0.85;"><strong>${senderName}</strong> has gifted you a <strong style="color: #F5A623;">${tier}</strong> subscription to andrewfranklinleo.com.</p>
            ${message ? `<div style="padding: 16px; background: rgba(255,255,255,0.05); border-left: 3px solid #F5A623; margin: 16px 0; font-style: italic;">"${message}"</div>` : ''}
            <div style="margin: 24px 0;">
                <a href="https://andrewfranklinleo.com/portal" style="display: inline-block; padding: 12px 24px; background: #F5A623; color: #0D1117; font-weight: 600; text-decoration: none; border-radius: 8px;">Activate Your Gift</a>
            </div>
        `),
    });
}

export async function sendPaymentFailedEmail(email: string, tier: string) {
    return sendEmail({
        to: email,
        subject: 'Action required: Payment failed for your andrewfranklinleo.com subscription',
        html: wrap(`
            <h1 style="font-size: 24px; margin-bottom: 16px;">Payment Failed</h1>
            <p style="line-height: 1.7; opacity: 0.85;">We were unable to process payment for your <strong style="color: #F5A623;">${tier}</strong> subscription.</p>
            <p style="line-height: 1.7; opacity: 0.85;">Please update your payment method within 7 days to maintain uninterrupted access to Obligation Intelligence.</p>
            <div style="margin: 24px 0;">
                <a href="https://andrewfranklinleo.com/portal" style="display: inline-block; padding: 12px 24px; background: #F5A623; color: #0D1117; font-weight: 600; text-decoration: none; border-radius: 8px;">Update Payment Method</a>
            </div>
        `),
    });
}

export async function sendReferralRewardEmail(email: string, rewardName: string, referralCount: number) {
    return sendEmail({
        to: email,
        subject: `Referral reward unlocked: ${rewardName}`,
        html: wrap(`
            <h1 style="font-size: 24px; margin-bottom: 16px;">Reward Unlocked</h1>
            <p style="line-height: 1.7; opacity: 0.85;">Congratulations — you've reached <strong style="color: #F5A623;">${referralCount} referrals</strong>.</p>
            <p style="line-height: 1.7; opacity: 0.85;">Your reward: <strong>${rewardName}</strong></p>
            <div style="margin: 24px 0;">
                <a href="https://andrewfranklinleo.com/portal" style="display: inline-block; padding: 12px 24px; background: #F5A623; color: #0D1117; font-weight: 600; text-decoration: none; border-radius: 8px;">View in Dashboard</a>
            </div>
        `),
    });
}

export async function sendInvoiceEmail(email: string, invoiceUrl: string, amount: string) {
    return sendEmail({
        to: email,
        subject: `Your andrewfranklinleo.com invoice — ${amount}`,
        html: wrap(`
            <h1 style="font-size: 24px; margin-bottom: 16px;">Invoice Available</h1>
            <p style="line-height: 1.7; opacity: 0.85;">Your invoice for <strong style="color: #F5A623;">${amount}</strong> is ready.</p>
            <div style="margin: 24px 0;">
                <a href="${invoiceUrl}" style="display: inline-block; padding: 12px 24px; background: #F5A623; color: #0D1117; font-weight: 600; text-decoration: none; border-radius: 8px;">Download Invoice (PDF)</a>
            </div>
        `),
    });
}

export async function sendSubscriptionCancelledEmail(email: string, tier: string) {
    return sendEmail({
        to: email,
        subject: 'Your andrewfranklinleo.com subscription has been cancelled',
        html: wrap(`
            <h1 style="font-size: 24px; margin-bottom: 16px;">Subscription Cancelled</h1>
            <p style="line-height: 1.7; opacity: 0.85;">Your <strong>${tier}</strong> subscription has been cancelled. You will retain access until the end of your current billing period.</p>
            <p style="line-height: 1.7; opacity: 0.85;">You can resubscribe at any time to regain full access to Obligation Intelligence.</p>
            <div style="margin: 24px 0;">
                <a href="https://andrewfranklinleo.com/subscribe" style="display: inline-block; padding: 12px 24px; background: #F5A623; color: #0D1117; font-weight: 600; text-decoration: none; border-radius: 8px;">Resubscribe</a>
            </div>
        `),
    });
}
