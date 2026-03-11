---
title: Aureya PM
sidebar_label: Aureya PM
sidebar_position: 8
description: AI-powered project management with agent-assisted sprint planning, task decomposition, estimation, and automated workflow updates.
---

# Aureya PM

**Project management that thinks ahead.** Aureya PM is the AI-powered project management surface of the AINEFF ecosystem. It combines the structural rigor of enterprise project management tools with AI-assisted planning, estimation, and automation. When connected to Aureya Code, ticket statuses update automatically as developers commit, merge, and deploy.

---

## Core Capabilities

### AI-Assisted Sprint Planning

Aureya PM transforms sprint planning from a manual estimation exercise into an AI-guided process.

- **Backlog analysis**: The AI reviews the entire backlog, identifies dependencies, and suggests sprint composition based on team velocity, priority, and risk
- **Task decomposition**: Describe a feature in plain language and the AI breaks it into actionable sub-tasks with acceptance criteria, estimated effort, and suggested assignees
- **Dependency mapping**: Automatic detection of task dependencies across the backlog, with visual dependency graphs and critical path analysis
- **Capacity planning**: AI models team capacity based on historical velocity, planned time off, and meeting load
- **Risk flagging**: Tasks that historically cause delays or scope creep are flagged with risk indicators and mitigation suggestions
- **Sprint scoring**: Each proposed sprint receives a confidence score based on historical delivery patterns

**Example: AI Task Decomposition**

Input: "Implement user authentication with email/password and Google OAuth"

Output:
```
1. [Backend] Set up authentication service scaffold
   Estimate: 2 points | Risk: Low

2. [Backend] Implement email/password registration endpoint
   Estimate: 3 points | Risk: Low
   Depends on: #1

3. [Backend] Implement email/password login endpoint
   Estimate: 2 points | Risk: Low
   Depends on: #1

4. [Backend] Implement Google OAuth flow
   Estimate: 5 points | Risk: Medium (external dependency)
   Depends on: #1

5. [Frontend] Create registration form with validation
   Estimate: 3 points | Risk: Low

6. [Frontend] Create login form with validation
   Estimate: 2 points | Risk: Low

7. [Frontend] Implement Google sign-in button and callback
   Estimate: 3 points | Risk: Medium
   Depends on: #4

8. [Testing] Write integration tests for auth flows
   Estimate: 3 points | Risk: Low
   Depends on: #2, #3, #4, #5, #6, #7

9. [DevOps] Configure auth environment variables for staging
   Estimate: 1 point | Risk: Low

Total: 24 points | Suggested sprint allocation: 2 sprints
```

### Agent-Assisted Estimation

Move beyond gut-feel estimation with AI that learns from your team's delivery history.

- **Historical calibration**: The AI compares proposed estimates against actual delivery times for similar tasks in your history
- **Complexity analysis**: When a task description maps to code changes, the AI estimates complexity based on the codebase's architecture (requires Aureya Code integration)
- **Confidence intervals**: Each estimate includes a confidence range (e.g., "3 points, 70% confidence; could be 5 points if API schema changes")
- **Team-specific models**: Estimation models calibrate to each team's velocity and individual contributor patterns
- **Estimation review**: The AI challenges estimates that deviate significantly from historical norms, asking clarifying questions

### Automated Workflow Updates

When connected to Aureya Code, Aureya PM becomes a live dashboard of engineering progress.

| Trigger | Automatic Action |
|---------|-----------------|
| Branch created matching ticket ID | Move ticket to "In Progress" |
| PR opened referencing ticket | Move ticket to "In Review" |
| PR approved | Move ticket to "Approved" |
| PR merged to main | Move ticket to "Done" |
| Build failure on PR | Add "Build Failing" label, notify assignee |
| Deploy to staging | Add "On Staging" label |
| Deploy to production | Move ticket to "Released" |

### Project Views

Multiple views of the same data to support different planning and execution styles.

- **Board view**: Kanban-style columns (Backlog, Sprint, In Progress, In Review, Done) with drag-and-drop
- **List view**: Sortable, filterable table with inline editing
- **Timeline view**: Gantt-style timeline with dependency arrows and milestone markers
- **Calendar view**: Tickets placed on a calendar by due date or sprint
- **Workload view**: Team member workload distribution with over-allocation warnings
- **Dependency graph**: Visual network graph of task dependencies with critical path highlighting
- **Metrics dashboard**: Velocity charts, burn-down/burn-up, cycle time, lead time, and custom metrics

### Workflow Customization

Define workflows that match your team's process.

