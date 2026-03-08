import type { Metadata } from 'next';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';

export const metadata: Metadata = {
    title: 'Governance Intelligence Terminal — Andrew Palupillai | Obligation Intelligence',
    description: 'Jurisdiction-specific regulatory tracking, global AI governance decisions database, and Bloomberg-comparable intelligence terminal.',
};

const products = [
    {
        name: 'Obligation Monitor',
        tag: 'Available Now',
        tagGold: true,
        price: '$500 — $2,500/month',
        description: 'Jurisdiction-specific regulatory tracking for enterprise governance teams. Real-time monitoring of bill movements, enforcement actions, regulatory guidance, and obligation-chain impacts across key jurisdictions.',
        features: [
            'EU AI Act compliance tracking & obligation mapping',
            'US federal & state AI legislation monitoring',
            'UK AI governance framework updates',
            'Singapore MDDI & MAS AI guidance',
            'Australia AI Ethics Framework movements',
            'Weekly digest + real-time alerts for material changes',
            'Exportable compliance status reports',
        ],
        tier: 'obligation_monitor',
    },
    {
        name: 'Governance Tracker',
        tag: 'Q3 2026',
        tagGold: false,
        price: 'Institutional tier — pricing TBA',
        description: 'Searchable database of global AI governance decisions, corporate AI incident tracking, and ORF Protocol compliance mapping.',
        features: [
            'Global AI governance decision database',
            'EU AI Act implementation tracker by member state',
            'Corporate AI incident index with root-cause analysis',
            'ORF Protocol compliance scoring methodology',
            'Obligation-chain mapping for major AI deployments',
            'API access for institutional integration',
            'Custom alerts by jurisdiction, sector, or risk type',
        ],
        tier: null,
    },
    {
        name: 'Governance Terminal',
        tag: 'Q4 2026',
        tagGold: false,
        price: '$30,000 — $100,000/year',
        description: 'Bloomberg-comparable intelligence terminal for AI enterprise governance. Real-time data feeds, portfolio risk analytics, and regulatory signal monitoring.',
        features: [
            'Real-time Power Concentration Index (PCI) feeds',
            'AINEG Portfolio Risk dashboards',
            'AI Liability Index — sector-by-sector exposure scoring',
            'Regulatory signal monitoring with predictive indicators',
            'Enterprise AI telemetry integration',
            'Full API access for quant and risk systems',
            'Dedicated account management & onboarding',
        ],
        tier: null,
    },
];

const timeline = [
    { product: 'Obligation Monitor', status: 'Now', active: true },
    { product: 'Governance Tracker', status: 'Q3 2026', active: false },
    { product: 'Governance Terminal', status: 'Q4 2026', active: false },
];

export default function IntelligencePage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Governance Intelligence</p>
            <h1 className="section-title" style={{ maxWidth: '750px' }}>
                Governance Intelligence <span className="accent">Terminal</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '660px', marginBottom: '1.5rem', opacity: 0.88, lineHeight: 1.85 }}>
                From regulatory tracking to Bloomberg-comparable intelligence. Three products built for
                enterprise operators, institutional investors, and regulators who need governance data
                at the speed of deployment.
            </p>

            <div className="card" style={{ marginBottom: '4rem', maxWidth: '700px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Launch Timeline</h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {timeline.map((t) => (
                        <div key={t.product} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: t.active ? 'var(--accent-gold)' : 'var(--subtle-gray)', boxShadow: t.active ? '0 0 12px rgba(245, 166, 35, 0.4)' : 'none' }} />
                            <span style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: t.active ? 'var(--accent-gold)' : 'var(--light-text)', opacity: t.active ? 1 : 0.6 }}>
                                {t.product}: <strong>{t.status}</strong>
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
                {products.map((p) => (
                    <div key={p.name} className="card" style={p.tagGold ? { borderColor: 'var(--accent-gold)' } : {}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                            <h3 style={{ fontSize: '1.35rem' }}>{p.name}</h3>
                            <span className={`card__tag${p.tagGold ? ' card__tag--gold' : ''}`}>{p.tag}</span>
                        </div>
                        <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.7 }}>{p.description}</p>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{p.price}</div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {p.features.map((f) => (
                                <li key={f} style={{ fontSize: '0.9rem', paddingLeft: '1.5rem', position: 'relative', opacity: 0.85, lineHeight: 1.5 }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>&#8594;</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <div>
                            {p.tier ? (
                                <CheckoutButton
                                    tier={p.tier}
                                    label="Subscribe Now"
                                    className="btn btn-primary"
                                />
                            ) : (
                                <Link href="/contact" className="btn btn-ghost">Register Interest</Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="thesis-block" style={{ textAlign: 'center' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Built for <span className="accent">Institutional Scale</span>
                </h2>
                <p style={{ maxWidth: '560px', margin: '0 auto 2rem', opacity: 0.85 }}>
                    Custom integrations, API access, and dedicated support available.
                </p>
                <Link href="/enterprise" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>Enterprise Pricing</Link>
            </div>
        </div>
    );
}
