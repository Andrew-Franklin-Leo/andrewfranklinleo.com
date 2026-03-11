---
title: Aureya Drive
sidebar_label: Aureya Drive
sidebar_position: 7
description: AI-native cloud storage with intelligent search, automatic tagging, summarization, and deep integration across the Aureya ecosystem.
---

# Aureya Drive

**Storage that understands your files.** Aureya Drive is the AI-native cloud storage layer of the AINEFF ecosystem. Every file uploaded to Drive is automatically indexed, tagged, summarized, and made searchable through natural language queries. Drive serves as the shared storage backbone connecting all Aureya products, ensuring that files created in one product are instantly accessible in every other.

---

## Core Capabilities

### AI-Powered File Intelligence

Aureya Drive does not just store files. It understands them.

- **Automatic tagging**: Files are tagged by content type, topic, project, and entities mentioned. A financial report is automatically tagged with "finance", "Q3", "revenue", and the company names it references
- **Natural language search**: Search for files using plain language queries. "The presentation about European AI regulation from last month" returns the right file without requiring exact filenames
- **Content summarization**: Every document, spreadsheet, and presentation receives an AI-generated summary visible in the file browser without opening the file
- **Duplicate detection**: Identifies duplicate and near-duplicate files across your entire storage, suggesting consolidation
- **Relationship mapping**: Automatically identifies relationships between files (a spreadsheet referenced in a presentation, a document citing another document) and surfaces these connections
- **OCR and image analysis**: Images and scanned documents are processed with OCR and visual analysis, making their content searchable

### Deep Ecosystem Integration

Aureya Drive is the connective tissue of the AINEFF ecosystem.

| Product | Integration |
|---------|-------------|
| **Aureya Code** | Artifacts, shared asset libraries, project documentation |
| **Aureya Notebook** | Source document storage, cross-notebook linking |
| **Aureya PM** | Task attachments, sprint documentation, deliverable storage |
| **Aureya Collab** | File sharing in channels, collaborative editing links |
| **Aureya Builder** | Application data storage, static asset hosting |
| **Aureya Studio** | Video project files, rendered output, media library |
| **Aureya Design** | Design assets, exported code, component libraries |
| **Aureya Marketing** | Campaign assets, brand guidelines, content library |
| **Maxwork** | Input directories, output storage, recurring workflow data |
| **Aureya Notebook** | Research sources, generated summaries, audio overviews |

### File Management

Standard cloud storage features with AI enhancements.

- **Folder structure**: Organize files in folders and subfolders with drag-and-drop management
- **Smart folders**: AI-generated folder suggestions based on file content and usage patterns
- **Version history**: Full version history for every file with the ability to restore any previous version
- **Sharing**: Share files and folders with specific people, teams, or via public link with configurable permissions (view, comment, edit)
- **Offline access**: Mark files for offline availability on desktop and mobile apps
- **Trash and recovery**: Deleted files are retained for 30 days (Free) or 180 days (Business) before permanent deletion
- **Large file support**: Upload files up to 5 GB (Free), 50 GB (Pro), or 200 GB (Business) per file

### Collaboration

Work on files together in real time.

- **Real-time co-editing**: Multiple users can edit documents, spreadsheets, and presentations simultaneously
- **Comments and annotations**: Add comments to specific sections of any file type
- **Activity feed**: See who viewed, edited, shared, or commented on files
- **Approval workflows**: Route files through approval chains with sign-off tracking
- **External sharing**: Share files with people outside your organization with time-limited links and watermarking

### Security and Compliance

Enterprise-grade data protection built into every tier.

- **Encryption at rest**: AES-256 encryption for all stored files
- **Encryption in transit**: TLS 1.3 for all data transfers
- **Data residency**: Choose storage region (US, EU, APAC, custom) to comply with data sovereignty requirements
- **Access logging**: Complete audit log of every file access, modification, and share action
- **DLP (Data Loss Prevention)**: Automatic detection and flagging of sensitive content (PII, financial data, credentials)
- **Retention policies**: Configurable retention policies for compliance (legal hold, regulatory retention)

