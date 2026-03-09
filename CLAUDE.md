# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AntarYog Foundation Website** — A website for a Vedantic spiritual organization. The project is in the **design/mockup phase**: all production-ready HTML prototypes live in `docs/prompts/output/` and the root. `frontend/` and `backend/` directories are currently empty — actual Next.js/Express implementation has not yet been ported.

**Target stack when built:**
- Frontend: Next.js 14+, React, TypeScript, Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB
- Auth: JWT (passwordless OTP via email/SMS — no password fields)

## Where Things Live

```
aywebtest/
├── index.html                         # Gallery of all mockups (open in browser)
├── Suvarna_Mockup.html                # Suvarna theme (co-finalist design, root-level)
├── docs/
│   ├── migration_plan.md              # CRITICAL: 9-phase plan to port v7 → Next.js
│   ├── AUTH_SCREENS_IMPLEMENTATION.md # Auth screens design notes
│   ├── LEARNING_GUIDE.md              # Tech explanations for the project owner
│   ├── CONTRIBUTING.md                # Conventional Commits format + code style
│   └── prompts/output/                # All HTML design mockups
│       ├── frontend-branded-antaryog-v1.html  through v15.html
│       ├── login-branded-antaryog.html        # OTP login (4-screen flow)
│       ├── signup-branded-antaryog.html       # OTP signup (4-screen flow)
│       ├── verification-branded-antaryog.html # Email verification
│       ├── profile-completion-antaryog.html   # Post-signup profile form
│       ├── welcome-dashboard-antaryog.html    # Post-registration dashboard
│       ├── profile-page-antaryog.html         # 8-section user profile (5,448 lines)
│       ├── ROLE_DEFINITION.md                 # Organization mission + feature requirements
│       ├── ONBOARDING_FLOW_SUMMARY.md         # Post-registration user journey
│       └── POST_REGISTRATION_IMPLEMENTATION_GUIDE.md
├── OTP_IMPLEMENTATION_COMPLETE.md     # OTP auth implementation notes
├── assets/                            # Downloaded images, CSS, thumbnails
└── download-assets.sh                 # Auto-discovers + downloads assets from live site
```

## Design System

### Selected Design for Next.js Build: v7 "White Copper"
`docs/prompts/output/frontend-branded-antaryog-v7.html`
- **Primary (Copper):** `#B87333`
- **Secondary (Gold Light):** `#E8B84B`
- **Accent (Logo Brown):** `#5C3010`
- **Background (Paper):** `#F9F6F0`
- **Fonts:** Lora (serif headings), Inter (sans body)

### Suvarna Theme (Co-Finalist — `Suvarna_Mockup.html`)
- **Logo Golden Yellow:** `#FAD800`
- **Logo Deep Brown:** `#503228`
- **Page BG (Warm Ivory):** `#FBF7EE`
- **Dark Nav/Footer:** `#3A1E0C`
- **Fonts:** Cinzel (display), Cormorant Garamond (body serif), Nunito (sans)

### Other Mockup Themes (v1–v6, reference only)
- **Teal (v1–v2):** `ay-teal` #09A59A, `ay-teal-dark` #078078
- **Saffron (v3–v4):** `ay-saffron` #D97706, `ay-saffron-dark` #B45309
- **Earth-Gold (v5–v6):** `primary` #6B3E2E, `secondary` #D9A441, `background` #F6F1E7

All mockups use Tailwind CSS via CDN with a custom config block in each `<head>`.

## Authentication: OTP-Based (Passwordless)

The chosen auth pattern has **no password fields**. All auth screens use a 4-screen state machine:
1. Method selection (Email vs Phone)
2. Credential entry (email or phone + name on signup)
3. OTP verification (6-digit code, auto-advance inputs, 45s resend timer)
4. Redirect (login → homepage; signup → `/profile-completion`)

**Mockup OTP code:** `123456` (any other code shows error + shake animation)

Key JS functions in the HTML mockups: `showScreen(id)`, `handleEmailLogin()`, `handlePhoneLogin()`, `handleOTPVerification()`, `startResendTimer()`, `resetOTPInputs()`

State preserved in `authState` / `signupState` objects (see `OTP_IMPLEMENTATION_COMPLETE.md`).

## Next.js Migration Plan

`docs/migration_plan.md` is the single source of truth for implementation. It outlines 9 phases:

| Phase | Work |
|---|---|
| 0 | Verify `frontend/` builds (`npm run build`) |
| 1 | Wire `AuthContext` into root layout; refactor `Header.tsx` |
| 2 | Build shared UI atoms: `Modal`, `OTPInput`, `OTPScreen`, `MethodScreen`, `lib/validation.ts` |
| 3 | Port login flow → `app/login/page.tsx` |
| 4 | Port signup flow → `app/signup/page.tsx` |
| 5 | Profile page shell with `useRequireAuth` guard |
| 6 | Simple profile sections (Settings, SadhakID, ShibirHistory) |
| 7 | Complex sections (EditProfileModal, AadhaarVerification, BrowseCenters, NaadiJyotish, Volunteering) |
| 8 | API client layer with `MOCK_MODE` flag |
| 9 | `next/image` optimization + final `npm run build` |

**Target component tree after migration:**
```
src/
├── app/            layout.tsx, page.tsx, login/, signup/, profile/
├── components/     layout/, home/, auth/, profile/, ui/
├── contexts/       AuthContext.tsx
├── lib/            api/client.ts, data/, hooks/useRequireAuth.ts, validation.ts
└── types/          auth.ts, profile.ts, center.ts
```

## Development Commands

```bash
# View mockups — open any HTML file directly in a browser
# No build step required for mockups

# Download project assets from live website
./download-assets.sh          # Download all
./download-assets.sh --dry-run # Preview only

# When frontend/ exists:
cd frontend && npm install && npm run dev     # Next.js on port 3000
cd backend  && npm install && npm run dev     # Express on port 5000
```

## Commit Format

Follow Conventional Commits (`docs/CONTRIBUTING.md`):
```
<type>(<scope>): <short description>
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
Scopes: `frontend`, `backend`, `auth`, `db`, `assets`, `config`, `docs`

## Key Reference Documents

- **Organization mission + features:** `docs/prompts/output/ROLE_DEFINITION.md`
- **Complete user journey (signup → dashboard):** `docs/prompts/output/ONBOARDING_FLOW_SUMMARY.md`
- **OTP system details:** `OTP_IMPLEMENTATION_COMPLETE.md`
- **Profile page spec (8 sections + 3 modals):** `docs/prompts/output/profile-page-antaryog.html`
- **Backend API specs:** `docs/prompts/output/POST_REGISTRATION_IMPLEMENTATION_GUIDE.md`

## Profile Page Architecture (8 Sections)

`profile-page-antaryog.html` (5,448 lines) contains the full user profile design:

```
ProfileSection enum: personal | sadhak | settings | naadi-jyotish |
                     enrolled-center | browse-centers | shibir-history | volunteering
```

Notable complexity: Aadhaar verification (2-stage modal), 25-field volunteering form with character counters, center filter (4 dropdowns), mock data for shibirs/centers/naadi consultations in the HTML.

## Environment Variables (for when backend is implemented)

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_MOCK_AUTH=true   # Set to false to use real backend

# backend/.env.local
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aywebtest
JWT_SECRET=your-secret-key-here
```
