---
sidebar_position: 1
---

# Master Rebuild Plan — Skills & Tools Integration

How each of the 12 external repositories maps to specific platform capabilities, what they provide, and how they are used to make the platform bulletproof.

## Integration Matrix

| Repository | Primary Use | Platform Area | Priority |
|-----------|------------|---------------|----------|
| **GSD (get-shit-done)** | Phase-based build orchestration | Development workflow | Critical |
| **ui-ux-pro-max-skill** | 67 UI styles, 96 palettes | Design system | High |
| **n8n-mcp** | Workflow automation (1,084 nodes) | Operations / Automation | High |
| **obsidian-skills** | Content management, markdown | Content pipeline | Medium |
| **awesome-claude-code (hesreallyhim)** | 200+ tools, hooks, orchestrators | Agent orchestration | Critical |
| **awesome-claude-skills (Composio)** | 500+ SaaS integrations | Third-party integrations | High |
| **awesome-claude-skills (travisvn)** | Progressive disclosure architecture | UX patterns | Medium |
| **awesome-claude-skills (BehiSecc)** | 100+ skills (security, marketing) | Security / Marketing | Medium |
| **awesome-claude-skills (JayZeeDesign)** | Enterprise + creative skills | Enterprise features | Medium |
| **awesome-claude-skills (karanb192)** | 50+ curated skills | Gap analysis | Low |
| **antigravity-awesome-skills** | 1,272+ SKILL.md format skills | Skill library | Medium |
| **awesome-agent-skills (VoltAgent)** | 549+ skills (Stripe, Vercel, etc.) | Platform services | High |

---

## 1. GSD (get-shit-done)

**Repository:** `gsd-build/get-shit-done`

**What it provides:**
- Phase-based development orchestration (Plan, Build, Test, Ship)
- Anti-context-rot patterns that prevent knowledge loss across sessions
- Wave-based execution model for parallel workstreams
- Structured task decomposition with dependency tracking

**How we use it:**

| GSD Feature | Platform Application |
|------------|---------------------|
| Phase gates | Each deployment passes Plan → Build → Test → Ship |
| Wave execution | Parallel feature development (monetization + content + infra) |
| Anti-context-rot | CLAUDE.md + memory files maintain project state |
| Task decomposition | Complex features broken into atomic, testable units |

**Integration pattern:**
```
GSD Phase 1 (Plan)    → Architecture docs, route planning
GSD Phase 2 (Build)   → Component development, API routes
GSD Phase 3 (Test)    → Build verification (0 errors, 27 routes)
GSD Phase 4 (Ship)    → Vercel deployment, Stripe activation
```

---

## 2. ui-ux-pro-max-skill

**Repository:** `nextlevelbuilder/ui-ux-pro-max-skill`

**What it provides:**
- 67 distinct UI styles (editorial, dashboard, commerce, etc.)
- 96 colour palettes with accessibility scores
- 100 industry-specific design rules
- Component patterns for media platforms

**How we use it:**

