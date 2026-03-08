import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authors — andrewfranklinleo.com',
  description: 'Meet the authors behind the obligation infrastructure frameworks.',
};

export default function AuthorsPage() {
  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', maxWidth: '900px' }}>
      <p className="hero__eyebrow">// Authors</p>
      <h1 className="section-title">The Minds Behind <span className="accent">Obligation Infrastructure</span></h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
        The frameworks, protocols, and intelligence products on this platform are authored
        by practitioners who believe accountability must become infrastructure — not remain a wish.
      </p>

      <Link href="/authors/andrew-franklin-leo" className="author-card" style={{ textDecoration: 'none', color: 'var(--light-text)', display: 'block', marginBottom: '3rem' }}>
        <div className="author-avatar">AP</div>
        <div className="author-meta">
          <div className="card__tag card__tag--gold" style={{ marginBottom: '0.75rem' }}>Founder</div>
          <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Andrew Franklin Leo</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>Obligation Infrastructure Architect</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.85, opacity: 0.85, marginBottom: '1.5rem' }}>
            Architect of the ORF Protocol and founder of the AINEFF ecosystem. His work spans
            AI governance, obligation infrastructure, Pre-Incident Governance, and the economics of
            enterprise AI deployment.
          </p>
          <div className="author-expertise">
            {['ORF Protocol', 'Fragility Codex', '15-Layer Reality Stack', 'Pre-Incident Governance'].map((a) => (
              <span key={a} className="card__tag">{a}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
            {[{ v: '7', l: 'Frameworks' }, { v: '70+', l: 'Documents' }, { v: '12', l: 'Verticals' }, { v: '11', l: 'Regions' }].map((s) => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>{s.v}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Link>

      <div className="thesis-block">
        <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Read the <span className="accent">Frameworks</span></h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>Explore the complete library of governance frameworks.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/essays" className="btn btn-primary">Browse All Essays</Link>
          <Link href="/subscribe" className="btn btn-secondary">Subscribe for Access</Link>
        </div>
      </div>
    </div>
  );
}
