# Plan: Incremental Refactor of v7 Mockup — Newcomer Edition

## Context

`docs/prompts/output/frontend-branded-antaryog-v7.html` is a 1,263-line single-file prototype
("vibe-coded") that works great in the browser but can't scale: all styles, config, JavaScript,
and HTML are mixed together in one file. The goal is to move this to a proper Next.js project in
many **tiny, safe steps** — each one verifiable before moving on.

The approach is: **never do two things at once.** Each step changes exactly one kind of thing
(only config, or only layout, or only one component) and verifies the page looks identical
afterwards. There are no risky leaps.

**All work is done on a dedicated branch** — `main` is never touched until everything is ready.

---

## Source File

`docs/prompts/output/frontend-branded-antaryog-v7.html` — 1,263 lines

Key internals to migrate:
- Lines 12–32: Tailwind custom config (colors + fonts)
- Lines 46–291: 246-line `<style>` block (fixed header, dropdown, carousel CSS)
- Lines 295–1058: 8 HTML sections (header, hero, 5 content sections, footer)
- Lines 1060–1260: 200-line `<script>` block (4 JS features)

---

## Before You Start: Create a Git Branch

**What:** Create a separate branch so this work is isolated from `main`.
**Why:** A branch is a parallel workspace. All your commits go there. `main` stays clean and
untouched until you're ready to merge. If anything goes wrong, you can delete the branch and start
over — no harm done.

**Concepts:**
- **Git branch** — an independent line of development. Like a copy of the repo that only you edit.
- **`git checkout -b`** — creates the branch AND switches to it in one command.

```bash
cd /home/ameya/repo/aywebtest
git checkout -b feat/nextjs-v7-refactor
```

Verify: `git branch` should show `* feat/nextjs-v7-refactor` with an asterisk.

---

## The Steps (Very Slow, One at a Time)

Each step is a separate, completeable task. Do one, verify, commit, move on.

---

### Step 1 — Set Up the Next.js Project

**What:** Run `create-next-app` and verify it boots.

**Why this step exists:** Before touching any code, we need a working project shell. This one
command generates a complete, correctly wired project — you'd otherwise need hours to set up
webpack, TypeScript, and React manually.

**Tools & concepts introduced:**
- **Node.js** — JavaScript runtime that runs on your computer (not in a browser). npm is its package manager.
- **npx** — runs a package from the npm registry without installing it permanently. Here it runs `create-next-app`.
- **Next.js** — a React framework. "Framework" means it makes decisions for you (routing, building, etc.) so you don't have to.
- **TypeScript (`--typescript`)** — a superset of JavaScript that adds types. Catches bugs before they run.
- **`--app`** — uses the newer "App Router" style of Next.js (vs older "Pages Router").
- **`--src-dir`** — puts all code under `src/` to keep the root folder tidy.
- **`npm run dev`** — starts the development server with hot reload (changes appear instantly).

**Commands:**
```bash
cd /home/ameya/repo/aywebtest
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --no-import-alias
cd frontend && npm run dev
```

**Verify:** Open `http://localhost:3000` — the default Next.js welcome page appears.
**Commit:** `chore(frontend): initialize Next.js 14 project`

---

### Step 2 — Copy the Tailwind Color Config

**What:** Move the 7 custom colors from the HTML `<script>` block into `frontend/tailwind.config.ts`.

**Why this step exists:** The mockup uses color names like `text-primary` and `bg-accent` everywhere.
These aren't built into Tailwind — they were defined in the HTML file's inline `<script>` block.
We move them to the config file so Next.js Tailwind can recognize them.

**Tools & concepts introduced:**
- **Tailwind CSS** — a utility-first CSS framework. Instead of writing `.button { color: red }`, you write `<button class="text-red-500">`. Every visual property is a class name.
- **`tailwind.config.ts`** — the central config file. The `theme.extend` key adds your custom values ON TOP of Tailwind's defaults.
- **Design tokens** — the concept of giving your colors/fonts meaningful names (`primary`, `accent`) instead of hex codes directly in HTML. Change the hex in one place → updates everywhere.

