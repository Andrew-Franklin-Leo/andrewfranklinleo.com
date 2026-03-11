---
title: Aureya Code
sidebar_label: Aureya Code
sidebar_position: 4
description: Agentic AI coding tool with terminal, desktop, IDE, web, and mobile surfaces, deep codebase awareness, and autonomous multi-agent orchestration.
---

# Aureya Code

**The coding tool that thinks in systems, not snippets.** Aureya Code is the software engineering surface of the AINEFF ecosystem. It operates across five surfaces (terminal CLI, desktop app, VS Code and IDE extensions, web interface, and mobile app), understands entire codebases, and executes multi-step engineering tasks with the autonomy of a senior developer and the governance rigor of the ORF Protocol.

---

## Core Capabilities

### Multi-Surface Architecture

Aureya Code meets developers where they work, providing consistent capabilities across every surface.

| Surface | Description | Best For |
|---------|------------|---------|
| **Terminal CLI** | Direct terminal integration, runs alongside your existing shell | Power users, CI/CD pipelines, headless environments |
| **Desktop App** | Standalone application with integrated terminal and file browser | Full-featured development without an IDE |
| **VS Code / IDE** | Extension for VS Code, JetBrains IDEs, Neovim | Developers who prefer their existing editor |
| **Web** | Browser-based interface with cloud compute backend | Remote development, Chromebook, shared workspaces |
| **Mobile** | iOS and Android apps for review, monitoring, and light edits | On-the-go code review, agent monitoring |

All surfaces connect to the same workspace state. Start a task on your desktop, monitor progress from your phone, and review results in your IDE.

### Deep Codebase Awareness

Aureya Code does not operate on individual files in isolation. It builds and maintains a comprehensive understanding of your entire codebase.

- **Full repository indexing**: On first connection, Aureya Code indexes your entire repository, building a semantic map of modules, classes, functions, types, and their relationships
- **Dependency tracing**: Understands import graphs, call chains, and type hierarchies across the entire project
- **Persistent file-system access**: Reads any file in the workspace without requiring manual file selection
- **Incremental updates**: As you edit files, the semantic index updates in real time
- **Multi-repository awareness**: Link related repositories (frontend, backend, shared libraries) into a unified workspace

### Autonomous Engineering

Aureya Code performs complete engineering tasks, not just code completion.

**Code Generation and Editing**

- Read entire codebase context before making changes
- Edit files with surgical precision, modifying only what needs to change
- Execute terminal commands (build, test, lint, deploy)
- Trace dependencies across modules and refactor consistently
- Implement end-to-end features spanning multiple files, directories, and layers

**Testing and Quality**

- Write unit tests, integration tests, and end-to-end tests
- Fix lint errors and formatting issues automatically
- Run test suites and iterate until all tests pass
- Generate test fixtures and mock data
- Measure and improve code coverage

**Git and Collaboration**

- Stage changes, write commit messages, create branches
- Create pull requests with descriptive titles and summaries
- Resolve merge conflicts by understanding both sides of the conflict
- Update dependencies and handle breaking changes
- Review PRs from teammates with actionable feedback

### Agent Manager (Mission Control)

Orchestrate multiple autonomous agents working in parallel across your codebase.

```
┌─────────────────────────────────────────────────────────┐
│                   Mission Control                        │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Agent 1    │  │  Agent 2    │  │  Agent 3    │    │
│  │  Backend    │  │  Frontend   │  │  Testing    │    │
│  │  API work   │  │  UI work    │  │  Coverage   │    │
│  │             │  │             │  │             │    │
│  │  Workspace: │  │  Workspace: │  │  Workspace: │    │
│  │  /api       │  │  /app       │  │  /tests     │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
│         │                │                │            │
│         └────────────────┼────────────────┘            │
│                          │                             │
│                  ┌───────▼───────┐                     │
│                  │  Merge and    │                     │
│                  │  Integration  │                     │
│                  └───────────────┘                     │
└─────────────────────────────────────────────────────────┘
```

