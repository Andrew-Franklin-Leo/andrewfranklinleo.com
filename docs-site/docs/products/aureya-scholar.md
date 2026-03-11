---
title: Aureya Scholar
sidebar_label: Aureya Scholar
sidebar_position: 14
description: Academic paper and GitHub project discussion tool that transforms research papers and repositories into AI-generated podcast discussions with citation-aware analysis.
---

# Aureya Scholar

**Turn papers and code into conversations.** Aureya Scholar is the academic research and open-source project discussion platform of the AINEFF ecosystem. Upload an academic paper or link a GitHub repository, and Aureya Scholar generates AI-hosted podcast discussions that break down complex material into accessible, engaging audio. Every claim is citation-aware, tracing back to specific sections of the source material.

---

## Core Capabilities

### Paper Discussion

Transform academic papers into engaging AI-generated podcast discussions.

- **Paper ingestion**: Upload PDFs, provide arXiv links, DOI links, or Semantic Scholar URLs. Aureya Scholar extracts the full text, figures, tables, equations, and citation graph
- **Discussion generation**: Two AI hosts discuss the paper in a natural, conversational format. They explain methodology, debate findings, contextualize results within the broader field, and identify limitations
- **Citation-aware dialogue**: When the hosts reference a specific finding, method, or claim, the discussion links back to the exact section, figure, or table in the original paper
- **Follow-up questions**: Pause the discussion at any point and ask clarifying questions. The hosts incorporate your questions into the ongoing conversation
- **Multi-paper discussions**: Upload multiple related papers and the hosts discuss them comparatively, identifying agreements, contradictions, and gaps in the literature
- **Field contextualization**: The AI situates the paper within its broader research field, explaining how it builds on prior work and what it means for future research

**Discussion Structure**

```
1. Introduction (2-3 min)
   - Paper title, authors, publication venue
   - Why this paper matters
   - High-level summary of contribution

2. Background and Motivation (3-5 min)
   - Problem statement
   - Prior work and gaps
   - Research questions

3. Methodology Deep-Dive (5-10 min)
   - Experimental design
   - Novel techniques
   - Key assumptions

4. Results and Analysis (5-10 min)
   - Main findings
   - Statistical significance
   - Comparison with baselines

5. Limitations and Future Work (3-5 min)
   - Acknowledged limitations
   - Unaddressed questions
   - Potential extensions

6. Broader Impact (2-3 min)
   - Practical applications
   - Field implications
   - Governance considerations
```

### Repository Discussion

Turn GitHub repositories into technical podcast discussions.

- **Repository analysis**: Provide a GitHub URL and Aureya Scholar analyzes the codebase structure, README, documentation, issues, and pull requests
- **Architecture discussion**: The hosts discuss the project's architecture, design decisions, technology choices, and trade-offs
- **Code walkthrough**: Key files and functions are explained in the discussion with references to specific code sections
- **Community analysis**: The discussion covers contribution patterns, issue trends, and project health metrics
- **Comparison**: Link multiple repositories and the hosts compare approaches, architectures, and trade-offs

### Citation-Aware Analysis

Every analytical claim traces back to source material.

- **Inline citations**: The transcript includes numbered citations linking to specific passages in the source paper or specific files/lines in the repository
- **Figure and table references**: When the discussion references a figure, chart, or table, the citation links directly to that element
- **Cross-paper citations**: In multi-paper discussions, citations clearly indicate which paper each claim originates from
- **Citation export**: Export the discussion's citation list in APA, MLA, Chicago, BibTeX, or custom citation formats
- **Reference graph**: Visualize the citation network of the discussed paper, showing which papers it cites and which papers cite it

### Audio Output

Professional-quality audio output designed for listening.

- **Voice profiles**: Choose from multiple AI voice profiles for each host, with options for different accents, speaking speeds, and tonal qualities
- **Audio quality**: High-fidelity audio output suitable for podcast distribution (128kbps+ AAC or MP3)
- **Chapter markers**: Audio includes chapter markers for easy navigation to specific discussion sections
- **Transcript**: Full searchable transcript synchronized with audio timestamps
- **RSS feed**: Generate a private RSS feed for your discussions, playable in any podcast app
- **Background listening**: Listen in any Aureya product or standard audio player while working

---

## Supported Source Types

### Academic Papers

| Source | Method |
|--------|--------|
| PDF upload | Direct upload of paper PDF |
| arXiv | Link (e.g., arxiv.org/abs/2301.12345) |
| DOI | Any DOI link (doi.org/10.xxxx/xxxx) |
| Semantic Scholar | Direct link to paper page |
| PubMed | PubMed ID or link |
| IEEE Xplore | Direct link |
| ACM Digital Library | Direct link |
| Google Scholar | Search and select from results |

### Code Repositories

