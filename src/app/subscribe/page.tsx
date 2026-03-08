'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';
import PricingToggle from '@/components/PricingToggle';
import GiftModal from '@/components/GiftModal';
import StudentVerification from '@/components/StudentVerification';

const tiers = [
    {
        name: 'FREE',
        monthlyPrice: '$0', annualPrice: '$0',
        period: '', annualPeriod: '',
        desc: 'Thought leadership & public frameworks',
        features: [
            '3 articles per month (metered)',
            'Weekly newsletter digest',
            'ORF Protocol overview PDF (free)',
        ],
        action: 'free',
        featured: false,
        badge: null,
    },
    {
        name: 'PRACTITIONER',
        monthlyPrice: '$29', annualPrice: '$278',
        period: '/month', annualPeriod: '/year',
        desc: 'For strategy leads, consultants & risk officers',
        features: [
            'Unlimited essay & framework archive',
            'Annotated PDF versions of all frameworks',
            'Monthly "Governance Signal" briefing',
            '14-day free trial',
        ],
        action: 'practitioner',
        featured: false,
        badge: null,
    },
    {
        name: 'OPERATOR',
        monthlyPrice: '$149', annualPrice: '$1,428',
        period: '/month', annualPeriod: '/year',
        desc: 'For enterprise operators & innovation leads',
        features: [
            'Everything in Practitioner',
            'Monthly live AMA / Framework Deep Dive',
            'Levelupmax track mapping documents',
            'Stakeholder Portal access',
            'Priority access to pre-release frameworks',
            '7-day free trial',
        ],
        action: 'operator',
        featured: true,
        badge: 'Most Popular',
    },
    {
        name: 'ATOMIC CIRCLE',
        monthlyPrice: '$250', annualPrice: '$250',
        period: '/year', annualPeriod: '/year',
        desc: 'Inner circle for committed governance practitioners',
        features: [
            'Private quarterly strategy calls',
            'Exclusive constraint memos',
            'Certification programme first access',
            'Digital Atomic Circle badge',
        ],
        action: 'atomicCircle',
        featured: false,
        badge: 'Annual',
    },
    {
        name: 'EARLY OPERATOR',
        monthlyPrice: '$99', annualPrice: '$99',
        period: '/year', annualPeriod: '/year',
        desc: 'For under-28s & students. 5-year lock-in pricing.',
        features: [
            'Full Operator tier access',
            'Locked pricing for 5 years',
            'Student/early-career verification required',
        ],
        action: 'earlyOperator',
        featured: false,
        badge: 'Under 28',
    },
    {
        name: 'INSTITUTIONAL',
        monthlyPrice: 'Custom', annualPrice: 'Custom',
        period: ' ($5K-$25K/year)', annualPeriod: ' ($5K-$25K/year)',
        desc: 'For law firms, banks, consulting firms & agencies',
        features: [
            'Enterprise team access (FT-style engagement)',
            'Custom governance briefings on request',
            'Reprint & redistribution rights',
            'Dedicated Slack / portal channel',
            'Self-service billing portal',
        ],
        action: 'institutional',
        featured: false,
        badge: 'Enterprise',
    },
];

