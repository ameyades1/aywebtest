# Teachings & Wisdom Page — Design Document

## Concept: "Sacred Library"

This page presents AntarYog Foundation's 56 spiritual offerings as a curated archive of wisdom, not as a marketplace. The design language is warm, authoritative, and unhurried — like entering a well-kept temple library.

---

## Visual Aesthetic

**Color Palette (White Copper v7):**
- Primary (Copper): `#B87333` — active tab underlines, card hovers, CTAs
- Secondary (Gold Light): `#E8B84B` — accents, badges, highlights
- Accent (Logo Brown): `#5C3010` — text, headings, dark details
- Background (Paper): `#F9F6F0` — default section background
- Section Alt (Warm White): `#FDFBF8` — alternating sections
- Dark (Cosmic): `#2A1A0A` — Navagraha tab only
- Text: `#5C3010` primary, `#7A6858` secondary

**Typography:**
- Display/Headings: **Lora** serif (elegant, scholarly)
- Body: **Inter** sans-serif (clean, readable)
- Weight hierarchy: Bold (headings), Regular (body), Light (captions)

**Motion:**
- Card hover: `-4px` lift + copper shadow deepening
- Tab active: smooth underline transition
- Filter toggle: instant toggle + opacity fade
- Load: lazy image loading, no skeleton

---

## Page Structure

### Hero Section
Full-width paper background, left-aligned text with decorative OM character (CSS-drawn, copper, faint) on the right.

```
Teachings & Wisdom
─────────────────
Ancient scripture decoded for the modern seeker. 
Under the guidance of Acharya Upendra Ji.

56 teachings across 4 traditions          [decorative OM character]
```

**Key:** Counter "56 teachings" creates context immediately.

---

### Sticky Tab Bar
Horizontal rule under hero. Active tab has thick copper underline. Tab names + counts in muted badge.

```
Discourses (21)  |  Navagraha Sadhana (5)  |  Mool Mantra Sadhana (25)  |  Begin Here (5)
═══════════════
(active tab thick copper underline)
```

---

## Tab Panels

### 1. DISCOURSES (21 items)

**Sub-groupings:** Featured, Sacred Texts (Gita series + Upanishads), Life & Philosophy

**Featured cards:** 2-col span, thumbnail left (50%), title + description right.

**Other cards:** Standard 3-col masonry grid.

**Card anatomy:**
```
[Thumbnail 16:9]
─────────────────
[Badge: Gita Series / Upanishads / Advanced]
Title (Lora bold, 2 lines)
Description (Inter, 3 lines, muted)
              [Explore this teaching →]
```

---

### 2. NAVAGRAHA SADHANA (5 items)

**Background:** Dark charcoal `#2A1A0A` — only tab with dark treatment. Creates celestial atmosphere.

**Layout:** 5 cards in centered row.

**Card anatomy (planet-focused):**
```
[Planet Symbol — Vedic character]
[Thumbnail 16:9]
─────────────────
Sanskrit Name (Lora bold)
English name + benefit
  [Explore this teaching →]
```

**Hover:** Card glows in copper, slight lift.

---

### 3. MOOL MANTRA SADHANA (25 items)

**Filter row (above cards):** Button group with intention categories.

```
Filter by intention:
[ All (active) ]  [ Abundance ]  [ Protection ]  [ Health ]  [ Liberation ]  [ Knowledge ]  [ Family ]
```

**Card grid:** 4-col compact layout.

**Card anatomy:**
```
[Thumbnail square]
────────────────
Deity Name (Lora bold)
[Badge: 18 months access]
  [Explore this teaching →]
```

**Intention groupings:**
- **Abundance:** Mahalakshmi, Lakshmi Kuber, Kuber, Shree Chakra, Lakshmi Narayan
- **Protection:** Shatru Samhar, Durga, Mahamrutyunjay
- **Health:** Dhanvantari, Dhanvantari Gayatri
- **Liberation:** Atma Moksha, Jeev Moksha, Parashakti Ganapati
- **Knowledge:** Saraswati, Saraswati Gayatri, Gayatri
- **Family:** Sakal Kutumb, Swayamvar Parvati

---

### 4. BEGIN HERE (5 items)

**Renamed from "Free Resources"** — more inviting, less transactional.

**Background:** Warm amber/gold section header: *"No cost to start your journey."*

**Cards:** Gold border (`border: 2px solid #E8B84B`), `Free Access` badge in warm amber.

**CTA:** "Start Listening →" instead of "Explore".

**Layout:** 2 large cards top, 2 smaller below (or responsive 1-2 col).

---

## Card Rules (Universal)

| Element | Treatment |
|---|---|
| Thumbnail | 16:9 (or square for Mool Mantra), rounded-lg, lazy loading |
| Badge | Pill, small caps, `.bg-secondary/20 .text-accent` |
| Title | Lora bold, 2-line max, truncated |
| Description | Inter regular, 3 lines max, `text-text-secondary` |
| CTA link | "Explore this teaching →" or "Start Listening →", copper text, arrow slides on hover |
| Hover | Lift `-4px`, shadow deepens (`0 16px 40px rgba(184,115,51,0.15)`) |
| External link | `target="_blank" rel="noopener"` |

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| Mobile (< 768px) | 1 column, single row tabs |
| Tablet (768–1024px) | 2 columns, horizontal tabs |
| Desktop (> 1024px) | 3–4 columns (varies by tab), horizontal tabs |

---

## Micro-interactions

- **Tab switch:** No page reload. Active tab button underline animates (200ms). Panel fades in/out.
- **Filter toggle:** Click filter button. Cards with matching intention show/hide instantly.
- **Card hover:** Lift + shadow (200ms transition).
- **Link hover:** Arrow slides right 4px (100ms).

---

## Accessibility

- Tab buttons have `role="tab"` (or semantic equivalence via data attributes)
- Images have `alt` text
- Links have `rel="noopener"` for security
- Focus states on buttons/links
- Color contrast meets WCAG AA
- Mobile: full single-column support

---

## Key Differentiators

1. **No pricing shown** — knowledge, not commerce
2. **Sub-grouping in Discourses** — helps user find themes (not a flat list)
3. **Dark Navagraha section** — architectural distinctness, feels cosmic
4. **Intention filter** — helps users find relevant sadhanas among 25 options
5. **"Begin Here" framing** — invitation, not discount bin
6. **Editorial card design** — feature cards on Discourses tab feel curated
