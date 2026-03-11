---
title: CodeBot
sidebar_label: CodeBot
sidebar_position: 17
description: Asynchronous AI coding agent for GitHub that automates bug fixes, test writing, feature implementation, and PR management within your existing workflows.
---

# CodeBot

**Your always-on engineering teammate.** CodeBot is the asynchronous AI coding agent of the AINEFF ecosystem, purpose-built for GitHub workflows. Unlike interactive coding tools that require a developer at the keyboard, CodeBot operates in the background: receiving assignments through GitHub issues, implementing changes across your codebase, creating pull requests, and responding to review feedback. It works while you sleep, automating the tasks that drain engineering bandwidth.

---

## Core Capabilities

### Asynchronous Task Execution

CodeBot works independently on assigned tasks without requiring real-time interaction.

**Workflow**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Assign     │    │   CodeBot    │    │   Pull       │
│   Issue to   │───▶│   Analyzes   │───▶│   Request    │
│   CodeBot    │    │   and Plans  │    │   Created    │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               │
┌──────────────┐    ┌──────────────┐    ┌──────▼───────┐
│   Merged     │    │   Updates    │    │   Review     │
│   to Main    │◀───│   Based on   │◀───│   Comments   │
│              │    │   Feedback   │    │   Received   │
└──────────────┘    └──────────────┘    └──────────────┘
```

1. **Issue assignment**: Assign a GitHub issue to CodeBot (by label, mention, or direct assignment)
2. **Analysis**: CodeBot reads the issue description, examines the relevant codebase sections, and creates an implementation plan
3. **Implementation**: CodeBot creates a branch, makes the necessary code changes, writes tests, and verifies the build passes
4. **PR creation**: A pull request is created with a descriptive title, detailed summary of changes, and linked issue references
5. **Review response**: When reviewers leave comments, CodeBot reads the feedback and makes requested changes
6. **Iteration**: The cycle continues until the PR is approved and merged

### Bug Fixes

CodeBot diagnoses and fixes bugs from issue descriptions, stack traces, and error logs.

- **Stack trace analysis**: Paste a stack trace into an issue and CodeBot traces it through the codebase to identify the root cause
- **Reproduction**: CodeBot writes a failing test that reproduces the bug before implementing the fix
- **Fix verification**: After implementing the fix, CodeBot verifies that the test passes and no existing tests are broken
- **Regression prevention**: The fix includes tests that prevent the bug from reoccurring
- **Related issues**: CodeBot identifies related issues that may have the same root cause and notes them in the PR

### Test Writing

CodeBot generates comprehensive test suites for existing code.

- **Unit tests**: Tests for individual functions and methods with edge case coverage
- **Integration tests**: Tests for interactions between modules, services, and external dependencies
- **End-to-end tests**: Tests for complete user flows (when Playwright or Cypress is configured)
- **Coverage targeting**: Specify a target coverage percentage and CodeBot generates tests to reach it
- **Test framework support**: Jest, Mocha, Pytest, Go testing, JUnit, and more
- **Mock generation**: Automatic generation of mocks, stubs, and fixtures for external dependencies

### Feature Implementation

CodeBot implements features from detailed issue descriptions or specifications.

- **Multi-file changes**: Features that span multiple files, directories, and layers are implemented coherently
- **Architecture adherence**: CodeBot follows the existing code patterns, naming conventions, and architectural decisions in your codebase
- **Documentation**: New features include inline documentation, README updates, and changelog entries
- **Migration scripts**: Database changes include migration scripts in the project's migration framework
- **Configuration**: Environment variables, feature flags, and configuration changes are documented in the PR

### PR Management

CodeBot creates high-quality pull requests and responds to review feedback.

**PR Quality**

- **Descriptive titles**: Concise titles that summarize the change (under 72 characters)
- **Detailed descriptions**: Summary of changes, motivation, testing approach, and deployment considerations
- **Linked issues**: Automatic linking to the originating issue with proper GitHub keywords (Fixes #123, Closes #456)
- **Change scope**: PRs are scoped to a single logical change. Large features are split into reviewable increments
- **CI verification**: CodeBot waits for CI checks to pass before requesting review. If CI fails, it fixes the issues

**Review Response**

- **Comment parsing**: CodeBot reads review comments and understands the requested changes
- **Contextual changes**: Responses to review feedback are scoped to the specific concern raised
- **Discussion**: When CodeBot disagrees with feedback or needs clarification, it explains its reasoning in the PR discussion
- **Batch updates**: Multiple review comments are addressed in a single commit for clean history

---

## Supported Languages and Frameworks

| Language | Frameworks |
|----------|-----------|
| **TypeScript/JavaScript** | React, Next.js, Express, NestJS, Vue, Angular |
| **Python** | Django, Flask, FastAPI, pytest |
| **Go** | Standard library, Gin, Echo |
| **Rust** | Actix, Tokio, Rocket |
| **Java** | Spring Boot, Quarkus, JUnit |
| **C#** | ASP.NET, Entity Framework |
| **Ruby** | Rails, RSpec |

CodeBot supports any language with sufficient codebase context, but the languages above receive the deepest analysis and most accurate implementations.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        CodeBot                                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 GitHub Integration                    │   │
│  │  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌──────────┐  │   │
│  │  │ Issue   │ │    PR     │ │ Review │ │  CI/CD   │  │   │
│  │  │ Watcher │ │  Manager  │ │ Reader │ │ Monitor  │  │   │
│  │  └─────────┘ └───────────┘ └────────┘ └──────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │                  Agent Engine                         │   │
│  │                                                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Codebase │ │  Task    │ │  Implementation    │   │   │
│  │  │ Analyzer │ │  Planner │ │  Engine            │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │  Test    │ │  Build   │ │  Review Response   │   │   │
│  │  │ Generator│ │ Verifier │ │  Engine            │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Ecosystem Integrations (AINEG)                │   │
│  │  Code | PM | Collab                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Configuration

CodeBot is configured through a `.codebot.yml` file in the repository root.

```yaml
# .codebot.yml
version: 1

