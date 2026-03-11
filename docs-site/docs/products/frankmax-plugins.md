---
title: Frankmax Plugin Marketplace
sidebar_label: Frankmax Plugins
sidebar_position: 16
description: Discover and install plugins extending all Frankmax and Aureya tools, with skills, agents, hooks, MCP servers, and a developer SDK.
---

# Frankmax Plugin Marketplace

**Extend everything.** The Frankmax Plugin Marketplace is the extensibility layer of the AINEFF ecosystem. Every Aureya and Frankmax product exposes a plugin interface, and the Marketplace is where developers publish, discover, and install extensions that add new capabilities. From custom MCP servers for Aureya Code to specialized AI agents for Aureya Collab, the Marketplace transforms the ecosystem into an infinitely extensible platform.

---

## Core Capabilities

### Plugin Discovery

Browse and search the most comprehensive catalog of AI tool extensions available.

- **Category browsing**: Plugins organized by target product (Aureya Code, Aureya Collab, Aureya Notebook, etc.) and function (productivity, integration, analytics, security, compliance)
- **Trending plugins**: Real-time rankings of the most installed, highest-rated, and most actively maintained plugins
- **Recommendations**: Personalized plugin suggestions based on your installed products, usage patterns, and team size
- **Search**: Full-text search across plugin names, descriptions, tags, and README content
- **Collections**: Curated collections for common workflows ("Full-Stack Developer Essentials", "Enterprise Compliance Suite", "Marketing Team Toolkit")
- **Verified publishers**: Plugins from verified publishers are marked with a trust badge indicating code review and security audit

### Plugin Types

The Marketplace supports multiple plugin types, each extending different aspects of the ecosystem.

**Skills**

Skills add new capabilities to AI agents across the ecosystem.

- **Custom commands**: Add new slash commands to Aureya Code, Aureya Collab, or any product with a command interface
- **Domain expertise**: Skills that give agents specialized knowledge (legal analysis, medical terminology, financial modeling)
- **Workflow automation**: Skills that automate multi-step workflows (deploy to staging, generate release notes, update documentation)
- **Data processing**: Skills for parsing, transforming, and analyzing specific data formats

**Agents**

Complete AI agents that operate as autonomous team members.

- **Specialized assistants**: Agents trained for specific domains (QA testing, code review, technical writing, data analysis)
- **Integration agents**: Agents that bridge external services (Salesforce sync, JIRA migration, legacy system adapters)
- **Monitoring agents**: Agents that watch for specific conditions and take action (security scanning, performance monitoring, compliance checking)
- **Custom personalities**: Agents with custom personas for specific organizational needs

**Hooks**

Event-driven integrations that trigger on specific actions across the ecosystem.

- **Pre-commit hooks**: Run checks before code is committed (style enforcement, security scanning, license compliance)
- **Post-deploy hooks**: Trigger actions after deployment (smoke tests, notification, monitoring setup)
- **Content hooks**: Run processing on content before publication (brand compliance, legal review, accessibility check)
- **Data hooks**: Transform data as it flows between products (format conversion, enrichment, validation)

**MCP Servers**

Model Context Protocol servers that connect AI agents to external tools and services.

- **Database connectors**: Connect Aureya Code agents to PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, and more
- **API integrations**: Bridge to external APIs (Stripe, AWS, Twilio, SendGrid, Slack webhooks)
- **Internal tool connectors**: Connect agents to internal tools, dashboards, and data sources
- **Custom protocols**: MCP servers for proprietary protocols and legacy systems

### Developer SDK

Build and publish plugins with the Frankmax Developer SDK.

**SDK Features**

- **Plugin scaffold**: CLI tool that generates a plugin project with proper structure, types, and configuration
- **Type definitions**: Full TypeScript type definitions for all plugin interfaces across every product
- **Local testing**: Run and test plugins locally against a sandboxed product instance before publishing
- **Hot reload**: Changes to plugin code are reflected immediately during development
- **Documentation generator**: Auto-generate plugin documentation from code comments and type definitions

**Development Workflow**

```bash
# Install the SDK
npm install -g @frankmax/plugin-sdk

# Create a new plugin
frankmax plugin create my-plugin --type skill --target aureya-code

# Develop with hot reload
frankmax plugin dev

# Test in sandbox
frankmax plugin test

# Publish to marketplace
frankmax plugin publish
```

**Plugin Manifest**

```json
{
  "name": "my-custom-skill",
  "version": "1.0.0",
  "type": "skill",
  "target": ["aureya-code", "aureya-collab"],
  "description": "A custom skill that does something useful",
  "author": "your-org",
  "permissions": [
    "filesystem:read",
    "network:external",
    "database:query"
  ],
  "pricing": {
    "model": "free",
    "price": null
  },
  "compatibility": {
    "aureya-code": ">=2.0.0",
    "aureya-collab": ">=1.5.0"
  }
}
```

### Plugin Security

Every plugin undergoes security review before publication.

