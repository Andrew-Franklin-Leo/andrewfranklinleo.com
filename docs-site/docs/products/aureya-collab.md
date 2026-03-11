---
title: Aureya Collab
sidebar_label: Aureya Collab
sidebar_position: 9
description: AI-native team communication platform with channels, threads, AI agent team members, and deep integration across the Aureya ecosystem.
---

# Aureya Collab

**Communication where AI works alongside your team.** Aureya Collab is the team communication platform of the AINEFF ecosystem. It provides channels, direct messages, and threads with built-in AI capabilities: automatic summarization, AI agents as functional team members, and seamless integration with every Aureya product. AI agents in Collab do not just answer questions. They create content, conduct research, update tickets, and execute tasks.

---

## Core Capabilities

### Communication Fundamentals

The essential communication features your team expects, built for modern distributed work.

- **Channels**: Organized conversations by topic, team, project, or any grouping. Public channels are discoverable; private channels are invite-only
- **Direct messages**: One-on-one and small group conversations with the same rich formatting and AI capabilities as channels
- **Threads**: Reply to any message in a thread to keep conversations organized without cluttering the main channel
- **Rich formatting**: Markdown, code blocks with syntax highlighting, tables, embedded images, and file attachments
- **Reactions**: React to messages with standard and custom reactions for quick feedback
- **Mentions**: @mention individuals, groups, channels, or AI agents
- **Bookmarks**: Save important messages for quick access
- **Pinned messages**: Pin critical messages to the top of any channel
- **Search**: Full-text search across all messages with filters for sender, channel, date range, and file type

### AI Summarization

Never read through hundreds of messages to catch up again.

- **Channel catch-up**: "Summarize what happened in #engineering since Monday" produces a structured summary with key decisions, action items, and unresolved questions
- **Thread summary**: Long threads are automatically summarized with key points and conclusions
- **Meeting notes**: Post a meeting recording or transcript and the AI generates structured meeting notes with action items and owners
- **Daily digest**: Receive a personalized daily summary of activity across your channels, prioritized by relevance to your role and projects
- **Decision log**: AI automatically identifies and logs decisions made in conversations, creating a searchable decision history

### AI Agent Team Members

Add AI agents to your channels as functional team members that respond to requests, monitor conversations, and proactively contribute.

**Built-In Agents**

| Agent | Capability |
|-------|-----------|
| **Research Agent** | Answer questions by searching the web, internal documentation, and connected knowledge bases |
| **Content Agent** | Draft documents, emails, presentations, and reports based on conversation context |
| **Code Agent** | Answer coding questions, review shared code snippets, and create Aureya Code tasks |
| **PM Agent** | Create tickets, update task status, report sprint progress, and answer project questions |
| **Analytics Agent** | Generate charts, analyze data shared in channels, and produce reports |
| **Onboarding Agent** | Guide new team members through tools, processes, and organizational knowledge |

**Agent Behavior**

- Agents respond when @mentioned or when conversation context triggers their domain
- Agents respect channel permissions and only access information they are authorized to see
- Agents can be configured with custom instructions per channel (e.g., "In #legal-review, always cite relevant regulations")
- Agent responses include source attribution when drawing from external sources
- Agents can initiate conversations when triggered by external events (build failures, SLA breaches, deployment completions)

### Workflow Automation

Automate routine communication patterns with triggers and actions.

- **Scheduled messages**: Post recurring messages (daily standups, weekly check-ins) on a schedule
- **Event-triggered notifications**: Receive notifications from Aureya Code (build status), Aureya PM (ticket changes), Aureya Drive (file updates), and external services
- **Approval workflows**: Route approval requests through Collab with structured approval/rejection responses
- **Escalation chains**: Define escalation paths for unresolved issues (if no response in 2 hours, escalate to team lead)
- **Custom bots**: Build custom integrations using the Collab API and webhook system

### Audio and Video

Synchronous communication when asynchronous is not enough.

- **Huddles**: Quick audio calls from any channel or DM, with optional video and screen sharing
- **Scheduled meetings**: Calendar-integrated meetings with automatic agenda, recording, and AI-generated notes
- **Recording and transcription**: All calls can be recorded with automatic transcription and searchable archives
- **AI participation**: AI agents can join calls to take notes, answer questions, and surface relevant information in real time

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Aureya Collab                            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │   Web    │  │ Desktop  │  │ Mobile   │  │    API     │  │
│  │   App    │  │   App    │  │   App    │  │            │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       └──────────────┼────────────┼───────────────┘         │
│                      │            │                          │
│              ┌───────▼────────────▼──────────┐              │
│              │       Messaging Engine         │              │
│              │                                │              │
│              │  ┌──────────┐  ┌────────────┐ │              │
│              │  │ Real-time│  │  Message   │ │              │
│              │  │ Delivery │  │  Store     │ │              │
│              │  └──────────┘  └────────────┘ │              │
│              │  ┌──────────┐  ┌────────────┐ │              │
│              │  │  Search  │  │  AI        │ │              │
│              │  │  Index   │  │  Pipeline  │ │              │
│              │  └──────────┘  └────────────┘ │              │
│              └───────────────────────────────┘              │
│                          │                                   │
│       ┌──────────────────┼──────────────────┐               │
│       │                  │                  │               │
│  ┌────▼─────┐  ┌────────▼────────┐  ┌──────▼──────┐       │
│  │  Agent   │  │   Audio/Video  │  │  Automation │       │
│  │  Runtime │  │   Engine       │  │  Engine     │       │
│  └──────────┘  └────────────────┘  └─────────────┘       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Integration Layer (AINEG)                  │   │
│  │  Code | PM | Drive | Notebook | Hub | Marketing      │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Integration with the AINEFF Ecosystem

