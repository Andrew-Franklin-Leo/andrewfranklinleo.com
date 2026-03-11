---
title: Aureya Builder
sidebar_label: Aureya Builder
sidebar_position: 15
description: Full-stack AI app builder that transforms natural language descriptions into deployed applications with database, API, and frontend generation.
---

# Aureya Builder

**Describe it. Deploy it.** Aureya Builder is the full-stack application generation platform of the AINEFF ecosystem. Describe what you want to build in natural language, and Aureya Builder generates a complete application: database schema, API layer, frontend interface, authentication, and deployment configuration. When you outgrow the builder, eject your application into an Aureya Code workspace for full control.

---

## Core Capabilities

### Natural Language to Application

Describe your application in plain English and Aureya Builder generates a working prototype.

**Example**

```
User: "Build a customer feedback tracking tool. Users can submit
feedback with a title, description, and category (bug, feature
request, improvement). Admins can view all feedback, filter by
category and status, change status (new, reviewing, planned,
completed, rejected), and add internal notes. Include a public
roadmap page showing planned and completed items."

→ Aureya Builder generates:
  - PostgreSQL schema (users, feedback, notes, roadmap_items)
  - REST API with CRUD endpoints and auth middleware
  - React frontend with:
    - Public feedback submission form
    - Admin dashboard with filters and status management
    - Internal notes panel
    - Public roadmap page with category grouping
  - Authentication (email/password + Google OAuth)
  - Deployment configuration for one-click launch
```

### Database Generation

Aureya Builder designs and provisions the database layer.

- **Schema design**: AI generates normalized database schemas from natural language requirements
- **Relationship mapping**: Foreign keys, junction tables, and cascading rules are configured automatically
- **Seed data**: Realistic sample data is generated for development and testing
- **Migration scripts**: Schema changes generate versioned migration scripts
- **Database options**: PostgreSQL (default), MySQL, SQLite, MongoDB, or Supabase

### API Generation

Complete API layer with authentication, validation, and documentation.

- **REST endpoints**: CRUD endpoints for every entity with proper HTTP methods, status codes, and error handling
- **GraphQL option**: Generate a GraphQL schema and resolvers instead of or alongside REST endpoints
- **Authentication**: Email/password, OAuth (Google, GitHub, Microsoft), magic link, and API key authentication
- **Authorization**: Role-based access control (RBAC) with configurable roles and permissions
- **Validation**: Input validation with descriptive error messages
- **Rate limiting**: Configurable rate limits per endpoint and per user
- **API documentation**: Auto-generated OpenAPI/Swagger documentation

### Frontend Generation

Modern, responsive frontend applications.

- **React frontend**: Component-based architecture with TypeScript, responsive design, and accessibility
- **Framework options**: React (default), Next.js, Vue, Svelte, or plain HTML/CSS/JS
- **Styling options**: Tailwind CSS (default), CSS Modules, styled-components, or Material UI
- **Forms**: Validated forms with error states, loading indicators, and success feedback
- **Tables and lists**: Sortable, filterable, paginated data displays
- **Charts and dashboards**: Data visualization with configurable chart types
- **Mobile responsive**: All generated interfaces work on desktop, tablet, and mobile

### One-Click Deployment

Deploy your application to production with a single action.

| Platform | Description |
|----------|-------------|
| **Aureya Cloud** | Managed hosting with automatic scaling, SSL, and custom domains |
| **Vercel** | Deploy Next.js and React applications with edge functions |
| **Netlify** | Static site and serverless function deployment |
| **Railway** | Full-stack deployment with database provisioning |
| **Docker** | Export as Docker containers for self-hosted deployment |
| **Custom** | Export deployment configuration for any platform |

### Iterative Refinement

Build incrementally through conversation.

- **Conversational updates**: "Add a notification system that emails users when their feedback status changes"
- **Feature additions**: Add new pages, entities, integrations, and workflows through natural language
- **Design changes**: "Make the dashboard more compact with a sidebar navigation instead of a top bar"
- **Logic changes**: "When a feedback item is marked as planned, automatically add it to the public roadmap"
- **Version history**: Every change creates a new version. Roll back to any previous state

### Eject to Aureya Code

When your application outgrows the builder environment, eject it into a full Aureya Code workspace.