- **Custom statuses**: Define any number of workflow statuses with transition rules
- **Automation rules**: "When status changes to In Review and all tests pass, auto-assign to reviewer"
- **Custom fields**: Add fields of any type (text, number, date, select, multi-select, user) to tickets
- **Templates**: Create ticket templates for common task types (bug report, feature request, technical debt)
- **SLA tracking**: Define SLA rules and receive alerts when tickets approach or breach SLA
- **Approval gates**: Require specific approvals before tickets can transition to certain statuses

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                       Aureya PM                           │
│                                                          │
│  ┌────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Web   │  │ Desktop  │  │ Mobile   │  │   API    │  │
│  │  App   │  │   App    │  │   App    │  │          │  │
│  └───┬────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│      └────────────┼─────────────┼──────────────┘        │
│                   │             │                        │
│           ┌───────▼─────────────▼────────┐              │
│           │          PM Engine           │              │
│           │                              │              │
│           │  ┌──────────┐ ┌───────────┐  │              │
│           │  │ Planning │ │ Workflow  │  │              │
│           │  │ AI       │ │ Engine    │  │              │
│           │  └──────────┘ └───────────┘  │              │
│           │  ┌──────────┐ ┌───────────┐  │              │
│           │  │Estimation│ │ Analytics │  │              │
│           │  │ Engine   │ │ Pipeline  │  │              │
│           │  └──────────┘ └───────────┘  │              │
│           └──────────────────────────────┘              │
│                          │                              │
│  ┌───────────────────────┼────────────────────────────┐ │
│  │              Integration Layer                     │ │
│  │                                                    │ │
│  │  ┌─────────┐ ┌─────────┐ ┌────────┐ ┌──────────┐ │ │
│  │  │ Aureya  │ │ Aureya  │ │Aureya  │ │ Maxwork  │ │ │
│  │  │  Code   │ │ Collab  │ │ Drive  │ │          │ │ │
│  │  └─────────┘ └─────────┘ └────────┘ └──────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Integration with the AINEFF Ecosystem

### Aureya Code

The deepest integration in the ecosystem. Aureya Code reads assigned tickets to understand context before starting work. Commits referencing ticket IDs trigger automatic status transitions. PR descriptions are auto-populated with ticket acceptance criteria.

### Aureya Collab

Sprint planning discussions, daily standups, and retrospectives happen in Aureya Collab channels. PM notifications (ticket assigned, status changed, SLA approaching) are delivered through Collab. Team members can create and update tickets directly from Collab messages.

### Aureya Drive

Sprint documentation, architecture decision records, and meeting notes are stored in Drive and linked to relevant tickets. Deliverables attached to tickets are stored in Drive with version history.

### Maxwork

Recurring project management tasks (weekly status reports, sprint metrics compilation, stakeholder updates) can be delegated to Maxwork agents that pull data from PM and produce formatted deliverables.

### Tower Control

Tower Control aggregates project metrics across all PM instances in the ecosystem, providing organizational-level visibility into engineering velocity, quality trends, and resource utilization.

---

## Governance and the ORF Protocol

Aureya PM enforces Atomic Constraints at the project execution layer of the 15-Layer Reality Stack:

- **Workflow governance**: Transition rules ensure that tickets follow the defined process. No ticket can skip mandatory stages (code review, QA, security scan)
- **Audit trail**: Every ticket change (status, assignment, estimate, priority) is logged with timestamp, user, and reason
- **Access control**: Project, board, and ticket-level permissions ensure that sensitive projects are visible only to authorized team members
- **Obligation tracking**: When tickets represent regulatory obligations or compliance requirements, PM tracks them with enhanced SLA monitoring and escalation rules
- **Pre-Incident Governance**: Risk flags on tickets trigger additional review requirements before high-risk changes proceed to implementation
- **Governance Signals**: PM generates Governance Signals when project patterns indicate emerging risks (velocity decline, scope creep, dependency bottlenecks)

---

## Pricing

| Feature | Free (10 users) | Pro ($10/seat/mo) | Enterprise ($25/seat/mo) |
|---------|----------------|-------------------|------------------------|
| Users | 10 | Unlimited | Unlimited |
| Projects | 3 | Unlimited | Unlimited |
| AI task decomposition | 10/month | Unlimited | Unlimited |
| AI estimation | Basic | Advanced (historical calibration) | Advanced + team models |
| Sprint planning AI | -- | Yes | Yes |
| Aureya Code integration | Basic (status updates) | Full (bidirectional) | Full + custom rules |
| Aureya Collab integration | Notifications | Full | Full |
| Custom workflows | 1 | Unlimited | Unlimited |
| Custom fields | 5 | Unlimited | Unlimited |
| Automation rules | 3 | Unlimited | Unlimited |
| Views | Board, List | All views | All views + custom |
| SLA tracking | -- | Yes | Yes |
| Approval gates | -- | Yes | Yes |
| Audit logging | -- | Basic | Advanced |
| SSO/SAML | -- | -- | Yes |
| Data residency | -- | -- | Yes |
| API access | Read-only | Full | Full |
| Priority support | -- | Email | Dedicated |

---

## Competitive Positioning

Aureya PM competes in the project management space alongside Jira, Linear, Asana, and Monday.com. The key differentiators are:

1. **AI-native planning**: Task decomposition, estimation, and sprint planning powered by AI that learns from your team's history, not bolted-on copilot features
2. **Aureya Code integration**: Bidirectional integration that automatically updates tickets based on engineering activity, eliminating manual status management
3. **Agent-assisted estimation**: AI that challenges estimates, provides confidence intervals, and calibrates to team-specific velocity patterns
4. **Ecosystem connectivity**: Direct integration with Collab, Drive, Maxwork, and the broader AINEFF platform
5. **ORF Protocol governance**: Workflow governance, obligation tracking, and Governance Signal generation that enterprise environments require
6. **No context-switching**: Developers see and update tickets without leaving Aureya Code; managers discuss sprints without leaving Aureya Collab

Aureya PM transforms project management from a bookkeeping overhead into an intelligent planning partner that learns your team's patterns and keeps projects moving with minimal manual intervention.