# How CodeBot receives assignments
triggers:
  - type: label
    label: "codebot"
  - type: mention
    mention: "@codebot"
  - type: assignment

# Scope of allowed changes
permissions:
  directories:
    include: ["src/", "tests/", "docs/"]
    exclude: ["src/config/secrets/"]
  files:
    exclude: ["*.env", "*.key", "*.pem"]
  actions:
    allow: ["create", "modify", "delete"]
    require_approval: ["delete"]

# Quality requirements
quality:
  tests_required: true
  coverage_threshold: 80
  lint_must_pass: true
  build_must_pass: true

# PR configuration
pull_requests:
  branch_prefix: "codebot/"
  reviewers: ["@team-lead", "@senior-dev"]
  labels: ["automated", "codebot"]
  max_files_changed: 20
  split_large_changes: true

# Context for better implementation
context:
  architecture_docs: "docs/ARCHITECTURE.md"
  style_guide: "docs/STYLE_GUIDE.md"
  testing_conventions: "docs/TESTING.md"
```

---

## Integration with the AINEFF Ecosystem

### Aureya Code

CodeBot and Aureya Code share the same codebase understanding engine. Context built by a developer in Aureya Code is available to CodeBot, and vice versa. Teams can start implementation in Aureya Code and hand off routine follow-up tasks to CodeBot.

### Aureya PM

When CodeBot creates a PR for an issue, it can update the corresponding Aureya PM ticket status. Completed CodeBot PRs trigger ticket transitions (e.g., "In Progress" to "In Review"). Sprint velocity calculations include CodeBot contributions.

### Aureya Collab

CodeBot activity is reported in designated Aureya Collab channels. Team members receive notifications when CodeBot creates PRs, encounters issues, or needs human guidance. Engineers can assign tasks to CodeBot directly from Collab messages.

### Tower Control

Tower Control monitors CodeBot performance across all repositories in the organization: success rates, review cycles, and code quality metrics. This data informs capacity planning and identifies repositories where CodeBot is most effective.

---

## Governance and the ORF Protocol

CodeBot enforces Atomic Constraints at the automated engineering layer of the 15-Layer Reality Stack:

- **Scoped access**: CodeBot only accesses files and directories explicitly permitted in the configuration. Sensitive files (credentials, secrets, configuration) are excluded by default
- **Human review required**: CodeBot creates PRs but cannot merge them. Human review and approval are always required before code reaches the main branch
- **Build verification**: Every PR must pass CI checks before requesting review. CodeBot does not create PRs with known failures
- **Change limits**: Maximum file change limits prevent CodeBot from making sweeping changes without human oversight
- **Audit trail**: Every action (issue read, file change, PR creation, review response) is logged with full context
- **Pre-Incident Governance**: CodeBot evaluates changes against security scanning tools before creating PRs, catching vulnerabilities before they enter the review cycle
- **Obligation Intelligence**: CodeBot's error patterns and success rates feed into the Obligation Intelligence pipeline, informing the ecosystem's understanding of automated engineering governance

---

## Pricing

| Feature | Free (public repos) | Pro ($15/mo) | Team ($39/seat/mo) |
|---------|--------------------|--------------|--------------------|
| Public repositories | Unlimited | Unlimited | Unlimited |
| Private repositories | -- | 5 | Unlimited |
| Tasks per month | 10 | 100 | Unlimited |
| Bug fixes | Yes | Yes | Yes |
| Test writing | 3/month | Unlimited | Unlimited |
| Feature implementation | -- | Yes | Yes |
| Review response | Yes | Yes | Yes |
| Multi-repo awareness | -- | Yes | Yes |
| Custom configuration | Basic | Advanced | Advanced |
| Aureya PM integration | -- | Yes | Yes |
| Aureya Collab integration | -- | -- | Yes |
| Priority processing | -- | Yes | Yes |
| Concurrent tasks | 1 | 3 | 10/seat |
| Admin dashboard | -- | -- | Yes |
| Usage analytics | Basic | Detailed | Detailed + team metrics |
| Support | Community | Email | Dedicated |

---

## Competitive Positioning

CodeBot competes in the AI coding agent space alongside Devin, SWE-Agent, and GitHub Copilot Workspace. The key differentiators are:

1. **Asynchronous-first**: Designed for background operation within GitHub workflows rather than interactive pair programming
2. **Review-aware**: CodeBot reads and responds to PR review comments, closing the feedback loop without developer intervention
3. **Ecosystem integration**: Direct connection to PM for ticket management, Collab for team communication, and Code for shared codebase understanding
4. **Configuration-driven**: Repository-level configuration controls scope, permissions, quality requirements, and PR conventions
5. **Human-in-the-loop guarantee**: CodeBot never merges its own code. Human review is architecturally required
6. **ORF Protocol governance**: Scoped access, change limits, security scanning, and audit trails built into every interaction

CodeBot is not a replacement for software engineers. It is an always-available teammate that handles the routine, well-defined engineering tasks that consume disproportionate time, freeing human engineers to focus on architecture, design, and complex problem-solving within the governance framework of the ORF Protocol.
