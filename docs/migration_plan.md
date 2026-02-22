# Plan: Modularize v7 Mockup → Professional Next.js Project

## Context

The v7 "White Copper" homepage (`docs/prompts/output/frontend-branded-antaryog-v7.html`) was previously modularized into 14 React components and a Next.js 16 project at `frontend/`. That work is committed in git history (commits `b6ba54a`–`4152d5e`).

**Current gap:** Three HTML mockups have NOT been ported to Next.js:
- `login-branded-antaryog.html` (956 lines) — multi-screen OTP auth flow
- `signup-branded-antaryog.html` (1,094 lines) — same flow + Full Name + Terms
- `profile-page-antaryog.html` (5,448 lines) — 8-section dashboard with modals

Additionally, `AuthContext` is defined but not wired into the root layout, and internal links still use raw `<a href="#">` placeholders.

**Goal:** Port all mockups into clean, TypeScript React components in tiny steps, each verifiable before proceeding. Result must be ready for real Express.js + JWT backend integration.

---

## Critical Files

| File | Purpose |
|---|---|
| `frontend/src/app/layout.tsx` | Wire AuthProvider here first |
| `frontend/src/contexts/AuthContext.tsx` | Already built — `login()`, `logout()`, localStorage sync |
| `frontend/src/components/layout/Header.tsx` | Reads localStorage directly — refactor to `useAuth()` |
| `docs/prompts/output/login-branded-antaryog.html` | Source for all auth screen logic |
| `docs/prompts/output/signup-branded-antaryog.html` | Source for signup-specific fields |
| `docs/prompts/output/profile-page-antaryog.html` | Source for all 8 profile sections + modals |

---

## Phase 0 — Verify Baseline (prerequisite)

**Step 0.1** — Confirm `frontend/` is on disk and buildable
- Run `npm run build` inside `frontend/`
- **Done when:** Zero errors, `out/` directory generated with `index.html`
- If build fails, restore from git: `git checkout b6ba54a -- frontend/`

---

## Phase 1 — Wire Auth Context (1 hour)

**Step 1.1** — Wrap root layout with `AuthProvider`
- Edit: `frontend/src/app/layout.tsx`
- Import `{ AuthProvider }` from `@/contexts/AuthContext` and wrap `{children}`
- **Done when:** No console errors on homepage, `useAuth()` callable in any client component

**Step 1.2** — Refactor `Header.tsx` to use `useAuth()` hook
- Edit: `frontend/src/components/layout/Header.tsx`
- Remove the `useEffect` that reads `localStorage` directly
- Replace 4 local state vars with `const { isLoggedIn, firstName, logout } = useAuth()`
- **Done when:** Setting `localStorage.firstName = 'Test'` + refresh shows avatar in header; Logout clears it

**Step 1.3** — Verify `MobileMenu.tsx` prop compatibility
- `MobileMenu` receives `isLoggedIn`, `firstName` as props from `Header` — no change needed
- **Done when:** Mobile menu shows avatar when logged in, Login/Sign Up when logged out

---

## Phase 2 — Shared UI Atoms (2 hours)

These are used across login, signup, AND profile. Extract them before building any page.

**Step 2.1** — Create `components/ui/Modal.tsx` (generic modal wrapper)
- Props: `isOpen: boolean`, `onClose: () => void`, `size?: 'sm'|'md'|'lg'`, `children`
- Renders backdrop + centered white panel; Escape key triggers `onClose`; sets `body.menu-open` CSS class to prevent background scroll (class already defined in `globals.css`)
- **Done when:** Renders correctly at all 3 sizes; Escape closes; background does not scroll

**Step 2.2** — Create `components/auth/OTPInput.tsx` (single digit field)
- Props: `value`, `onChange`, `onKeyDown`, `onPaste`, `index`, `hasError: boolean`
- Single 60×60px input, copper border on focus, red on error
- Auto-advance/backspace logic lives in parent `OTPScreen`
- **Done when:** 6 inputs side-by-side match the OTP row in the HTML mockup at 375px and 1440px

**Step 2.3** — Create `components/auth/OTPScreen.tsx` (complete OTP entry screen)
- Contains 6 `OTPInput` instances with auto-advance, backspace-retreat, paste-split logic
- Props: `maskedIdentifier: string`, `onVerify(otp: string)`, `onBack()`, `isLoading?`, `error?`
- 60-second resend countdown (porting `startResendTimer()` from HTML)
- **Done when:** Typing digits auto-advances; paste of "123456" fills all; countdown works

