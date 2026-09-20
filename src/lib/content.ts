import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { Entity, entityFrontmatterSchema, entitySlug, sectionForType } from "./entities";

const contentDirectory = path.join(process.cwd(), "content");

async function readLocalEntities(): Promise<Entity[]> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(contentDirectory)).filter((file) => file.endsWith(".md"));
  } catch {
    return [];
  }

  const entities = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(contentDirectory, file), "utf8");
      const parsed = matter(raw);
      const frontmatter = entityFrontmatterSchema.parse(parsed.data);
      return { ...frontmatter, slug: entitySlug(frontmatter), content: parsed.content.trim() };
    }),
  );

  return entities.filter((entity) => entity.status !== "archived");
}

export async function getAllEntities() {
  return readLocalEntities();
}

export async function getRootEntities() {
  const entities = await getAllEntities();
  return entities.filter((entity) => entity.siteIds.includes("SITE-ROOT"));
}

export async function getEntitiesBySite(siteId: string) {
  const entities = await getAllEntities();
  return entities.filter((entity) => entity.siteIds.includes(siteId));
}

export async function getSiteEntityBySlug(siteId: string, section: string, slug: string) {
  const entities = await getEntitiesBySite(siteId);
  return entities.find((entity) => sectionForType(entity.entityType) === section && entity.slug === slug);
}

export async function getEntityBySlug(section: string, slug: string) {
  const entities = await getRootEntities();
  return entities.find((entity) => sectionForType(entity.entityType) === section && entity.slug === slug);
}

export async function getEntitiesBySection(section: string) {
  const entities = await getRootEntities();
  return entities.filter((entity) => sectionForType(entity.entityType) === section);
}

export async function getRelatedEntities(entity: Entity) {
  const entities = await getAllEntities();
  const relationIds = new Set([
    ...entity.relatedConcepts,
    ...entity.evidence,
    ...entity.experiments,
    ...entity.ventures,
    ...entity.dependencies,
    entity.parent ?? "",
  ]);
  return entities.filter((candidate) => relationIds.has(candidate.entityId));
}

export async function searchEntities(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const entities = await getAllEntities();
  return entities.filter((entity) =>
    [entity.entityName, entity.entityType, entity.content, entity.problem, entity.hypothesis]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}
