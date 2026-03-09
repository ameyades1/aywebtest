# Plan: Login Flow — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/login-branded-antaryog.html` (956 lines) implements a passwordless
4-screen OTP login flow. All screens, state, validation, and animation live in one HTML file.
This plan ports it to `app/login/page.tsx` in the Next.js project as small, verifiable steps.

**Source file internals:**
- Screens: `methodScreen` → `emailScreen` or `phoneScreen` → `otpScreen`
- State object: `authState { method, identifier, countryCode, previousScreen }`
- JS: `showScreen`, `handleEmailLogin`, `handlePhoneLogin`, `handleOTPVerification`,
  `setupOTPInputs`, `startResendTimer`, `maskEmail`, `maskPhone`, `showOTPError`
- CSS: `.screen/.screen.active`, `@keyframes fadeIn`, `.otp-input`, `@keyframes shake`
- Mock OTP code: `123456`
- On success: writes `firstName` + `userEmail` to localStorage, redirects to homepage

**Prerequisite:** The homepage refactor plan (01-homepage.md) must be done first —
this plan builds on the existing `AuthContext`, `globals.css`, and project setup.

---

## Before You Start

This is a new page — not a new component. In Next.js App Router, every URL is a folder under `app/`.
The login page will live at `http://localhost:3000/login`.

```bash
mkdir -p frontend/src/app/login
```

---

## The Steps

### Step 1 — Create the Login Page Shell

**What:** Create `frontend/src/app/login/page.tsx` with a `"use client"` directive and a
`screenId` state that defaults to `'method'`.

**Why this step exists:** The entire login flow is one page with 4 "screens" toggled by state.
In the HTML mockup, `showScreen(id)` swaps a CSS class. In React, we use `useState` instead.
Before building any screen, establish this state machine skeleton.

**Tools & concepts introduced:**
- **App Router page** — `app/login/page.tsx` automatically becomes the `/login` route. No config needed.
- **`"use client"`** — required here because the page responds to user events (button clicks, form input). Login cannot be a Server Component.
- **Screen state machine** — `useState<'method' | 'email' | 'phone' | 'otp'>('method')` types the
  4 valid screens as a TypeScript union, so you can't accidentally set an invalid value.
- **TypeScript union type** — `'method' | 'email' | 'phone' | 'otp'` means the variable can only
  hold one of those 4 string values. The compiler errors if you try to assign anything else.

```tsx
'use client'
import { useState } from 'react'

type Screen = 'method' | 'email' | 'phone' | 'otp'

export default function LoginPage() {
  const [screen, setScreen] = useState<Screen>('method')
  return <div className="min-h-screen bg-background" />
}
```

**Verify:** `http://localhost:3000/login` renders a blank warm-background page. No errors.
**Commit:** `feat(auth): add login page shell with screen state machine`

---

### Step 2 — Add the Auth State Object

**What:** Add a `useState` for the auth data collected across screens: method, identifier, countryCode.

**Why this step exists:** In the HTML mockup, a module-level `authState` object accumulates
data as the user moves between screens. In React, we lift this into page-level state so all
screen components can read and update it.

**Tools & concepts introduced:**
- **Interface** — TypeScript's way to describe the shape of an object:
  ```ts
  interface AuthState {
    method: 'email' | 'phone' | null
    identifier: string
    countryCode: string
  }
  ```
- **Why not one big state object for everything?** — Screen + auth data are separated because
  `screen` controls what's rendered, while `authState` carries collected data. Mixing them makes
  transitions harder to reason about.
- **`null` as initial value** — `method: null` means "not yet chosen". TypeScript forces you to
  handle the null case whenever you use it.

**Verify:** No visible change. TypeScript compiles without errors.
**Commit:** `feat(auth): add AuthState type and useState to login page`

---

### Step 3 — Port the MethodScreen Component

**What:** Create `frontend/src/components/auth/MethodScreen.tsx` — the two "Email" / "Phone"
choice buttons from lines 430–500 of the HTML mockup.

**Why this step exists:** The method screen is purely presentational — two styled buttons that
call back to the parent. No state needed inside the component. This is the simplest of the 4
screens and the right one to start with.

**Tools & concepts introduced:**
- **Props** — values passed from parent to child component. Here: `onSelectEmail` and `onSelectPhone`
  are callback functions passed as props. The component calls them when a button is clicked.