**Source:** Lines 14–28 of `frontend-branded-antaryog-v7.html`

```ts
// In tailwind.config.ts → theme.extend.colors:
'primary':        '#B87333',  // Copper
'secondary':      '#E8B84B',  // Gold Light
'accent':         '#5C3010',  // Logo Brown
'background':     '#F9F6F0',  // Paper
'section-alt':    '#FDFBF8',  // Warm White
'text':           '#5C3010',
'text-secondary': '#7A6858',
```

Also add font families:
```ts
fontFamily: {
  'serif': ['Lora', 'Georgia', 'serif'],
  'sans':  ['Inter', 'system-ui', 'sans-serif'],
}
```

**Verify:** Add a test `<p className="text-primary">hello</p>` to `app/page.tsx` — it renders in copper color.
**Commit:** `style(frontend): add v7 design tokens to Tailwind config`

---

### Step 3 — Set Up Google Fonts

**What:** Add Lora + Inter to `app/layout.tsx` using `next/font/google`.

**Why this step exists:** The HTML mockup loads fonts from Google's CDN via a `<link>` tag. In
Next.js, we use `next/font` instead — it downloads the fonts at build time and serves them from
your own server. This is faster and works offline.

**Tools & concepts introduced:**
- **`next/font/google`** — Next.js built-in module that self-hosts Google Fonts. No CDN dependency at runtime.
- **CSS variables** — named references (`--font-lora`) injected into `<html>`. Tailwind config reads them so `font-serif` automatically uses Lora.
- **`app/layout.tsx`** — the root layout. Everything in it wraps every page (like a template). Headers, fonts, and global providers live here.

```tsx
import { Lora, Inter } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-lora',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-inter',
})
```

**Verify:** Open the dev server and inspect the page — fonts should visually match the HTML mockup.
**Commit:** `style(frontend): configure Lora and Inter fonts via next/font`

---

### Step 4 — Move the Global CSS

**What:** Copy the `<style>` block (lines 46–291 of the HTML) into `frontend/src/app/globals.css`.

**Why this step exists:** Tailwind utility classes can't express everything — CSS transitions,
pseudo-selectors, keyframe animations, and complex positioning need real CSS. The HTML file's
`<style>` block holds all of this. Moving it to `globals.css` makes it available project-wide.

**Tools & concepts introduced:**
- **`globals.css`** — the one CSS file imported into every page in Next.js (via `app/layout.tsx`).
- **`@tailwind base/components/utilities`** — Tailwind's own directives that must stay at the top of this file. Your custom rules go after them.
- **CSS transitions/animations** — `@keyframes fadeInUp`, the `.nav-dropdown-panel` show/hide, the carousel track styles — these stay as regular CSS, not Tailwind utilities.

**Note:** Temporarily remove `body { padding-top: 64px }` — the header doesn't exist in Next.js yet.

**Verify:** `globals.css` is saved. No TypeScript errors. No visible change yet (expected).
**Commit:** `style(frontend): port inline CSS from v7 HTML to globals.css`

---

### Step 5 — Create a Static Homepage Skeleton

**What:** Replace the default `app/page.tsx` content with a minimal shell.

**Why this step exists:** Verifies that the color config from Step 2 is wired correctly before
adding any content. It's the "hello world" for the design system.

**Tools & concepts introduced:**
- **React component** — a JavaScript function that returns HTML-like syntax (called JSX). `export default function Home()` is one.
- **JSX** — looks like HTML but it's JavaScript. Key rule: use `className` instead of `class` (because `class` is a reserved word in JS).
- **Server Component** — in Next.js App Router, components are "server" by default. They render on the server and send HTML. No JavaScript runs in the browser for these.

```tsx
// app/page.tsx
export default function Home() {
  return <main className="bg-background min-h-screen"></main>
}
```

**Verify:** The page background is `#F9F6F0` (warm paper color, not white).
**Commit:** `feat(frontend): add background color to homepage skeleton`

---

