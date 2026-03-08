import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Speaking — Andrew Palupillai | AI Governance & Obligation Infrastructure',
    description:
        'Andrew Palupillai speaks on AI governance, obligation infrastructure, and the ORF Protocol at enterprise, institutional, and government summits worldwide.',
};

const topics = [
    {
        title: 'The ORF Protocol: Binding AI Accountability at Execution Time',
        desc: 'The foundational keynote. Introduces the Atomic Constraint, explains why liability evaporates into architecture, and demonstrates the ORF Protocol as infrastructure — not regulation.',
        audience: 'C-Suite / Board / Regulators',
    },
    {
        title: 'Pre-Incident Governance: Why Your AI Crisis Has Already Started',
        desc: 'The decision that will cause your organisation\'s AI crisis was made 6 months ago. This talk shows how to build pre-incident governance systems that surface these decisions before they detonate.',
        audience: 'CROs / Risk Teams / Legal',
    },
    {
        title: 'The 15-Layer Reality Stack: What Governance Actually Requires',
        desc: 'A framework for understanding the full scope of what AI governance must address — from Truth and Execution through to Legibility to Power and Human Discipline.',
        audience: 'Enterprise Strategy / Policy',
    },
    {
        title: 'The Infrastructure That Will Be Worth More Than Oil',
        desc: 'Obligation infrastructure is the strategic asset of the AI economy. Who controls the binding mechanisms controls the market. A strategic investment thesis for institutional capital.',
        audience: 'Investors / Institutional Capital',
    },
    {
        title: 'AI Enterprise Governance at Scale: AINEF, AINE, AINEG',
        desc: 'How to build, operate, govern, and shutdown AI-native enterprises at portfolio scale. From constitutional frameworks to parametric insurance products.',
        audience: 'Innovation Labs / Enterprise AI Teams',
    },
];

const fees = [
    { type: 'Global keynote (Davos, G20, major industry summit)', fee: '$25,000–$75,000' },
    { type: 'Corporate keynote / leadership event', fee: '$10,000–$25,000' },
    { type: 'Board or executive workshop (half-day)', fee: '$15,000–$40,000' },
    { type: 'ORF Protocol Certification Workshop (4-hour)', fee: '$1,500–$2,500/person' },
    { type: 'University lecture / academic conference', fee: '$2,000–$10,000' },
    { type: 'Podcast / media appearance', fee: 'Reciprocal / by arrangement' },
];

export default function SpeakingPage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Speaking</p>
            <h1 className="section-title">
                Speaking & <span className="accent">Engagements</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '640px', marginBottom: '3.5rem', opacity: 0.88, lineHeight: 1.85 }}>
                Andrew speaks on AI governance, obligation infrastructure, and accountability systems at enterprise
                boardrooms, government summits, institutional investor conferences, and policy forums globally.
            </p>

            {/* Topics */}
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Keynote <span className="accent">Topics</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
                {topics.map((t) => (
                    <div key={t.title} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                            <h3 style={{ fontSize: '1.1rem', flex: 1 }}>{t.title}</h3>
                            <span className="card__tag">{t.audience}</span>
                        </div>
                        <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.7 }}>{t.desc}</p>
                    </div>
                ))}
            </div>

            {/* Fees */}
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Speaking <span className="accent">Fees</span>
            </h2>
            <div className="card" style={{ marginBottom: '4rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px' }}>Engagement Type</th>
                            <th style={{ textAlign: 'right', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px' }}>Fee Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fees.map((f) => (
                            <tr key={f.type}>
                                <td style={{ padding: '0.85rem 0', borderBottom: '1px solid rgba(33,38,45,0.7)', fontSize: '0.92rem', opacity: 0.85, paddingRight: '2rem' }}>{f.type}</td>
                                <td style={{ padding: '0.85rem 0', borderBottom: '1px solid rgba(33,38,45,0.7)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}>{f.fee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p style={{ fontSize: '0.82rem', opacity: 0.5, marginTop: '1rem' }}>All fees are indicative. International engagements include travel and accommodation. Bespoke rates available for multi-session or long-duration formats.</p>
            </div>

            {/* Booking CTA */}
            <div className="thesis-block" style={{ textAlign: 'center' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Book a <span className="accent">Speaking Slot</span>
                </h2>
                <p style={{ maxWidth: '500px', margin: '0 auto 2rem', opacity: 0.85 }}>
                    Send an outline of the event, audience profile, topic preference, and date. Andrew personally
                    reviews all enquiries and responds within 48 hours.
                </p>
                <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                    Submit Speaking Enquiry →
                </Link>
            </div>
        </div>
    );
}