export default function SubscribePage() {
    const [freeEmail, setFreeEmail] = useState('');
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formMessage, setFormMessage] = useState('');
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
    const [giftTier, setGiftTier] = useState<string | null>(null);
    const [showStudentVerification, setShowStudentVerification] = useState(false);

    const handleFreeSubscribe = async (e: FormEvent) => {
        e.preventDefault();
        setFormStatus('loading');
        setFormMessage('');
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: freeEmail }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Subscription failed');
            }
            setFormStatus('success');
            setFormMessage('You are subscribed. Check your inbox for confirmation.');
            setFreeEmail('');
        } catch (err) {
            setFormStatus('error');
            setFormMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    const getTierAction = (action: string) => {
        if (action === 'practitioner') return billing === 'annual' ? 'practitioner_annual' : 'practitioner_monthly';
        if (action === 'operator') return billing === 'annual' ? 'operator_annual' : 'operator_monthly';
        return action;
    };

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Obligation Intelligence</p>
            <h1 className="section-title" style={{ maxWidth: '700px' }}>
                Choose Your <span className="accent">Access Tier</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '2rem', opacity: 0.85, lineHeight: 1.85 }}>
                From public thought leadership to institutional intelligence. Join enterprise operators,
                government risk leads, and institutional investors reading the Obligation Intelligence briefing.
            </p>

            {/* Annual/Monthly Toggle */}
            <PricingToggle onToggle={setBilling} defaultBilling="monthly" savingsLabel="Save 20%" />

            {/* Pricing grid */}
            <div className="pricing-grid" style={{ marginBottom: '2rem' }}>
                {tiers.map((t) => (
                    <div key={t.name} className={`pricing-card${t.featured ? ' pricing-card--featured' : ''}`}>
                        {t.badge && <div className="pricing-card__badge">{t.badge}</div>}
                        <div className="pricing-card__name">{t.name}</div>
                        <div className="pricing-card__price">
                            {billing === 'annual' ? t.annualPrice : t.monthlyPrice}
                            <span>{billing === 'annual' ? t.annualPeriod : t.period}</span>
                        </div>
                        <p style={{ fontSize: '0.88rem', opacity: 0.75, lineHeight: 1.5 }}>{t.desc}</p>
                        <ul className="pricing-card__features">
                            {t.features.map((f) => <li key={f}>{f}</li>)}
                        </ul>

                        {t.action === 'free' ? (
                            <a href="#free-form" className="btn btn-secondary" style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>{t.name === 'FREE' ? 'Subscribe Free' : t.name}</a>
                        ) : t.action === 'institutional' ? (
                            <Link href="/enterprise" className="btn btn-secondary" style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>Contact for Pricing</Link>
                        ) : t.action === 'earlyOperator' ? (
                            <button onClick={() => setShowStudentVerification(true)} className="btn btn-secondary" style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}>
                                Apply as Early Operator
                            </button>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                                <CheckoutButton
                                    tier={getTierAction(t.action)}
                                    label={`Start ${t.name}`}
                                    billing={billing}
                                    className={`btn ${t.featured ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}
                                />
                                <button
                                    onClick={() => setGiftTier(getTierAction(t.action))}
                                    className="btn btn-ghost"
                                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', textAlign: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
                                >
                                    Gift this tier
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Promo code note */}
            <p style={{ textAlign: 'center', fontSize: '0.82rem', opacity: 0.5, marginBottom: '4rem' }}>
                Have a promo code? Enter it at checkout — all plans support promotional pricing.
            </p>

            {/* Student Verification */}
            {showStudentVerification && (
                <div style={{ marginBottom: '3rem' }}>
                    <StudentVerification />
                </div>
            )}

            {/* Corporate / Group Pricing */}
            <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Corporate & Group <span className="accent">Pricing</span>
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    Volume discounts for teams adopting obligation-grade governance intelligence.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)' }}>30%</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>3-10 users</div>
                        <p style={{ fontSize: '0.82rem', opacity: 0.6, marginTop: '0.5rem' }}>Standard group discount on any paid tier.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)' }}>40%</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>10-50 users</div>
                        <p style={{ fontSize: '0.82rem', opacity: 0.6, marginTop: '0.5rem' }}>Plus quarterly governance briefing included.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)' }}>Custom</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>50+ users</div>
                        <p style={{ fontSize: '0.82rem', opacity: 0.6, marginTop: '0.5rem' }}>Tailored enterprise engagement. Contact us.</p>
                    </div>
                </div>
                <Link href="/enterprise" className="btn btn-ghost">Enquire About Group Pricing</Link>
            </div>

            {/* Gift Subscriptions */}
            <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Gift <span className="accent">Subscriptions</span>
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    Give the gift of governance intelligence. Purchase a subscription for a colleague,
                    team member, or anyone who needs Obligation Intelligence.
                </p>
                <Link href="/gift" className="btn btn-ghost">Browse Gift Options</Link>
            </div>

            {/* Annual Governance Research Report */}
            <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Annual Governance <span className="accent">Research Report</span>
                </h2>
                <p style={{ marginBottom: '0.75rem' }}>
                    <strong>The State of AI Accountability Infrastructure: 2026 Global Report</strong>
                </p>
                <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>
                    A comprehensive, free-to-download annual report covering global AI governance trends,
                    obligation infrastructure maturity indices, and enterprise adoption benchmarks. Available to all subscribers.
                </p>
                <Link href="/contact" className="btn btn-ghost">Register for Early Access</Link>
            </div>

            {/* Governance Terminal teaser */}
            <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Governance Intelligence Terminal <span className="accent">(Q4 2026)</span>
                </h2>
                <p>
                    Launching Q4 2026: a Bloomberg-comparable intelligence terminal for AI enterprise operators,
                    portfolio managers, and regulators. Real-time Power Concentration Index (PCI) monitoring,
                    AINEG portfolio risk dashboards, and AI enterprise telemetry.
                </p>
                <p style={{ marginBottom: '2rem' }}>
                    <strong>Pricing:</strong> $2,000-$10,000/month per enterprise. Register interest below.
                </p>
                <Link href="/intelligence" className="btn btn-ghost">Learn More</Link>
            </div>

            {/* Free subscribe form */}
            <div id="free-form" className="card" style={{ maxWidth: '540px' }}>
                <h3>Start with the Free Weekly Briefing</h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                    One governance-grade insight, every Thursday. Join 2,400+ practitioners.
                </p>
                <form onSubmit={handleFreeSubscribe} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <input
                        type="email" placeholder="your@email.com" required
                        value={freeEmail} onChange={(e) => setFreeEmail(e.target.value)} disabled={formStatus === 'loading'}
                        style={{
                            flex: 1, minWidth: '200px', padding: '0.75rem 1rem',
                            background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)',
                            borderRadius: '8px', color: 'var(--light-text)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
                        }}
                    />
                    <button type="submit" className="btn btn-primary" disabled={formStatus === 'loading'}>
                        {formStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                {formStatus === 'success' && <p style={{ fontSize: '0.88rem', color: '#4ade80', marginTop: '0.5rem' }}>{formMessage}</p>}
                {formStatus === 'error' && <p style={{ fontSize: '0.88rem', color: '#f87171', marginTop: '0.5rem' }}>{formMessage}</p>}
                <p style={{ fontSize: '0.78rem', opacity: 0.5 }}>No spam. Unsubscribe any time.</p>
            </div>

            {/* Gift Modal */}
            {giftTier && (
                <GiftModal
                    isOpen={true}
                    onClose={() => setGiftTier(null)}
                    tier={giftTier}
                    tierLabel={tiers.find((t) => giftTier.startsWith(t.action))?.name || ''}
                />
            )}
        </div>
    );
}
