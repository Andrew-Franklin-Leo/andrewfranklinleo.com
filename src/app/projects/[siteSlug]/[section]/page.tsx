import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityCard } from "@/components/entity-card";
import { getEntitiesBySite } from "@/lib/content";
import { sectionForType } from "@/lib/entities";
import { getSiteBySlug, sites } from "@/lib/sites";

const sections = ["ideas", "systems", "intelligence", "economics", "civilization", "ventures", "research", "models"];

const sectionGuidance: Record<string, string> = {
  ideas: "Concepts and hypotheses connected to this project's larger question.",
  systems: "Architectures, protocols, and mechanisms that make the project operational.",
  intelligence: "Capability, agency, memory, and learning relevant to this project.",
  economics: "Value, risk, attribution, settlement, and capital implications.",
  civilization: "The project viewed as part of broader institutional and civilizational systems.",
  ventures: "Applications and implementation hypotheses that could carry the work into practice.",
  research: "Evidence, investigations, experiments, and source material informing the project.",
  models: "Formal representations that make the project's assumptions and limits explicit.",
};

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
  return <main className={`microsite theme-${site.theme}`}><section className="section-page shell"><p className="eyebrow">{site.name} / {section}</p><h1 className="page-title">{section}</h1><p className="page-intro">{sectionGuidance[section]}</p>{entities.length ? <div className="object-grid">{entities.map((entity) => <EntityCard entity={entity} hrefPrefix={`/projects/${site.slug}`} key={entity.entityId} />)}</div> : <section className="section-guide"><p className="eyebrow">Site view</p><h2>{site.name} / {section}</h2><p>{sectionGuidance[section]}</p><p className="empty-state">No entities are published in this site view yet. The section remains available as part of the shared registry structure.</p></section>}</section></main>;
}