- **Clean code export**: Generated code follows industry-standard patterns and is fully readable and maintainable
- **No vendor lock-in**: Ejected code has no dependency on Aureya Builder infrastructure
- **Configuration preservation**: Environment variables, database connections, and deployment configuration transfer to the Code workspace
- **Continued AI assistance**: Aureya Code inherits the Builder's context about your application, providing informed assistance from day one

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Aureya Builder                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                Builder Interface                      │   │
│  │  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌──────────┐  │   │
│  │  │  Chat   │ │  Preview  │ │  Code  │ │ Deploy   │  │   │
│  │  │  Panel  │ │  Panel    │ │ Viewer │ │ Panel    │  │   │
│  │  └─────────┘ └───────────┘ └────────┘ └──────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │                 Generation Engine                     │   │
│  │                                                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Schema   │ │   API    │ │  Frontend          │   │   │
│  │  │ Designer │ │ Generator│ │  Generator         │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │  Auth    │ │ Deploy   │ │  Testing           │   │   │
│  │  │ Generator│ │ Config   │ │  Generator         │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Deployment Targets                       │   │
│  │  ┌──────┐ ┌───────┐ ┌────────┐ ┌───────┐ ┌───────┐ │   │
│  │  │Aureya│ │Vercel │ │Netlify │ │Railway│ │Docker │ │   │
│  │  │Cloud │ │       │ │        │ │       │ │       │ │   │
│  │  └──────┘ └───────┘ └────────┘ └───────┘ └───────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Ecosystem Integrations (AINEG)                │   │
│  │  Code | Drive | Hub | Design                          │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Integration with the AINEFF Ecosystem

### Aureya Code

The most critical integration. Builder applications can be ejected into full Aureya Code workspaces at any time. Aureya Code inherits the Builder's application context, providing informed AI assistance that understands the application's architecture, data model, and business logic from day one.

### Aureya Drive

Application data (user uploads, generated files, static assets) is stored in Aureya Drive, providing a familiar storage interface with AI-powered search and organization.

### Aureya Hub

Applications that use AI features source their models from Aureya Hub. Builder can integrate local inference (via Aureya Local) or cloud inference endpoints into generated applications.

### Aureya Design

Visual designs created in Aureya Design can be imported as templates for Builder-generated frontends, ensuring consistency with organizational design systems.

### Tower Control

Tower Control monitors Builder application health, performance, and security across the ecosystem, providing centralized visibility for organizations with multiple Builder applications.

---

## Governance and the ORF Protocol

Aureya Builder enforces Atomic Constraints at the application generation layer of the 15-Layer Reality Stack:

- **Security by default**: Generated applications include input validation, SQL injection prevention, XSS protection, CSRF tokens, and secure authentication
- **Dependency governance**: All generated dependencies are checked against known vulnerability databases before inclusion
- **Access control**: RBAC is generated by default for all applications with administrative interfaces
- **Data protection**: Generated applications include data encryption at rest and in transit
- **Pre-Incident Governance**: Applications are security-scanned before deployment. Known vulnerability patterns in generated code are caught and remediated automatically
- **Audit trail**: Every generation, modification, and deployment action is logged for compliance

---

## Pricing

| Feature | Free (1 app) | Pro ($25/mo) | Business ($75/seat/mo) |
|---------|-------------|-------------|----------------------|
| Applications | 1 | 10 | Unlimited |
| Database | SQLite | PostgreSQL, MySQL, MongoDB | All + Supabase |
| API generation | REST | REST + GraphQL | REST + GraphQL |
| Frontend frameworks | React | React, Next.js, Vue | All frameworks |
| Authentication | Email/password | OAuth + magic link | All + SSO/SAML |
| Deployment targets | Aureya Cloud | Aureya Cloud + Vercel + Netlify | All targets |
| Custom domains | -- | 3 | Unlimited |
| Eject to Aureya Code | -- | Yes | Yes |
| Version history | 7 days | 90 days | Unlimited |
| Aureya Drive storage | 1 GB | 10 GB | 50 GB/seat |
| AI refinement turns per day | 20 | Unlimited | Unlimited |
| Collaboration | -- | -- | Yes |
| Admin console | -- | -- | Yes |
| API access | -- | -- | Yes |
| Priority support | -- | Email | Dedicated |

---

## Competitive Positioning

Aureya Builder competes in the AI app builder space alongside Bolt, Lovable, Replit Agent, and v0 by Vercel. The key differentiators are:

1. **Full-stack generation**: Complete database, API, authentication, frontend, and deployment rather than frontend-only generation
2. **Eject to Aureya Code**: Clean escape hatch to a full development environment when applications outgrow the builder, with inherited context
3. **Multiple framework options**: Generate in React, Next.js, Vue, Svelte, or plain HTML rather than being locked to one framework
4. **Multiple deployment targets**: Deploy to Aureya Cloud, Vercel, Netlify, Railway, or Docker rather than a single hosting platform
5. **Ecosystem integration**: Direct connection to Drive for storage, Hub for AI models, Design for visual templates, and Code for advanced development
6. **ORF Protocol governance**: Security scanning, dependency governance, and compliance logging built into the generation pipeline

Aureya Builder is not a prototype tool. It is a full-stack application generator that produces production-ready, secure, and maintainable applications from natural language, with a clear path to full development control through Aureya Code when needed.
