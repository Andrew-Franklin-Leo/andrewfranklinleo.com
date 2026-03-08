import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ENTITIES, getEntity } from '@/data/entities';

export function generateStaticParams() {
  return ENTITIES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const entity = getEntity(slug);
    if (!entity) return { title: 'Not Found' };
    return {
      title: `${entity.name} — ${entity.role} | andrewfranklinleo.com`,
      description: entity.description,
    };
  });
}

export default async function EntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();

  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{
              width: '12px', height: '12px', borderRadius: '50%',
              backgroundColor: entity.color, display: 'inline-block',
            }} />
            <Link href="/entities" style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>
              All Entities
            </Link>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: entity.color, marginBottom: '0.5rem' }}>
            {entity.name}
          </h1>
          <p style={{ fontSize: '0.95rem', opacity: 0.5, fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
            {entity.fullName}
          </p>
          <p style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
            {entity.tagline}
          </p>
          <p style={{ fontSize: '1.05rem', maxWidth: '750px', opacity: 0.85, lineHeight: 1.8 }}>
            {entity.description}
          </p>
        </div>
      </section>

      {/* Role */}
      <section>
        <div className="container">
          <div className="grid-2">
            <div className="card" style={{ borderLeft: `3px solid ${entity.color}` }}>
              <h3>Role in Ecosystem</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: entity.color }}>
                {entity.role}
              </p>
            </div>
            <div className="card" style={{ borderLeft: `3px solid var(--accent-gold)` }}>
              <h3>Revenue Model</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                {entity.revenue}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section>
        <div className="container">
          <h2 className="section-title">Core <span className="accent">Products</span></h2>
          <div className="grid-3">
            {entity.products.map((product) => (
              <div key={product} className="card">
                <h4>{product}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Entities */}
      <section>
        <div className="container">
          <h2 className="section-title">Connected <span className="accent">Entities</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {ENTITIES.filter((e) => e.slug !== entity.slug).slice(0, 5).map((e) => (
              <Link
                key={e.slug}
                href={`/entities/${e.slug}`}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', padding: '1.25rem', borderTop: `2px solid ${e.color}` }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: e.color, fontSize: '1.1rem' }}>
                  {e.name}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{e.role}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            Deploy <span style={{ color: entity.color }}>{entity.name}</span>
          </h2>
          <p style={{ maxWidth: '550px', margin: '0 auto 2rem', opacity: 0.85 }}>
            Ready to integrate {entity.name} into your enterprise? Start with a conversation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">Enterprise Inquiry →</Link>
            <Link href="/products" className="btn btn-secondary">View All Products →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
