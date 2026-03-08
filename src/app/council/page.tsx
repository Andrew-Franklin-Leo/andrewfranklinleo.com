import type { Metadata } from 'next';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';
import CouncilApplicationForm from './CouncilApplicationForm';

export const metadata: Metadata = {
    title: 'The Constraint Council — Andrew Palupillai | Obligation Intelligence',
    description: 'The paying professional community for enterprise AI governance practitioners. Quarterly roundtables, Fragility Codex access, Council Member badge, and referral revenue share. $500-$2,500/year.',
};

const benefits = [
    { title: 'Quarterly Constraint Roundtables', desc: 'Exclusive 90-minute sessions with senior governance practitioners. Real cases, real failures, real architectures. Limited to 30 members per session.' },
    { title: 'Publish Governance Perspectives', desc: 'Contribute essays and case analyses to the Obligation Intelligence archive. Council Members gain a platform to shape the governance discourse.' },
    { title: 'Council Member Badge', desc: 'Verified Council Member credential for use on LinkedIn, conference bios, and institutional profiles. Signal governance seriousness to your market.' },
    { title: 'Fragility Codex Library', desc: 'Full access to the Fragility Codex — the catalogued library of 1,300+ enterprise AI failure modes, constraint gaps, and obligation breakdowns.' },
    { title: 'Obligation Summit Eligibility', desc: 'Priority registration and discounted access to The Obligation Summit annual conference and all associated events.' },
    { title: 'Peer Network Access', desc: 'Connect with CROs, AI ethics leads, regulators, and institutional investors who take governance infrastructure seriously.' },
];

const tiers = [
    {
        name: 'ASSOCIATE', price: '$500', period: '/year', tier: 'council_associate',
        features: ['Quarterly Roundtable access', 'Fragility Codex library', 'Council Member badge', 'Obligation Summit priority registration'],
        featured: false, badge: null as string | null,
    },
    {
        name: 'FELLOW', price: '$1,500', period: '/year', tier: 'council_fellow',
        features: ['Everything in Associate', 'Publish governance perspectives', 'Governance Dinner nomination eligibility', 'Private Slack channel access', 'Annual 1:1 with Andrew (30 min)'],
        featured: true, badge: 'Most Popular',
    },
    {
        name: 'SENIOR FELLOW', price: '$2,500', period: '/year', tier: 'council_senior',
        features: ['Everything in Fellow', 'Co-author framework papers', 'Advisory Board nomination eligibility', 'Governance Intelligence Terminal beta access', 'Quarterly 1:1 with Andrew (60 min)'],
        featured: false, badge: null as string | null,
    },
];

const testimonials = [
    { quote: 'The Council is the only governance community where the conversation starts at the infrastructure level, not the policy level.', name: 'Council Member', role: 'Chief Risk Officer, Global Bank' },
    { quote: 'Access to the Fragility Codex alone is worth the membership. The roundtables are where the real learning happens.', name: 'Council Member', role: 'Head of AI Ethics, Technology Company' },
    { quote: 'Finally, a peer network that treats AI governance as an engineering problem, not a compliance checkbox.', name: 'Council Member', role: 'Managing Director, Consulting Firm' },
];

export default function CouncilPage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Professional Community</p>
            <h1 className="section-title" style={{ maxWidth: '700px' }}>
                The Constraint <span className="accent">Council</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '660px', marginBottom: '1.5rem', opacity: 0.88, lineHeight: 1.85 }}>
                The paying professional community for enterprise AI governance practitioners who build obligation
                infrastructure, not compliance theatre. 200 founding members. $500-$2,500/year.
            </p>
            <p style={{ fontSize: '0.95rem', maxWidth: '600px', marginBottom: '3.5rem', opacity: 0.7, lineHeight: 1.7 }}>
                Target: 200 members at $1,500 average = $300K annual recurring revenue.
            </p>

            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Member <span className="accent">Benefits</span></h2>
            <div className="grid-3" style={{ marginBottom: '4rem' }}>
                {benefits.map((b) => (
                    <div key={b.title} className="card">
                        <h3 style={{ fontSize: '1.05rem' }}>{b.title}</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.7 }}>{b.desc}</p>
                    </div>
                ))}
            </div>

            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Membership <span className="accent">Tiers</span></h2>
            <div className="pricing-grid" style={{ marginBottom: '4rem' }}>
                {tiers.map((t) => (
                    <div key={t.name} className={`pricing-card${t.featured ? ' pricing-card--featured' : ''}`}>
                        {t.badge && <div className="pricing-card__badge">{t.badge}</div>}
                        <div className="pricing-card__name">{t.name}</div>
                        <div className="pricing-card__price">{t.price}<span>{t.period}</span></div>
                        <ul className="pricing-card__features">
                            {t.features.map((f) => <li key={f}>{f}</li>)}
                        </ul>
                        <CheckoutButton
                            tier={t.tier}
                            label={`Join as ${t.name}`}
                            className={`btn ${t.featured ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center', width: '100%' }}
                        />
                    </div>
                ))}
            </div>

            {/* Referral Revenue Share */}
            <div className="thesis-block" style={{ marginBottom: '4rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Referral <span className="accent">Revenue Share</span></h2>
                <p>Council Members who refer enterprise subscribers receive <strong>10-15% of first-year revenue</strong>. Institutional subscriptions range from $5,000-$50,000/year — a single referral can cover your Council membership several times over.</p>
                <p>Referral tracking is built into the Stakeholder Portal. Every introduction is logged, attributed, and paid out quarterly.</p>
                <Link href="/referral" className="btn btn-ghost" style={{ marginTop: '0.5rem' }}>View Referral Programme</Link>
            </div>

            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>From Council <span className="accent">Members</span></h2>
            <div className="grid-3" style={{ marginBottom: '4rem' }}>
                {testimonials.map((t) => (
                    <div key={t.role} className="card">
                        <p style={{ fontSize: '0.95rem', fontStyle: 'italic', opacity: 0.9, lineHeight: 1.7, flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.name}</p>
                            <p style={{ fontSize: '0.8rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            <CouncilApplicationForm />
        </div>
    );
}