- **Parallel execution**: Run multiple agents simultaneously, each working on a different part of the codebase
- **Workspace isolation**: Each agent operates in its own workspace to prevent conflicts
- **Coordination**: Agents communicate through Mission Control to avoid duplicate work and resolve dependencies
- **Progress monitoring**: Real-time dashboard showing each agent's status, current task, and output
- **Merge management**: Mission Control handles merging agent outputs, resolving conflicts, and verifying integration

### Integrated Browser

A built-in Chromium browser for testing and verifying UI changes without leaving Aureya Code.

- **Live preview**: See UI changes rendered in real time as the agent makes edits
- **Automated testing**: Navigate pages, fill forms, click buttons, and verify visual output
- **Screenshot comparison**: Before/after screenshots to verify visual changes
- **Console monitoring**: Capture and respond to browser console errors
- **Network inspection**: Monitor API calls and responses during testing

### MCP (Model Context Protocol) Support

Connect Aureya Code to local tools, databases, external services, and custom APIs through the Model Context Protocol.

- **Database access**: Query PostgreSQL, MySQL, MongoDB, Redis directly from the agent
- **API integration**: Connect to REST APIs, GraphQL endpoints, and gRPC services
- **File system tools**: Custom file operations, build tools, and deployment scripts
- **External services**: Integrate with Jira, Slack, GitHub, GitLab, Bitbucket, and more
- **Custom MCP servers**: Build your own MCP servers to expose any tool or service to Aureya Code

### Artifacts and Knowledge

Agents produce deliverables and accumulate reusable knowledge over time.

**Artifacts**

Every completed task produces an Artifact: a structured deliverable that includes the code changes, test results, documentation updates, and a summary of decisions made. Artifacts are stored in Aureya Drive and can be referenced by future agents.

**Knowledge Base**

As agents work on your codebase, they build a Knowledge Base of patterns, conventions, and decisions specific to your project. This knowledge persists across sessions and is shared across all agents working on the same workspace.

- Coding conventions and style preferences
- Architecture decisions and rationale
- Common patterns and anti-patterns observed in the codebase
- Dependency quirks and workarounds
- Team preferences learned from PR review feedback

### Connected Tools

Aureya Code integrates with complementary Aureya products for a complete development workflow.

| Integration | Purpose |
|-------------|---------|
| **Aureya Drive** | Store artifacts, share assets, access project documentation |
| **Aureya PM** | Read assigned tickets, update task status on commit, create sub-tasks |
| **Aureya Collab** | Post build notifications, request reviews, share progress updates |
| **Aureya Hub** | Pull models for local inference within development projects |
| **Aureya Local** | Use local LLMs as the inference backend for fully offline coding |

### Autonomy Modes

Configure how much oversight you want over the agent's actions.

| Mode | Description | Use Case |
|------|------------|---------|
| **Ask** | Agent proposes changes, waits for approval before executing | Learning a new codebase, sensitive changes |
| **Plan** | Agent creates a detailed plan, executes after approval | Feature implementation, refactoring |
| **Auto-accept** | Agent executes changes automatically, notifies on completion | Routine tasks, well-understood patterns |
| **Bypass** | Agent operates with minimal guardrails, maximum autonomy | Trusted environments, time-critical fixes |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Aureya Code                               │
│                                                                  │
│  Surfaces:                                                       │
│  ┌────┐ ┌────────┐ ┌──────┐ ┌─────┐ ┌────────┐               │
│  │CLI │ │Desktop │ │IDE   │ │Web  │ │Mobile  │               │
│  └──┬─┘ └───┬────┘ └──┬───┘ └──┬──┘ └───┬────┘               │
│     └────────┼─────────┼────────┼────────┘                     │
│              │         │        │                               │
│       ┌──────▼─────────▼────────▼──────┐                       │
│       │        Agent Runtime            │                       │
│       │                                 │                       │
│       │  ┌──────────┐ ┌─────────────┐  │                       │
│       │  │ Codebase │ │  Tool       │  │                       │
│       │  │ Index    │ │  Executor   │  │                       │
│       │  └──────────┘ └─────────────┘  │                       │
│       │  ┌──────────┐ ┌─────────────┐  │                       │
│       │  │Knowledge │ │  Artifact   │  │                       │
│       │  │ Base     │ │  Store      │  │                       │
│       │  └──────────┘ └─────────────┘  │                       │
│       └────────────────────────────────┘                       │
│                        │                                        │
│       ┌────────────────┼────────────────┐                      │
│       │                │                │                      │
│  ┌────▼─────┐  ┌───────▼──────┐  ┌─────▼──────┐              │
│  │ Mission  │  │  Chromium    │  │   MCP      │              │
│  │ Control  │  │  Browser     │  │  Servers   │              │
│  └──────────┘  └──────────────┘  └────────────┘              │
│                                                                  │
│  Integrations:                                                   │
│  ┌──────┐ ┌──────┐ ┌───────┐ ┌─────┐ ┌───────┐              │
│  │Drive │ │  PM  │ │Collab │ │ Hub │ │Local  │              │
│  └──────┘ └──────┘ └───────┘ └─────┘ └───────┘              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Governance and the ORF Protocol