### Step 6 — Port the Footer

**What:** Create `frontend/src/components/layout/Footer.tsx` from lines 965–1058 of the HTML.

**Why this step exists:** The footer is the simplest section — no JavaScript, no state, no
interactivity. Pure HTML + Tailwind. This is the safest first "real" component to port.

**Tools & concepts introduced:**
- **Component file** — each React component lives in its own `.tsx` file under `components/`. Naming convention: `PascalCase.tsx`.
- **`next/image`** — replaces `<img>` tags. Automatically optimizes images (compression, lazy loading, prevents layout shift). Requires `width` and `height` props.
- **JSX conversions from HTML:**
  - `class=` → `className=`
  - `<img>`, `<br>`, `<input>` must be self-closed: `<img />`, `<br />`, `<input />`
  - `<!--comments-->` → `{/* comments */}`
  - `for=` → `htmlFor=`

**Verify:** Import `<Footer />` in `app/page.tsx` — footer renders identically to the HTML mockup.
**Commit:** `feat(frontend): port static footer from v7 mockup`

---

### Step 7 — Port the Hero Section

**What:** Create `frontend/src/components/home/HeroSection.tsx` from lines 506–562.

**Why this step exists:** The hero is also purely static — the main headline, stats, and founder
portrait. One more section with zero JS risk.

**Tools & concepts introduced:**
- **`components/home/` folder** — all homepage-specific sections live here, separate from `components/layout/` (which is for shared header/footer).
- **`next/image` with `priority`** — the hero image is above the fold (visible immediately), so add `priority` prop to preload it and avoid layout shift.
- **`alt` text** — required for accessibility. Screen readers use it to describe images to visually impaired users.

**Verify:** Import in `app/page.tsx`. Hero + footer visible, matches mockup.
**Commit:** `feat(frontend): port hero section from v7 mockup`

---

### Step 8 — Port About and Events Sections

**What:** Create `AboutSection.tsx` (lines 661–704) and `EventsSection.tsx` (lines 800–895).

**Why this step exists:** Both sections are purely static HTML. Porting them together is fine
because neither involves any JS — the work is identical mechanical conversion.

**Tools & concepts introduced:**
- **Colocation** — keeping related files near each other. `home/AboutSection.tsx` and `home/EventsSection.tsx` live next to the other home sections.
- **No-JS Server Components** — these are perfect examples: zero state, zero event handlers, zero `useEffect`. React renders them to plain HTML at build time.

**Verify:** All three sections (hero, about, events) visible in the browser.
**Commit:** `feat(frontend): port about and events sections from v7 mockup`

---

### Step 9 — Port Discourses Section

**What:** Create `frontend/src/components/home/DiscoursesSection.tsx` from lines 564–659.

**Why this step exists:** Still a static section — but it depends on the `@keyframes fadeInUp`
animation defined in `globals.css` (Step 4). This is the first test that the CSS migration worked.

**Tools & concepts introduced:**
- **CSS animations with Tailwind** — Tailwind doesn't have `fadeInUp` built in, so it stays in `globals.css` and is referenced via a regular class name (e.g., `discourse-card`).
- **JSX expressions** — inside JSX, `{/* */}` is a comment, `{someVariable}` renders a value, and `{condition && <Component />}` is conditional rendering.

**Verify:** Cards animate in on page load. Matches the HTML mockup visually.
**Commit:** `feat(frontend): port discourses section with fade-in animation`

---

### Step 10 — Port the CTA Section

**What:** Create `JoinMovementSection.tsx` from lines 897–963.

**Why this step exists:** The last static section. After this step, all non-interactive content is
ported. The page will look complete except for the header.

**Tools & concepts introduced:**
- **SVG in JSX** — inline SVG icons work the same as in HTML, but attributes like `stroke-width` become `strokeWidth` (camelCase in JSX). Also, `xmlns` is optional in JSX.

**Verify:** Full page visible: hero → discourses → about → events → CTA → footer.
**Commit:** `feat(frontend): port join-the-movement CTA section`

