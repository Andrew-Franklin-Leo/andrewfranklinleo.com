---
title: Maxwork
sidebar_label: Maxwork
sidebar_position: 5
description: Autonomous desktop AI agent that executes multi-step tasks directly on your computer in a secure sandbox environment.
---

# Maxwork

**Your computer, working for you.** Maxwork is the autonomous desktop agent of the AINEFF ecosystem. It operates directly on your computer, executing multi-step tasks that span applications, file systems, and workflows. Unlike cloud-only AI assistants, Maxwork sees your screen, uses your applications, and produces real deliverables: spreadsheets with working formulas, formatted presentations, organized file structures, and completed workflows.

---

## Core Capabilities

### Multi-Step Task Execution

Maxwork breaks complex requests into step-by-step plans and executes them autonomously on your computer.

**How It Works**

1. **You describe the task**: "Create a quarterly sales report from the CSV files in my Downloads folder, with charts and executive summary"
2. **Maxwork creates a plan**: The agent breaks the task into discrete steps, shows you the plan, and waits for approval
3. **Execution in sandbox**: Each step executes in a secure VM sandbox with live reasoning visible
4. **Live reasoning feed**: Watch the agent think through each decision, explaining what it is doing and why
5. **Deliverables produced**: Finished files appear in your designated output folder

**Example Tasks**

- Generate a quarterly financial report from raw CSV data with pivot tables, charts, and narrative analysis
- Create a 30-slide investor presentation from a strategy document
- Organize 500 photos by date, location, and subject into a structured folder hierarchy
- Fill out compliance forms by extracting data from multiple source documents
- Research competitors and produce a structured comparison matrix in Excel
- Clean, deduplicate, and normalize a customer database exported from a CRM

### Designated Directory Model

Maxwork operates within clearly defined boundaries on your file system.

- **Input directories**: Folders you designate as sources the agent can read from
- **Output directory**: A single folder where all generated files are placed
- **No access outside boundaries**: The agent cannot read, write, or modify any file outside the designated directories
- **Drag-and-drop**: Drag files into the Maxwork window to add them to the input set
- **Directory templates**: Save directory configurations for recurring workflows

### Production-Ready Output

Maxwork does not produce drafts. It produces files ready for immediate use.

**Excel Generation**

- Working formulas (SUM, VLOOKUP, INDEX/MATCH, pivot table source data)
- Conditional formatting rules
- Charts and graphs with proper axis labels, legends, and data series
- Multiple sheets with cross-sheet references
- Named ranges and data validation
- Print-ready formatting with headers, footers, and page breaks

**PowerPoint Generation**

- Consistent slide layouts following your template (or a professional default)
- Data-driven charts linked to embedded data
- Speaker notes for each slide
- Animations and transitions
- Corporate branding (logos, colors, fonts) from a style configuration file
- Master slide adherence

**Document Generation**

- Formatted Word documents with headings, tables of contents, and page numbers
- PDF generation with proper metadata
- Markdown with embedded images and tables
- HTML reports with inline styling

### Recurring Workflows

Set up tasks that run automatically on a schedule.

- **Weekly reports**: "Every Monday at 8am, generate a sales summary from the CRM export in /shared/crm-exports/"
- **Daily data processing**: "Every evening, clean and normalize the day's transaction logs"
- **Monthly presentations**: "First business day of each month, create the board deck from the latest financials"
- **Scheduled triggers**: Cron-style scheduling with timezone support
- **Conditional execution**: Only run if new files appear in the input directory
- **Notification**: Email or Aureya Collab notification when a recurring workflow completes

### Parallel Sub-Tasks

Maxwork handles multiple sub-tasks simultaneously when they are independent.

- **Parallel file processing**: Process multiple input files concurrently
- **Pipeline stages**: When a task has independent branches, execute them in parallel and merge results
- **Resource management**: Intelligent allocation of CPU and memory across parallel sub-tasks
- **Progress dashboard**: Visual display of all active sub-tasks with individual progress bars

---

## Security Architecture

### Isolated VM Sandbox

Every Maxwork task executes in an isolated virtual machine that is destroyed after completion.

```
┌──────────────────────────────────────────────────────┐
│                   Host System                         │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │              Maxwork Sandbox VM                 │  │
│  │                                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────┐ │  │
│  │  │  Agent   │  │  Apps    │  │  File       │ │  │
│  │  │  Runtime │  │  (Excel, │  │  System     │ │  │
│  │  │          │  │  PPT,    │  │  (Shared    │ │  │
│  │  │          │  │  Chrome) │  │   dirs      │ │  │
│  │  │          │  │          │  │   only)     │ │  │
│  │  └──────────┘  └──────────┘  └─────────────┘ │  │
│  │                                                │  │
│  │  Network: Disabled (unless explicitly allowed) │  │
│  │  Clipboard: Isolated from host                 │  │
│  │  USB/Peripherals: No access                    │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────┐  ┌───────────────┐                    │
│  │  Shared  │  │    Output     │                    │
│  │  Input   │◄─┤    Directory  │                    │
│  │  Dirs    │  │               │                    │
│  └──────────┘  └───────────────┘                    │
└──────────────────────────────────────────────────────┘
```

**Security Properties**

