# Plan: Mission Page — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/mission-antaryog.html` (812 lines) is a standalone page showcasing the organization's mission
through a visual hierarchy: hero section with heading, four pillar cards with icons and descriptions, and
a closing CTA button. It reuses the same header/footer/mobile menu JavaScript as the homepage (v7).

**Source internals:**
- Lines 12–31: Tailwind custom config (colors + fonts)
- Lines 33–340: CSS block covering header, mobile menu, mission-specific styles (pillar cards, animations)
- Lines 345–561: Header + mobile menu (identical to homepage, can reuse components)
- Lines 564–611: Hero section + 4 pillar cards grid
- Lines 616–682: Footer (identical to homepage)
- Lines 685–810: JavaScript (mobile menu, auth state) — can reuse from homepage

**Key new concepts for this page:**
- **Reusable layout components** — Header, Footer, and mobile menu are identical to the homepage. Here we
  see how to extract them into React components and share them across multiple pages.
- **Grid layouts** — The 4 pillar cards use CSS Grid (`grid-template-columns: repeat(2, 1fr)`) that responds
  to mobile (`1fr` on small screens). Tailwind's `grid` utilities replace raw CSS.
- **Card animations** — Each pillar card has a staggered fade-in animation (`animation-delay`) and hover effects
  (`transform translateY(-8px)`, `box-shadow`). Tailwind's animation utilities handle these.
- **Responsive typography** — The hero heading is `2.25rem` on desktop but smaller on mobile. Tailwind's
  responsive prefixes (`md:`, `lg:`) are used.

**Prerequisite:** Homepage plan (01-homepage.md) — already established the Next.js project, Tailwind config,
and the reusable Header/Footer components.

---

## The Steps

### Step 1 — Create the Mission Page Shell

**What:** Create `frontend/src/app/mission/page.tsx` as a standard (non-protected) page.

**Why this step exists:** The mission page is public — no auth required. Unlike the profile page, this doesn't
need a `useRequireAuth` guard. We set up the file structure and basic layout.

**Tools & concepts introduced:**
- **App Router file-based routing** — Next.js automatically maps `app/mission/page.tsx` to the `/mission` route.
  No manual routing setup needed.
- **Server vs Client Components** — The mission page is mostly static (no interactivity on initial render), so
  we keep it as a Server Component by default. Only add `'use client'` if needed for interactive features.
- **Layout composition** — Pages import and use the `Header` and `Footer` components from the homepage refactor.

**Verify:** Visiting `/mission` renders a blank page with header and footer. Header links work correctly.
**Commit:** `feat(frontend): create mission page shell with header and footer`

---

### Step 2 — Port the Mission Hero Section

**What:** Create `components/mission/MissionHero.tsx` with the heading "Our Mission" and tagline text.
Extract from lines 564–567 of the HTML mockup.

**Why this step exists:** The hero is a self-contained section at the top. Breaking it into a component makes
it easy to style, test, and reuse on other pages if needed.

**Tools & concepts introduced:**
- **Tailwind's `bg-gradient-to-r` and `bg-gradient-to-l`** — The hero background is
  `linear-gradient(135deg, #F9F6F0 0%, #FDFBF8 100%)` in the HTML. Tailwind doesn't have built-in diagonal
  gradients in the exact angle, so use inline `style=` for `background`. Alternatively, extend Tailwind config
  with a custom gradient (see CLAUDE.md section "Design System").
- **Text centering and max-width** — `className="text-center mx-auto max-w-2xl"` centers content and constrains width.
- **Responsive padding** — `className="py-12 md:py-16"` is larger on desktop, smaller on mobile.
- **Font family utilities** — Use `className="font-serif"` for the heading (Lora) and `font-sans` for body (Inter),
  defined in the Tailwind config.

**Verify:** Hero section renders with correct text, gradient background, and responsive sizing.
**Commit:** `feat(frontend): add MissionHero component`

---

### Step 3 — Build the Pillar Card Component

**What:** Create `components/mission/PillarCard.tsx` — a reusable card that displays a title and a list of items
with a colored bullet point and hover effects.

**Why this step exists:** The mission page has 4 identical pillar cards. Extracting the card as a component
means you can reuse it in other pages and change the styling in one place.

**Tools & concepts introduced:**
- **Component props** — The card accepts `title` (string) and `items` (array of strings) as props:
  ```ts
  interface PillarCardProps {
    title: string
    items: string[]
  }
  ```
- **Conditional rendering** — If `items` is empty, don't render the list. Use `items.length > 0 && <ul>...</ul>`.
- **Tailwind hover utilities** — `hover:shadow-lg`, `hover:-translate-y-1`, `transition-all` — these apply
  on mouse hover without JavaScript.
