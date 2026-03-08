import type { Metadata } from 'next';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';

export const metadata: Metadata = {
    title: 'Obligation Intelligence Podcast — Andrew Palupillai',
    description: 'Monthly 30-45 minute conversations with CROs, regulators, AI ethics leads, and institutional investors on obligation infrastructure and AI governance.',
};

const episodes = [
    { number: 1, title: 'Why GDP Needs a Finality Layer', guest: 'Inaugural Guest — TBA', date: 'Coming Q2 2026', description: 'The opening episode. Andrew and his inaugural guest explore why the global economy\'s most important metric has no finality mechanism — and what that means for AI-driven economic systems.', duration: '~40 min' },
    { number: 2, title: 'The 1,300 Ways Enterprise Systems Fail', guest: 'Guest — TBA', date: 'Coming Q2 2026', description: 'A deep dive into the Fragility Codex — the catalogued library of 1,300+ enterprise AI failure modes.', duration: '~35 min' },
    { number: 3, title: 'Pre-Incident Governance: What Boards Don\'t Know', guest: 'Guest — TBA', date: 'Coming Q3 2026', description: 'The decision that will cause your AI crisis was made months ago. This episode examines pre-incident governance.', duration: '~45 min' },
];

const platforms = [
    { name: 'Apple Podcasts', href: '#', icon: 'AP' },
    { name: 'Spotify', href: '#', icon: 'SP' },
    { name: 'YouTube', href: '#', icon: 'YT' },
];

const sponsorTiers = [
    { label: 'Single episode', price: '$5,000 — $10,000', product: 'podcast_sponsor_single' },
    { label: 'Quarterly (3 episodes)', price: '$12,000 — $25,000', product: 'podcast_sponsor_quarterly' },
    { label: 'Annual (12 episodes)', price: '$40,000 — $100,000', product: 'podcast_sponsor_annual' },
];

export default function PodcastPage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Podcast</p>
            <h1 className="section-title" style={{ maxWidth: '750px' }}>
                Obligation Intelligence <span className="accent">Podcast</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '660px', marginBottom: '1rem', opacity: 0.88, lineHeight: 1.85 }}>
                Monthly, 30-45 minute conversations with CROs, regulators, AI ethics leads, and
                institutional investors. Andrew + one expert guest. One topic. No filler.
            </p>
            <p style={{ fontSize: '0.92rem', maxWidth: '600px', marginBottom: '3.5rem', opacity: 0.65, lineHeight: 1.7 }}>
                Every episode transcript is published as subscriber content for Practitioner and Operator tier members.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                {platforms.map((p) => (
                    <a key={p.name} href={p.href} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.75rem', color: 'var(--accent-blue)' }}>{p.icon}</span>
                        {p.name}
                    </a>
                ))}
            </div>

            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Episode <span className="accent">Archive</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
                {episodes.map((ep) => (
                    <div key={ep.number} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem' }}>
                                    Episode {String(ep.number).padStart(2, '0')}
                                </p>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{ep.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>{ep.guest}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className="card__tag">{ep.date}</span>
                                <span className="card__tag">{ep.duration}</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.7 }}>{ep.description}</p>
                    </div>
                ))}
            </div>

            {/* Sponsor Section with Checkout */}
            <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Become a Podcast <span className="accent">Sponsor</span>
                </h2>
                <p>
                    Single sponsor slot per episode. Your brand positioned alongside the definitive voice
                    in AI governance infrastructure. Every episode reaches enterprise CROs, AI ethics leads,
                    regulators, and institutional investors.
                </p>
                <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                    <table style={{ borderCollapse: 'collapse', maxWidth: '600px' }}>
                        <tbody>
                            {sponsorTiers.map((s) => (
                                <tr key={s.product}>
                                    <td style={{ padding: '0.6rem 2rem 0.6rem 0', fontSize: '0.92rem', opacity: 0.85, borderBottom: '1px solid rgba(33,38,45,0.7)' }}>{s.label}</td>
                                    <td style={{ padding: '0.6rem 1rem 0.6rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(33,38,45,0.7)', textAlign: 'right', whiteSpace: 'nowrap' }}>{s.price}</td>
                                    <td style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(33,38,45,0.7)' }}>
                                        <CheckoutButton product={s.product} label="Purchase" className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="thesis-block" style={{ textAlign: 'center' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Subscribe to the <span className="accent">Podcast</span>
                </h2>
                <p style={{ maxWidth: '520px', margin: '0 auto 2rem', opacity: 0.85 }}>
                    New episodes monthly. Every transcript published as subscriber content.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {platforms.map((p) => (
                        <a key={p.name} href={p.href} className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>{p.name}</a>
                    ))}
                </div>
                <p style={{ fontSize: '0.82rem', opacity: 0.5, marginTop: '1.5rem' }}>
                    Platform links will be updated when the podcast launches. Register interest via{' '}
                    <Link href="/contact" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>contact</Link>.
                </p>
            </div>
        </div>
    );
}
