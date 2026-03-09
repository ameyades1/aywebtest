# Plan: Welcome Dashboard — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/welcome-dashboard-antaryog.html` (651 lines) is a simple post-registration
landing page. It shows a personalized greeting, featured programs, upcoming events, and quick
action cards. No forms, no modals. The main new concept it introduces: **auth guarding** —
only logged-in users should see this page.

**Source internals:**
- Reads `firstName` from URL param or localStorage
- `handleLogout()` clears localStorage keys and redirects to login
- No JS-rendered content — all static HTML

**Prerequisite:** Login plan (02-login.md) — reuses `AuthContext` and `useRequireAuth`.

---

## The Steps

### Step 1 — Create the useRequireAuth Hook

**What:** Create `frontend/src/lib/hooks/useRequireAuth.ts` — redirects to `/login` if the
user is not authenticated.

**Why this step exists:** The welcome dashboard should only be visible to logged-in users.
In the HTML mockup there is no guard (any URL works). In production we need to redirect
unauthenticated visitors. This hook encapsulates that logic.

**Tools & concepts introduced:**
- **Auth guarding** — the pattern of checking if a user is authenticated before showing a page.
  Standard in almost every app that has users.
- **`useEffect` + `router.push`** — check auth in `useEffect` (after mount, because localStorage
  is not available during server rendering) and redirect if not authenticated:
  ```ts
  useEffect(() => {
    if (!firstName) router.push('/login')
  }, [firstName, router])
  ```
- **Why `useEffect` and not synchronously?** — Server Components run on the server where
  `localStorage` doesn't exist. `useEffect` only runs in the browser, so it's safe.

**Verify:** Hook is written. No visual test yet.
**Commit:** `feat(auth): add useRequireAuth hook for protected page redirection`

---

### Step 2 — Create the Welcome Dashboard Page Shell

**What:** Create `frontend/src/app/welcome/page.tsx` as a `"use client"` component. Call
`useRequireAuth()` at the top.

**Tools & concepts introduced:**
- **Protected route pattern** — the first line of any protected page:
  ```ts
  'use client'
  const { firstName } = useRequireAuth()
  if (!firstName) return null  // renders nothing while redirecting
  ```
  The `return null` prevents a flash of content while the redirect happens.
- **Personalized greeting** — `<h1>Welcome back, {firstName}!</h1>`. `firstName` comes from
  `AuthContext` which reads localStorage on mount.

**Verify:** Visiting `/welcome` while not logged in redirects to `/login`.
While logged in (firstName set in localStorage), the page renders with the correct name.
**Commit:** `feat(frontend): add welcome dashboard page with auth guard`

---

### Step 3 — Port the Welcome Banner Section

**What:** Create `components/dashboard/WelcomeBanner.tsx` from lines 280–360 of the HTML mockup.
The background image at 30% opacity + personalized heading + two CTA buttons.

**Tools & concepts introduced:**
- **Inline style for dynamic values** — the background image overlay uses an opacity value that
  can't be expressed purely in Tailwind: `<div style={{ backgroundImage: `url(${img})` }}>`.
  Use `style=` only when the value is dynamic or can't be expressed with a utility class.
- **`next/image` with `fill` prop** — for background-style images that stretch to fill their
  container, use `fill` instead of fixed width/height, with the container having `position: relative`.

**Verify:** Welcome banner renders with founder background image, personalized greeting, and CTAs.
**Commit:** `feat(frontend): add WelcomeBanner component to welcome dashboard`

---

### Step 4 — Port the Featured Programs and Events Sections

**What:** Create `FeaturedPrograms.tsx` and `UpcomingEvents.tsx` from the HTML mockup.
Both are purely static — hardcoded cards.

**Why this step exists:** These sections are static and identical in structure to the homepage
programs/events sections. Porting them is mechanical HTML-to-JSX conversion.

**Tools & concepts introduced:**
- **`group` Tailwind class** — the program cards use `group-hover:scale-110` on images and
  `group-hover:translate-x-2` on arrow icons. Add `group` to the card's outer div, and child
  elements respond to the card's hover state. This is a Tailwind pattern for compound hover effects.
- **Hover utilities** — `hover:shadow-lg`, `hover:-translate-y-1`, `transition-all` — these
  apply on mouse hover. No JavaScript needed.

**Verify:** Program and event cards render correctly. Hovering cards shows lift + shadow effect.
**Commit:** `feat(frontend): add featured programs and events to welcome dashboard`

---

### Step 5 — Port the Quick Actions Grid

**What:** Create `QuickActions.tsx` — 4 icon cards linking to Browse Programs, View Events,
Contact Us, and View Profile (`/profile`).

**Tools & concepts introduced:**
- **`next/link` for internal navigation** — the "View Profile" link goes to `/profile`. Use
  `<Link href="/profile">` instead of `<a href="/profile">`. Next.js pre-fetches the profile
  page when the link enters the viewport.
- **SVG icons inline vs. icon library** — the mockup uses inline SVG. This is fine for small
  numbers of icons. Note that an icon library (like `lucide-react`) would be cleaner at scale.

**Verify:** All 4 quick action cards render. "View Profile" link navigates correctly.
**Commit:** `feat(frontend): add quick actions grid to welcome dashboard`

---

### Step 6 — Build Verification

**What:** `npm run build`.
**Verify:** Build passes. Protected route behavior works in production mode.
**Commit:** `chore(frontend): verify welcome dashboard production build`
