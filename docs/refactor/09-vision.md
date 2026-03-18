# Plan: Vision Page — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/vision-antaryog.html` (674 lines) is a public-facing page that articulates the organization's
long-term vision through rich, flowing prose. Unlike the mission page with its grid of pillar cards, the vision page
uses a single content block with multiple paragraphs, formatted with bold text and line breaks. It reuses the same
header/footer/mobile menu as other pages.

**Source internals:**
- Lines 12–31: Tailwind custom config (colors + fonts)
- Lines 33–340: CSS block covering header, mobile menu, vision-specific styles (content block, hero section)
- Lines 345–452: Header + mobile menu (identical to homepage/mission)
- Lines 455–458: Hero section with heading "Our Vision" and Sanskrit tagline
- Lines 461–478: Main content — single vision block with 4 paragraphs
- Lines 481–548: Footer (identical to homepage)
- Lines 550–669: JavaScript (mobile menu, auth state) — can reuse from homepage

**Key new concepts for this page:**
- **Rich text rendering** — Paragraphs contain `<b>` tags (bold text). In React, this is handled naturally with
  JSX: `<p>Under the leadership of <b>Acharya Upendra Ji</b>...</p>`.
- **Text-heavy layout** — No cards, no grids, no images. Just styled typography. This is a content-focused page
  where readability and visual hierarchy are paramount.
- **Line breaks in rendered text** — The HTML uses `<br>` tags between paragraphs. In React, use separate `<p>`
  elements instead: more semantic and easier to style.
- **Sanskrit text** — The tagline is "जनहिताय स्वयम् मोक्षाय च" (Devanagari script). Ensure font-family supports
  it, and metadata is correct (`lang="hi"` or `lang="sa"` might help with accessibility, though browsers render
  Devanagari fine in modern fonts).

**Prerequisite:** Homepage plan (01-homepage.md) and mission plan (08-mission.md) — establishes the Next.js project,
Tailwind config, and reusable Header/Footer components.

---

## The Steps

### Step 1 — Create the Vision Page Shell

**What:** Create `frontend/src/app/vision/page.tsx` as a standard (non-protected) page.

**Why this step exists:** The vision page is public. We set up the file structure and basic layout, similar to the
mission page, but with different content structure (text-heavy instead of grid-based).

**Tools & concepts introduced:**
- **App Router file-based routing** — `/vision` route maps to `app/vision/page.tsx`.
- **Server Component by default** — The vision page is static, so no `'use client'` is needed unless we add
  interactivity later.
- **Layout composition** — Reuse the `Header` and `Footer` components from previous pages.

**Verify:** Visiting `/vision` renders a blank page with header and footer. Navigation works.
**Commit:** `feat(frontend): create vision page shell with header and footer`

---

### Step 2 — Port the Vision Hero Section

**What:** Create `components/vision/VisionHero.tsx` with the heading "Our Vision" and the Sanskrit tagline.
Extract from lines 455–458 of the HTML mockup.

**Why this step exists:** The hero is a distinct visual section. Extracting it as a component keeps the page
clean and reusable across multiple pages if needed.

**Tools & concepts introduced:**
- **Serif vs. sans-serif typography** — The heading uses Lora (serif), the tagline uses Inter (sans) but
  displays in a larger size for visual emphasis. Use `className="font-serif text-4xl"` for the heading and
  `className="font-sans text-2xl"` for the tagline. The exact sizes come from the HTML mockup's inline styles.
- **Unicode/Devanagari support** — The tagline contains Devanagari script. Modern browsers and fonts (Google Fonts
  includes "Lora" which supports Devanagari). No special handling needed in React; just ensure the `<meta charset="UTF-8">`
  is in the HTML template (Next.js includes it by default).
- **Gradient backgrounds** — Like the mission hero, use a diagonal gradient. If not in Tailwind's defaults,
  use `style={{ background: 'linear-gradient(135deg, #F9F6F0 0%, #FDFBF8 100%)' }}`.

**Verify:** Hero section renders with correct heading, tagline, and responsive sizing.
**Commit:** `feat(frontend): add VisionHero component`

---

### Step 3 — Build the Vision Content Block Component

**What:** Create `components/vision/VisionContent.tsx` — a component that renders the vision text as paragraphs
with proper typography and line spacing.

**Why this step exists:** The vision content is distinct from the hero. Separating it as a component keeps the
page structure clear and makes it easy to adjust typography or add additional sections later.

**Tools & concepts introduced:**
- **Semantic HTML** — Use `<article>` or `<section>` to wrap the vision text, not a generic `<div>`. This improves
  SEO and accessibility.
- **Paragraph typography** — The HTML mixes paragraphs and `<br>` tags. In React, render each logical paragraph
  as a separate `<p>` element. This is cleaner and more semantic:
  ```tsx
  <p>Under the leadership of <b>Acharya Upendra Ji</b>...</p>
  <p>Guided by the principle of...</p>
  ```
- **Max-width for readability** — Long-form text is easier to read with a constrained line length.
  Use `className="prose prose-lg max-w-3xl mx-auto"` or manually set `max-w-2xl`. Tailwind's `prose` class
  (from `@tailwindcss/typography` plugin) provides good defaults for readability.
- **Bold text** — React's `<b>` tag works fine, but consider using `<strong>` for semantic emphasis (screen readers
  understand the difference). In JSX: `<strong>Acharya Upendra Ji</strong>`.