**Step 2.4** — Create `components/auth/MethodScreen.tsx` (email vs phone choice)
- Props: `mode: 'login'|'signup'`, `onSelectEmail()`, `onSelectPhone()`
- Heading changes: "Sign in to your account" vs "Create your account"
- **Done when:** Both buttons fire callbacks; heading changes with `mode` prop

**Step 2.5** — Create `lib/validation.ts` (shared validation utilities)
- `validateEmail(email)`, `validatePhone(phone)` → return error string or null
- `maskEmail(email)`, `maskPhone(full)`, `maskAadhaar(aadhaar)` → return masked string
- **Done when:** `validateEmail('bad')` returns an error; `validateEmail('ok@test.com')` returns null

---

## Phase 3 — Login Page (2 hours)

**Step 3.1** — Create `components/auth/EmailLoginForm.tsx`
- Email input + Send OTP button + Back button
- Uses `validateEmail()` from `lib/validation.ts`
- Props: `onSubmit(email: string)`, `onBack()`
- **Done when:** Invalid email shows inline error; valid email fires `onSubmit`

**Step 3.2** — Create `components/auth/PhoneLoginForm.tsx`
- Country code `<select>` + 10-digit phone input
- Uses `validatePhone()` from `lib/validation.ts`
- Props: `onSubmit(phone: string, countryCode: string)`, `onBack()`
- **Done when:** Entering "98765" shows error; "9876543210" fires `onSubmit`

**Step 3.3** — Create `app/login/page.tsx`
- Client component; `type LoginScreen = 'method'|'email'|'phone'|'otp'`
- Orchestrates: `MethodScreen → EmailLoginForm/PhoneLoginForm → OTPScreen`
- On OTP `'123456'`: calls `login(displayName, identifier)` from `useAuth()` + `router.push('/')`
- Layout: `<Header/>`, full-page centered card with AY logo above card, `<Footer/>`
- **Done when:** Full flow completes — method → email → `123456` OTP → homepage with avatar

**Step 3.4** — Wire login `<Link>` in Header and MobileMenu
- Replace `<a href="/login">` with `<Link href="/login">` (Next.js client navigation)
- **Done when:** Clicking Login from homepage navigates without full-page reload

---

## Phase 4 — Signup Page (1.5 hours)

**Step 4.1** — Create `components/auth/EmailSignupForm.tsx`
- Fields: Full Name, Email, Notifications checkbox, Terms checkbox (required)
- Uses `validateEmail()` from `lib/validation.ts`
- Props: `onSubmit(email, fullName, optIn: boolean)`, `onBack()`
- **Done when:** Submitting without Terms check shows error; valid data fires callback

**Step 4.2** — Create `components/auth/PhoneSignupForm.tsx`
- Fields: Full Name, country code + phone, same two checkboxes
- Props: `onSubmit(phone, countryCode, fullName, optIn: boolean)`, `onBack()`
- **Done when:** Same verification as `EmailSignupForm`

**Step 4.3** — Create `app/signup/page.tsx`
- Same screen state machine as login page
- On OTP success: `firstName = fullName.split(' ')[0]`; calls `login(firstName, identifier)`; redirects to `/`
- **Done when:** Full signup flow → homepage with avatar showing first name

---

## Phase 5 — Profile Page Shell (2 hours)

**Step 5.1** — Create type definitions
- `src/types/profile.ts` — `UserProfile`, `NaadiProfile`, `VolunteeringProfile` interfaces
- `src/types/center.ts` — `Center` interface with filter fields
- `src/types/auth.ts` — `LoginMethod = 'email'|'phone'`
- **Done when:** `tsc --noEmit` passes with no errors on these files

**Step 5.2** — Create profile data files (mock data extracted from HTML)
- `lib/data/centers.ts` — 10 centers from HTML lines 3841–3947
- `lib/data/shibirs.ts` — 6 shibirs from HTML lines 3948–4036
- `lib/data/volunteering.ts` — `VolunteeringProfile` interface + default values
- `lib/data/naadi.ts` — birth profile + consultations mock data from HTML
- **Done when:** Each file imports its types; `tsc --noEmit` passes

