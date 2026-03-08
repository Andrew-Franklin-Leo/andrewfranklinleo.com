import type { Metadata } from 'next';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';

export const metadata: Metadata = {
    title: 'Framework Case Studies — Andrew Palupillai | Obligation Intelligence',
    description: 'HBR-model case studies applying the ORF Protocol, 15-Layer Reality Stack, and Fragility Codex to healthcare, financial services, autonomous vehicles, government procurement, and manufacturing AI systems.',
};

const caseStudies = [
    { title: 'The ORF Protocol Applied to Healthcare AI Decision Systems', sector: 'Healthcare', desc: 'How obligation chains break in clinical AI systems — from diagnostic recommendations to treatment pathways. Maps the full ORF Protocol to NHS and US healthcare contexts, identifies 14 finality gaps, and provides implementation templates for hospital CIOs.', price: '$25 — $75', product: 'case_study_standard' },
    { title: '15-Layer Reality Stack Applied to Financial Services AI Deployment', sector: 'Financial Services', desc: 'A complete mapping of the 15-Layer Reality Stack across trading systems, credit decisioning, and AML automation. Demonstrates how governance failures at Layer 4 (Execution) cascade to Layer 12 (Legibility to Power) in banking AI infrastructure.', price: '$25 — $75', product: 'case_study_standard' },
    { title: 'Pre-Incident Governance for Autonomous Vehicle Systems', sector: 'Autonomous Vehicles', desc: 'The decision that will cause your AV crisis was made 18 months ago. This case study maps pre-incident governance architecture for autonomous vehicle manufacturers, fleet operators, and insurance underwriters.', price: '$25 — $75', product: 'case_study_standard' },
    { title: 'The Fragility Codex: Banking & Financial Services Edition', sector: 'Banking', desc: 'Sector-specific extraction of the Fragility Codex covering 340+ AI failure modes specific to banking, payments, and financial services. Includes constraint mapping, obligation gap analysis, and remediation frameworks.', price: '$25 — $75', product: 'case_study_premium' },
    { title: 'Obligation Infrastructure for Government AI Procurement', sector: 'Government', desc: 'How governments can build obligation infrastructure into AI procurement processes. Covers tendering, vendor assessment, deployment governance, and post-deployment accountability across UK, US, EU, and AU contexts.', price: '$25 — $75', product: 'case_study_standard' },
    { title: 'The Atomic Constraint in Manufacturing Automation', sector: 'Manufacturing', desc: 'Applies the Atomic Constraint framework to industrial AI systems — robotic process automation, quality control AI, predictive maintenance, and supply chain decisioning. Includes 8 implementation case analyses.', price: '$25 — $75', product: 'case_study_standard' },
];

const verticals = [
    { name: 'AI Governance in Financial Services', price: '$1,500 — $5,000/year', desc: 'Monthly intelligence briefing covering regulatory movements, enforcement actions, obligation-chain analysis, and implementation guidance specific to banking, insurance, and capital markets.', product: 'sector_intel_financial' },
    { name: 'AI Governance in Healthcare', price: '$1,500 — $5,000/year', desc: 'Monthly intelligence covering clinical AI governance, NHS and FDA regulatory developments, patient safety AI obligations, and diagnostic system accountability frameworks.', product: 'sector_intel_healthcare' },
    { name: 'AI Governance for Law Firms', price: '$2,000 — $8,000/year', desc: 'Monthly intelligence for legal practitioners advising on AI governance. Covers liability frameworks, regulatory interpretation, client advisory templates, and precedent-setting enforcement actions.', product: 'sector_intel_legal' },
];

