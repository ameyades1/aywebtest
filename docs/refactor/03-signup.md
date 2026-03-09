# Plan: Signup Flow — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/signup-branded-antaryog.html` (1,101 lines) mirrors the login flow but adds:
- `fullName` field on both credential screens
- `notifications` opt-in checkbox
- `termsAccepted` required checkbox
- OTP success redirects to `profile-completion` with URL query params instead of writing localStorage

Source screens: `methodScreen` → `emailSignupScreen` or `phoneSignupScreen` → `otpScreen`
State object: `signupState { method, identifier, fullName, countryCode, notifications, previousScreen }`

**Prerequisite:** The login plan (02-login.md) must be done first. This plan reuses
`useOTPInputs`, `useResendTimer`, `OTPScreen`, `MethodScreen`, and `lib/validation.ts`.

---

## The Steps

### Step 1 — Create the Signup Page Shell

**What:** Create `frontend/src/app/signup/page.tsx` identical in structure to login's page shell.

**Tools & concepts introduced:**
- **Code reuse across pages** — `app/signup/page.tsx` uses the same `Screen` union type pattern
  as `app/login/page.tsx`. This is intentional repetition — not a problem to abstract yet.
- **`SignupState` interface** — differs from `AuthState` by adding `fullName: string` and
  `notifications: boolean`.

**Verify:** `http://localhost:3000/signup` renders a blank warm-background page.
**Commit:** `feat(auth): add signup page shell with screen state machine`

---

### Step 2 — Reuse MethodScreen

**What:** Import and render the existing `<MethodScreen>` component on the signup page.
Add an `mode` prop to customize the title and button text.

**Why this step exists:** The method screen is identical between login and signup — same two
buttons, same layout. Adding a `mode: 'login' | 'signup'` prop lets one component serve both.

**Tools & concepts introduced:**
- **Extending existing props** — add `mode` to `MethodScreenProps`:
  `mode: 'login' | 'signup'`. Then use it inside: `{mode === 'signup' ? 'Create account' : 'Log in'}`.
- **Backward compatibility** — the login page still works because `mode` defaults to `'login'`.
  In TypeScript: `mode?: 'login' | 'signup'`.

**Verify:** Login page unchanged. Signup method screen shows "Create account" title.
**Commit:** `feat(auth): add mode prop to MethodScreen for signup use`

---

### Step 3 — Port the EmailSignupScreen Component

**What:** Create `components/auth/EmailSignupScreen.tsx` — email + full name + notifications
checkbox + terms checkbox.

**Why this step exists:** Signup has two extra fields vs. login's `EmailScreen`. A separate
component is cleaner than adding conditional `if signup` logic inside `EmailScreen`.

**Tools & concepts introduced:**
- **Checkbox controlled input** — `<input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} />`.
  Note: checkboxes use `checked` + `onChange` instead of `value` + `onChange`.
- **Form validation with multiple required fields** — the submit handler checks all 4 conditions
  before proceeding. Use `lib/validation.ts`'s `validateEmail` and add `validateFullName`.
- **Error state per field** — `const [emailError, setEmailError] = useState('')` etc. Each field
  has its own error string. Empty string = no error.

**Verify:** All validation works: missing name, invalid email, unchecked terms all show per-field errors.
**Commit:** `feat(auth): add EmailSignupScreen with name, notifications, and terms validation`

---

### Step 4 — Port the PhoneSignupScreen Component

**What:** Create `components/auth/PhoneSignupScreen.tsx` — same as EmailSignupScreen but with
phone + country code instead of email.

**Tools & concepts introduced:**
- **Shared validation** — `validatePhone` from `lib/validation.ts` is reused here. This is why
  we extracted it in the login plan: one source of truth for the validation rule.

**Verify:** Phone signup form validates all 4 fields correctly.
**Commit:** `feat(auth): add PhoneSignupScreen with phone and terms validation`

---

### Step 5 — Reuse OTPScreen for Signup

**What:** Render `<OTPScreen>` on the signup page. On OTP success, redirect to
`/profile-completion` with URL query params instead of writing localStorage.

**Why this step exists:** The OTP screen component is 100% reusable — it just calls `onVerify`.
The difference is what the parent page does when `onVerify` fires.

**Tools & concepts introduced:**
- **`useRouter` and query params** — in Next.js App Router:
  ```ts
  const router = useRouter()
  router.push(`/profile-completion?method=email&firstName=${firstName}&email=${email}`)
  ```
  URL query parameters carry data between pages without localStorage.
- **`encodeURIComponent`** — wrap values in `encodeURIComponent(value)` before putting them
  in a URL. Prevents spaces and special characters from breaking the URL.
- **Why not localStorage here?** — Query params are more correct for this use case: they're
  associated with the navigation event and disappear when the user moves on. localStorage persists
  indefinitely.

**Verify:** Full signup flow works: Method → Email/Phone signup form → OTP → redirected to
`/profile-completion?method=email&firstName=...&email=...`.
**Commit:** `feat(auth): wire signup OTP success to profile-completion redirect`

---

### Step 6 — Build Verification

**What:** `npm run build`. No errors.
**Verify:** Build passes. Both `/login` and `/signup` work in production mode.
**Commit:** `chore(auth): verify signup page production build`
