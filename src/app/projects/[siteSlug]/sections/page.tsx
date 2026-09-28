import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntitiesBySite } from "@/lib/content";
import { sectionForType } from "@/lib/entities";
import { getSiteBySlug, sites } from "@/lib/sites";

const sections = [
  ["ideas", "Questions becoming precise."],
  ["systems", "Architectures that make action possible."],
  ["intelligence", "Capability, agency, and learning."],
  ["economics", "Value, risk, and settlement."],
  ["civilization", "The wider institutional system."],
  ["ventures", "Ideas becoming implementation."],
  ["research", "Evidence and investigation."],
  ["models", "Formal representations and limits."],
];

export async function generateStaticParams() {
  return sites.map((site) => ({ siteSlug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string }> }): Promise<Metadata> {
  const site = getSiteBySlug((await params).siteSlug);
  return site ? { title: `${site.name} Structure`, description: `Browse the information structure of ${site.name}.` } : {};
}

export default async function SiteSections({ params }: { params: Promise<{ siteSlug: string }> }) {
  const site = getSiteBySlug((await params).siteSlug);
  if (!site) notFound();
  const entities = await getEntitiesBySite(site.siteId);
  return <main className={`microsite theme-${site.theme}`}><section className="section-page shell"><Link className="back-link" href={`/projects/${site.slug}`}>&lt;- Back to {site.name}</Link><p className="eyebrow">{site.name} / Information architecture</p><h1 className="page-title">Explore the<br /><em>structure.</em></h1><p className="page-intro">Every project uses the same eight shared entity types so ideas can become systems, research, models, and implementation without losing their context.</p><div className="site-sections-grid">{sections.map(([section, description], index) => { const count = entities.filter((entity) => sectionForType(entity.entityType) === section).length; return <Link className="site-section-card" href={`/projects/${site.slug}/${section}`} key={section}><span>0{index + 1}</span><h2>{section}</h2><p>{description}</p><strong>{count} object{count === 1 ? "" : "s"} -&gt;</strong></Link>; })}</div></section></main>;
}
