# Andrew Franklin Leo | Site Architecture & Firebase Incentivization Plan

This document outlines the End-to-End Enterprise Architecture plan for launching `andrewfranklinleo.com`, utilizing the TOGAF Architecture Development Method (ADM) to integrate Firebase as the core engine for stakeholder incentivization within the broader Aureya / Frankmax ecosystem.

## Goal Description
Establish `andrewfranklinleo.com` as the "Trust Anchor" of the Frankmax ecosystem. It will not only serve as a static repository of thought leadership but dynamically incentivize and coordinate key stakeholders (Enterprise Operators, Regulators, Institutional Investors, and Venture Cell Leaders) using Firebase's real-time BaaS capabilities.

## User Review Required
> [!IMPORTANT]
> **Firebase Structure**: Please review the proposed Firebase layout (Auth, Firestore Collections, and Cloud Messaging) to ensure aligns with the AINEFF Sovereignty Axiom and Data Sovereignty Layer requirements.
> **Incentivization Mechanics**: Confirm if the "Performance Token" and "Stake Instrument" accounting should be managed entirely via Firestore ledgers initially vs. external Web3 protocols.

---

## TOGAF Architecture Development Method (ADM) Plan

### Phase A: Architecture Vision
- **Vision**: To deploy `andrewfranklinleo.com` as the definitive authority interface, converting thought leadership (essays, frameworks) directly into actionable stakeholder participation.
- **Objectives**: Achieve 10,000 unique visitors/month by Month 3, and successfully onboard the first cohort of Enterprise Operators into the Levelupmax ecosystem via authenticated Firebase portals.

### Phase B: Business Architecture
- **Stakeholders**: Individual Operators, Enterprise C-Suite (CFO/COO), Regulators, and Infrastructure Providers.
- **Value Streams & Incentives**:
  - **Engagement Incentives**: Access to gated Deep Analysis & Insights (LPI) based on verified identity.
  - **Financial Incentives**: Operators track their boot-camp progression (Levelupmax) and corresponding Performance Tokens / Stake Instruments.
  - **Governance Incentives**: Regulators get read-only observability dashboards to monitor Power Concentration Indices (PCI).

### Phase C: Information Systems Architecture
- **Data Architecture (Firebase Firestore)**:
  - `stakeholders` collection: Profiles, roles, verification status.
  - `incentive_ledger` collection: Immutable log of earned Performance Tokens and Stake Instruments.
  - `governance_signals` collection: Risk telemetry and PCI scoring outputs.
  - `content_metrics` collection: Essay reads, downloads (Reality Stack PDF).
- **Application Architecture (Next.js 15 App Router)**:
  - SSR/SSG for essays to maximize SEO ("AI governance framework", "ORF Protocol").
  - Client-side hydrated portals for secure stakeholder dashboards (Firebase Auth).

### Phase D: Technology Architecture
- **Frontend Framework**: Next.js 15 (React).
- **Styling**: Tailwind CSS 4 (Slate-950, Blue-400, Inter/JetBrains Mono typography).
- **Backend/Platform Engine**: Firebase (Authentication, Firestore Database, Cloud Functions for async rule enforcement).
- **Hosting / Edge**: Vercel for high-performance CDN delivery.

### Phase E: Opportunities & Solutions
- **Immediate Deployment (Phase 1)**: Launch the landing page, static essays, and newsletter capture (ConvertKit/Buttondown).
- **Firebase Rollout (Phase 2)**: Launch the Stakeholder Login portal. Map the 10 Levelupmax tracks to Firebase Auth claims and progress trackers.

### Phase F: Migration Planning
- Since this is a greenfield deployment starting from the provided `SITE_ARCHITECTURE.md`, no legacy data migration is necessary. The focus will be on transitioning existing static markdown/DOCX frameworks into structured MDX content and Firestore document schemas.

---

## Proposed Changes

### Next.js & Firebase Application
- Build the core routing inside the Next.js App Router pattern.
- Integrate the Firebase Admin SDK for server-side verification and the Firebase Client SDK for browser-based real-time telemetry.

#### [NEW] `package.json`
Dependencies for Next.js, React, Firebase, Tailwind CSS, etc.

#### [NEW] `src/app/page.tsx`
Landing page rendering the thesis statement and essay index.

#### [NEW] `src/app/lib/firebase/config.ts`
Firebase initialization connecting to the project backend.

#### [NEW] `src/app/portal/page.tsx`
The authenticated stakeholder dashboard for tracking incentivization metrics and early access documentation.

---

## Verification Plan

### Automated Tests
- Build verification tests using `npm run build` to confirm SSG renders correctly.
- Firebase Emulator Suite tests to validate Firestore security rules (ensuring Operators can only read their own ledger, while Regulators can read global anonymized PCI data).

### Manual Verification
- Deploy to Vercel preview environments.
- Verify user signup flow via Firebase Auth.
- Verify the "Performance Token" increment logic via Cloud Functions when a user completes reading a key architectural document.