### Aureya Code

Build notifications, PR review requests, and deployment alerts flow into designated Collab channels. Developers can create Aureya Code tasks directly from Collab messages. Code Agent in Collab can answer technical questions by querying the codebase through Aureya Code.

### Aureya PM

Sprint planning discussions happen in Collab channels with PM Agent providing real-time project data. Ticket creation, status updates, and assignment changes can be performed directly from Collab. PM notifications (SLA warnings, blocked tickets, sprint completion) are delivered through Collab.

### Aureya Drive

Files shared in Collab messages are stored in Aureya Drive with proper version control. Drive file updates can trigger Collab notifications. The content of shared files is searchable through Collab's search.

### Aureya Notebook

Research findings from Aureya Notebook can be shared in Collab channels with interactive previews. Team members can request notebook summaries through the Research Agent.

### Aureya Marketing

Campaign performance alerts, content approval requests, and marketing calendar updates flow through designated Collab channels. Marketing Agent can generate and refine content based on team feedback in conversations.

### Tower Control

Tower Control monitors communication patterns (not content) to optimize AI agent behavior, improve summarization quality, and identify organizational communication health metrics.

---

## Governance and the ORF Protocol

Aureya Collab enforces Atomic Constraints at the communication layer of the 15-Layer Reality Stack:

- **Data retention**: Message retention policies are configurable per channel and per organization, supporting legal hold and regulatory compliance requirements
- **Access control**: Channel permissions, guest access policies, and external sharing rules are enforced at the platform level
- **Agent governance**: AI agents operate within defined permission boundaries. Agents cannot access channels they are not members of, cannot share information across permission boundaries, and cannot take actions beyond their configured scope
- **Audit logging**: All messages, file shares, agent actions, and administrative changes are logged for compliance
- **Content governance**: Configurable content policies detect and flag messages containing sensitive information (credentials, PII, confidential data)
- **Pre-Incident Governance**: Escalation chains and SLA monitoring ensure that issues are addressed before they become incidents
- **Obligation Intelligence**: Communication patterns contribute anonymized signals to the Obligation Intelligence pipeline

---

## Pricing

| Feature | Free (small teams) | Pro ($7/seat/mo) | Business ($15/seat/mo) |
|---------|-------------------|------------------|----------------------|
| Users | 25 | Unlimited | Unlimited |
| Message history | 90 days | Unlimited | Unlimited |
| Channels | 10 | Unlimited | Unlimited |
| AI summarization | 10/month | Unlimited | Unlimited |
| AI agents | 2 | All built-in | All built-in + custom |
| File sharing | 1 GB total | 10 GB/seat | 50 GB/seat |
| Huddles (audio/video) | 1:1 only | Group (up to 15) | Group (up to 100) |
| Screen sharing | -- | Yes | Yes |
| Recording and transcription | -- | Yes | Yes |
| Workflow automation | 3 rules | Unlimited | Unlimited |
| Custom integrations | 3 | Unlimited | Unlimited |
| Guest access | -- | Yes | Yes |
| SSO/SAML | -- | -- | Yes |
| Data retention policies | -- | -- | Yes |
| Compliance exports | -- | -- | Yes |
| Admin console | -- | Basic | Advanced |
| SLA | -- | -- | 99.9% |
| Priority support | -- | Email | Dedicated |

---

## Competitive Positioning

Aureya Collab competes in the team communication space alongside Slack, Microsoft Teams, and Discord. The key differentiators are:

1. **AI agents as team members**: Not just a chatbot in a channel, but multiple specialized agents that create content, manage projects, analyze data, and execute tasks
2. **Native AI summarization**: Catch up on any conversation instantly without reading through message history
3. **Ecosystem integration**: Direct bidirectional integration with Code, PM, Drive, Notebook, and every other Aureya product
4. **Decision logging**: AI automatically identifies and archives decisions made in conversations, creating an institutional memory
5. **ORF Protocol governance**: Agent permission boundaries, data retention policies, and content governance that enterprise environments require
6. **No plugin marketplace dependency**: All major integrations are first-party, ensuring reliability and consistent behavior

Aureya Collab is not a messaging app with AI features bolted on. It is an AI-native communication platform where human team members and AI agents collaborate as peers, with the governance and security standards demanded by the ORF Protocol.
