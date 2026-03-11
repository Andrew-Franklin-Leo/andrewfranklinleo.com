---
title: Aureya Search
sidebar_label: Aureya Search
sidebar_position: 13
description: AI-powered deep search engine with advanced reasoning, multi-step research, source verification, and visual search capabilities.
---

# Aureya Search

**Search that thinks before it answers.** Aureya Search is the AI-powered research engine of the AINEFF ecosystem. It does not return a list of links. It performs multi-step reasoning, cross-references multiple sources, verifies claims, and delivers structured answers with full citations. When a question requires deep investigation, Aureya Search breaks it into sub-questions, researches each independently, synthesizes findings, and presents a coherent analysis.

---

## Core Capabilities

### Advanced Reasoning

Aureya Search applies structured reasoning to every query, going beyond keyword matching to genuine analysis.

- **Chain-of-thought**: The search engine shows its reasoning process, making it transparent how it arrived at an answer
- **Thinking mode**: For complex queries, the engine enters a visible thinking phase where it plans its research approach, identifies knowledge gaps, and determines the optimal search strategy
- **Disambiguation**: When a query is ambiguous, the engine identifies possible interpretations and addresses each or asks for clarification
- **Temporal awareness**: Understands when information is time-sensitive and prioritizes recent sources. Flags when answers may have changed since source publication
- **Contradiction handling**: When sources disagree, the engine identifies the contradiction, presents both positions, and evaluates the evidence for each

### Multi-Step Research

Complex questions are decomposed into research steps executed systematically.

**Research Pipeline**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Question   │    │  Decompose   │    │   Execute    │
│   Analysis   │───▶│  into Sub-   │───▶│  Parallel    │
│              │    │  Questions   │    │  Searches    │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               │
┌──────────────┐    ┌──────────────┐    ┌──────▼───────┐
│   Deliver    │    │  Synthesize  │    │   Verify     │
│   Structured │◀───│  Findings    │◀───│   Sources    │
│   Answer     │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

- **Question decomposition**: "How does the EU AI Act compare to China's AI regulations in terms of enforcement mechanisms?" becomes: (1) What enforcement mechanisms does the EU AI Act establish? (2) What enforcement mechanisms do China's AI regulations establish? (3) How do they compare on key dimensions?
- **Parallel execution**: Independent sub-questions are researched simultaneously for speed
- **Iterative deepening**: If initial results are insufficient, the engine automatically refines its search strategy and digs deeper
- **Cross-reference synthesis**: Findings from different sub-questions are synthesized into a coherent, cited answer
- **Research report generation**: Complex queries produce structured reports with executive summary, detailed findings, source list, and confidence assessment

### Source Verification

Every claim is backed by verifiable sources with quality assessment.

- **Source quality scoring**: Each source is scored on authority (domain reputation, author credentials), recency (publication date), and relevance (how directly it addresses the query)
- **Citation linking**: Every factual claim in the answer includes a clickable citation to the source passage
- **Source diversity**: Answers draw from multiple independent sources to avoid single-source bias
- **Fact-checking**: Claims made by one source are cross-referenced against other sources where possible
- **Source transparency**: Users can see the full list of sources consulted, including sources that were considered but not cited (with reasons for exclusion)

### Visual Search

Use images as search inputs for visual queries.

- **Image prompts**: Upload an image and ask questions about it. "What building is this?", "What species of plant is this?", "What does this error message mean?"
- **Screenshot analysis**: Upload screenshots of charts, graphs, or data visualizations and ask for interpretation
- **Document image search**: Upload photos of documents, signs, or labels for extraction and search
- **Visual comparison**: Upload multiple images and ask the engine to compare, contrast, or identify differences
- **Reverse image search**: Find the original source, context, and usage of an image across the web

### Research Modes

Different modes for different research needs.