- **Bullet points with `::before` pseudo-element** — The HTML uses `.pillar-list li::before { content: '▸' }`.
  In JSX, use a Unicode character or emoji directly: `<li className="pl-4">▸ {item}</li>` or add the bullet in CSS
  with a Tailwind plugin. For simplicity, use `before:content-['▸']` with `before:mr-2` (Tailwind's `content-[]` utility).

**Verify:** A single pillar card renders with title, bullet list, and correct hover animation.
**Commit:** `feat(frontend): create PillarCard component for mission page`

---

### Step 4 — Create the Pillars Grid

**What:** Create `components/mission/PillarGrid.tsx` — renders all 4 pillar cards in a responsive 2x2 grid
on desktop, 1-column on mobile.

**Why this step exists:** Grouping the 4 cards in a grid component keeps the layout logic separate from the
individual card logic. This makes it easier to adjust spacing, card count, or animation timing across all cards.

**Tools & concepts introduced:**
- **Tailwind Grid utilities** — Replace `grid-template-columns: repeat(2, 1fr)` with `className="grid grid-cols-1 md:grid-cols-2 gap-6"`.
  This is `1` column on mobile, `2` on medium screens and above, with `1.5rem` gap between cards.
- **Staggered animation timing** — The HTML uses `animation-delay: 0.1s, 0.2s, 0.3s, 0.4s` for each card.
  In React, apply different Tailwind animation delays using dynamic class names:
  ```ts
  const delayClass = ['delay-100', 'delay-200', 'delay-300', 'delay-400'][index]
  ```
  (Requires adding these utilities to Tailwind config or using inline `style={{ animationDelay }}`.)

**Verify:** All 4 pillar cards display in a 2-column grid on desktop, 1 column on mobile. Spacing looks correct.
**Commit:** `feat(frontend): create PillarGrid component with responsive layout`

---

### Step 5 — Populate the Pillar Data

**What:** Create `lib/data/missionPillars.ts` — a TypeScript file exporting the 4 pillar objects with titles
and item lists.

**Why this step exists:** Separating data from UI components makes the component reusable and the data easy to
update without touching JSX. This also makes the component testable — you can swap in different data without
re-rendering JSX.

**Tools & concepts introduced:**
- **Data-driven UI** — Instead of hardcoding pillar text in JSX, store it in a separate file and map over it
  in the component.
- **TypeScript interfaces** — Define the shape of a pillar:
  ```ts
  interface Pillar {
    title: string
    items: string[]
  }
  ```

**Source:** Extract from lines 574–611 of the mission HTML mockup.

**Verify:** No visual change (data is now in a separate file, but rendered the same way).
**Commit:** `feat(frontend): extract mission pillar data to lib/data/missionPillars.ts`

---

### Step 6 — Wire the Mission Page Together

**What:** Update `app/mission/page.tsx` to import and render `MissionHero` and `PillarGrid` with data from
`missionPillars.ts`.

**Why this step exists:** This is the moment all the pieces come together. The page now has a clear structure:
hero, grid of pillars, footer (already rendered by the layout). It's simple, testable, and ready for styling tweaks.

**Verify:** `/mission` renders the complete mission page with hero, pillar grid, and footer. Responsive behavior
works on mobile and desktop.
**Commit:** `feat(frontend): wire mission page components and data`

---

### Step 7 — Port Animations and Styling Details

**What:** Polish the page with fade-in animations and hover effects. Use Tailwind utilities like
`animate-fadeInUp`, `hover:shadow-lg`, `hover:-translate-y-1`, `transition-all`, and
`duration-300`.

**Why this step exists:** The mockup has sophisticated animations (staggered card entrance, hover lift, shadow).
These feel polished and engaging. Tailwind makes them easy to add without custom CSS.

**Tools & concepts introduced:**
- **Custom animations in Tailwind config** — If `fadeInUp` is not built-in, extend `theme.animation`:
  ```ts
  animation: {
    fadeInUp: 'fadeInUp 0.6s ease both',
  },
  keyframes: {
    fadeInUp: {
      'from': { opacity: '0', transform: 'translateY(20px)' },
      'to': { opacity: '1', transform: 'translateY(0)' },
    },
  }
  ```
- **Staggering with CSS variables or Tailwind delay utilities** — Apply `delay-[Ns]` to each card's `animate-fadeInUp`.

**Verify:** Cards fade in with a slight upward motion on page load. Cards lift on hover with a shadow increase.
**Commit:** `feat(frontend): add animations and hover effects to mission page`

---

### Step 8 — Build Verification

**What:** `npm run build`.
**Verify:** Build passes. The mission page is optimized and ready for production.
**Commit:** `chore(frontend): verify mission page production build`

---

## Summary

The mission page is now a clean, component-based Next.js page reusing the header/footer from the homepage,
with a responsive pillar grid and smooth animations. The data is separated from the UI, making it easy to
update pillar content without touching component code.

**Files created:**
- `frontend/src/app/mission/page.tsx` — main page
- `frontend/src/components/mission/MissionHero.tsx` — hero section
- `frontend/src/components/mission/PillarCard.tsx` — individual card
- `frontend/src/components/mission/PillarGrid.tsx` — grid layout
- `frontend/src/lib/data/missionPillars.ts` — pillar data

**Key takeaways:**
1. Reuse components across pages (Header, Footer).
2. Separate data from UI for easier maintenance.
3. Use Tailwind utilities for responsive design and animations instead of custom CSS.
4. Break larger features into smaller, testable components.
