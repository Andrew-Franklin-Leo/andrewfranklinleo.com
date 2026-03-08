---
sidebar_position: 2
---

# Design System

Dark-first editorial design system with institutional-grade typography.

## Colours

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0D1117` | Page background |
| Surface | `#161B22` | Cards, modals, panels |
| Border | `rgba(33, 38, 45, 0.6)` | Dividers, card borders |
| Text Primary | `#F0F0F0` | Body text, headings |
| Text Secondary | `#8B949E` | Captions, metadata |
| Accent Gold | `#F5A623` | CTAs, prices, highlights |
| Accent Blue | `#4A9EFF` | Links, tags, code |
| Error | `#F85149` | Validation, alerts |
| Success | `#3FB950` | Confirmations |

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Playfair Display | 700 | 2.5rem |
| H2 | Playfair Display | 500 | 2rem |
| H3 | Playfair Display | 400 | 1.5rem |
| Body | Inter | 400 | 1rem |
| Body Bold | Inter | 600 | 1rem |
| Caption | Inter | 300 | 0.875rem |
| Code | JetBrains Mono | 400 | 0.875rem |
| Price | JetBrains Mono | 500 | 1.25rem |

## Component Patterns

### Cards
```css
background: #161B22;
border: 1px solid rgba(33, 38, 45, 0.6);
border-radius: 12px;
padding: 2rem;
```

### CTA Buttons
```css
background: #F5A623;
color: #0D1117;
font-weight: 600;
border-radius: 8px;
padding: 0.75rem 2rem;
```

### Links
```css
color: #4A9EFF;
text-decoration: none;
/* Hover: underline */
```

### Pricing Display
```css
font-family: 'JetBrains Mono';
color: #F5A623;
font-weight: 500;
```

## Navigation

Forbes-style mega-navigation with categorized dropdowns:
- Dark background (`#0D1117`)
- Gold hover accents (`#F5A623`)
- Organized by: Research, Products, Community, About

## Rules

- No emojis in content or UI
- Gold (`#F5A623`) exclusively for CTAs, prices, and key highlights
- Blue (`#4A9EFF`) exclusively for interactive elements (links, tags, code)
- Playfair Display only for headings (H1-H3)
- Inter for all body text and UI labels
- JetBrains Mono for code blocks and pricing