| Mode | Description | Best For |
|------|-------------|---------|
| **Quick** | Direct answer with top sources, no deep reasoning | Factual lookups, definitions, simple questions |
| **Deep** | Multi-step research with full reasoning, source verification, and structured output | Complex questions, competitive analysis, market research |
| **Academic** | Prioritizes peer-reviewed sources, includes citation formatting (APA, MLA, Chicago) | Research papers, literature reviews, scholarly questions |
| **Technical** | Prioritizes official documentation, Stack Overflow, and code repositories | Programming questions, API documentation, technical troubleshooting |
| **News** | Prioritizes recent reporting, includes timeline and source diversity analysis | Current events, breaking news, trend analysis |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Aureya Search                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Search Interface                     │   │
│  │  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌──────────┐  │   │
│  │  │  Query  │ │ Reasoning │ │ Answer │ │ Sources  │  │   │
│  │  │  Input  │ │ Display   │ │ Panel  │ │ Panel    │  │   │
│  │  └─────────┘ └───────────┘ └────────┘ └──────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │                  Search Engine                        │   │
│  │                                                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Question │ │  Web     │ │  Source            │   │   │
│  │  │ Analyzer │ │  Crawler │ │  Verification      │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Reasoning│ │ Synthesis│ │  Visual Analysis   │   │   │
│  │  │ Engine   │ │ Engine   │ │  Pipeline          │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Ecosystem Integrations (AINEG)                │   │
│  │  Notebook | Scholar | Marketing | Code                │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Integration with the AINEFF Ecosystem

### Aureya Notebook

Search results and verified sources can be imported directly into Aureya Notebook with one click. Source metadata, quality scores, and citation information are preserved during import. Notebook's Web Browse feature is powered by Aureya Search's infrastructure.

### Aureya Scholar

Academic Search mode connects to Aureya Scholar's paper database for comprehensive academic research. Search results can include both web sources and academic papers with proper citation formatting.

### Aureya Code

Technical Search mode is available within Aureya Code, allowing developers to research APIs, libraries, and technical concepts without leaving their development environment.

### Aureya Marketing

Marketing teams use Search for competitive analysis, trend research, and content ideation. Research reports feed directly into content strategy and campaign planning.

### Tower Control

Tower Control monitors search quality metrics (answer accuracy, source quality, user satisfaction) across the ecosystem, continuously tuning the search engine and source verification pipeline.

---

## Governance and the ORF Protocol

Aureya Search enforces Atomic Constraints at the information retrieval layer of the 15-Layer Reality Stack:

- **Source transparency**: Every answer includes full source attribution. No claims are presented without traceable citations
- **Bias mitigation**: Source diversity requirements ensure answers are not skewed by a single perspective or information source
- **Misinformation resistance**: Source verification pipeline cross-references claims and flags unsubstantiated assertions
- **Temporal accuracy**: Time-sensitive information is flagged with source publication dates and recency warnings
- **Pre-Incident Governance**: Search results are evaluated for potential harm (medical misinformation, dangerous instructions, privacy violations) before delivery
- **Obligation Intelligence**: Search patterns and source quality metrics feed into the Obligation Intelligence pipeline, informing the ecosystem's understanding of information quality trends

---

## Pricing

| Feature | Free (basic) | Pro ($15/mo) |
|---------|-------------|-------------|
| Quick searches per day | 20 | Unlimited |
| Deep research per month | 3 | Unlimited |
| Academic mode | -- | Yes |
| Technical mode | -- | Yes |
| News mode | -- | Yes |
| Visual search | 5/day | Unlimited |
| Research report generation | -- | Yes |
| Source export (citations) | -- | Yes |
| Aureya Notebook integration | Basic | Full |
| API access | -- | Yes |
| Search history | 30 days | Unlimited |
| Priority processing | -- | Yes |
| Custom search scopes | -- | Yes |

---

## Competitive Positioning

Aureya Search competes in the AI search space alongside Perplexity, Google AI Overviews, and ChatGPT Search. The key differentiators are:

1. **Visible reasoning**: Full transparency into how the engine arrives at answers, not a black-box summary
2. **Multi-step decomposition**: Complex questions are systematically broken down and researched in parallel rather than answered in a single pass
3. **Source verification pipeline**: Claims are cross-referenced across sources with quality scoring, not just cited from the first result
4. **Research modes**: Purpose-built modes for academic, technical, and news research rather than one-size-fits-all search
5. **Ecosystem integration**: Search results flow directly into Notebook, Scholar, Code, and Marketing for immediate use
6. **ORF Protocol governance**: Source transparency, bias mitigation, and misinformation resistance built into the search pipeline

Aureya Search is not a faster way to browse the web. It is a research engine that applies rigorous reasoning, source verification, and structured analysis to every query, delivering trustworthy answers with the citation standards demanded by the ORF Protocol.
