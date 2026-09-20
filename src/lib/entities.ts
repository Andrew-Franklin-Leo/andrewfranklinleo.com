import { z } from "zod";

export const entityTypes = [
  "idea",
  "concept",
  "system",
  "research",
  "model",
  "experiment",
  "essay",
  "question",
  "venture",
  "artifact",
] as const;

export const entityStatuses = [
  "seed",
  "developing",
  "active",
  "validated",
  "archived",
] as const;

export const relationTypes = [
  "derives-from",
  "supports",
  "contradicts",
  "applied-to",
  "produces",
  "measured-by",
  "implemented-by",
  "evidenced-by",
  "evolved-from",
  "related-to",
  "commercialized-as",
] as const;

const optionalStringArray = z.array(z.string()).optional().default([]);
const entityDate = z.union([z.string().date(), z.date()]).transform((value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value,
);

export const entityFrontmatterSchema = z.object({
  entityId: z.string().min(3),
  entityName: z.string().min(1),
  entityType: z.enum(entityTypes),
  version: z.string().min(1),
  status: z.enum(entityStatuses),
  created: entityDate,
  updated: entityDate,
  siteIds: z.array(z.string()).optional().default(["SITE-ROOT"]),
  origin: z.string().optional(),
  parent: z.string().optional(),
  relatedConcepts: optionalStringArray,
  problem: z.string().optional(),
  hypothesis: z.string().optional(),
  evidence: optionalStringArray,
  counterarguments: optionalStringArray,
  applications: optionalStringArray,
  experiments: optionalStringArray,
  ventures: optionalStringArray,
  dependencies: optionalStringArray,
  openQuestions: optionalStringArray,
});

export type EntityFrontmatter = z.infer<typeof entityFrontmatterSchema>;

export type Entity = EntityFrontmatter & {
  slug: string;
  content: string;
};

export type RelationType = (typeof relationTypes)[number];

export type EntityRelation = {
  from: string;
  to: string;
  type: RelationType;
};

export function entitySlug(entity: Pick<EntityFrontmatter, "entityName">) {
  return entity.entityName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function sectionForType(type: EntityFrontmatter["entityType"]) {
  if (type === "idea" || type === "concept" || type === "question") return "ideas";
  if (type === "system") return "systems";
  if (type === "model") return "models";
  if (type === "venture") return "ventures";
  if (type === "research" || type === "experiment" || type === "essay") return "research";
  return "intelligence";
}
