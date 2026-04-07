# Plan: Discourses Page — Teachings & Wisdom (Final Implementation)

## Context
The AntarYog Foundation has 56 spiritual offerings cataloged in `docs/product_catalog/product-catalog.json`. The Teachings & Wisdom page presents these as a curated archive of knowledge, not as commerce. The page features a **Featured Discourse Carousel** (spotlight + filmstrip) followed by a **3-tab interface** (Discourses, Navagraha Sadhana, Mool Mantra Sadhana). Free resources are integrated as "Begin Your Journey" sub-section within the Discourses tab.

The page uses the existing `frontend/` component architecture: separate HTML, CSS, and JS files with shared navbar/footer injected by `main.js`.

---

## File Structure (IMPLEMENTED)

```
frontend/
├── pages/
│   └── discourses.html          ✓ 3-tab page + carousel section
├── css/
│   └── discourses.css           ✓ carousel + tab + card styles
└── js/
    └── discourses.js            ✓ carousel logic, tab switching, card rendering
docs/
└── DISCOURSES_PAGE_DESIGN.md    ✓ design documentation
```

## Page Architecture (IMPLEMENTED)

### 1. Hero Section
Slim, left-aligned with decorative element.
```
Teachings & Wisdom
─────────────────
Ancient scripture decoded for the modern seeker.
```

### 2. Featured Discourse Carousel
**Spotlight + Filmstrip Layout:**
- **Spotlight (left 55%):** Featured discourse with 4px copper left border, image, badge, title, description, "Explore this teaching →" link
- **Filmstrip (right 45%):** 2×2 grid of 4 thumbnail cards. Active thumbnail has copper border.
- **Dots:** Indicator dots below carousel. Auto-advances every 6 seconds. Pauses on hover.
- **Featured Items:** Top 6 discourses (IDs: [1, 2, 3, 5, 6, 7])

### 3. Tab Navigation (3 Tabs)
```
[Discourses (21)] [Navagraha Sadhana (5)] [Mool Mantra Sadhana (25)]
════════════════ (active tab thick copper underline)
```