- **Line spacing** — The HTML has generous spacing between paragraphs (implicit with `<br>`). In React, use
  `className="space-y-6"` or `space-y-4` on the parent to add gap between `<p>` elements.

**Verify:** Vision content renders with readable line length, correct emphasis (bold text), and good spacing
between paragraphs.
**Commit:** `feat(frontend): create VisionContent component`

---

### Step 4 — Extract Vision Content to Data

**What:** Create `lib/data/visionContent.ts` — a TypeScript file exporting the vision paragraphs as an array of
objects with text and optional bold segments.

**Why this step exists:** Separating content from UI makes it easy to update the vision statement without touching
React code. It also makes the page content-manageable (content team can edit a `.ts` file without understanding JSX).

**Tools & concepts introduced:**
- **Text with rich formatting** — Instead of storing HTML strings (which are unsafe), store structured data with
  formatting markers. For example:
  ```ts
  interface VisionParagraph {
    text: string
    boldSegments?: Array<{ start: number; end: number }> // char indices for bold text
  }
  ```
  Or simpler: store paragraphs as JSX-friendly objects:
  ```ts
  interface VisionParagraph {
    parts: Array<{ text: string; bold?: boolean }>
  }
  ```
- **Alternative: Store as MDX or plain text** — If the vision becomes more complex (links, lists), consider
  storing it in Markdown (`.md`) and using `remark` to parse it into React components. For now, plain TypeScript
  is fine.

**Source:** Extract from lines 465–474 of the vision HTML mockup.

**Verify:** No visual change (data is now in a separate file, but rendered the same way).
**Commit:** `feat(frontend): extract vision content to lib/data/visionContent.ts`

---

### Step 5 — Populate and Render Vision Paragraphs

**What:** Update `VisionContent.tsx` to map over the vision data and render each paragraph with proper formatting.

**Why this step exists:** This step connects the data to the UI. The component now pulls from the data file, making
it dynamic and easy to update.

**Tools & concepts introduced:**
- **Conditional bold text** — If you're using the `parts` structure from Step 4, map over `parts` and conditionally
  wrap text in `<b>` tags:
  ```tsx
  {paragraph.parts.map((part, idx) => (
    <span key={idx}>{part.bold ? <b>{part.text}</b> : part.text}</span>
  ))}
  ```
- **Fragment for text-only content** — No need for extra divs; use `<>...</>` (React Fragment) to group elements
  without adding DOM nodes.

**Verify:** Vision paragraphs render with correct bold emphasis. Line breaks and spacing look correct.
**Commit:** `feat(frontend): render vision paragraphs from data`

---

### Step 6 — Wire the Vision Page Together

**What:** Update `app/vision/page.tsx` to import and render `VisionHero` and `VisionContent`.

**Why this step exists:** This is when all pieces come together. The page has a clear structure: hero, content,
footer. It's clean and ready for styling refinements.

**Verify:** `/vision` renders the complete vision page with hero, content block, and footer. Responsive behavior
works on mobile and desktop.
**Commit:** `feat(frontend): wire vision page components and data`

---

### Step 7 — Add Typographic Polish and Responsiveness

**What:** Refine font sizes, line heights, and spacing for optimal readability on all screen sizes.

**Why this step exists:** Long-form text requires careful typography. The mockup uses specific font sizes and line
heights. We refine these with Tailwind utilities.

**Tools & concepts introduced:**
- **Responsive font sizes** — `className="text-lg md:text-xl lg:text-2xl"` scales font size with screen width.
- **Line height for readability** — Body text typically needs `leading-relaxed` (1.625) or `leading-loose` (2) for
  comfort. Use `className="leading-relaxed"`.
- **Tailwind's `prose` plugin** — If you installed `@tailwindcss/typography`, use `className="prose prose-lg"`
  on the content wrapper. It automatically applies sensible defaults for typography (margins, line-height, font size).

**Verify:** Text is readable on mobile (smaller font, good line-height) and desktop (larger font, proper spacing).
No overflow; margins and padding feel balanced.
**Commit:** `feat(frontend): refine vision page typography and responsiveness`

---

### Step 8 — Build Verification

**What:** `npm run build`.
**Verify:** Build passes. The vision page is optimized and ready for production.
**Commit:** `chore(frontend): verify vision page production build`

---

## Summary

The vision page is now a clean, content-focused Next.js page with rich typography and semantic HTML. The content
is separated from the UI, making it easy to update without touching React code. The page reuses the header/footer
from previous pages and maintains visual consistency across the site.

**Files created:**
- `frontend/src/app/vision/page.tsx` — main page
- `frontend/src/components/vision/VisionHero.tsx` — hero section
- `frontend/src/components/vision/VisionContent.tsx` — content with paragraphs
- `frontend/src/lib/data/visionContent.ts` — vision text data

**Key takeaways:**
1. Content-focused pages benefit from separating data from UI.
2. Use semantic HTML (`<strong>` instead of `<b>`, `<article>` instead of `<div>`) for accessibility and SEO.
3. Typography matters — use Tailwind's utilities and plugins (like `prose`) for readable, polished text.
4. Responsive font sizes and line-heights ensure readability on all devices.
5. Reuse layout components (Header, Footer) across pages for consistency and maintainability.
