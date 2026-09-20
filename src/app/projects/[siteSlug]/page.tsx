import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EntityCard } from "@/components/entity-card";
import { MicrositeNav } from "@/components/microsite-nav";
import { getEntitiesBySite } from "@/lib/content";
import { getSiteBySlug, sites } from "@/lib/sites";

export async function generateStaticParams() {
  return sites.map((site) => ({ siteSlug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string }> }): Promise<Metadata> {
  const site = getSiteBySlug((await params).siteSlug);
  return site ? { title: site.name, description: site.description } : {};
}

export default async function MicrositeHome({ params }: { params: Promise<{ siteSlug: string }> }) {
  const site = getSiteBySlug((await params).siteSlug);
  if (!site) notFound();
  const entities = await getEntitiesBySite(site.siteId);
  return <main className={`microsite theme-${site.theme}`}><MicrositeNav site={site} /><section className="microsite-hero shell"><p className="eyebrow">Microsite / {site.siteId}</p><h1>{site.name}</h1><p className="microsite-lede">{site.description}</p><div className="microsite-actions"><Link className="button" href={`/projects/${site.slug}/research`}>Explore the work</Link><Link className="text-link" href="/">Return to the map</Link></div></section><section className="microsite-intro shell"><div><p className="eyebrow">A curated system view</p><h2>One project, connected to the larger theory.</h2></div><p>This microsite is a focused view over the shared entity registry. Its ideas, research, models, and ventures retain their canonical identities while gaining a distinct context.</p></section><section className="microsite-entities shell"><div className="section-head"><div><p className="eyebrow">Current entities</p><h2 className="section-title">What is taking shape.</h2></div><p>{entities.length} connected object{entities.length === 1 ? "" : "s"} in this site view.</p></div><div className="object-grid">{entities.map((entity) => <EntityCard entity={entity} hrefPrefix={`/projects/${site.slug}`} key={entity.entityId} />)}</div></section></main>;
}
