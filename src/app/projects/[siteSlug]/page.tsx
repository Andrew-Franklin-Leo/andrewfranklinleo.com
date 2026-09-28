import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MicrositeNav } from "@/components/microsite-nav";
import { MicrositeCampaign } from "@/components/microsite-campaign";
import { StpOverview } from "@/components/stp-overview";
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
  if (site.slug === "state-transition-protocol") return <main className={`microsite theme-${site.theme}`}><MicrositeNav site={site} /><StpOverview entities={entities} /></main>;
  return <main className={`microsite theme-${site.theme}`}><MicrositeNav site={site} /><MicrositeCampaign site={site} entities={entities} /></main>;
}