**Step 5.3** — Create `components/profile/ProfileSidebar.tsx`
- 8 nav items with icons; `activeSection` prop highlights active item in copper
- Mobile: slide-in drawer triggered by a hamburger FAB (mirrors `toggleProfileDrawer()` from HTML)
- Props: `activeSection: ProfileSection`, `onNavigate(section: ProfileSection)`
- `type ProfileSection = 'personal'|'sadhak'|'settings'|'naadi-jyotish'|'enrolled-center'|'browse-centers'|'shibir-history'|'volunteering'`
- **Done when:** Desktop sidebar renders all 8 nav items; active item highlighted; mobile drawer opens/closes

**Step 5.4** — Create `lib/hooks/useRequireAuth.ts`
```typescript
export function useRequireAuth() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!isLoggedIn) router.replace('/login')
  }, [isLoggedIn, router])
  return isLoggedIn
}
```
- **Done when:** Opening `/profile` in incognito redirects to `/login`

**Step 5.5** — Create `app/profile/page.tsx` shell
- Uses `useRequireAuth()` to guard the route
- Manages `activeSection` state; renders `ProfileSidebar` + placeholder content area
- **Done when:** Logged-in user sees shell with sidebar; incognito user redirects to login

---

## Phase 6 — Profile Sections: Simple First (3 hours)

Each section is verified independently before moving to the next.

**Step 6.1** — `sections/SettingsSection.tsx`
- Static notification toggles from HTML lines 2889–2916
- **Done when:** Clicking "Account Settings" nav item renders the settings section

**Step 6.2** — `sections/SadhakIDSection.tsx`
- Sadhak ID card, QR code, referral link with copy-to-clipboard
- `navigator.clipboard.writeText()` + `useState` "Copied!" toast (2-second auto-reset)
- **Done when:** QR card renders; copy button shows "Copied!" feedback for 2 seconds

**Step 6.3** — `sections/ShibirHistorySection.tsx`
- Maps `SHIBIRS_DATA` → card grid; sorted newest-first; online/in-person badges
- Download Certificate button → `window.alert()` (mockup placeholder)
- **Done when:** 6 shibir cards render with correct data and badges

---

## Phase 7 — Profile Sections: Complex (4 hours)

**Step 7.1** — `ui/CharacterCounter.tsx`
- Props: `current: number`, `max: number` → renders `"45 / 500"`
- Turns red at 90% of max
- **Done when:** Renders at 0/500, amber at 450/500, red at 490/500

**Step 7.2** — `modals/EditProfileModal.tsx`
- Uses `Modal` with `size="lg"`; two tab groups (Personal + Location & Preferences)
- Photo upload preview via `FileReader` API
- Calls `onSave(formData)` on valid submit
- **Done when:** Modal opens from Edit button; photo upload shows preview; validation prevents empty save

**Step 7.3** — `modals/AadhaarVerificationModal.tsx`
- Uses `Modal` + `OTPInput` atoms; 2-stage: Aadhaar input → OTP
- Aadhaar auto-formats as `XXXX XXXX XXXX` (12 digits)
- OTP `'123456'` marks verified; calls `onVerified(maskedAadhaar: string)`
- **Done when:** Flow completes; green "Verified" badge appears on PersonalInfoSection

**Step 7.4** — `sections/PersonalInfoSection.tsx`
- Profile summary card (photo, name, Sadhak ID) + Aadhaar card + "Edit Profile" button
- Owns `EditProfileModal` and `AadhaarVerificationModal` state
- **Done when:** Section renders; Edit and Verify flows work

**Step 7.5** — `sections/BrowseCentersSection.tsx` + `EnrolledCenterSection.tsx`
- Browse Centers: 4 filter dropdowns (State, Language, Day, Search); `CENTERS_DATA` filtered by derived React state; "Load More" pagination (6 → all)
- Enrolled Center: current center card with Join/Leave buttons (mock alert)
- **Done when:** Filtering by state narrows cards; Load More shows all 10; Join/Leave trigger alerts

**Step 7.6** — `sections/NaadiJyotishSection.tsx`
- Birth profile card with Rashi/Nakshatra badges; Upcoming Consultations grid; History grid
- Download Patrika → `window.alert()` placeholder
- **Done when:** "Simha (Leo)" Rashi badge renders; 2 upcoming + 3 history cards visible