### 4. Tab Panels
- **Discourses Tab:** Sacred Texts + Life & Philosophy + Begin Your Journey (free resources)
- **Navagraha Tab:** Dark section (#2A1A0A), 5 planet cards with symbols
- **Mool Mantra Tab:** Intention filter + 25 compact cards (4-column grid)

---

## Implementation Summary

### discourses.html
- Slim hero section
- Featured carousel section (empty, rendered by JS)
- 3 tab buttons (Discourses, Navagraha, Mool Mantra)
- 3 tab panels with content areas
- Navbar/footer injected via `main.js`

### discourses.css (Key Styles)

**Carousel:**
- `.carousel-inner` — flex row, left-right split
- `.carousel-spotlight` — 55% width, 4px copper left border, image max-height 280px
- `.carousel-filmstrip` — 45% width, 2×2 grid (16px gap)
- `.filmstrip-thumb` — 2px transparent border, active state: copper border
- `.carousel-dots` — flex center, 8px circles, active: 24px width copper fill
- Auto-advance: `setInterval(..., 6000)` + `mouseenter/mouseleave` pause/resume

**Tabs:**
- `.sticky-tabs` — position sticky, copper underline on active tab
- `.tab-panel` — display none by default, display block when active

**Cards:**
- `.teaching-card` — 12px border-radius, hover: -4px translateY + copper shadow
- `.card-badge` — pill, Gita Series / Upanishads / Advanced / Free Access
- `.begin-journey-card` — gold border (2px solid #E8B84B)
- `.planet-card` — Navagraha section, planet symbol + image + name
- `.compact-card` — Mool Mantra section, 4-column grid

**Sections:**
- `.dark-section` — #2A1A0A background + white text (Navagraha only)
- `.subgroup-label` — small caps, copper, section header

**Responsive:** 1-col mobile, 2-col tablet, 3-4 col desktop

### discourses.js (Key Functions)

**Data Loading:**
```js
async function loadCatalog() {
  const res = await fetch('../../docs/product_catalog/product-catalog.json');
  return res.json();
}
```

**Carousel State & Initialization:**
```js
const carousel = { currentIndex: 0, autoplayInterval: null, products: [] };
const CAROUSEL_IDS = [1, 2, 3, 5, 6, 7];  // Top 6 featured discourses

initCarousel(products)  // Setup carousel, render spotlight + filmstrip, start autoplay
setActiveSlide(index)   // Update spotlight content + filmstrip highlight + dots
startAutoplay()         // setInterval 6000ms, cleared on mouseenter
stopAutoplay()          // clearInterval on mouseleave
```

**Tab Switching:**
```js
setupTabSwitching()     // Attach click listeners to [data-tab] buttons
switchTab(tabName)      // Remove active classes, add to selected tab + panel
```

**Card Rendering:**
```js
renderDiscourseCards(products)     // Sacred Texts + Life & Philosophy + Begin Your Journey
renderNavagrahaCards(products)     // 5 planet cards with symbols
renderMoolMantraCards(products)    // 25 compact cards + intention filter
discourseCard(product)             // Template: image, badge, title, description, explore link
beginJourneyCard(product)          // Template: gold border, "Free Access" badge, "Start Listening →" CTA
planetCard(product)                // Template: planet symbol, image, Sanskrit name, English name
compactCard(product)               // Template: small image, title, duration badge, explore link
```

**Product Grouping:**
```js
const DISCOURSE_GROUPS = {
  sacredTexts:     [3, 4, 5, 6, 7, 8, 9, 15, 21],
  lifePhilosophy:  [10, 11, 12, 13, 14, 16, 17, 18, 19, 20],
  beginJourney:    [52, 53, 54, 55, 56],  // Free resources
};

const PLANET_NAMES = {
  22: { symbol: '☉', name: 'Surya', english: 'Sun' },
  23: { symbol: '☽', name: 'Chandra', english: 'Moon' },
  24: { symbol: '♂', name: 'Mangal', english: 'Mars' },
  25: { symbol: '☿', name: 'Budh', english: 'Mercury' },
  26: { symbol: '♃', name: 'Guru', english: 'Jupiter' },
};

const INTENTION_MAP = {
  'Abundance':   [30, 46, 40, 28, 51],
  'Protection':  [41, 37, 29],
  'Health':      [34, 43],
  'Liberation':  [35, 39, 36],
  'Knowledge':   [33, 50, 27],
  'Family':      [42, 44],
};
```

**Intention Filter:**
```js
setupIntentionFilter()  // Attach click listeners to filter buttons
// Toggle [data-intention] cards on/off based on selection
```

---

## Implementation Status

✅ **COMPLETE** — All files implemented and tested:
1. `frontend/js/discourses.js` — Carousel logic, tab switching, card rendering
2. `frontend/css/discourses.css` — All styling (carousel, tabs, cards, responsive)
3. `frontend/pages/discourses.html` — 3-tab page + carousel section
4. `docs/DISCOURSES_PAGE_DESIGN.md` — Design documentation

---

## Verified Features

✅ **Carousel:**
- Featured carousel displays spotlight (left) + 2×2 filmstrip (right)
- Auto-advances every 6 seconds
- Pause on hover, resume on mouse leave
- Clicking filmstrip thumbnail updates spotlight
- Dot indicators navigate carousel

✅ **Tabs:**
- 3 tabs: Discourses (21), Navagraha Sadhana (5), Mool Mantra Sadhana (25)
- Tab switching works (no page reload)
- Active tab underline animates smoothly
- Content panels show/hide correctly

✅ **Content:**
- Discourses tab: Sacred Texts + Life & Philosophy + Begin Your Journey sub-groups
- Navagraha tab: Dark section with 5 planet cards + symbols
- Mool Mantra tab: Intention filter + 25 compact cards (4-col grid)
- Begin Your Journey: Free resources with gold border + "Start Listening →" CTA

✅ **Responsive:**
- Mobile (< 768px): Single column
- Tablet (768–1024px): 2 columns
- Desktop (> 1024px): 3–4 columns

✅ **Data & Links:**
- All 56 products load from `product-catalog.json`
- Thumbnails display correctly
- "Explore" links open in new tab with `rel="noopener"`

---

## How to View

```
http://localhost:8000/frontend/pages/discourses.html
```
