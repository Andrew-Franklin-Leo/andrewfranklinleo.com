import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllEssays } from '@/lib/essays';

export const metadata: Metadata = {
    title: 'Frameworks & Writing — Andrew Palupillai',
    description:
        'AI governance frameworks, the ORF Protocol, the 15-Layer Reality Stack, and original thinking on obligation infrastructure by Andrew Palupillai.',
};

function CategoryFilters({ categories, active }: { categories: string[]; active: string }) {
    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map((cat) => (
                <Link
                    key={cat}
                    href={cat === 'All' ? '/essays' : `/essays?category=${encodeURIComponent(cat)}`}
                    style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-mono)',
                        textDecoration: 'none',
                        border: '1px solid var(--border-color)',
                        color: cat === active ? 'var(--bg-color, #0a0a0a)' : 'var(--light-text)',
                        backgroundColor: cat === active ? 'var(--accent-gold)' : 'transparent',
                        transition: 'all 0.2s',
                    }}
                >
                    {cat}
                </Link>
            ))}
        </div>
    );
}

export default async function EssaysPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const allEssays = getAllEssays();

    const categories = ['All', ...Array.from(new Set(allEssays.map((e) => e.category)))];
    const activeCategory = category || 'All';

    const filteredEssays = activeCategory === 'All'
        ? allEssays
        : allEssays.filter((e) => e.category === activeCategory);

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Archive</p>
            <h1 className="section-title">
                Frameworks & <span className="accent">Writing</span>
            </h1>
            <p style={{ fontSize: '1.05rem', maxWidth: '620px', marginBottom: '1rem', opacity: 0.85, lineHeight: 1.8 }}>
                Original thinking at the intersection of AI governance, obligation infrastructure, and institutional accountability.
            </p>
            <p style={{ fontSize: '0.88rem', opacity: 0.55, fontFamily: 'var(--font-mono)', marginBottom: '2rem' }}>
                // Subscriber access unlocks the full annotated archive + PDF downloads
            </p>

            <CategoryFilters categories={categories} active={activeCategory} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {filteredEssays.map((e) => (
                    <div key={e.slug} className="card" style={{ flexDirection: 'row', alignItems: 'stretch', gap: '2rem', padding: '2rem' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                <span className="card__tag">{e.category}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.5 }}>{e.date}</span>
                                {e.gated && (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        fontSize: '0.72rem',
                                        fontFamily: 'var(--font-mono)',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '2rem',
                                        border: '1px solid var(--accent-gold)',
                                        color: 'var(--accent-gold)',
                                    }}>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        Subscriber
                                    </span>
                                )}
                            </div>
                            <Link href={`/essays/${e.slug}`} style={{ textDecoration: 'none' }}>
                                <h3 className="essay-title-link" style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                                    {e.title}
                                </h3>
                            </Link>
                            <p style={{ fontSize: '0.92rem', opacity: 0.7, lineHeight: 1.7, fontStyle: 'italic' }}>{e.subtitle}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link href={`/essays/${e.slug}`} className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>Read &rarr;</Link>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <p style={{ opacity: 0.65, marginBottom: '1.5rem' }}>
                    Want annotated PDFs and early access to all upcoming frameworks?
                </p>
                <Link href="/subscribe" className="btn btn-primary">View Access Tiers &rarr;</Link>
            </div>
        </div>
    );
}
