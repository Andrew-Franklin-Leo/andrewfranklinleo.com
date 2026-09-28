import { z } from "zod";

export const siteThemes = ["root", "aureya", "research", "venture", "protocol", "accountability"] as const;

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
  {
    siteId: "SITE-STP",
    name: "State Transition Protocol",
    slug: "state-transition-protocol",
    description: "An interoperability layer for independently operated realities, their state transitions, and purpose-specific world resolutions.",
    theme: "protocol",
    status: "active",
  },
  {
    siteId: "SITE-PIAI",
    name: "Programmable Institutional Accountability",
    slug: "institutional-accountability-infrastructure",
    description: "Infrastructure for proving, governing, attributing, pricing, insuring, and settling consequential machine-mediated actions.",
    theme: "accountability",
    status: "active",
  },
];

export function getSiteBySlug(slug: string) {
  return sites.find((site) => site.slug === slug && site.status === "active");
}
