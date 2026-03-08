---
sidebar_position: 1
---

# Agent Team

12 specialized AI agents for platform development, content, and operations.

## Agent Roster

| Agent | File | Role |
|-------|------|------|
| **Orchestrator** | `afl-orchestrator.md` | Master pipeline coordinator |
| **Frontend Developer** | `afl-frontend-developer.md` | Next.js/React/Tailwind UI |
| **Backend Architect** | `afl-backend-architect.md` | Firebase/Stripe/API infrastructure |
| **Content Strategist** | `afl-content-strategist.md` | Content from Invention Tools |
| **Growth Hacker** | `afl-growth-hacker.md` | Subscriber acquisition, referrals |
| **Brand Guardian** | `afl-brand-guardian.md` | Design consistency, voice checks |
| **Revenue Operator** | `afl-revenue-operator.md` | 9 revenue stream management |
| **Reality Checker** | `afl-reality-checker.md` | QA, route verification, testing |
| **Governance Analyst** | `afl-governance-analyst.md` | Regulatory intelligence |
| **Executive Summary** | `afl-executive-summary.md` | Board-level communications |
| **Sprint Prioritizer** | `afl-sprint-prioritizer.md` | RICE scoring, backlog management |

All agent files located at `.claude/agents/afl-*.md`.

## Orchestration Model

```
                        ┌───────────────────┐
                        │   Orchestrator    │
                        │  (Master Pipeline) │
                        └────────┬──────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
   ┌──────▼──────┐       ┌──────▼──────┐       ┌──────▼──────┐
   │   Build     │       │   Content   │       │   Business  │
   │   Stream    │       │   Stream    │       │   Stream    │
   ├─────────────┤       ├─────────────┤       ├─────────────┤
   │ Frontend    │       │ Content     │       │ Revenue     │
   │ Developer   │       │ Strategist  │       │ Operator    │
   │             │       │             │       │             │
   │ Backend     │       │ Governance  │       │ Growth      │
   │ Architect   │       │ Analyst     │       │ Hacker      │
   │             │       │             │       │             │
   │ Reality     │       │ Brand       │       │ Executive   │
   │ Checker     │       │ Guardian    │       │ Summary     │
   └─────────────┘       └─────────────┘       └─────────────┘
```

## Quick Activation

### Full Pipeline
```
Activate: afl-orchestrator
Prompt: "Run the full launch pipeline for andrewfranklinleo.com."
```

### Build a Page
```
Activate: afl-frontend-developer
Prompt: "Build a new page at /[route] following the design system."
```

### Write Content
```
Activate: afl-content-strategist
Prompt: "Write a new framework essay on [topic] using [Invention Tools document]."
```

### Pre-Launch QA
```
Activate: afl-reality-checker
Prompt: "Test all 27 routes, all API endpoints, and mobile responsiveness."
```

### Sprint Planning
```
Activate: afl-sprint-prioritizer
Prompt: "Plan the next 2-week sprint using RICE scoring."
```

## Agent Context

Every agent has access to:
- Complete tech stack context (Next.js 16, React 19, TypeScript 5)
- Full content library (70+ Invention Tools documents)
- Revenue strategy and pricing data
- Brand identity guidelines
- All proprietary terms (ORF Protocol, Atomic Constraint, etc.)
