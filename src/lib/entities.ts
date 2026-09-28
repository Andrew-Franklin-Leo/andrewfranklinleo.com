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

export const epistemicStatuses = ["observed", "reported", "claimed", "reconstructed", "inferred", "predicted", "simulated"] as const;

const stateValue = z.union([z.string(), z.number(), z.boolean(), z.null(), z.record(z.string(), z.unknown()), z.array(z.unknown())]);
const optionalEntityDate = z.union([z.string(), z.date()]).optional().transform((value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value,
);

export const stateSnapshotSchema = z.object({
  key: z.string().min(1),
  value: stateValue,
  asOf: optionalEntityDate,
  authority: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
});

export const stateTransitionSchema = z.object({
  transitionId: z.string().min(1),
  event: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  occurredAt: optionalEntityDate,
  epistemicStatus: z.enum(epistemicStatuses).default("reported"),
  authority: z.string().optional(),
  evidence: z.array(z.string()).optional().default([]),
  provenance: z.array(z.string()).optional().default([]),
  confidence: z.number().min(0).max(1).optional(),
});

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
  states: z.array(stateSnapshotSchema).optional().default([]),
  transitions: z.array(stateTransitionSchema).optional().default([]),
});

export type EntityFrontmatter = z.infer<typeof entityFrontmatterSchema>;

export type Entity = EntityFrontmatter & {
  slug: string;
  content: string;
};

export type StateSnapshot = z.infer<typeof stateSnapshotSchema>;
export type StateTransition = z.infer<typeof stateTransitionSchema>;

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