- **Permission model**: Plugins declare required permissions (filesystem access, network access, database access) in their manifest. Users see permissions before installation
- **Sandboxed execution**: Plugins run in isolated sandboxes with access only to declared permissions
- **Code review**: Plugins from unverified publishers undergo automated code analysis for malicious patterns
- **Vulnerability scanning**: Dependencies are checked against known vulnerability databases
- **Update security**: Plugin updates are diffed against the previous version, and significant permission changes require user re-approval
- **Revocation**: Malicious plugins can be remotely disabled across all installations by the Marketplace security team

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                 Frankmax Plugin Marketplace                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Marketplace Interface                 │   │
│  │  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌──────────┐  │   │
│  │  │ Browse  │ │  Plugin   │ │ Manage │ │Developer │  │   │
│  │  │ Catalog │ │  Detail   │ │Installed│ │ Console  │  │   │
│  │  └─────────┘ └───────────┘ └────────┘ └──────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │                 Marketplace Engine                     │   │
│  │                                                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Plugin   │ │ Security │ │  Distribution      │   │   │
│  │  │ Registry │ │ Scanner  │ │  CDN               │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Review   │ │ Analytics│ │  Billing Engine    │   │   │
│  │  │ Pipeline │ │ Pipeline │ │  (Revenue Share)   │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Plugin Runtime (per product)              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Sandbox  │ │Permission│ │  Lifecycle         │   │   │
│  │  │ Runtime  │ │ Manager  │ │  Manager           │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Target Products                               │   │
│  │  Code | Collab | PM | Notebook | Drive | Local | ... │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Monetization for Plugin Developers

The Marketplace provides multiple revenue models for plugin developers.

### Revenue Models

| Model | Description |
|-------|------------|
| **Free** | Open-source or freely distributed plugins |
| **Paid (one-time)** | Users pay once to install the plugin |
| **Subscription** | Users pay monthly for ongoing access and updates |
| **Freemium** | Free tier with paid upgrade for advanced features |
| **Usage-based** | Pricing based on usage volume (API calls, executions, data processed) |

### Revenue Share

- **Standard**: 70% to developer, 30% to Frankmax
- **Verified Publisher**: 80% to developer, 20% to Frankmax
- **Enterprise Partner**: Custom revenue share agreements

### Developer Analytics

- **Install metrics**: Total installs, active users, retention rate, churn
- **Usage metrics**: Feature usage, error rates, performance benchmarks
- **Revenue metrics**: Gross revenue, net revenue, refunds, subscription MRR
- **User feedback**: Ratings, reviews, feature requests, bug reports

---

## Integration with the AINEFF Ecosystem

### All Products

The Marketplace serves as the extensibility layer for every product in the ecosystem. Each product has a plugin runtime that loads, manages, and executes installed plugins in a sandboxed environment.

### Aureya Code

The primary plugin target. Code plugins include MCP servers, custom skills, code generation templates, linting rules, and deployment integrations. The Aureya Code plugin ecosystem is the most active in the Marketplace.

### Aureya Collab

Collab plugins add custom bots, workflow automations, and specialized agents to team channels. Popular categories include CI/CD notification bots, standup automation, and knowledge base integrations.

### Tower Control

Tower Control manages plugin governance at the organizational level. Administrators can approve, deny, or restrict specific plugins across their organization's Aureya installations.

---

## Governance and the ORF Protocol

The Frankmax Plugin Marketplace enforces Atomic Constraints at the extensibility layer of the 15-Layer Reality Stack:

- **Permission transparency**: Every plugin declares its required permissions in a human-readable manifest. Users make informed decisions about what access they grant
- **Sandboxed execution**: Plugins cannot escape their sandbox. A Code plugin cannot access Collab messages. A Collab plugin cannot read the filesystem beyond declared permissions
- **Security review pipeline**: Automated and manual security review before publication, with ongoing monitoring for vulnerabilities in published plugins
- **Revocation capability**: Malicious or compromised plugins can be remotely disabled across all installations
- **Pre-Incident Governance**: Plugins are evaluated for risk before publication. Permission requests that exceed the plugin's stated purpose trigger additional review
- **Constraint Council oversight**: The Constraint Council reviews marketplace governance policies and adjudicates disputes between developers, users, and the platform
- **Obligation Intelligence**: Plugin behavior patterns feed into the Obligation Intelligence pipeline, identifying emerging security risks and governance issues

---

## Pricing

### For Plugin Users

| Feature | Free | Developer Pro ($19/mo) |
|---------|------|----------------------|
| Browse and install free plugins | Yes | Yes |
| Install paid plugins | Yes (pay per plugin) | Yes (pay per plugin) |
| Plugin management dashboard | Basic | Advanced |
| Auto-updates | Yes | Yes |
| Priority support for plugin issues | -- | Yes |

### For Plugin Developers

| Feature | Free Developer | Developer Pro ($19/mo) |
|---------|---------------|----------------------|
| Publish free plugins | Yes | Yes |
| Publish paid plugins | -- | Yes |
| Developer SDK | Yes | Yes |
| Plugin analytics | Basic (installs only) | Full analytics suite |
| Revenue dashboard | -- | Yes |
| Verified publisher badge | -- | Eligible |
| Priority plugin review | -- | Yes (24-hour review) |
| Developer support | Community | Priority |
| Featured listing eligibility | -- | Yes |

---

## Competitive Positioning

The Frankmax Plugin Marketplace competes in the developer marketplace space alongside VS Code Marketplace, JetBrains Marketplace, Slack App Directory, and Salesforce AppExchange. The key differentiators are:

1. **Cross-product plugins**: A single plugin can extend multiple Aureya products rather than being locked to one application
2. **AI-native plugin types**: Skills, agents, and MCP servers are first-class plugin types designed for AI-augmented workflows
3. **Security-first design**: Sandboxed execution, permission transparency, and revocation capability built into the platform rather than relying on developer trust
4. **Developer SDK**: Purpose-built development toolkit with scaffolding, testing, and publishing that reduces time-to-marketplace
5. **ORF Protocol governance**: Constraint Council oversight and Obligation Intelligence monitoring that no other marketplace provides
6. **Revenue model flexibility**: Multiple monetization options (one-time, subscription, usage-based, freemium) rather than forcing developers into a single model

The Frankmax Plugin Marketplace transforms the Aureya ecosystem from a fixed product suite into an infinitely extensible platform, enabling developers to build, monetize, and distribute capabilities that serve the entire autonomous AI ecosystem.