| Source | Method |
|--------|--------|
| GitHub | Repository URL |
| GitLab | Repository URL |
| Bitbucket | Repository URL |
| Local repository | Upload as ZIP or connect via Aureya Code |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Aureya Scholar                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Scholar Interface                     │   │
│  │  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌──────────┐  │   │
│  │  │ Source  │ │  Audio    │ │Transcript│ │ Citation │  │   │
│  │  │ Upload  │ │  Player   │ │ Viewer  │ │ Panel    │  │   │
│  │  └─────────┘ └───────────┘ └────────┘ └──────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │                  Scholar Engine                        │   │
│  │                                                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │  Paper   │ │  Repo    │ │  Discussion        │   │   │
│  │  │  Parser  │ │  Analyzer│ │  Generator         │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │   │
│  │  │ Citation │ │  Audio   │ │  Reference Graph   │   │   │
│  │  │ Linker   │ │  Renderer│ │  Builder           │   │   │
│  │  └──────────┘ └──────────┘ └────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Ecosystem Integrations (AINEG)                │   │
│  │  Notebook | Search | Code | Drive                     │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Integration with the AINEFF Ecosystem

### Aureya Notebook

Papers analyzed in Scholar can be imported into Aureya Notebook as sources, preserving all extracted metadata, citation information, and the generated discussion transcript. Notebook users can request Scholar discussions of papers already in their notebook.

### Aureya Search

Scholar's paper database enriches Aureya Search's Academic mode. When users search for academic topics, Search can surface relevant Scholar discussions alongside traditional search results.

### Aureya Code

Repository discussions generated by Scholar can be accessed from within Aureya Code, providing developers with audio architecture walkthroughs of open-source projects they depend on.

### Aureya Drive

All generated discussions (audio files, transcripts, citation exports) are stored in Aureya Drive with organizational sharing and access controls.

### Tower Control

Tower Control monitors discussion quality metrics, paper parsing accuracy, and citation integrity across all Scholar interactions, continuously improving the analysis pipeline.

---

## Governance and the ORF Protocol

Aureya Scholar enforces Atomic Constraints at the academic knowledge layer of the 15-Layer Reality Stack:

- **Citation integrity**: Every claim in a generated discussion must be traceable to a specific source passage. Unsubstantiated claims are not generated
- **Academic honesty**: Discussions accurately represent the paper's findings, including limitations and caveats. The AI does not overstate results or omit negative findings
- **Copyright compliance**: Paper content is processed for analysis and discussion under fair use principles. Full text is not reproduced in transcripts
- **Source verification**: Paper metadata (authors, venue, date, DOI) is verified against academic databases
- **Pre-Incident Governance**: Discussions are reviewed for accuracy against the source material before delivery
- **Obligation Intelligence**: Academic topic trends and citation patterns feed into the Obligation Intelligence pipeline, informing the ecosystem's understanding of research landscape evolution

---

## Pricing

| Feature | Free (3/month) | Academic ($9/mo) | Institutional ($29/seat/mo) |
|---------|----------------|-----------------|---------------------------|
| Paper discussions per month | 3 | 30 | Unlimited |
| Repository discussions per month | 1 | 10 | Unlimited |
| Multi-paper discussions | -- | Yes | Yes |
| Follow-up questions | 3 per discussion | Unlimited | Unlimited |
| Voice profiles | 2 | All | All + custom |
| Citation export formats | BibTeX only | All formats | All formats |
| Reference graph visualization | -- | Yes | Yes |
| RSS feed generation | -- | Yes | Yes |
| Audio quality | 64kbps | 128kbps | 256kbps |
| Transcript export | Text only | Text + timestamps | Text + timestamps + citations |
| Aureya Notebook integration | -- | Yes | Yes |
| Organization management | -- | -- | Yes |
| Bulk upload | -- | -- | Yes (100 papers) |
| API access | -- | -- | Yes |
| SSO/SAML | -- | -- | Yes |
| Priority processing | -- | Yes | Yes |
| Support | Community | Email | Dedicated |

---

## Competitive Positioning

Aureya Scholar competes in the academic AI assistant space alongside Elicit, Semantic Reader, and Google NotebookLM's paper handling. The key differentiators are:

1. **Repository discussions**: No competitor transforms GitHub repositories into technical podcast discussions
2. **Citation-aware audio**: Generated discussions include inline citations traceable to specific passages, going beyond general summarization
3. **Multi-paper comparative discussions**: Analyze multiple papers together with comparative discussion rather than isolated summaries
4. **Interactive follow-up**: Pause discussions and ask clarifying questions that the hosts incorporate into the ongoing conversation
5. **Ecosystem integration**: Papers flow between Scholar, Notebook, Search, and Code seamlessly
6. **Reference graph visualization**: Visual citation networks show the paper's position in the broader research landscape

Aureya Scholar is not a paper summarizer. It is a research discussion platform that transforms dense academic material and complex codebases into accessible, citation-grounded conversations, making expert-level analysis available to anyone in the AINEFF ecosystem.
