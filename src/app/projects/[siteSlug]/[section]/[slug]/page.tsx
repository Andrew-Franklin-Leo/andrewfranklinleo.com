import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { MicrositeNav } from "@/components/microsite-nav";
import { getEntitiesBySite, getSiteEntityBySlug } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { sectionForType } from "@/lib/entities";
import { getSiteBySlug, sites } from "@/lib/sites";

export async function generateStaticParams() {
  const params: { siteSlug: string; section: string; slug: string }[] = [];
  for (const site of sites) {
    const entities = await getEntitiesBySite(site.siteId);
    params.push(...entities.map((entity) => ({ siteSlug: site.slug, section: sectionForType(entity.entityType), slug: entity.slug })));
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string; section: string; slug: string }> }): Promise<Metadata> {
  const { siteSlug, section, slug } = await params;
  const site = getSiteBySlug(siteSlug);
  const entity = site ? await getSiteEntityBySlug(site.siteId, section, slug) : undefined;
  return entity && site ? { title: `${entity.entityName} - ${site.name}`, description: entity.problem ?? entity.entityName } : {};
}

export default async function MicrositeEntity({ params }: { params: Promise<{ siteSlug: string; section: string; slug: string }> }) {
  const { siteSlug, section, slug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  const entity = await getSiteEntityBySlug(site.siteId, section, slug);
  if (!entity) notFound();
  const html = await markdownToHtml(entity.content);
  const canonicalHref = entity.siteIds.includes("SITE-ROOT") ? `/${section}/${entity.slug}` : `/projects/${site.slug}/${section}/${entity.slug}`;
  const canonicalLabel = entity.siteIds.includes("SITE-ROOT") ? "Open on root registry" : "This microsite is the canonical view";
  return <main className={`microsite theme-${site.theme}`}><MicrositeNav site={site} /><section className="entity-page shell"><Link className="back-link" href={`/projects/${site.slug}/${section}`}>&lt;- Back to {section}</Link><div className="entity-header"><div><p className="eyebrow">{site.name} / {entity.entityType} / {entity.entityId}</p><h1 className="page-title">{entity.entityName}</h1></div><div className="entity-status"><span>{entity.status}</span><span>v{entity.version}</span></div></div><div className="entity-layout"><article><MarkdownContent html={html} /></article><aside className="entity-aside"><dl><div><dt>Created</dt><dd>{entity.created}</dd></div><div><dt>Updated</dt><dd>{entity.updated}</dd></div><div><dt>Origin</dt><dd>{entity.origin ?? "-"}</dd></div><div><dt>Parent</dt><dd>{entity.parent ?? "-"}</dd></div></dl><div className="related"><p className="eyebrow">Canonical identity</p><Link href={canonicalHref}>{canonicalLabel} -&gt;</Link></div></aside></div></section></main>;
}
