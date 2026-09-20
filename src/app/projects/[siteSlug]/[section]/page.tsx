import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityCard } from "@/components/entity-card";
import { getEntitiesBySite } from "@/lib/content";
import { sectionForType } from "@/lib/entities";
import { getSiteBySlug, sites } from "@/lib/sites";

const sections = ["ideas", "systems", "intelligence", "economics", "civilization", "ventures", "research", "models"];

export async function generateStaticParams() {
  return sites.flatMap((site) => sections.map((section) => ({ siteSlug: site.slug, section })));
}

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string; section: string }> }): Promise<Metadata> {
  const { siteSlug, section } = await params;
  const site = getSiteBySlug(siteSlug);
  return site ? { title: `${section} - ${site.name}` } : {};
}

export default async function MicrositeSection({ params }: { params: Promise<{ siteSlug: string; section: string }> }) {
  const { siteSlug, section } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site || !sections.includes(section)) notFound();
  const entities = (await getEntitiesBySite(site.siteId)).filter((entity) => sectionForType(entity.entityType) === section);
  return <main className={`microsite theme-${site.theme}`}><section className="section-page shell"><p className="eyebrow">{site.name} / {section}</p><h1 className="page-title">{section}</h1><p className="page-intro">The {section} entities currently connected to this microsite.</p>{entities.length ? <div className="object-grid">{entities.map((entity) => <EntityCard entity={entity} hrefPrefix={`/projects/${site.slug}`} key={entity.entityId} />)}</div> : <p className="empty-state">No entities in this site view yet.</p>}</section></main>;
}
