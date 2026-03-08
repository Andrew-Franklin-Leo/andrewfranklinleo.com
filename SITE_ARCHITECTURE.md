# andrewfranklinleo.com — Site Architecture Specification

## Purpose
Personal authority site. The "Trust Anchor" of the Frankmax ecosystem.
Establishes Andrew Palupillai / Andrew Franklin Leo as the definitive voice on
AI governance, obligation infrastructure, and institutional decision control.

## Target Audience
- C-suite executives (COO, CFO, CISO, General Counsel)
- Institutional investors and sovereign wealth funds
- Regulators and policy makers
- AI governance researchers and think tanks
- Media covering AI governance, institutional risk, decision systems

## Tech Stack
| Component | Choice | Reason |
|-----------|--------|--------|
| Framework | Next.js 15 (App Router) | SSG for SEO, fast loading, Vercel deployment |
| Styling | Tailwind CSS 4 | Utility-first, dark premium aesthetic |
| Font | Inter (headings), JetBrains Mono (code/data) | Clean authority feel |
| Deployment | Vercel | Zero-config, global CDN, free tier sufficient |
| Analytics | Plausible (self-hosted) or Vercel Analytics | Privacy-first |
| CMS | MDX files in repo | No external dependency, git-backed |
| Email | ConvertKit or Buttondown | Simple, API-driven, no lock-in |

## Design System
- **Palette**: Slate-950 primary, Blue-400 accent, White text on dark
- **Typography**: Large headers (text-5xl+), generous whitespace, mono for data
- **Aesthetic**: Dark, institutional, precise. Like Bloomberg meets a legal brief.
- **No**: Gradients (minimal), stock photos, emoji, casual language, animations

## Page Structure

```
/                           → Landing page (thesis statement + essay index)
/about                      → Professional bio + credentials
/essays                     → Essay index (all published frameworks)
/essays/[slug]              → Individual essay (long-form, 2000-3000 words)
/speaking                   → Speaking topics + availability
/contact                    → Email capture + booking link
/subscribe                  → Newsletter signup
```

## SEO Strategy
Primary keywords:
- "AI governance framework"
- "AI accountability framework"
- "Responsible AI infrastructure"
- "AI decision liability"
- "Pre-incident governance"
- "ORF Protocol"
- "Obligation and Responsibility Finality"

Schema.org structured data: Person, Article, Organization
Open Graph images: Auto-generated per essay with title overlay

## Content Publishing Cadence
- Month 1: ORF thesis + Atomic Constraint (2 foundational essays)
- Month 2: 15-Layer Reality Stack + Pre-Incident essay (2 framework pieces)
- Month 3: Centi-Trillion thesis + Fragility Codex (2 vision pieces)
- Ongoing: Weekly LinkedIn posts excerpting essays, linking back to site
- KPI: 10,000 unique visitors/month by Month 3

## Cross-Domain Linking
- Essays reference frankmax.digital for service/assessment CTAs
- Certification mentions link to levelup-max.com
- All three domains share consistent branding language but distinct positioning
- One-way information flow: Ideas → Standards → Filters → Execution

## Email Capture
- End of each essay: "Subscribe for structural governance insights"
- Lead magnet: "The 15-Layer Reality Stack" downloadable PDF
- No pop-ups. No modal interrupts. Inline capture only.

## Navigation
```
[Andrew Franklin Leo]  Essays  About  Speaking  Subscribe
```
Minimal. No dropdown menus. No hamburger on mobile — just stack vertically.