Aureya Code enforces Atomic Constraints at the engineering layer of the 15-Layer Reality Stack:

- **Permission boundaries**: Agents request explicit permission for destructive actions (force push, hard reset, production deployment) regardless of autonomy mode
- **Sandboxed execution**: Terminal commands execute in a sandboxed environment with configurable filesystem and network access policies
- **Audit trail**: Every action taken by an agent is logged with full context (prompt, reasoning, files read, commands executed, changes made)
- **Code governance**: Agents enforce coding standards, security policies, and dependency allowlists defined by the organization
- **Pre-Incident Governance**: Before executing any change, agents evaluate risk against the Fragility Codex and escalate high-risk actions to human review
- **Obligation Intelligence**: Agent behavior patterns and error rates feed into the Obligation Intelligence pipeline, continuously improving the governance model

---

## Pricing

| Feature | Free | Pro ($20/mo) | Max ($100/mo) | Team ($30/seat/mo) | Enterprise |
|---------|------|-------------|--------------|-------------------|-----------|
| AI completions | Limited | Generous | Unlimited | Unlimited | Unlimited |
| Agent tasks per day | 5 | 50 | Unlimited | Unlimited | Unlimited |
| Mission Control agents | 1 | 3 | 10 | 10/seat | Custom |
| Surfaces | CLI only | All | All | All | All |
| Integrated browser | -- | Yes | Yes | Yes | Yes |
| MCP servers | 2 | 10 | Unlimited | Unlimited | Unlimited |
| Knowledge Base | Session only | Persistent | Persistent | Shared | Shared |
| Artifact storage | -- | 10 GB | 100 GB | 50 GB/seat | Custom |
| Aureya PM integration | -- | Yes | Yes | Yes | Yes |
| Aureya Collab integration | -- | -- | Yes | Yes | Yes |
| SSO/SAML | -- | -- | -- | Yes | Yes |
| Admin controls | -- | -- | -- | Yes | Yes |
| Custom model routing | -- | -- | Yes | Yes | Yes |
| SLA | -- | -- | -- | -- | 99.9% |
| Dedicated support | -- | -- | Priority | Priority | Dedicated |
| Console API access | -- | -- | Yes | Yes | Yes |

---

## Competitive Positioning

Aureya Code competes alongside Claude Code, Cursor, Windsurf, GitHub Copilot, and Cody. The key differentiators are:

1. **Five surfaces**: No competitor offers native terminal, desktop, IDE, web, and mobile experiences from a single product
2. **Mission Control**: Parallel autonomous agents coordinated through a central orchestrator, far beyond single-agent coding assistants
3. **Ecosystem integration**: Direct connection to PM, Collab, Drive, Hub, and Local creates a complete development platform
4. **Artifacts and Knowledge**: Persistent, reusable deliverables and accumulated project knowledge that improve over time
5. **ORF Protocol governance**: Enterprise-grade audit trails, permission boundaries, and risk assessment that competing tools lack
6. **Integrated browser**: Built-in Chromium for UI testing without context-switching

Aureya Code is not an autocomplete engine. It is an autonomous software engineering platform that understands your codebase as a system, executes multi-step tasks with senior-level judgment, and maintains the governance standards required by institutional engineering organizations.
