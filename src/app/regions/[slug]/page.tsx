import Link from 'next/link';
import { notFound } from 'next/navigation';
import { REGIONS, getRegion } from '@/data/regions';

export function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const region = getRegion(slug);
    if (!region) return { title: 'Not Found' };
    return {
      title: `${region.name} — AI Governance Regulatory Intelligence`,
      description: region.description,
    };
  });
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.75rem' }}>{region.flag}</span>
            <Link href="/regions" style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>
              All Regions
            </Link>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            {region.name}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
            {region.tagline}
          </p>
          <p style={{ fontSize: '1.05rem', maxWidth: '750px', opacity: 0.85, lineHeight: 1.8 }}>
            {region.description}
          </p>
        </div>
      </section>

      {/* Regulatory Frameworks */}
      <section>
        <div className="container">
          <h2 className="section-title">Regulatory <span className="accent">Frameworks</span></h2>
          <div className="grid-3">
            {region.regulatoryFrameworks.map((f) => (
              <div key={f} className="card">
                <h4>{f}</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                  Active monitoring, enforcement tracking, and compliance analysis
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Bodies */}
      <section>
        <div className="container">
          <h2 className="section-title">Key <span className="accent">Regulatory Bodies</span></h2>
          <div className="grid-2">
            {region.keyBodies.map((b) => (
              <div key={b} className="card" style={{ padding: '1.25rem' }}>
                <h4>{b}</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                  Guidance, enforcement actions, and policy positions tracked
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classification & Languages */}
      <section>
        <div className="container">
          <div className="grid-2">
            <div className="card">
              <h3>Industry Classification</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                {region.classificationSystem}
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                Full entropy mapping across every code in the {region.classificationSystem} system
              </p>
            </div>
            <div className="card">
              <h3>Languages</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {region.languages.map((l) => (
                  <span key={l} className="card__tag" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                    {l.toUpperCase()}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.75rem' }}>
                Intelligence products available in these languages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            {region.name} <span className="accent">Intelligence</span>
          </h2>
          <p style={{ maxWidth: '550px', margin: '0 auto 2rem', opacity: 0.85 }}>
            Weekly regulatory signals, enforcement alerts, and governance intelligence for {region.name}.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/subscribe" className="btn btn-primary">Subscribe →</Link>
            <Link href="/contact" className="btn btn-secondary">Institutional Inquiry →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
