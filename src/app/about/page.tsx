import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About — Andrew Palupillai | Obligation Infrastructure Architect',
    description:
        'Andrew Palupillai is the founder of FrankMax Digital and architect of the ORF Protocol — building infrastructure that makes AI accountability structurally impossible to avoid.',
};

export default function AboutPage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', maxWidth: '900px' }}>
            <p className="hero__eyebrow">// About</p>
            <h1 className="section-title">
                Andrew <span className="accent">Palupillai</span>
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '4rem', alignItems: 'start' }}>
                <div>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '2rem', opacity: 0.9 }}>
                        Andrew Palupillai is the founder of FrankMax Digital and the architect of the ORF Protocol —
                        a framework for binding human accountability to AI systems at execution time. His work spans
                        AI governance, obligation infrastructure, pre-incident decision control, and the economics of
                        enterprise AI deployment.
                    </p>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '2rem', opacity: 0.85 }}>
                        He has authored over 535,000 lines of strategic architecture describing how AI systems can be
                        made accountable, not through regulation alone, but through infrastructure that makes
                        irresponsibility <em>structurally impossible</em>.
                    </p>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '3rem', opacity: 0.85 }}>
                        His thinking has been shaped by 20+ years of operating at the intersection of technology,
                        institutional governance, and risk management. He believes the next wave of defensibility in
                        AI comes not from better models, but from better obligations.
                    </p>

                    <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                        Core <span className="accent">Thesis</span>
                    </h2>
                    <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                        <p>
                            Every AI system operating today has a structural gap: there is no mechanism that binds a
                            single identifiable human to the consequences of irreversible AI decisions at the moment of
                            execution. The <strong>ORF Protocol</strong> closes this gap.
                        </p>
                        <p>
                            The <strong>15-Layer Reality Stack</strong> provides the comprehensive ontology of what any
                            real governance system must address. The <strong>Atomic Constraint</strong> provides its
                            irreducible first principle.
                        </p>
                    </div>

                    <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                        The <span className="accent">Ecosystem</span>
                    </h2>
                    <div className="grid-2" style={{ marginBottom: '3rem' }}>
                        <Link href="https://frankmax.digital" target="_blank" rel="noopener noreferrer" className="card card--gold">
                            <div className="card__domain">frankmax.digital</div>
                            <h3>FrankMax Digital</h3>
                            <p>Enterprise governance systems, interactive demos, and real products built on obligation infrastructure principles.</p>
                        </Link>
                        <Link href="https://levelup-max.com" target="_blank" rel="noopener noreferrer" className="card card--gold">
                            <div className="card__domain">levelup-max.com</div>
                            <h3>LevelUp Max</h3>
                            <p>Operator training, AI governance certification, and the talent factory building the next generation of accountable AI operators.</p>
                        </Link>
                    </div>

                    <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                        Revenue <span className="accent">Products</span>
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                        <Link href="/subscribe" className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>Subscription Tiers</h3>
                            <p style={{ fontSize: '0.88rem' }}>Free to Institutional: $0 — $25K/year</p>
                        </Link>
                        <Link href="/intelligence" className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>Governance Intelligence Terminal</h3>
                            <p style={{ fontSize: '0.88rem' }}>Obligation Monitor, Tracker, and Terminal: $500 — $100K/year</p>
                        </Link>
                        <Link href="/events" className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>Events & Obligation Summit</h3>
                            <p style={{ fontSize: '0.88rem' }}>Annual summit, workshops, roundtables: $250 — $75K</p>
                        </Link>
                        <Link href="/council" className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>The Constraint Council</h3>
                            <p style={{ fontSize: '0.88rem' }}>Professional community membership: $500 — $2,500/year</p>
                        </Link>
                        <Link href="/case-studies" className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>Case Studies & Licensing</h3>
                            <p style={{ fontSize: '0.88rem' }}>Framework case studies and institutional licences: $25 — $8K/year</p>
                        </Link>
                        <Link href="/podcast" className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>Obligation Intelligence Podcast</h3>
                            <p style={{ fontSize: '0.88rem' }}>Monthly episodes with sponsorship: $5K — $15K/episode</p>
                        </Link>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/essays" className="btn btn-primary">Read the Frameworks</Link>
                        <Link href="/speaking" className="btn btn-secondary">Speaking Engagements</Link>
                        <Link href="/contact" className="btn btn-ghost">Get in Touch</Link>
                    </div>
                </div>

                {/* Contact sidebar */}
                <div>
                    <div className="card" style={{ position: 'sticky', top: '120px' }}>
                        <h3 style={{ fontSize: '1.1rem' }}>Get in Touch</h3>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>Email</p>
                            <a href="mailto:andrew.palupillai@frankmax.digital" style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', textDecoration: 'none' }}>
                                andrew.palupillai@frankmax.digital
                            </a>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>Social</p>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <a href="https://linkedin.com/in/andrewpalupillai" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">in</a>
                                <a href="https://twitter.com/andrewpalupillai" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">𝕏</a>
                                <a href="https://frankmax.digital" target="_blank" rel="noopener noreferrer" className="social-link" title="FrankMax">FMD</a>
                            </div>
                        </div>
                        <Link href="/speaking" className="btn btn-primary" style={{ justifyContent: 'center', textAlign: 'center' }}>
                            Book a Speaking Slot
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
