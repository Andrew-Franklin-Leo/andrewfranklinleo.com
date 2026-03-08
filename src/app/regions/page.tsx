import Link from 'next/link';
import { REGIONS } from '@/data/regions';

export const metadata = {
  title: 'Global Regions — AI Governance Intelligence by Jurisdiction',
  description: 'AI governance regulatory intelligence across every major jurisdiction: EU, US, UK, Singapore, Australia, India, Japan, Canada, Middle East, China, and Latin America.',
};

export default function RegionsPage() {
  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <p className="hero__eyebrow">// Global Coverage</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Every <span className="accent">Jurisdiction</span>. Every Regulation. Every Signal.
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', opacity: 0.85, lineHeight: 1.8 }}>
            AI governance intelligence tracked across 50+ jurisdictions. Regulatory movements, enforcement
            actions, compliance deadlines, and governance framework analysis — jurisdiction by jurisdiction.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid-2">
            {REGIONS.map((r) => (
              <Link
                key={r.slug}
                href={`/regions/${r.slug}`}
                className="card reveal"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{r.flag}</span>
                  <h3 style={{ margin: 0 }}>{r.name}</h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                  {r.tagline}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {r.regulatoryFrameworks.slice(0, 3).map((f) => (
                    <span key={f} className="card__tag">{f}</span>
                  ))}
                  {r.regulatoryFrameworks.length > 3 && (
                    <span className="card__tag">+{r.regulatoryFrameworks.length - 3} more</span>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                  Classification: {r.classificationSystem} | Languages: {r.languages.join(', ').toUpperCase()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            Obligation <span className="accent">Monitor</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.85, lineHeight: 1.8 }}>
            Real-time regulatory tracking across every jurisdiction. Bill movements, enforcement actions,
            draft regulation timelines, and compliance deadlines — delivered weekly.
          </p>
          <Link href="/subscribe" className="btn btn-primary">
            Subscribe to Regulatory Intelligence →
          </Link>
        </div>
      </section>
    </>
  );
}
