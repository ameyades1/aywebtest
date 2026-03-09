# Plan: Email Verification Screen — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/verification-branded-antaryog.html` (564 lines) is a simple informational
page shown after a user requests an email verification link. It has:
- A success icon animation (`@keyframes scaleIn`)
- A displayed email address (currently hardcoded — needs URL params)
- A 60-second resend countdown button
- No forms, no modals, no OTP inputs

**Important:** This file uses the old **teal** color theme (v1/v2) instead of the
selected copper theme. The theme must be corrected during porting.

**Prerequisite:** Login plan (02-login.md) must be done — reuses `useResendTimer`.

---

## The Steps

### Step 1 — Create the Email Verification Page Shell

**What:** Create `frontend/src/app/verify-email/page.tsx` as a Server Component
that reads `email` from URL search params.

**Why this step exists:** This page is almost entirely static — no buttons that change state,
no forms to submit. Only the resend button needs interactivity, so the page starts as a
Server Component and we'll extract just the resend button as a client component.

**Tools & concepts introduced:**
- **`searchParams` in App Router** — Server Components receive a `searchParams` prop:
  ```tsx
  export default function VerifyEmailPage({
    searchParams
  }: { searchParams: { email?: string } }) {
    const email = searchParams.email ?? 'your email'
    ...
  }
  ```
  No need for `useSearchParams()` (a client hook) when the component is a Server Component.
- **`maskEmail` utility** — reuse from `lib/utils.ts` (created in the login plan).

**Verify:** Visiting `/verify-email?email=test@example.com` renders the page with the
masked email displayed. No interactivity yet.
**Commit:** `feat(auth): add email verification page shell with masked email display`

---

### Step 2 — Fix the Color Theme

**What:** The HTML mockup uses teal (`#09A59A`) instead of the copper design system.
Replace all teal color references with the correct copper tokens (`primary`, `accent`, etc.)
during the HTML-to-JSX conversion.

**Why this step exists:** All other pages use the v7 copper design. Using teal here would
make this page look like it belongs to a different site.

**Tools & concepts introduced:**
- **Design system consistency** — every page should use the same `text-primary`, `bg-background`,
  `border-accent` tokens. This is why design tokens were set up in Step 2 of the homepage plan —
  changing one hex value updates the whole site.

**Verify:** Page uses copper/warm color palette. Matches the visual style of the homepage and auth pages.
**Commit:** `style(auth): fix email verification page to use copper theme instead of teal`

---

### Step 3 — Add the Success Icon Animation

**What:** The success checkmark icon has a `scaleIn` entrance animation. Add it to `globals.css`
and apply the `.success-icon` class to the icon container.

**Tools & concepts introduced:**
- **CSS `@keyframes` from scratch** — `scaleIn` animates `transform: scale(0.5)` and `opacity: 0`
  to `scale(1)` and `opacity: 1`. This is the same pattern as `fadeInUp` in the homepage plan,
  just with scale instead of translate.
- **`animation-fill-mode: forwards`** — tells CSS to hold the final keyframe state after the
  animation completes. Without it, the element would snap back to `scale(0.5)`.

**Verify:** On page load, the checkmark icon scales in smoothly.
**Commit:** `style(auth): add success icon scale-in animation to email verification page`

---

### Step 4 — Extract the ResendButton Client Component

**What:** Create `components/auth/ResendButton.tsx` as a `"use client"` component that uses
`useResendTimer`. The rest of the page stays as a Server Component.

**Why this step exists:** Only the button needs JavaScript (the countdown timer). Keeping the
rest of the page as a Server Component is the correct Next.js pattern — only "push down" the
`"use client"` boundary as far as needed.

**Tools & concepts introduced:**
- **"Pushing the client boundary down"** — instead of marking the whole page `"use client"`,
  extract only the interactive piece. The page stays a Server Component; only `<ResendButton>`
  is a Client Component. This improves performance.
- **Reusing `useResendTimer`** — the hook was built in the login plan. Import and use it here
  without rewriting any timer logic.

**Verify:** Resend button shows 60-second countdown. After 60s it becomes clickable again.
The rest of the page (text, icon, layout) renders instantly with no JavaScript bundle cost.
**Commit:** `feat(auth): add ResendButton client component with countdown timer`

---

### Step 5 — Build Verification

**What:** `npm run build`. Check that Server/Client split compiles correctly.
**Verify:** Build passes. `/verify-email?email=test@example.com` works in production mode.
**Commit:** `chore(auth): verify email verification page production build`