- **Function props in TypeScript** — typed as `() => void` (a function that takes no arguments
  and returns nothing).
- **Component folder convention** — `components/auth/` collects all auth-related UI pieces.

```tsx
interface MethodScreenProps {
  onSelectEmail: () => void
  onSelectPhone: () => void
}

export function MethodScreen({ onSelectEmail, onSelectPhone }: MethodScreenProps) { ... }
```

**Verify:** Import `<MethodScreen>` in login page and render it when `screen === 'method'`.
Both buttons are visible and clickable (they'll just log to console for now).
**Commit:** `feat(auth): add MethodScreen component for login`

---

### Step 4 — Port the EmailScreen Component

**What:** Create `components/auth/EmailScreen.tsx` from lines 500–560 of the HTML mockup.
Includes the email input field and "Send OTP" button.

**Why this step exists:** Email screen captures one field, validates it, and calls back with the
value. Isolated component, isolated validation.

**Tools & concepts introduced:**
- **Controlled input** — in React, form inputs are "controlled" when their value is tied to state:
  `<input value={email} onChange={e => setEmail(e.target.value)} />`.
  The input never holds its own value — React does.
- **Inline validation** — a simple check before calling the callback:
  ```ts
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Invalid email'); return }
  ```
- **`lib/validation.ts`** — start extracting the email regex here so it's reusable across
  login and signup. `export function validateEmail(email: string): string | null`

**Verify:** Typing a valid email and clicking Send OTP transitions to... nothing yet (just logs).
Invalid email shows an error message below the input.
**Commit:** `feat(auth): add EmailScreen component with validation`

---

### Step 5 — Port the PhoneScreen Component

**What:** Create `components/auth/PhoneScreen.tsx` — country code selector + phone number input.

**Why this step exists:** The phone screen is structurally identical to the email screen but has
two fields (country code dropdown + 10-digit phone). Extracting it separately keeps each
component focused.

**Tools & concepts introduced:**
- **`<select>` as controlled input** — same `value`/`onChange` pattern as `<input>`, but the value
  comes from `<option value="...">` children.
- **Multiple state values** — `const [phone, setPhone] = useState('')` and
  `const [countryCode, setCountryCode] = useState('+91')` — no need to bundle them into one object
  for a component this small.
- **`validatePhone` in `lib/validation.ts`** — `export function validatePhone(phone: string): string | null`
  (must be exactly 10 digits, numbers only).

**Verify:** Phone + country code input works. Invalid phone shows error. Valid phone logs the value.
**Commit:** `feat(auth): add PhoneScreen component with country code select`

---

### Step 6 — Extract the useOTPInputs Hook

**What:** Create `frontend/src/lib/hooks/useOTPInputs.ts` — the 6-box OTP input management logic
from lines 1062–1112 of the HTML mockup (the `setupOTPInputs` function).

**Why this step exists:** The OTP input behavior (auto-advance on fill, backspace navigation,
paste handling, shake on error) is used in both login and signup. Extracting it to a hook means
we write it once and reuse it in both places.

**Tools & concepts introduced:**
- **`useRef` array** — `const inputRefs = useRef<Array<HTMLInputElement | null>>([null,null,null,null,null,null])`.
  Each box gets its own ref so we can call `.focus()` on any of them programmatically.
- **`onChange` for auto-advance** — when the user types a digit, check if the box is filled;
  if so, call `.focus()` on the next ref.
- **`onKeyDown` for backspace** — if the user presses Backspace on an empty box, move focus to
  the previous box.
- **`onPaste`** — `e.clipboardData.getData('text')` gives the pasted string; spread its digits
  across all 6 inputs at once.
- **Return value pattern** — the hook returns `{ inputRefs, getValue, reset, setError }` so the
  component has everything it needs.

**Verify:** Hook is written. No visual test yet — it'll be used in Step 7.
**Commit:** `feat(auth): extract useOTPInputs hook for OTP box management`

---

### Step 7 — Extract the useResendTimer Hook

**What:** Create `frontend/src/lib/hooks/useResendTimer.ts` — the 60-second countdown timer
from `startResendTimer()` in the HTML mockup.

**Why this step exists:** The resend timer is used in login, signup, email verification, and
profile completion. One hook, used everywhere.

**Tools & concepts introduced:**
- **`useEffect` + `setInterval`** — `setInterval` runs a function every N milliseconds. Wrap it
  in `useEffect` to start it when the component mounts.
- **Cleanup with `clearInterval`** — the `useEffect` return function cleans up the interval when
  the component unmounts. Without this, the timer keeps running even after the user leaves the page.
  ```ts
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [])
  ```
- **Derived state** — `const canResend = seconds === 0` is not state itself — it's computed from
  `seconds`. No need for a separate `useState` for it.

```ts
export function useResendTimer(duration = 60) {
  const [seconds, setSeconds] = useState(duration)
  // useEffect with setInterval + cleanup
  const reset = () => setSeconds(duration)
  return { seconds, canResend: seconds === 0, reset }
}
```

**Verify:** Hook is written. No visual test yet.
**Commit:** `feat(auth): extract useResendTimer hook`

---

### Step 8 — Port the OTPScreen Component

**What:** Create `components/auth/OTPScreen.tsx` from lines 560–680 of the HTML mockup.
Uses `useOTPInputs` and `useResendTimer` from the previous steps.

**Why this step exists:** The OTP screen is the most visually complex part of the login flow.
With the two hooks already extracted, the component itself is now straightforward.

**Tools & concepts introduced:**
- **Composing hooks** — calling `useOTPInputs()` and `useResendTimer()` inside the component.
  This is the payoff for extracting them: the component reads like a list of what it does,
  not how it does it.
- **`NEXT_PUBLIC_MOCK_AUTH`** — check `process.env.NEXT_PUBLIC_MOCK_AUTH === 'true'` before
  accepting `123456` as valid. This env variable was defined in `CLAUDE.md`. Teach the concept
  of environment variables for feature flags.
- **`maskEmail` / `maskPhone` helpers** — pure functions in `lib/utils.ts` that take a string
  and return a masked version. No React needed — just string manipulation.

```tsx
interface OTPScreenProps {
  maskedIdentifier: string
  onVerify: (otp: string) => void
  onBack: () => void
  onResend: () => void
}
```

**Verify:** All 4 screens now work in sequence: Method → Email/Phone → OTP.
Typing `123456` logs "OTP verified". Typing anything else shakes the inputs.
**Commit:** `feat(auth): add OTPScreen component using useOTPInputs and useResendTimer`

---

### Step 9 — Wire Login Success to AuthContext

**What:** In `login/page.tsx`, on OTP success call `AuthContext`'s login method which writes
`firstName` + `userEmail`, then use `router.push('/')` to navigate to the homepage.

**Why this step exists:** The HTML mockup writes directly to `localStorage` and uses
`window.location.href`. In Next.js, both are replaced with cleaner patterns.

**Tools & concepts introduced:**
- **`useContext(AuthContext)`** — reads the auth context. Requires the login page to be wrapped
  by `<AuthProvider>` in `app/layout.tsx` (done in the homepage plan).
- **`useRouter` + `router.push`** — Next.js's programmatic navigation. `router.push('/')` navigates
  to the homepage without a full page reload. Never use `window.location.href` in Next.js.
- **Context method** — add `login(firstName: string, email: string): void` to `AuthContext`
  that writes to localStorage and updates context state. This keeps all auth logic in one place.

**Verify:** Complete login flow: choose method → enter credential → enter `123456` →
lands on homepage → nav shows the logged-in avatar. Back button on OTP screen works.
**Commit:** `feat(auth): wire login OTP success to AuthContext and redirect`

---

### Step 10 — Add Fade-In Animation Between Screens

**What:** Add the `fadeIn` CSS animation from the HTML mockup's `<style>` block to `globals.css`
and apply it when screens transition.

**Why this step exists:** The mockup uses `@keyframes fadeIn` on `.screen.active`. Without this,
screen transitions feel abrupt. This is a small polish step.

**Tools & concepts introduced:**
- **CSS class toggling on transitions** — add a `key` prop to the active screen component:
  `<MethodScreen key="method" />`. When React sees a new `key`, it unmounts + remounts the
  component, triggering CSS animations that play on mount.
- **`key` prop as animation trigger** — a deliberate React pattern for replaying enter animations.

**Verify:** Switching screens has a gentle fade-in. No visual regression.
**Commit:** `style(auth): add screen fade-in animation to login flow`

---

### Step 11 — Run Final Build

**What:** `npm run build`. No TypeScript errors. No missing image `alt` props. No broken imports.
**Verify:** Build passes. Visit `/login` in production mode — all 4 screens work.
**Commit:** `chore(auth): verify login page production build`
