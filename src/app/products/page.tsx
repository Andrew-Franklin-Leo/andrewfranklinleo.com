import Link from 'next/link';
import { PRODUCTS } from '@/data/products';

export const metadata = {
  title: 'Products — 90-Day Proof Units, Enterprise Platforms, and Intelligence Products',
  description: 'Six battle-tested 90-day proof units ($85K-$110K), enterprise platform licensing, parametric insurance, and institutional intelligence subscriptions.',
};

export default function ProductsPage() {
  const proofUnits = PRODUCTS.filter((p) => p.category === 'proof-unit');

  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <p className="hero__eyebrow">// Revenue Products</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Proof First. <span className="accent">Revenue Second</span>. Scale Third.
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', opacity: 0.85, lineHeight: 1.8 }}>
            Six 90-day proof units that generate $85K-$110K each with 5x-60x ROI.
            After proof, scale into $30K-$50K/month licensing. Then migrate to institutional
            AINEF platform licensing at $50K-$200K/month.
          </p>
        </div>
      </section>

      {/* Revenue Summary */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {[
              { label: 'Year 1 Target', value: '$300K-$600K', note: '4-6 proof units' },
              { label: 'Year 2 Target', value: '$3M-$8M', note: 'Platform expansion' },
              { label: 'Year 3+ Target', value: '$100M+', note: 'Institutional scale' },
              { label: 'Total TAM', value: '$50B+', note: '10,000 enterprises' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90-Day Proof Units */}
      <section>
        <div className="container">
          <h2 className="section-title">
            90-Day <span className="accent">Proof Units</span>
          </h2>
          <p style={{ maxWidth: '650px', marginBottom: '2rem', opacity: 0.85, lineHeight: 1.8 }}>
            Each proof unit is designed, priced, and kill-conditioned. If the metric doesn&apos;t improve by the checkpoint, we stop. No extended engagements. No scope creep. Proof or nothing.
          </p>
          <div className="grid-2">
            {proofUnits.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="card card--gold reveal"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="card__tag">{p.vertical.replace('-', ' ')}</span>
                <h3>{p.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>{p.tagline}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '1rem' }}>
                  &ldquo;{p.complaint}&rdquo;
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ opacity: 0.5 }}>Price</span>
                    <div style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>{p.price}</div>
                  </div>
                  <div>
                    <span style={{ opacity: 0.5 }}>ROI</span>
                    <div style={{ fontWeight: 600 }}>{p.roi}</div>
                  </div>
                  <div>
                    <span style={{ opacity: 0.5 }}>Expansion</span>
                    <div style={{ fontWeight: 600 }}>{p.expansion}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Products */}
      <section>
        <div className="container">
          <h2 className="section-title">
            Enterprise <span className="accent">Platforms</span>
          </h2>
          <div className="grid-2">
            {[
              { name: 'AINEF Platform', desc: 'AI-Native Enterprise Factory', price: '$50K-$200K/month', link: '/entities/ainef' },
              { name: 'AINEG Platform', desc: 'Portfolio Governance & Signal Enforcement', price: '$10K-$50K/month per enterprise', link: '/entities/aineg' },
              { name: 'AINE OS', desc: 'Complete Enterprise Operating System', price: '$5K-$50K/month + revenue share', link: '/entities/aine' },
              { name: 'Outcome Insurance', desc: 'Parametric AI Insurance', price: '8-15% of AINE revenue', link: '/entities/aureya' },
            ].map((p) => (
              <Link key={p.name} href={p.link} className="card reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{p.name}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.75rem' }}>{p.desc}</p>
                <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{p.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Products */}
      <section style={{ borderBottom: 'none' }}>
        <div className="container">
          <h2 className="section-title">
            Intelligence <span className="accent">Products</span>
          </h2>
          <div className="grid-3">
            {[
              { name: 'Obligation Intelligence', desc: 'Weekly governance signals', price: 'From $0/month', link: '/subscribe' },
              { name: 'Obligation Monitor', desc: 'Real-time regulatory tracker', price: 'From $500/year', link: '/intelligence' },
              { name: 'Governance Tracker', desc: 'Searchable enforcement database', price: 'From $2,000/year', link: '/intelligence' },
              { name: 'Case Studies', desc: 'Framework application examples', price: '$25-$8,000', link: '/case-studies' },
              { name: 'ORF Certification', desc: 'Operator training & certification', price: 'From $1,500', link: '/events' },
              { name: 'Constraint Council', desc: 'Governance leadership network', price: '$500-$2,500/year', link: '/council' },
            ].map((p) => (
              <Link key={p.name} href={p.link} className="card reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{p.name}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{p.desc}</p>
                <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.5rem' }}>{p.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
