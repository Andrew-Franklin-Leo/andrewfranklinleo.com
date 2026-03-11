---
title: Aureya Notebook
sidebar_label: Aureya Notebook
sidebar_position: 3
description: AI research and note-taking assistant grounded in your uploaded sources with audio overviews, video generation, and web research.
---

# Aureya Notebook

**Your sources, your AI.** Aureya Notebook is the research and knowledge synthesis platform of the AINEFF ecosystem. Unlike general-purpose AI assistants that draw from the entire internet, Aureya Notebook grounds every response exclusively in the sources you provide. Every claim is cited. Every insight traces back to your material.

---

## Core Capabilities

### Source Ingestion

Upload virtually any knowledge artifact and Aureya Notebook will index, parse, and make it queryable.

**Supported Source Types**

| Category | Formats |
|----------|---------|
| Documents | PDF, DOCX, TXT, Markdown, LaTeX |
| Spreadsheets | Google Sheets, Excel (XLSX, CSV) |
| Presentations | Google Slides, PowerPoint (PPTX) |
| Cloud Documents | Google Docs (direct integration) |
| Web Content | URLs (full page extraction), YouTube videos (transcript + visual analysis) |
| Audio | MP3, WAV, M4A, FLAC (automatic transcription) |
| Code | GitHub repositories, individual source files |
| Research | Academic papers (automatic citation extraction), arXiv links |

**Ingestion Pipeline**

1. **Parsing**: Extract text, tables, images, and metadata from uploaded sources
2. **Chunking**: Split content into semantically coherent segments using hierarchical chunking
3. **Embedding**: Generate vector embeddings for semantic search across all sources
4. **Indexing**: Build a source graph linking related concepts, entities, and claims across documents
5. **Verification**: Cross-reference claims between sources, flagging contradictions and corroborations

Each notebook supports up to 50 sources (Free), 300 sources (One AI Premium), or unlimited sources (Workspace plans).

### Source-Grounded AI

Every response from Aureya Notebook is anchored to your uploaded material. The AI does not hallucinate from general training data.

- **In-line citations**: Every sentence that draws from a source includes a clickable citation linking to the exact passage in the original document
- **Source highlighting**: Click a citation to see the relevant passage highlighted in the original document viewer
- **Confidence indicators**: Each response includes a confidence score based on source coverage and corroboration
- **Gap detection**: When your sources do not contain enough information to answer a question, the AI explicitly says so and suggests what additional sources might help
- **Multi-source synthesis**: Ask questions that span multiple documents and the AI will synthesize information with clear attribution to each source

### Auto-Generated Outputs

Transform your sources into a variety of structured formats without manual effort.

- **Summaries**: Executive summaries, chapter summaries, section summaries at configurable detail levels
- **Mind maps**: Visual knowledge graphs showing relationships between concepts across your sources
- **Flashcards**: Study cards generated from key concepts, definitions, and relationships in your material
- **Quizzes**: Multiple-choice, short-answer, and essay questions generated from your sources with answer keys
- **Briefing documents**: Structured briefings formatted for executive consumption with key findings, implications, and recommended actions
- **Timeline views**: Chronological organization of events and milestones extracted from your sources
- **Comparison tables**: Side-by-side comparison of concepts, products, or arguments across multiple sources

### Audio Overviews

Two AI hosts discuss your sources in a natural, conversational podcast format.

- **Dynamic discussion**: The hosts ask each other questions, challenge assumptions, and explore implications of your material
- **Customizable focus**: Direct the conversation toward specific topics, questions, or sources
- **Voice selection**: Choose from multiple voice profiles for each host
- **Length control**: Generate overviews from 5 minutes to 60 minutes
- **Transcript**: Full searchable transcript with timestamps and source citations
- **Background listening**: Listen while working in other Aureya tools, with the ability to pause and ask follow-up questions
- **Advanced Audio Overviews (Premium)**: Interactive mode where you can join the conversation, ask questions mid-discussion, and redirect the hosts in real time

### Video Generation

Transform documents into narrated video presentations.

- **Document-to-video**: Upload a report or paper and receive a narrated video walkthrough with visual aids
- **Slide generation**: Automatic creation of presentation slides from document content
- **Animation**: Key concepts illustrated with generated diagrams and animations
- **Voiceover**: AI-generated narration synchronized with visual content
- **Export**: MP4, WebM, and direct upload to video platforms

### Web Browse

Find high-quality external sources to complement your research.

- **Guided research**: Describe what you are looking for and the AI searches the web for relevant, authoritative sources
- **Quality filtering**: Sources are ranked by authority, recency, and relevance
- **Automatic ingestion**: Add discovered sources directly to your notebook with one click
- **Report generation**: The AI generates structured research reports from web findings with full citations
- **Source verification**: Cross-reference web findings against your existing notebook sources

---

## Platform Availability

| Platform | Status |
|----------|--------|
| Web application | Available at notebook.aureya.com |
| Android | Native app on Google Play |
| iOS | Native app on App Store |
| Desktop (Windows/Mac/Linux) | Progressive Web App |

### Account Integration

Sign in with your existing accounts to access cloud-stored documents directly:

- Google Account (Google Docs, Sheets, Slides, Drive)
- Microsoft Account (OneDrive, SharePoint, Office 365)
- Amazon Account (Kindle highlights and notes)
- Aureya Account (unified access to all Aureya products)

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Aureya Notebook                          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │   Web    │  │ Android  │  │   iOS    │  │  Desktop   │  │
│  │   App    │  │   App    │  │   App    │  │   PWA      │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       └──────────────┼───────────────┼─────────────┘         │
│                      │               │                        │
│              ┌───────▼───────────────▼────────┐              │
│              │       Notebook Engine           │              │
│              │                                 │              │
│              │  ┌─────────┐  ┌──────────────┐ │              │
│              │  │ Source   │  │  Generation  │ │              │
│              │  │ Indexer  │  │  Pipeline    │ │              │
│              │  └────┬────┘  └──────┬───────┘ │              │
│              │       │              │          │              │
│              │  ┌────▼────┐  ┌──────▼───────┐ │              │
│              │  │ Vector  │  │   Output     │ │              │
│              │  │  Store  │  │  Renderers   │ │              │
│              │  └────┬────┘  │ (Audio,Video │ │              │
│              │       │       │  Text,Cards) │ │              │
│              │  ┌────▼────┐  └──────────────┘ │              │
│              │  │ Source  │                    │              │
│              │  │  Graph  │                    │              │
│              │  └─────────┘                    │              │
│              └─────────────────────────────────┘              │
│                                                              │
│  ┌────────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  Web Browse    │  │ Aureya Drive │  │  Cloud Account   │ │
│  │  Engine        │  │  Storage     │  │  Connectors      │ │
│  └────────────────┘  └──────────────┘  └──────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Technical Details

- **Embedding model**: Custom Aureya embedding model optimized for multi-document retrieval, with fallback to open-source alternatives for on-premises deployments
- **Vector database**: Purpose-built vector store with hybrid keyword + semantic search
- **Source graph**: Neo4j-compatible graph database tracking entity relationships across all sources in a notebook
- **Audio synthesis**: Custom multi-speaker TTS model trained for natural conversational delivery
- **Video pipeline**: Integration with Aureya Studio's rendering engine for document-to-video conversion

---

## Integration with the AINEFF Ecosystem

### Aureya Drive

All notebook sources are stored in Aureya Drive, enabling cross-notebook source sharing, version history, and organizational access controls. When a source is updated in Drive, all notebooks referencing it are automatically re-indexed.

### Aureya Scholar

Academic papers discovered through Aureya Scholar can be imported directly into notebooks. Citation metadata, author information, and related papers are automatically preserved.

### Aureya Search

The Web Browse feature is powered by Aureya Search's deep research capabilities. Sources discovered through Search maintain their provenance metadata when added to notebooks.

### Aureya Code

Developers can query notebooks from Aureya Code to access documentation, architecture decisions, and research findings without leaving their development environment.

### Tower Control

Tower Control monitors notebook usage patterns to optimize embedding models, improve source parsing, and recommend relevant notebooks to users working on related projects (within organizational privacy boundaries).

---

## Governance and the ORF Protocol

Aureya Notebook enforces Atomic Constraints at the knowledge synthesis layer of the 15-Layer Reality Stack:

- **Source fidelity**: The AI is constrained to only make claims supported by uploaded sources, enforcing a strict grounding requirement aligned with Pre-Incident Governance principles
- **Citation integrity**: Every citation is verifiable against the original source, providing an audit trail for knowledge claims
- **Access control**: Notebook sharing respects organizational access policies defined through the ORF Protocol governance framework
- **Data residency**: Enterprise plans support data residency requirements, ensuring sources and generated content remain in specified geographic regions
- **Obligation Intelligence**: Notebook interactions contribute anonymized metadata to the Obligation Intelligence pipeline, helping identify emerging knowledge patterns across the ecosystem

---

## Pricing

| Feature | Free | One AI Premium ($19/mo) | Workspace Business | Workspace Education |
|---------|------|------------------------|-------------------|-------------------|
| Notebooks | 5 | Unlimited | Unlimited | Unlimited |
| Sources per notebook | 50 | 300 | Unlimited | Unlimited |
| AI queries per day | 20 | Unlimited | Unlimited | Unlimited |
| Audio Overviews | 3/month | Unlimited | Unlimited | Unlimited |
| Advanced Audio (interactive) | -- | Yes | Yes | Yes |
| Video generation | -- | 5/month | Unlimited | Unlimited |
| Web Browse | 5/day | Unlimited | Unlimited | Unlimited |
| Mind maps and flashcards | Basic | Advanced | Advanced | Advanced |
| Aureya Drive storage | 1 GB | 50 GB | 1 TB/seat | 500 GB/seat |
| Team sharing | -- | -- | Yes | Yes |
| Admin console | -- | -- | Yes | Yes |
| SSO/SAML | -- | -- | Yes | Yes |
| Audit logging | -- | -- | Yes | Yes |
| Data residency options | -- | -- | Yes | -- |
| Priority support | -- | Yes | Yes | Yes |
| Price per seat | -- | -- | Custom | Custom |

---

## Competitive Positioning

Aureya Notebook competes in the AI research assistant space alongside Google NotebookLM, Elicit, and Consensus. The key differentiators are:

1. **Video generation**: No competitor transforms documents into narrated video presentations
2. **Cross-platform native apps**: Full-featured Android and iOS apps, not just a web interface
3. **Ecosystem integration**: Sources flow between Notebook, Scholar, Search, Drive, and Code seamlessly
4. **Interactive Audio Overviews**: Join the AI discussion in real time rather than just listening passively
5. **Enterprise governance**: ORF Protocol compliance, data residency, audit logging, and access controls that no consumer-focused competitor provides
6. **Multi-account ingestion**: Direct integration with Google, Microsoft, and Amazon accounts for source import

Aureya Notebook transforms passive document storage into active knowledge synthesis, giving researchers, analysts, and decision-makers the ability to interrogate their knowledge base with the rigor demanded by the ORF Protocol.