| UI/UX Feature | Platform Application |
|--------------|---------------------|
| Editorial style (#12) | Essay pages, article layouts |
| Dashboard style (#34) | Stakeholder Portal, billing views |
| Commerce style (#8) | Subscribe page, checkout flows |
| Dark theme palette (#67) | `#0D1117` background system |
| Forbes/FT patterns | Mega-navigation, content hierarchy |

**Specific applications:**
- **Subscribe page** — Commerce style with pricing cards, toggle, gold CTA buttons
- **Portal dashboard** — Dashboard style with tab navigation, data tables, usage metrics
- **Essay pages** — Editorial style with Playfair Display headings, optimal line-height
- **Navigation** — Forbes-model mega-nav with categorized dropdowns

---

## 3. n8n-mcp

**Repository:** `czlonkowski/n8n-mcp`

**What it provides:**
- MCP (Model Context Protocol) integration with n8n workflow automation
- Access to 1,084 n8n nodes and 2,709 workflow templates
- Event-driven automation pipelines
- Webhook-based triggers

**How we use it:**

| Automation | Workflow |
|-----------|---------|
| New subscriber | Stripe webhook → Welcome email → Firestore user doc → CRM update |
| Payment failed | Stripe event → Dunning email sequence → Usage downgrade |
| Content published | Essay markdown → Build trigger → Sitemap regeneration → Social distribution |
| Referral conversion | Purchase event → Commission calculation → Reward email → Ledger update |
| Daily newsletter | Content aggregation → Template render → Resend batch send |

**Key workflows to implement:**

```
┌──────────────┐     ┌──────────┐     ┌────────────┐     ┌──────────┐
│ Stripe Event │────→│ n8n Flow │────→│ Firestore  │────→│ Email    │
│ (webhook)    │     │ (process)│     │ (persist)  │     │ (notify) │
└──────────────┘     └──────────┘     └────────────┘     └──────────┘
```

---

## 4. obsidian-skills

**Repository:** `kepano/obsidian-skills`

**What it provides:**
- Markdown-first content management workflows
- Defuddle for web content scraping and cleaning
- Template-based content creation
- Bidirectional linking and knowledge graph patterns

**How we use it:**

| Feature | Application |
|---------|------------|
| Markdown workflows | Essay authoring pipeline (`content/essays/*.md`) |
| Defuddle scraper | Regulatory intelligence gathering for Tracker |
| Templates | Standardized essay frontmatter, case study format |
| Content linking | Cross-references between essays, verticals, regions |

**Content pipeline:**
```
Author (Markdown) → Essay Loader (lib/essays.ts) → SSG Build → CDN
                                                  → Search Index
                                                  → Sitemap Entry
```

---

## 5. awesome-claude-code (hesreallyhim)

**Repository:** `hesreallyhim/awesome-claude-code`

**What it provides:**
- 200+ tools and extensions for Claude Code
- Pre-commit hooks for code quality
- Slash command libraries
- Multi-agent orchestration patterns
- MCP server configurations

**How we use it:**

| Tool Category | Application |
|--------------|------------|
| Pre-commit hooks | TypeScript type checking, lint, build verification |
| Slash commands | `/deploy`, `/audit`, `/test` workflows |
| Orchestrators | 12-agent team coordination |
| MCP servers | File system, GitHub, Stripe integrations |

**Agent orchestration model:**
```
                    ┌─────────────────┐
                    │  Orchestrator   │
                    │  (CLAUDE.md)    │
                    └───────┬─────────┘
            ┌───────────────┼───────────────┐
            │               │               │
    ┌───────▼──────┐ ┌─────▼──────┐ ┌──────▼───────┐
    │ Build Agents │ │ QA Agents  │ │ Content Agent│
    │ (3 agents)   │ │ (2 agents) │ │ (2 agents)   │
    └──────────────┘ └────────────┘ └──────────────┘
```

---

## 6. awesome-claude-skills (Composio)

**Repository:** `ComposioHQ/awesome-claude-skills`

**What it provides:**
- 500+ SaaS integration skills
- 78 app connectors (Stripe, Firebase, Slack, etc.)
- Authentication and OAuth patterns
- API wrapper patterns

**How we use it:**

| Integration | Platform Feature |
|------------|-----------------|
| Stripe connector | Checkout, billing portal, webhooks |
| Firebase connector | Auth, Firestore CRUD, admin SDK |
| Resend/SendGrid | Transactional email delivery |
| Vercel connector | Deployment, environment variables |
| Analytics | Usage tracking, revenue dashboards |

---

## 7. awesome-claude-skills (travisvn)

**Repository:** `travisvn/awesome-claude-skills`

**What it provides:**
- Progressive disclosure architecture patterns
- Layered information reveal (overview → detail → expert)
- Complexity management for large platforms

**How we use it:**

| Pattern | Application |
|---------|------------|
| Progressive disclosure | Subscribe page (free → tiers → enterprise) |
| Layered navigation | Mega-nav with category → subcategory → item |
| Content gating | PaywallGate (meter bar → soft gate → hard gate) |
| Dashboard views | Portal tabs (Overview → Billing → Usage) |

---

## 8. awesome-claude-skills (BehiSecc)

**Repository:** `BehiSecc/awesome-claude-skills`

**What it provides:**
- 100+ skills spanning security, health, marketing, scientific domains
- Security audit patterns
- SEO and marketing automation
- Data analysis frameworks

**How we use it:**

| Skill Domain | Application |
|-------------|------------|
| Security audit | OWASP top 10 review of API routes |
| SEO optimization | Meta tags, OpenGraph, structured data, sitemap |
| Marketing copy | Landing page conversion optimization |
| Analytics | Revenue tracking, churn analysis |

---

## 9. awesome-claude-skills (JayZeeDesign)

**Repository:** `JayZeeDesign/awesome-claude-skills`

**What it provides:**
- Official Anthropic skill fork with enterprise and creative patterns
- Enterprise-grade error handling
- Creative content generation
- Developer experience patterns

**How we use it:**

| Skill | Application |
|-------|------------|
| Enterprise patterns | Institutional tier, enterprise pricing page |
| Error handling | API route error responses, webhook resilience |
| Content generation | Essay metadata, social sharing descriptions |

---

## 10. awesome-claude-skills (karanb192)

**Repository:** `karanb192/awesome-claude-skills`

**What it provides:**
- 50+ curated skills with quality ratings
- Gap analysis methodology
- Skill composition patterns

**How we use it:**
- Gap analysis against platform requirements
- Identifying missing capabilities before each deployment
- Quality benchmarking for generated code

---

## 11. antigravity-awesome-skills

**Repository:** `sickn33/antigravity-awesome-skills`

**What it provides:**
- 1,272+ reusable skills in SKILL.md format
- Standardized skill definition structure
- Cross-domain skill library
- Composable skill chains

**How we use it:**

| Skill Category | Count | Application |
|---------------|-------|------------|
| TypeScript/React | ~200 | Component patterns, hooks |
| API Design | ~150 | Route handler patterns |
| Testing | ~100 | Build verification |
| DevOps | ~80 | CI/CD, deployment |
| Content | ~60 | Essay formatting, SEO |

---

## 12. awesome-agent-skills (VoltAgent)

**Repository:** `VoltAgent/awesome-agent-skills`

**What it provides:**
- 549+ skills from major platforms (Anthropic, Google, Stripe, Vercel)
- Platform-specific integration skills
- Multi-provider agent patterns
- Production deployment skills

**How we use it:**

| Provider Skills | Application |
|----------------|------------|
| Stripe skills | Subscription lifecycle, tax compliance, promo codes |
| Vercel skills | Edge deployment, ISR, environment management |
| Firebase skills | Auth flows, Firestore security rules, admin operations |
| Next.js skills | App Router patterns, SSG, API routes |

---

## Rebuild Execution Plan

### Wave 1: Foundation (Critical Path)

| Task | Source Repos | Deliverable |
|------|-------------|-------------|
| Build orchestration | GSD | Phase-gated deployment pipeline |
| Agent team config | awesome-claude-code | 12 agents with CLAUDE.md coordination |
| Design system audit | ui-ux-pro-max | Verified colour, typography, spacing |

### Wave 2: Revenue Infrastructure

| Task | Source Repos | Deliverable |
|------|-------------|-------------|
| Stripe integration | VoltAgent, Composio | 31 products, webhooks, billing portal |
| Checkout flows | ui-ux-pro-max | Subscription + one-time checkout UX |
| Payment security | BehiSecc | OWASP audit of all 12 API routes |

### Wave 3: Content & Operations

| Task | Source Repos | Deliverable |
|------|-------------|-------------|
| Content pipeline | obsidian-skills | Essay authoring → build → CDN |
| Automation | n8n-mcp | Event-driven workflows |
| SEO & marketing | BehiSecc, karanb192 | Meta, OG, sitemap, structured data |

### Wave 4: Polish & Ship

| Task | Source Repos | Deliverable |
|------|-------------|-------------|
| Progressive UX | travisvn | Layered disclosure on all pages |
| Enterprise features | JayZeeDesign | Enterprise tier, institutional pricing |
| Gap analysis | karanb192, antigravity | Final audit, missing feature scan |
| Deployment | VoltAgent, GSD | Vercel production deployment |

---

## Verification Checklist

After each wave, verify:

- [ ] `npm run build` passes with 0 errors
- [ ] All 27 static routes render
- [ ] All 66+ dynamic routes generate
- [ ] All 12 API endpoints respond correctly
- [ ] Stripe checkout creates sessions for all 31 products
- [ ] PaywallGate enforces 3-free-article limit
- [ ] Email templates render in all clients
- [ ] Lighthouse scores: Performance 90+, SEO 100, Accessibility 90+
- [ ] No OWASP vulnerabilities in API routes
- [ ] Sitemap includes all 93+ URLs