---

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                      Aureya Drive                          │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │   Web    │  │ Desktop  │  │ Mobile   │  │   API    │ │
│  │   App    │  │   App    │  │   App    │  │          │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │
│       └──────────────┼────────────┼──────────────┘       │
│                      │            │                       │
│              ┌───────▼────────────▼──────┐               │
│              │      Drive API            │               │
│              └───────────┬───────────────┘               │
│                          │                               │
│       ┌──────────────────┼──────────────────┐           │
│       │                  │                  │           │
│  ┌────▼─────┐  ┌────────▼────────┐  ┌──────▼──────┐   │
│  │  File    │  │  AI Processing  │  │  Search     │   │
│  │  Store   │  │  Pipeline       │  │  Index      │   │
│  │          │  │                 │  │             │   │
│  │  Blob    │  │  Tagging       │  │  Semantic   │   │
│  │  Storage │  │  Summarization │  │  Vector DB  │   │
│  │  CDN     │  │  OCR           │  │  Full-text  │   │
│  │          │  │  Dedup         │  │             │   │
│  └──────────┘  └────────────────┘  └─────────────┘   │
│                                                       │
│  ┌──────────────────────────────────────────────────┐ │
│  │           Integration Bus (AINEG)                │ │
│  │  Code | Notebook | PM | Collab | Builder | ...   │ │
│  └──────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

---

## Governance and the ORF Protocol

Aureya Drive enforces Atomic Constraints at the data storage layer of the 15-Layer Reality Stack:

- **Access control**: File permissions are governed by organizational policies defined through the ORF Protocol framework. No product can access files without proper authorization
- **Data classification**: Files are automatically classified by sensitivity level, triggering appropriate handling policies (encryption, access restrictions, audit requirements)
- **Provenance tracking**: Every file's origin, modification history, and sharing chain is recorded immutably
- **Pre-Incident Governance**: DLP policies prevent accidental exposure of sensitive data before incidents occur
- **Obligation Intelligence**: File access patterns and sharing behaviors contribute to the Obligation Intelligence pipeline, identifying governance risks at the organizational level
- **Constraint Council oversight**: Data governance policies are reviewed and updated by the Constraint Council as regulatory requirements evolve

---

## Pricing

| Feature | Free (15 GB) | Pro ($5/mo, 100 GB) | Business ($12/seat/mo, 1 TB) |
|---------|-------------|--------------------|-----------------------------|
| Storage | 15 GB | 100 GB | 1 TB per seat |
| Max file size | 5 GB | 50 GB | 200 GB |
| AI tagging and summarization | Basic | Advanced | Advanced |
| Natural language search | Yes | Yes | Yes |
| Duplicate detection | -- | Yes | Yes |
| Version history | 30 days | 1 year | Unlimited |
| Sharing | Basic | Advanced (password, expiry) | Advanced + watermarking |
| Offline access | -- | Yes | Yes |
| Real-time co-editing | -- | Yes | Yes |
| Data residency options | -- | -- | Yes |
| DLP | -- | -- | Yes |
| Retention policies | -- | -- | Yes |
| Audit logging | -- | Basic | Advanced |
| SSO/SAML | -- | -- | Yes |
| Admin console | -- | -- | Yes |
| API access | Read-only | Full | Full |
| Trash retention | 30 days | 90 days | 180 days |
| Priority support | -- | Email | Dedicated |

### Additional Storage

Additional storage is available for Pro and Business plans:

- Pro: $2/month per additional 100 GB
- Business: $5/month per additional 1 TB

---

## Competitive Positioning

Aureya Drive competes in the cloud storage space alongside Google Drive, Dropbox, OneDrive, and Box. The key differentiators are:

1. **AI-native from the ground up**: Every file is automatically tagged, summarized, and made queryable through natural language. Competitors bolt AI features onto traditional storage
2. **Ecosystem backbone**: Drive is not a standalone product but the storage layer connecting all Aureya tools. Files flow seamlessly between Code, Notebook, PM, Collab, and every other product
3. **Content understanding**: Drive does not just store files; it understands their content, relationships, and significance within your work
4. **Governance-first**: ORF Protocol compliance, data classification, and Constraint Council oversight built into the storage layer rather than added as an afterthought
5. **Integration bus**: The AINEG data bus ensures that Drive is not just shared storage but an active participant in cross-product workflows

Aureya Drive is not a file locker with a search bar. It is the intelligent storage foundation of the AINEFF ecosystem, ensuring that every file is discoverable, understood, and governed according to the standards defined by the ORF Protocol.