export default function CaseStudiesPage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Framework Analysis</p>
            <h1 className="section-title" style={{ maxWidth: '750px' }}>
                Framework Analysis <span className="accent">Case Studies</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '660px', marginBottom: '3.5rem', opacity: 0.88, lineHeight: 1.85 }}>
                HBR-model case studies for enterprise teams. Each study applies original governance frameworks —
                the ORF Protocol, 15-Layer Reality Stack, Fragility Codex, and Atomic Constraint — to real-world
                AI deployment challenges across regulated industries.
            </p>

            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Individual Case <span className="accent">Studies</span>
            </h2>
            <div className="grid-2" style={{ marginBottom: '4rem' }}>
                {caseStudies.map((cs) => (
                    <div key={cs.title} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <span className="card__tag">{cs.sector}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{cs.price}</span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', lineHeight: 1.4 }}>{cs.title}</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.7 }}>{cs.desc}</p>
                        <CheckoutButton
                            product={cs.product}
                            label="Purchase"
                            className="btn btn-ghost"
                            style={{ alignSelf: 'flex-start', fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                        />
                    </div>
                ))}
            </div>

            {/* Teaching Licence */}
            <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Teaching <span className="accent">Licence</span>
                </h2>
                <p>
                    Academic institutions can licence case studies for MBA programmes, executive education,
                    and graduate AI governance courses. Each licence includes teaching notes, discussion guides,
                    and framework implementation worksheets.
                </p>
                <p>
                    <strong>$500 — $2,000 per institution per year</strong>, depending on student volume and programme scope. Multi-year discounts available.
                </p>
                <CheckoutButton
                    product="teaching_licence"
                    label="Purchase Teaching Licence"
                    className="btn btn-ghost"
                    style={{ marginTop: '0.5rem' }}
                />
            </div>

            {/* Corporate Book Bundle */}
            <div className="thesis-block" style={{ marginBottom: '4rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Corporate Book <span className="accent">Bundle</span>
                </h2>
                <p>
                    Equip your entire leadership team with the governance frameworks they need. The corporate
                    book bundle includes physical and digital copies plus a live board presentation and Q&A session with Andrew.
                </p>
                <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                    <table style={{ borderCollapse: 'collapse', maxWidth: '600px' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '0.6rem 2rem 0.6rem 0', fontSize: '0.92rem', opacity: 0.85, borderBottom: '1px solid rgba(33,38,45,0.7)' }}>50 copies + board presentation + Q&A</td>
                                <td style={{ padding: '0.6rem 1rem 0.6rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(33,38,45,0.7)', textAlign: 'right', whiteSpace: 'nowrap' }}>$5,000 — $15,000</td>
                                <td style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(33,38,45,0.7)' }}>
                                    <CheckoutButton product="corporate_bundle_50" label="Purchase" className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }} />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.6rem 2rem 0.6rem 0', fontSize: '0.92rem', opacity: 0.85, borderBottom: '1px solid rgba(33,38,45,0.7)' }}>100+ copies + full-day workshop</td>
                                <td style={{ padding: '0.6rem 1rem 0.6rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(33,38,45,0.7)', textAlign: 'right', whiteSpace: 'nowrap' }}>$15,000 — $25,000</td>
                                <td style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(33,38,45,0.7)' }}>
                                    <CheckoutButton product="corporate_bundle_100" label="Purchase" className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sector Intelligence Verticals */}
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Sector-Specific Intelligence <span className="accent">Verticals</span>
            </h2>
            <p style={{ fontSize: '1rem', maxWidth: '640px', marginBottom: '2rem', opacity: 0.85, lineHeight: 1.7 }}>
                Monthly, sector-focused governance intelligence for teams that need depth, not breadth.
            </p>
            <div className="grid-3" style={{ marginBottom: '4rem' }}>
                {verticals.map((v) => (
                    <div key={v.name} className="card card--gold">
                        <h3 style={{ fontSize: '1.05rem' }}>{v.name}</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.7 }}>{v.desc}</p>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{v.price}</div>
                        <CheckoutButton
                            product={v.product}
                            label="Subscribe"
                            className="btn btn-ghost"
                            style={{ alignSelf: 'flex-start', fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                        />
                    </div>
                ))}
            </div>

            <div className="thesis-block" style={{ textAlign: 'center' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Need a Custom <span className="accent">Analysis</span>?
                </h2>
                <p style={{ maxWidth: '520px', margin: '0 auto 2rem', opacity: 0.85 }}>
                    Bespoke case studies, sector analyses, and framework applications built for your specific enterprise context.
                </p>
                <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>Request Custom Case Study</Link>
            </div>
        </div>
    );
}
