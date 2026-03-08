#!/usr/bin/env npx tsx
/**
 * Stripe Product & Price Setup Script
 *
 * Creates all 31 products and prices for andrewfranklinleo.com
 * Run: npx tsx scripts/setup-stripe.ts
 *
 * Prerequisites:
 *   - STRIPE_SECRET_KEY in .env.local (or pass as STRIPE_SECRET_KEY env var)
 *   - npm install stripe dotenv (already installed)
 *
 * Output: Prints all env variables ready to paste into .env.local
 */

import Stripe from 'stripe';
import { config } from 'dotenv';
import { resolve } from 'path';
import { writeFileSync, readFileSync, existsSync } from 'fs';

config({ path: resolve(__dirname, '..', '.env.local') });

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
    console.error('\n  STRIPE_SECRET_KEY not found.\n');
    console.error('  Either:');
    console.error('    1. Add it to .env.local');
    console.error('    2. Run: STRIPE_SECRET_KEY=sk_live_xxx npx tsx scripts/setup-stripe.ts\n');
    process.exit(1);
}

const stripe = new Stripe(STRIPE_KEY, { apiVersion: '2026-02-25.clover' });

// ─── Product Definitions ───────────────────────────────────────────

interface ProductDef {
    name: string;
    description: string;
    envKey: string;
    amount: number;        // in cents
    currency: string;
    recurring?: { interval: 'month' | 'year' };
}