- **Process isolation**: The sandbox runs as a separate VM with no shared memory with the host
- **Network isolation**: No network access by default. Network can be enabled per-task with explicit user permission
- **File system isolation**: Only designated shared directories are mounted into the sandbox
- **Clipboard isolation**: The sandbox clipboard is separate from the host clipboard
- **Ephemeral**: The VM is destroyed after task completion. No persistent state remains in the sandbox
- **No privilege escalation**: The agent runs as a restricted user with no sudo or admin capabilities

### Explicit Permission Model

Maxwork asks for explicit permission before performing any action classified as destructive or sensitive.

- **File deletion**: Always requires confirmation before deleting any file
- **File overwrite**: Confirmation required when overwriting existing files in the output directory
- **Network access**: Each task that requires internet access must be explicitly approved
- **Application launch**: New applications are only launched with user awareness
- **External communication**: Any action that sends data outside the sandbox (email, API call, upload) requires explicit approval

### Local Conversation History

All conversation history and task logs are stored locally on your machine. No task data is sent to external servers unless you explicitly enable cloud sync.

- **Local database**: SQLite database in your home directory
- **Encrypted at rest**: AES-256 encryption with a key derived from your system credentials
- **Searchable**: Full-text search across all past tasks, plans, and outputs
- **Exportable**: Export history in JSON or markdown format for auditing

---

## Integration with the AINEFF Ecosystem

### Aureya Drive

Files produced by Maxwork can be automatically synced to Aureya Drive for access across devices and sharing with team members. Input directories can be mapped to Aureya Drive folders for cloud-sourced workflows.

### Aureya PM

Maxwork tasks can be linked to Aureya PM tickets. When a recurring workflow completes, it can automatically update the associated ticket status and attach the generated deliverables.

### Aureya Collab

Task completion notifications are sent to Aureya Collab channels. Team members can request Maxwork tasks through Collab by mentioning the Maxwork agent in a channel.

### Tower Control

Tower Control monitors Maxwork task execution patterns to optimize resource allocation, improve plan generation, and detect anomalous behavior. Maxwork reports aggregate task metrics (not task content) to Tower Control for ecosystem health monitoring.

---

## Governance and the ORF Protocol

Maxwork enforces Atomic Constraints at the desktop execution layer of the 15-Layer Reality Stack:

- **Sandboxed execution**: The VM isolation model ensures that agent actions cannot escape the designated boundaries, a direct implementation of Pre-Incident Governance
- **Permission escalation**: Destructive actions require human approval, maintaining the human-in-the-loop principle defined by the ORF Protocol
- **Audit logging**: Every agent action (file read, file write, application interaction, command execution) is logged with timestamps and reasoning
- **Fragility Codex alignment**: Task risk is assessed against the Fragility Codex before execution begins. High-risk tasks receive additional guardrails and confirmation steps
- **No silent failures**: When a task encounters an error, the agent explains what went wrong and proposes recovery options rather than silently retrying

---

## Pricing

| Feature | Free (5 tasks/day) | Pro ($25/mo) | Business ($50/seat/mo) |
|---------|-------------------|-------------|----------------------|
| Tasks per day | 5 | Unlimited | Unlimited |
| Parallel sub-tasks | 2 | 8 | 16 |
| Recurring workflows | 1 | Unlimited | Unlimited |
| Excel generation | Basic | Advanced (formulas, charts, pivot tables) | Advanced |
| PowerPoint generation | Basic | Advanced (templates, animations) | Advanced |
| Document generation | Basic | Advanced (TOC, headers, PDF) | Advanced |
| Sandbox VM resources | 2 CPU, 4GB RAM | 4 CPU, 16GB RAM | 8 CPU, 32GB RAM |
| Conversation history | 30 days | Unlimited | Unlimited |
| Network access (per-task) | -- | Yes | Yes |
| Aureya Drive sync | -- | Yes | Yes |
| Aureya PM integration | -- | -- | Yes |
| Aureya Collab integration | -- | -- | Yes |
| Admin console | -- | -- | Yes |
| Usage analytics | -- | Basic | Advanced |
| Priority support | -- | Yes | Dedicated |

---

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| OS | Windows 10, macOS 12, Ubuntu 22.04 | Latest stable release |
| RAM | 8 GB | 16 GB+ |
| Disk | 20 GB free | 50 GB+ SSD |
| CPU | 4 cores | 8+ cores |
| Virtualization | Hardware virtualization enabled (VT-x/AMD-V) | Same |
| Display | 1280x720 | 1920x1080+ |

---

## Competitive Positioning

Maxwork competes in the desktop AI agent space alongside Anthropic's Computer Use, Microsoft's Copilot Actions, and various RPA tools. The key differentiators are:

1. **True VM isolation**: No competitor provides a fully isolated sandbox VM for every task execution
2. **Production-ready output**: Working Excel formulas, formatted PowerPoint with templates, and print-ready documents, not rough drafts
3. **Recurring workflows**: Schedule tasks to run automatically, transforming Maxwork from an assistant into an autonomous worker
4. **Parallel execution**: Multiple sub-tasks run simultaneously, dramatically reducing time-to-completion for complex workflows
5. **Ecosystem integration**: Direct connection to Drive, PM, and Collab creates a complete productivity platform
6. **ORF Protocol governance**: Explicit permission model and audit logging that enterprise environments require

Maxwork is not a chatbot that happens to see your screen. It is an autonomous agent that understands tasks, plans execution, and delivers professional-grade output within security boundaries defined by the ORF Protocol.
