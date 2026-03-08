import type { Metadata } from 'next';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';

export const metadata: Metadata = {
    title: 'Enterprise — andrewfranklinleo.com | SSO, Team Management, Custom Integration',
    description: 'Enterprise subscription management. SSO integration, team access, custom dashboards, and dedicated support for institutional governance teams.',
};

const FEATURES = [
    { name: 'Single Sign-On (SSO)', description: 'SAML 2.0 and OpenID Connect integration with your identity provider. Support for Okta, Azure AD, Google Workspace, and custom IdPs.', status: 'Available' },
    { name: 'Team Management', description: 'Centralized seat management, role-based access (Admin, Analyst, Viewer), and usage analytics per team member.', status: 'Available' },
    { name: 'Custom Dashboards', description: 'Configurable governance intelligence dashboards with your team\'s tracked jurisdictions, verticals, and regulatory priorities.', status: 'Q3 2026' },
    { name: 'API Integration', description: 'Full REST API access with enterprise-grade rate limits (300 req/min), webhook alerts, and custom data exports.', status: 'Available' },
    { name: 'Dedicated Support', description: 'Named account manager, priority support SLA (4-hour response), quarterly business reviews, and custom onboarding.', status: 'Available' },
    { name: 'Custom Reporting', description: 'Board-ready governance reports, custom risk assessments, and bespoke intelligence briefings delivered on your schedule.', status: 'Available' },
    { name: 'Data Residency', description: 'Choose data storage region (US, EU, APAC) for compliance with data sovereignty requirements.', status: 'Q4 2026' },
    { name: 'Audit Logging', description: 'Complete audit trail of team activity, content access, and API usage for compliance and governance purposes.', status: 'Q3 2026' },
    { name: 'Self-Service Billing', description: 'Manage subscriptions, upgrade/downgrade plans, download invoices, and update payment methods via the billing portal.', status: 'Available' },
    { name: 'Tax Compliance', description: 'Automatic VAT/GST calculation and collection for EU, UK, AU, and SG. Tax-compliant invoices generated automatically.', status: 'Available' },
];

const PLANS = [
    { name: 'Enterprise Team', seats: '5-25 seats', price: '$5,000/year', features: ['SSO integration', 'Team management portal', 'API access (120 req/min)', 'Priority email support', 'Self-service billing portal', 'Downloadable invoices'] },
    { name: 'Enterprise Plus', seats: '25-100 seats', price: '$15,000/year', features: ['Everything in Team', 'Custom dashboards', 'Dedicated account manager', 'Quarterly business reviews', 'Custom reporting', 'Multi-currency billing'] },
    { name: 'Enterprise Unlimited', seats: 'Unlimited seats', price: '$25,000/year', features: ['Everything in Plus', 'Unlimited API access', 'Data residency options', 'Audit logging', 'Custom onboarding', '4-hour support SLA', 'Tax compliance automation'] },
];

export default function EnterprisePage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Enterprise</p>
            <h1 className="section-title">Enterprise <span className="accent">Access</span></h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
                Institutional-grade governance intelligence for enterprise teams. SSO integration,
                team management, custom dashboards, self-service billing, and dedicated support.
            </p>

            <div className="pricing-grid" style={{ marginBottom: '4rem' }}>
                {PLANS.map((plan, i) => (
                    <div key={plan.name} className={`pricing-card${i === 1 ? ' pricing-card--featured' : ''}`}>
                        {i === 1 && <div className="pricing-card__badge">Most Popular</div>}
                        <div className="pricing-card__name">{plan.name}</div>
                        <div className="pricing-card__price" style={{ fontSize: '1.8rem' }}>{plan.price}</div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-blue)' }}>{plan.seats}</p>
                        <ul className="pricing-card__features">
                            {plan.features.map((f) => <li key={f}>{f}</li>)}
                        </ul>
                        <Link href="/contact" className={`btn ${i === 1 ? 'btn-primary' : 'btn-ghost'}`} style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>
                            Contact Sales
                        </Link>
                    </div>
                ))}
            </div>

            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Enterprise <span className="accent">Features</span></h2>
            <div className="grid-2" style={{ marginBottom: '4rem' }}>
                {FEATURES.map((f) => (
                    <div key={f.name} className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 style={{ fontSize: '1.05rem' }}>{f.name}</h3>
                            <span className={`card__tag${f.status === 'Available' ? ' card__tag--gold' : ''}`}>{f.status}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>{f.description}</p>
                    </div>
                ))}
            </div>

            <div className="thesis-block" style={{ textAlign: 'center' }}>
                <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Schedule a <span className="accent">Demo</span></h2>
                <p style={{ maxWidth: '520px', margin: '0 auto 1.5rem', opacity: 0.85 }}>
                    See how governance intelligence integrates with your enterprise systems. 30-minute demo with our enterprise team.
                </p>
                <Link href="/contact" className="btn btn-primary">Request Enterprise Demo</Link>
            </div>
        </div>
    );
}
