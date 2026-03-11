import type { Metadata } from 'next';
import './globals.css';
import NavClient from '@/components/NavClient';
import { AuthProvider } from '@/components/AuthProvider';
import ReadingList from '@/components/ReadingList';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: 'andrewfranklinleo.com — Obligation Intelligence Across Every Industry, Every Country',
  description:
    'The narrative platform for AI governance. Regulatory intelligence, enforcement tracking, and accountability architecture covering 100,000+ industry codes across 50+ jurisdictions. Powered by the AINEFF ecosystem.',
  keywords: [
    'AI governance',
    'ORF Protocol',
    'obligation infrastructure',
    'AI accountability',
    'AI regulation',
    'AINEFF',
    'AINEF',
    'enterprise governance',
    'regulatory intelligence',
    'AI compliance',
    'governance framework',
    'EU AI Act',
    'NIST AI RMF',
    'manufacturing AI',
    'financial services AI',
    'healthcare AI',
    'parametric insurance',
    'AI risk management',
  ],
  openGraph: {
    title: 'andrewfranklinleo.com — The Narrative Platform for AI Governance',
    description: 'Obligation intelligence across every industry, every country, every language. 100,000+ industry codes. 50+ jurisdictions. 10 ecosystem entities.',
    url: 'https://andrewfranklinleo.com',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F5A623" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="animated-bg" id="animated-bg" />

        <AuthProvider>
          <NavClient />
          <main>{children}</main>
          <ReadingList />
          <ServiceWorkerRegistration />
        </AuthProvider>

        <footer className="footer">
          <div className="container">
            <div className="footer__grid">
              {/* Column 1: Brand */}
              <div>
                <div className="footer__brand">andrewfranklinleo</div>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.7, maxWidth: '280px' }}>
                  The narrative platform for AI governance intelligence. Every industry. Every country. Every language.
                </p>
              </div>

              {/* Column 2: Verticals */}
              <div>
                <div className="footer__heading">Verticals</div>
                <a href="/verticals/governance">AI Governance</a>
                <a href="/verticals/manufacturing">Manufacturing</a>
                <a href="/verticals/financial-services">Financial Services</a>
                <a href="/verticals/healthcare">Healthcare</a>
                <a href="/verticals/technology">Technology</a>
                <a href="/verticals">All Verticals</a>
              </div>

              {/* Column 3: Regions */}
              <div>
                <div className="footer__heading">Regions</div>
                <a href="/regions/european-union">European Union</a>
                <a href="/regions/united-states">United States</a>
                <a href="/regions/united-kingdom">United Kingdom</a>
                <a href="/regions/singapore">Singapore</a>
                <a href="/regions">All Regions</a>
              </div>

              {/* Column 4: Ecosystem */}
              <div>
                <div className="footer__heading">Ecosystem</div>
                <a href="/entities/aureya">Aureya</a>
                <a href="/entities/aineff">AINEFF</a>
                <a href="/entities/ainef">AINEF</a>
                <a href="/entities/aineg">AINEG</a>
                <a href="/entities">All Entities</a>
              </div>

              {/* Column 5: Platform */}
              <div>
                <div className="footer__heading">Platform</div>
                <a href="/essays">Frameworks</a>
                <a href="/products">Products</a>
                <a href="/intelligence">Intelligence</a>
                <a href="/rankings">Rankings</a>
                <a href="/tracker">Tracker</a>
                <a href="/video">Video</a>
              </div>

              {/* Column 6: Resources */}
              <div>
                <div className="footer__heading">Resources</div>
                <a href="/newsletter">Newsletter</a>
                <a href="/podcast">Podcast</a>
                <a href="/community">Community</a>
                <a href="/api-docs">API Docs</a>
                <a href="/licensing">Licensing</a>
                <a href="/enterprise">Enterprise</a>
                <a href="/my-feed">My Feed</a>
                <a href="/authors">Authors</a>
                <a href="/subscribe">Subscribe</a>
                <a href="/contact">Contact</a>
              </div>
            </div>

            <div className="footer__bottom">
              <p className="footer__quote">
                &ldquo;The architecture exists. The systems are real. The question is whether accountability
                becomes infrastructure — or remains a wish.&rdquo;
              </p>
              <p className="footer__copy">&copy; 2026 andrewfranklinleo.com. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