const PRODUCTS: ProductDef[] = [
    // ── Subscriptions (Monthly) ────────────────────────────────────
    {
        name: 'Practitioner (Monthly)',
        description: 'Full essay archive, annotated PDFs, monthly Governance Signal briefing.',
        envKey: 'STRIPE_PRICE_PRACTITIONER_MONTHLY',
        amount: 2900,
        currency: 'usd',
        recurring: { interval: 'month' },
    },
    {
        name: 'Operator (Monthly)',
        description: 'Everything in Practitioner + live AMAs, Stakeholder Portal, priority framework access.',
        envKey: 'STRIPE_PRICE_OPERATOR_MONTHLY',
        amount: 14900,
        currency: 'usd',
        recurring: { interval: 'month' },
    },

    // ── Subscriptions (Annual) ─────────────────────────────────────
    {
        name: 'Practitioner (Annual)',
        description: 'Full essay archive, annotated PDFs, monthly Governance Signal briefing. Annual billing — save 20%.',
        envKey: 'STRIPE_PRICE_PRACTITIONER_ANNUAL',
        amount: 27800,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
    {
        name: 'Operator (Annual)',
        description: 'Everything in Practitioner + live AMAs, Stakeholder Portal, priority framework access. Annual billing — save 20%.',
        envKey: 'STRIPE_PRICE_OPERATOR_ANNUAL',
        amount: 142800,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
    {
        name: 'Atomic Circle',
        description: 'Private quarterly strategy calls, exclusive constraint memos, certification first access.',
        envKey: 'STRIPE_PRICE_ATOMIC_CIRCLE_YEARLY',
        amount: 25000,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
    {
        name: 'Early Operator',
        description: 'Full Operator access for under-28s and students. 5-year lock-in pricing.',
        envKey: 'STRIPE_PRICE_EARLY_OPERATOR_YEARLY',
        amount: 9900,
        currency: 'usd',
        recurring: { interval: 'year' },
    },

    // ── Council Memberships ────────────────────────────────────────
    {
        name: 'Constraint Council — Associate',
        description: 'Quarterly Roundtable access, Fragility Codex library, Council Member badge.',
        envKey: 'STRIPE_PRICE_COUNCIL_ASSOCIATE',
        amount: 50000,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
    {
        name: 'Constraint Council — Fellow',
        description: 'Everything in Associate + publish perspectives, Governance Dinner eligibility, annual 1:1.',
        envKey: 'STRIPE_PRICE_COUNCIL_FELLOW',
        amount: 150000,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
    {
        name: 'Constraint Council — Senior Fellow',
        description: 'Everything in Fellow + co-author papers, Advisory Board eligibility, quarterly 1:1.',
        envKey: 'STRIPE_PRICE_COUNCIL_SENIOR',
        amount: 250000,
        currency: 'usd',
        recurring: { interval: 'year' },
    },

    // ── Newsletter ─────────────────────────────────────────────────
    {
        name: 'The Daily Signal Newsletter',
        description: 'Daily governance signals across 50+ jurisdictions, 12 verticals, PCI movements.',
        envKey: 'STRIPE_PRICE_NEWSLETTER_DAILY',
        amount: 2900,
        currency: 'usd',
        recurring: { interval: 'month' },
    },

    // ── Intelligence Products ──────────────────────────────────────
    {
        name: 'Obligation Monitor',
        description: 'Jurisdiction-specific regulatory tracking for enterprise governance teams.',
        envKey: 'STRIPE_PRICE_OBLIGATION_MONITOR',
        amount: 50000,
        currency: 'usd',
        recurring: { interval: 'month' },
    },

    // ── Case Studies (One-Time) ────────────────────────────────────
    {
        name: 'Case Study (Standard)',
        description: 'HBR-model governance framework case study — single sector analysis.',
        envKey: 'STRIPE_PRICE_CASE_STUDY_STANDARD',
        amount: 2500,
        currency: 'usd',
    },
    {
        name: 'Case Study (Premium)',
        description: 'Premium case study with extended analysis, remediation frameworks, and implementation templates.',
        envKey: 'STRIPE_PRICE_CASE_STUDY_PREMIUM',
        amount: 7500,
        currency: 'usd',
    },

    // ── Teaching & Corporate ───────────────────────────────────────
    {
        name: 'Teaching Licence',
        description: 'Academic licence for case studies — includes teaching notes, discussion guides, worksheets.',
        envKey: 'STRIPE_PRICE_TEACHING_LICENCE',
        amount: 50000,
        currency: 'usd',
    },
    {
        name: 'Corporate Book Bundle (50 copies)',
        description: '50 copies + board presentation + Q&A session with Andrew.',
        envKey: 'STRIPE_PRICE_CORPORATE_BUNDLE_50',
        amount: 500000,
        currency: 'usd',
    },
    {
        name: 'Corporate Book Bundle (100+ copies)',
        description: '100+ copies + full-day governance workshop with Andrew.',
        envKey: 'STRIPE_PRICE_CORPORATE_BUNDLE_100',
        amount: 1500000,
        currency: 'usd',
    },

    // ── Event Tickets ──────────────────────────────────────────────
    {
        name: 'Obligation Summit — Standard Ticket',
        description: 'Standard admission to The Obligation Summit annual conference.',
        envKey: 'STRIPE_PRICE_EVENT_SUMMIT_STANDARD',
        amount: 150000,
        currency: 'usd',
    },
    {
        name: 'Obligation Summit — Executive Ticket',
        description: 'Executive admission with priority seating and networking reception.',
        envKey: 'STRIPE_PRICE_EVENT_SUMMIT_EXECUTIVE',
        amount: 300000,
        currency: 'usd',
    },
    {
        name: 'ORF Protocol Certification Day',
        description: '4-hour intensive ORF Protocol certification workshop.',
        envKey: 'STRIPE_PRICE_EVENT_CERTIFICATION',
        amount: 150000,
        currency: 'usd',
    },
    {
        name: 'Quarterly Constraint Roundtable',
        description: '90-minute virtual roundtable — limited to 30 participants.',
        envKey: 'STRIPE_PRICE_EVENT_ROUNDTABLE',
        amount: 25000,
        currency: 'usd',
    },
    {
        name: 'Event Replay',
        description: 'On-demand access to recorded sessions from past events.',
        envKey: 'STRIPE_PRICE_EVENT_REPLAY',
        amount: 9900,
        currency: 'usd',
    },

    // ── Podcast Sponsorship ────────────────────────────────────────
    {
        name: 'Podcast Sponsor — Single Episode',
        description: 'Single episode sponsorship with pre-roll, mid-episode feature, and transcript placement.',
        envKey: 'STRIPE_PRICE_PODCAST_SPONSOR_SINGLE',
        amount: 500000,
        currency: 'usd',
    },
    {
        name: 'Podcast Sponsor — Quarterly (3 Episodes)',
        description: 'Quarterly sponsorship package — 3 consecutive episodes.',
        envKey: 'STRIPE_PRICE_PODCAST_SPONSOR_QUARTERLY',
        amount: 1200000,
        currency: 'usd',
    },
    {
        name: 'Podcast Sponsor — Annual (12 Episodes)',
        description: 'Annual sponsorship package — all 12 episodes with premium placement.',
        envKey: 'STRIPE_PRICE_PODCAST_SPONSOR_ANNUAL',
        amount: 4000000,
        currency: 'usd',
    },

    // ── Licensing ──────────────────────────────────────────────────
    {
        name: 'Licence: Editorial Syndication',
        description: 'Republish up to 12 articles/year with full attribution.',
        envKey: 'STRIPE_PRICE_LICENSING_EDITORIAL',
        amount: 250000,
        currency: 'usd',
    },
    {
        name: 'Licence: Data',
        description: 'API access to proprietary governance indices and data feeds.',
        envKey: 'STRIPE_PRICE_LICENSING_DATA',
        amount: 500000,
        currency: 'usd',
    },
    {
        name: 'Licence: Enterprise Content',
        description: 'Full enterprise redistribution rights for internal use.',
        envKey: 'STRIPE_PRICE_LICENSING_ENTERPRISE',
        amount: 1000000,
        currency: 'usd',
    },
    {
        name: 'Licence: Academic',
        description: 'Academic research and teaching licence.',
        envKey: 'STRIPE_PRICE_LICENSING_ACADEMIC',
        amount: 50000,
        currency: 'usd',
    },

    // ── Sector Intelligence ────────────────────────────────────────
    {
        name: 'Sector Intelligence: Financial Services',
        description: 'Monthly governance intelligence for banking, insurance, and capital markets.',
        envKey: 'STRIPE_PRICE_SECTOR_INTEL_FINANCIAL',
        amount: 150000,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
    {
        name: 'Sector Intelligence: Healthcare',
        description: 'Monthly governance intelligence for clinical AI, NHS, FDA, and patient safety.',
        envKey: 'STRIPE_PRICE_SECTOR_INTEL_HEALTHCARE',
        amount: 150000,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
    {
        name: 'Sector Intelligence: Legal',
        description: 'Monthly governance intelligence for legal practitioners advising on AI governance.',
        envKey: 'STRIPE_PRICE_SECTOR_INTEL_LEGAL',
        amount: 200000,
        currency: 'usd',
        recurring: { interval: 'year' },
    },
];

// ─── Main ──────────────────────────────────────────────────────────

async function main() {
    console.log('\n  andrewfranklinleo.com — Stripe Product Setup');
    console.log('  ═══════════════════════════════════════════\n');

    const envLines: string[] = [];
    let created = 0;
    let errors = 0;

    for (const def of PRODUCTS) {
        try {
            process.stdout.write(`  Creating: ${def.name}...`);

            // Create product
            const product = await stripe.products.create({
                name: def.name,
                description: def.description,
                metadata: {
                    platform: 'andrewfranklinleo.com',
                    env_key: def.envKey,
                },
            });

            // Create price
            const priceParams: Stripe.PriceCreateParams = {
                product: product.id,
                unit_amount: def.amount,
                currency: def.currency,
            };

            if (def.recurring) {
                priceParams.recurring = { interval: def.recurring.interval };
            }

            const price = await stripe.prices.create(priceParams);

            envLines.push(`${def.envKey}=${price.id}`);
            created++;
            console.log(` ${price.id}`);
        } catch (err) {
            errors++;
            const msg = err instanceof Error ? err.message : String(err);
            console.log(` ERROR: ${msg}`);
            envLines.push(`# ${def.envKey}= (FAILED: ${msg.slice(0, 60)})`);
        }
    }

    // ─── Output ────────────────────────────────────────────────────
    console.log('\n  ───────────────────────────────────────────');
    console.log(`  Created: ${created}/${PRODUCTS.length} products`);
    if (errors > 0) console.log(`  Errors: ${errors}`);
    console.log('  ───────────────────────────────────────────\n');

    // Print env block
    const envBlock = envLines.join('\n');
    console.log('  Copy these into .env.local:\n');
    console.log('  ┌─────────────────────────────────────────┐');
    for (const line of envLines) {
        console.log(`  │ ${line}`);
    }
    console.log('  └─────────────────────────────────────────┘\n');

    // Auto-update .env.local
    const envPath = resolve(__dirname, '..', '.env.local');
    if (existsSync(envPath)) {
        let envContent = readFileSync(envPath, 'utf-8');

        for (const line of envLines) {
            if (line.startsWith('#')) continue;
            const [key, value] = line.split('=');
            // Replace empty value with actual price ID
            const regex = new RegExp(`^${key}=.*$`, 'm');
            if (regex.test(envContent)) {
                envContent = envContent.replace(regex, `${key}=${value}`);
            } else {
                envContent += `\n${key}=${value}`;
            }
        }

        writeFileSync(envPath, envContent);
        console.log('  .env.local updated automatically.\n');
    }

    console.log('  Next steps:');
    console.log('    1. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET');
    console.log('    2. Add Firebase credentials');
    console.log('    3. Add EMAIL_API_KEY');
    console.log('    4. Configure Stripe Billing Portal in dashboard');
    console.log('    5. Add webhook endpoint in Stripe dashboard');
    console.log('    6. Deploy to Vercel with all env vars\n');
}

main().catch((err) => {
    console.error('\n  Fatal error:', err.message);
    process.exit(1);
});
