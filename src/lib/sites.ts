import { z } from "zod";

export const siteThemes = ["root", "aureya", "research", "venture"] as const;

export const siteSchema = z.object({
  siteId: z.string().min(3),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  theme: z.enum(siteThemes),
  domain: z.string().optional(),
  status: z.enum(["active", "draft", "archived"]),
});

export type Site = z.infer<typeof siteSchema>;

export const sites: Site[] = [
  {
    siteId: "SITE-AUREYA",
    name: "Aureya",
    slug: "aureya",
    description: "A protocol for legitimate coordination between citizens, institutions, and intelligent agents.",
    theme: "aureya",
    status: "active",
  },
  {
    siteId: "SITE-CCC",
    name: "Civilization Coordination Crisis",
    slug: "civilization-coordination-crisis",
    description: "Research into the coordination failures beneath civilization's visible crises.",
    theme: "research",
    status: "active",
  },
];

export function getSiteBySlug(slug: string) {
  return sites.find((site) => site.slug === slug && site.status === "active");
}