---

### Step 11 — Add the Static Header Shell

**What:** Create `frontend/src/components/layout/Header.tsx` with nav HTML (lines 295–408) but
**without** dropdowns or mobile menu. Just logo + static links.

**Why this step exists:** Deliberately splitting the HTML from the interactive JS. Doing both at
once would make it hard to debug if something breaks. Step 11 proves the structure is correct;
Steps 12–14 add the behavior.

**Tools & concepts introduced:**
- **`<nav>` landmark** — semantic HTML element. Screen readers use it to let users jump to navigation.
- **`next/link`** — replaces `<a href="...">`. Handles client-side navigation between Next.js pages without a full page reload. Fast and preserves scroll position.
- **`app/layout.tsx` update** — import `<Header />` and `<Footer />` here so they appear on every page automatically.

**Verify:** Logo and nav links appear at the top. No interactivity yet (no dropdowns, no hamburger).
**Commit:** `feat(frontend): add static header shell without interactivity`

---

### Step 12 — Add Desktop Dropdowns (`"use client"`)

**What:** Add `"use client"` to Header and port the dropdown hover logic (lines 1062–1089 of JS).

**Why this step exists:** Dropdowns need to react to mouse events — that requires JavaScript in the
browser. This is the first "client component" in the project.

**Tools & concepts introduced:**
- **`"use client"` directive** — tells Next.js "this component runs in the browser, not just on the server." Required for any component that uses `useState`, `useEffect`, or event handlers.
- **`useState`** — React hook for managing state. `const [openDropdown, setOpenDropdown] = useState<string | null>(null)` stores which dropdown is currently open.
- **Event handlers in JSX** — `onMouseEnter`, `onMouseLeave`, `onClick` instead of DOM's `addEventListener`.
- **Why not `classList.add`?** — In React, you don't mutate the DOM directly. Instead, you change state, and React re-renders with the right class name.

**Verify:** Hovering "Programs" or "Shibir" nav items shows the dropdown panel.
**Commit:** `feat(frontend): add interactive desktop dropdowns to header`

---

### Step 13 — Add the Mobile Menu (`useMobileMenu` hook)

**What:** Port the mobile menu IIFE (lines 1099–1151) into a custom React hook `useMobileMenu.ts`.

**Why this step exists:** The mobile menu is complex enough to deserve its own hook — it manages
open/close state, the `Escape` key, backdrop click, and window resize. Putting this in a hook
keeps the component clean.

**Tools & concepts introduced:**
- **Custom React hook** — a function starting with `use` that can contain state and effects. It's just a way to extract reusable logic. Lives in `src/lib/hooks/`.
- **`useEffect`** — runs code after the component renders. Used here to attach/detach the `keydown` event listener. The cleanup function (`return () => removeEventListener(...)`) prevents memory leaks.
- **`useRef`** — a React reference to a DOM element. Used here to check if the click was inside or outside the menu panel.

```ts
// src/lib/hooks/useMobileMenu.ts
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const openMenu = () => setIsOpen(true)
  const closeMenu = () => setIsOpen(false)
  // useEffect for Escape key and resize...
  return { isOpen, openMenu, closeMenu }
}
```

**Verify:** Hamburger button opens the slide-in panel. Backdrop click, close button, and Escape all close it.
**Commit:** `feat(frontend): add mobile menu with custom useMobileMenu hook`

---

### Step 14 — Add Auth State via Context

**What:** Create `frontend/src/contexts/AuthContext.tsx` from the auth IIFE (lines 1153–1200).

**Why this step exists:** The header shows different UI depending on whether the user is logged in.
The auth state needs to be accessible from the header component. React Context is the standard way
to share state across components without "prop drilling."

**Tools & concepts introduced:**
- **React Context** — a way to pass data to any component in the tree without passing it as props at every level. Think of it as a "global variable" that only React components can read.
- **`createContext` / `useContext`** — `createContext` defines the shape; `useContext(AuthContext)` reads it in any child component.
- **Context Provider** — the `<AuthContext.Provider value={...}>` wrapper in `layout.tsx` makes the value available to all children.
- **`localStorage`** — browser storage that persists across page reloads. The mockup uses it to simulate a logged-in session. Reading it in `useEffect` prevents server/client mismatch errors.

