import Link from 'next/link';
import { VERTICALS } from '@/data/verticals';

export const metadata = {
  title: 'Industry Verticals — Obligation Intelligence Across Every Sector',
  description: 'AI governance intelligence covering manufacturing, financial services, healthcare, logistics, energy, defense, technology, and every major industry. Entropy mapping across 100,000+ classification codes.',
};

export default function VerticalsPage() {
  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <p className="hero__eyebrow">// Industry Intelligence</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Every <span className="accent">Industry</span>. Every Risk. Every Opportunity.
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', opacity: 0.85, lineHeight: 1.8 }}>
            Obligation intelligence mapped across 100,000+ global industry classification codes.
            Each vertical receives dedicated governance analysis, regulatory tracking, entropy mapping,
            and actionable intelligence products.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid-3">
            {VERTICALS.map((v) => (
              <Link
                key={v.slug}
                href={`/verticals/${v.slug}`}
                className="card reveal"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    backgroundColor: v.color, display: 'inline-block', flexShrink: 0,
                  }} />
                  <span className="card__tag" style={{ margin: 0 }}>{v.topics.length} topics</span>
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{v.name}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.75rem' }}>{v.tagline}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.7 }}>
                  {v.description.slice(0, 150)}...
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <span className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                    Explore {v.name} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            100,000+ <span className="accent">Classification Codes</span>
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 2rem', opacity: 0.85, lineHeight: 1.8 }}>
            Our entropy mapping covers every global industry classification system: NAICS, SIC, ISIC, NACE,
            UK SIC, SSIC, NIC, JSIC, ANZSIC, and SCIAN. Each code mapped with 8 entropy dimensions.
          </p>
          <div className="grid-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { system: 'NAICS', codes: '30,000+', region: 'North America' },
              { system: 'ISIC Rev.4', codes: '419', region: 'International (UN)' },
              { system: 'NACE Rev.2.1', codes: '615', region: 'European Union' },
              { system: 'UK SIC 2007', codes: '806', region: 'United Kingdom' },
              { system: 'NIC 2008', codes: '1,304', region: 'India' },
              { system: 'JSIC Rev.14', codes: '1,473', region: 'Japan' },
            ].map((s) => (
              <div key={s.system} className="card" style={{ textAlign: 'left', padding: '1.25rem' }}>
                <div className="mono" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>{s.system}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{s.codes}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{s.region}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