**Step 7.7** — `modals/EditVolunteeringModal.tsx` + `sections/VolunteeringSection.tsx`
- 25 fields in 6 field groups; `CharacterCounter` on textareas; persists to `localStorage`
- Empty state → "Fill in your profile" prompt; after save → read-only display cards
- **Done when:** Filling Occupation + saving shows it on section; refreshing preserves data

---

## Phase 8 — API Integration Layer (2 hours)

**Step 8.1** — Create `lib/api/client.ts`
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = {
  get:    <T>(path: string, auth = false) => request<T>('GET', path, undefined, auth),
  post:   <T>(path: string, body: unknown, auth = false) => request<T>('POST', path, body, auth),
  put:    <T>(path: string, body: unknown, auth = false) => request<T>('PUT', path, body, auth),
  delete: <T>(path: string, auth = false) => request<T>('DELETE', path, undefined, auth),
}
// Returns { data: T | null, error: string | null } — never throws
// Attaches Bearer token from localStorage.authToken when auth=true
```
- **Done when:** `api.post('/api/auth/send-otp', { email })` importable with no TypeScript errors

**Step 8.2** — Add `MOCK_MODE` flag to auth pages + swap-ready API calls
- Add `const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_AUTH !== 'false'` to `login/page.tsx` and `signup/page.tsx`
- In mock mode: OTP `'123456'` works; in real mode: calls `api.post('/api/auth/verify-otp', ...)` and stores returned JWT as `localStorage.authToken`
- **Done when:** Mock mode flow unchanged; real mode attempts API call and shows error gracefully when backend is offline

---

## Phase 9 — Image Optimization + Final Build (1 hour)

**Step 9.1** — Replace `<img>` with `next/image` where layout-critical
- Edit: `HeroSection.tsx`, `AboutAcharya.tsx` (portrait images with defined dimensions)
- Keep `<img>` in Carousel (dynamic sizing) for now
- **Done when:** `npm run build` produces zero image warnings

**Step 9.2** — Final build validation
- Run `npm run build` in `frontend/`
- Verify `out/` contains: `index.html`, `login/index.html`, `signup/index.html`, `profile/index.html`
- **Done when:** Zero TypeScript errors; zero build errors; all 4 routes present in `out/`

---

## Final Component Tree

```
src/
├── app/
│   ├── layout.tsx                  ← AuthProvider wraps here
│   ├── page.tsx                    ← Homepage (already done)
│   ├── login/page.tsx              ← Phase 3
│   ├── signup/page.tsx             ← Phase 4
│   └── profile/page.tsx            ← Phase 5–7
├── components/
│   ├── layout/  Header, MobileMenu, Footer   (exists, Phase 1 refactor)
│   ├── home/    6 sections                   (exists)
│   ├── auth/    MethodScreen, OTPScreen, OTPInput,
│   │            EmailLoginForm, PhoneLoginForm,
│   │            EmailSignupForm, PhoneSignupForm    ← Phase 2–4
│   ├── profile/ ProfileSidebar, 8 sections, 3 modals ← Phase 5–7
│   └── ui/      Button, SectionHeader, Modal, CharacterCounter ← Phase 2, 7
├── contexts/    AuthContext.tsx    (exists, Phase 1 wiring)
├── lib/
│   ├── api/     client.ts          ← Phase 8
│   ├── data/    discourses, programs, events, centers, shibirs, volunteering, naadi
│   ├── hooks/   useRequireAuth.ts  ← Phase 5
│   ├── utils.ts (exists)
│   └── validation.ts              ← Phase 2
└── types/       auth, profile, center  ← Phase 5
```

## Verification at Each Phase End

| Phase | Verification |
|---|---|
| 0 | `npm run build` exits 0 |
| 1 | Header avatar appears/disappears with localStorage |
| 2 | UI atoms render in Storybook-like test page (or inline in homepage temporarily) |
| 3 | Full login flow → homepage with avatar |
| 4 | Full signup flow → homepage with first name in avatar |
| 5 | `/profile` redirects to `/login` when not authenticated |
| 6 | Each section tab navigates and renders correct content |
| 7 | All modals open, validate, save, and persist correctly |
| 8 | `tsc --noEmit` passes; mock mode flow unchanged |
| 9 | `npm run build` zero errors; all 4 routes in `out/` |
