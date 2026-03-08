import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VERTICALS, getVertical } from '@/data/verticals';
import { getProductsByVertical } from '@/data/products';
import { getAllEssays } from '@/lib/essays';

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Need to handle async params for Next.js 16
  return params.then(({ slug }) => {
    const vertical = getVertical(slug);
    if (!vertical) return { title: 'Not Found' };
    return {
      title: `${vertical.name} — AI Governance Intelligence | andrewfranklinleo.com`,
      description: vertical.description,
    };
  });
}

export default async function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) notFound();

  const products = getProductsByVertical(slug);
  const essays = getAllEssays();

  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{
              width: '12px', height: '12px', borderRadius: '50%',
              backgroundColor: vertical.color, display: 'inline-block',
            }} />
            <Link href="/verticals" style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>
              All Verticals
            </Link>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            {vertical.name}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
            {vertical.tagline}
          </p>
          <p style={{ fontSize: '1.05rem', maxWidth: '750px', opacity: 0.85, lineHeight: 1.8 }}>
            {vertical.description}
          </p>
        </div>
      </section>

      {/* Topics */}
      <section>
        <div className="container">
          <h2 className="section-title">Coverage <span className="accent">Areas</span></h2>
          <div className="grid-3">
            {vertical.topics.map((topic) => (
              <div key={topic} className="card">
                <h4>{topic}</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                  Regulatory tracking, enforcement signals, and governance analysis
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products for this vertical */}
      {products.length > 0 && (
        <section>
          <div className="container">
            <h2 className="section-title">
              Available <span className="accent">Products</span>
            </h2>
            <div className="grid-2">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="card card--gold"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span className="card__tag">{p.category.replace('-', ' ')}</span>
                  <h3>{p.name}</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.75rem' }}>{p.tagline}</p>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ opacity: 0.5 }}>Price</span>
                      <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{p.price}</div>
                    </div>
                    <div>
                      <span style={{ opacity: 0.5 }}>ROI</span>
                      <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{p.roi}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Frameworks */}
      <section>
        <div className="container">
          <h2 className="section-title">
            Governance <span className="accent">Frameworks</span>
          </h2>
          <p style={{ maxWidth: '600px', marginBottom: '2rem', opacity: 0.85, lineHeight: 1.8 }}>
            Every {vertical.name.toLowerCase()} governance challenge maps to our proprietary frameworks.
          </p>
          <div className="grid-3">
            {essays.slice(0, 4).map((e) => (
              <Link
                key={e.slug}
                href={`/essays/${e.slug}`}
                className="essay-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h4>{e.title}</h4>
                <div className="essay-card__meta">
                  <span>{e.category}</span>
                  <span className="card__tag">Read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            Get {vertical.name} <span className="accent">Intelligence</span>
          </h2>
          <p style={{ maxWidth: '550px', margin: '0 auto 2rem', opacity: 0.85, lineHeight: 1.8 }}>
            Weekly governance signals, regulatory alerts, and actionable intelligence for {vertical.name.toLowerCase()} leaders.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/subscribe" className="btn btn-primary">Subscribe to Intelligence →</Link>
            <Link href="/contact" className="btn btn-secondary">Enterprise Inquiry →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