**Verify:** Open browser. Run `localStorage.setItem('firstName', 'Test')` in console → nav shows avatar. Remove it → shows Login/Register.
**Commit:** `feat(auth): add AuthContext for localStorage-based auth state`

---

### Step 15 — Port the Programs Carousel

**What:** Create `ProgramsCarousel.tsx` from lines 706–798 (HTML) + 1202–1259 (JS).

**Why this step exists:** The carousel is the most complex interactive component. It's saved for last
because it combines state, DOM refs, drag events, scroll events, and debouncing — all new concepts.

**Tools & concepts introduced:**
- **`useRef` for DOM access** — needed here to call `scrollTo()` on the carousel track element.
- **`useCallback`** — wraps a function so its reference stays stable between renders. Used for the `goTo` function that's also called from `useEffect`.
- **Drag handlers** — `onMouseDown`, `onMouseMove`, `onMouseUp`, `onMouseLeave` track the drag distance and scroll the carousel accordingly.
- **Debouncing** — waiting a short time (80ms) after the last scroll event before updating state. Prevents dozens of state updates while the user is still scrolling.
- **`scrollTo({ behavior: 'smooth' })`** — native browser API for smooth animated scrolling.

**Verify:** Arrow buttons and dot indicators navigate cards. Click-and-drag works. Snap detection updates the active dot.
**Commit:** `feat(frontend): port programs carousel as interactive React component`

---

### Step 16 — Run Final Build

**What:** `npm run build` in the `frontend/` directory, then `npm run start`.

**Why this step exists:** The dev server is forgiving — it ignores many errors. The build step is
strict and reveals TypeScript errors, missing `alt` props on images, or broken imports. Always
verify the build passes before considering a feature "done."

**Tools & concepts introduced:**
- **`npm run build`** — compiles TypeScript, runs the Next.js optimizer, generates static HTML for server components, and bundles client JS. Output goes to `.next/`.
- **`npm run start`** — serves the production build. Behaves exactly as it would on a real server.
- **TypeScript strict mode** — type errors that were warnings in dev become hard failures in build.

**Verify:** Zero errors in build output. `http://localhost:3000` serves the full production page.
**Commit:** `chore(frontend): verify production build passes`

---

## File Map: What Gets Created

```
frontend/
├── tailwind.config.ts              ← Step 2 (colors + fonts)
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Step 3 (fonts), Step 11 (header/footer wrappers), Step 14 (AuthProvider)
│   │   ├── globals.css             ← Step 4 (CSS from <style> block)
│   │   └── page.tsx                ← Steps 5–10, 15 (sections assembled here)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          ← Steps 11–14
│   │   │   └── Footer.tsx          ← Step 6
│   │   └── home/
│   │       ├── HeroSection.tsx          ← Step 7
│   │       ├── AboutSection.tsx         ← Step 8
│   │       ├── DiscoursesSection.tsx    ← Step 9
│   │       ├── EventsSection.tsx        ← Step 8
│   │       ├── JoinMovementSection.tsx  ← Step 10
│   │       └── ProgramsCarousel.tsx     ← Step 15
│   ├── contexts/
│   │   └── AuthContext.tsx         ← Step 14
│   └── lib/
│       └── hooks/
│           └── useMobileMenu.ts    ← Step 13
```

---

## Verification (End-to-End)

1. `cd frontend && npm run dev`
2. Open `http://localhost:3000`
3. Compare side-by-side with `docs/prompts/output/frontend-branded-antaryog-v7.html` in browser
4. All 8 sections should look identical
5. Test interactivity: nav dropdowns, mobile hamburger menu, carousel arrows + drag, auth toggle
6. `npm run build` → zero errors
7. `git log --oneline` → 16 clean commits on `feat/nextjs-v7-refactor` branch
