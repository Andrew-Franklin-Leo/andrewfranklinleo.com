import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProduct } from '@/data/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const product = getProduct(slug);
    if (!product) return { title: 'Not Found' };
    return {
      title: `${product.name} — ${product.price} | 90-Day Proof Unit`,
      description: product.description,
    };
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Link href="/products" style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>All Products</Link>
            <span style={{ opacity: 0.3 }}>/</span>
            <Link href={`/verticals/${product.vertical}`} style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>
              {product.vertical.replace('-', ' ')}
            </Link>
          </div>
          <span className="card__tag" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            90-Day Proof Unit
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
            {product.tagline}
          </p>
          <p style={{ fontSize: '1.05rem', maxWidth: '750px', opacity: 0.85, lineHeight: 1.8 }}>
            {product.description}
          </p>
        </div>
      </section>

      {/* Key Numbers */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase' }}>Investment</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>
                {product.price}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>90-day pilot</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase' }}>Return</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>
                {product.roi}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>within 90 days</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase' }}>Expansion</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>
                {product.expansion}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>recurring licensing</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Buyer */}
      <section>
        <div className="container">
          <h2 className="section-title">The <span className="accent">Buyer</span></h2>
          <div className="grid-2">
            <div className="card">
              <h4>Target Role</h4>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{product.buyer}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '0.5rem' }}>{product.buyerTitle}</p>
            </div>
            <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
              <h4>What They Say</h4>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8 }}>
                &ldquo;{product.complaint}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section>
        <div className="container">
          <h2 className="section-title">Target <span className="accent">Metrics</span></h2>
          <div className="grid-3">
            {product.metrics.map((m) => (
              <div key={m.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{m.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.4 }}>Baseline</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{m.baseline}</div>
                  </div>
                  <span style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}>→</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.4 }}>Target</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{m.target}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kill Condition */}
      <section>
        <div className="container">
          <div className="card" style={{ borderLeft: '3px solid #EF4444', maxWidth: '600px' }}>
            <h3>Kill Condition</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8 }}>
              {product.killCondition}. If the metric doesn&apos;t move, we stop. No extended engagements.
              No renegotiation. Proof or nothing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            Deploy the <span className="accent">{product.name}</span>
          </h2>
          <p style={{ maxWidth: '550px', margin: '0 auto 2rem', opacity: 0.85, lineHeight: 1.8 }}>
            90 days. {product.price}. {product.roi} ROI. One kill condition. No ambiguity.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">Start the Conversation →</Link>
            <Link href="/products" className="btn btn-secondary">View All Products →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
