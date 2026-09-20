import type { MetadataRoute } from "next";
import { getAllEntities, getRootEntities } from "@/lib/content";
import { sectionForType } from "@/lib/entities";
import { sites } from "@/lib/sites";

export const dynamic = "force-static";

const baseUrl = "https://andrewfranklinleo.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entities = await getRootEntities();
  const micrositeEntities = await getAllEntities();
  const sections = ["ideas", "systems", "intelligence", "economics", "civilization", "ventures", "research", "models"];
  return [
    { url: baseUrl, lastModified: new Date() },
    ...sections.map((section) => ({ url: `${baseUrl}/${section}`, lastModified: new Date() })),
    ...entities.map((entity) => ({ url: `${baseUrl}/${sectionForType(entity.entityType)}/${entity.slug}`, lastModified: new Date(entity.updated) })),
    ...sites.flatMap((site) => micrositeEntities.filter((entity) => entity.siteIds.includes(site.siteId)).map((entity) => ({ url: `${baseUrl}/projects/${site.slug}/${sectionForType(entity.entityType)}/${entity.slug}`, lastModified: new Date(entity.updated) }))),
  ];
}
