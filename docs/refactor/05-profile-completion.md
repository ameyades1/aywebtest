# Plan: Profile Completion — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/profile-completion-antaryog.html` (1,253 lines) is the most complex
auth-flow page. It contains two phases on one page:
1. **Profile form** — 12+ fields, conditional field visibility, language button group, secondary
   contact field (shown based on signup method)
2. **Secondary OTP screen** — 6-box OTP to verify the secondary contact method

State is initialized from URL query params (`method`, `firstName`, `email`, `phone`, `phoneCode`).
On secondary OTP success: writes `firstName` to localStorage and redirects to homepage.

**Prerequisite:** Signup plan (03-signup.md) must be done — this page receives URL params from signup.

---

## The Steps

### Step 1 — Create the Profile Completion Page and Read URL Params

**What:** Create `frontend/src/app/profile-completion/page.tsx`. Read `method`, `firstName`,
`email`, `phone`, `phoneCode` from URL `searchParams`.

**Tools & concepts introduced:**
- **Server Component for initial data** — the page starts as a Server Component reading
  `searchParams`. This data is then passed as props to the `"use client"` form component below.
- **Component composition pattern** — `ProfileCompletionPage` (Server) renders
  `<ProfileCompletionForm initialData={...} />` (Client). The server part handles data loading;
  the client part handles interactivity.

**Verify:** Visiting `/profile-completion?method=email&firstName=Test&email=test@example.com`
renders a page (blank for now) with those values accessible.
**Commit:** `feat(frontend): add profile completion page shell with URL param reading`

---

### Step 2 — Port the Language Button Group

**What:** Create `components/ui/LanguageButtonGroup.tsx` — the custom button-based language
selector (Hindi / English / Both) from the HTML mockup.

**Why this step exists:** The language selector is not a standard `<select>` — it's three styled
buttons where clicking one selects it (copper border/background). This is a custom UI component
worth extracting before building the full form.

**Tools & concepts introduced:**
- **Custom UI component** — sometimes a standard HTML element (`<select>`, `<radio>`) doesn't
  match the design. The language buttons are visually `<button>` elements that behave like a
  radio group.
- **ARIA for accessibility** — add `role="radiogroup"` on the container and `aria-checked` on each
  button. Screen readers then understand this is a single-selection group.
- **`value` + `onChange` props** — make it behave like a controlled input: the parent provides
  the selected value and a change handler. The component is "dumb" (no internal state).

**Verify:** Language buttons render correctly. Clicking one shows copper border on the selected one.
**Commit:** `feat(ui): add LanguageButtonGroup controlled component`

---

### Step 3 — Port the Profile Form (Static Fields First)

**What:** Create `components/auth/ProfileCompletionForm.tsx` with the always-visible fields:
firstName, middleName, lastName, country, city, language selector, referralSource, occupation.

**Why this step exists:** Port the simple, always-visible fields first before adding conditional
logic. Verify the form renders and validation works, then add complexity.

**Tools & concepts introduced:**
- **Controlled form pattern at scale** — with 8+ fields, using individual `useState` calls
  becomes unwieldy. Introduce `useReducer` or a single object state:
  ```ts
  const [formData, setFormData] = useState({ firstName: '', middleName: '', ... })
  const update = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }))
  ```
- **Computed property name** — `{ ...prev, [field]: value }` — the `[field]` syntax uses the
  variable's value as the key name. This lets one function update any field.

**Verify:** Form renders with all always-visible fields. First name, last name, and city are required
and show errors on empty submit.
**Commit:** `feat(auth): add profile completion form with static fields`

---

### Step 4 — Add Conditional Fields

**What:** Show `referralPerson` input when referralSource = 'friend' or 'existing-member'.
Show `industry` input when occupation = 'professional' or 'business'.

**Why this step exists:** The HTML mockup uses `addEventListener` on the dropdowns to show/hide
fields. In React, this becomes derived state from the form data.

**Tools & concepts introduced:**
- **Derived visibility** — don't store "is referral field visible" as its own state. Derive it:
  ```ts
  const showReferralPerson = ['friend', 'existing-member'].includes(formData.referralSource)
  ```
  This is always in sync with `formData.referralSource`. No extra state to manage.
- **Conditional rendering** — `{showReferralPerson && <input ... />}` — the field mounts/unmounts
  based on the boolean. When it unmounts, its value is gone (React clears it automatically).

**Verify:** Selecting "A friend" in referral source shows the referral person field.
Selecting "Professional" in occupation shows the industry field. Changing back hides them.
**Commit:** `feat(auth): add conditional fields to profile completion form`

---

### Step 5 — Add the Secondary Contact Field

**What:** Show an email input if `method === 'phone'`, or a phone input if `method === 'email'`.
This field is always visible (not conditional on user choice — conditional on signup method).

**Why this step exists:** The secondary contact section is determined at page load from the URL
param, not by user interaction. It uses the same `method` value passed from the signup flow.

**Tools & concepts introduced:**
- **Data-driven rendering** — `{method === 'phone' ? <EmailInput /> : <PhoneInput />}` — the
  param from the URL drives which component renders. The component doesn't know anything about
  auth flow; it just renders what it's told.
- **Reuse from login plan** — the `validateEmail` and `validatePhone` functions from `lib/validation.ts`
  are reused again here for the secondary contact field.

**Verify:** With `?method=email` in URL → phone input shown. With `?method=phone` → email input shown.
**Commit:** `feat(auth): add secondary contact field to profile completion form`

---

### Step 6 — Add Form Validation and Submit Handler

**What:** Wire the submit button to validate all required fields. Disabled until valid.
On submit, transition to the secondary OTP screen.

**Tools & concepts introduced:**
- **Submit button disabled state** — derive it from validation:
  ```ts
  const isValid = firstName.length >= 2 && lastName.length >= 2 && city && language && ...
  <button disabled={!isValid} className={isValid ? 'bg-primary' : 'bg-gray-300'}>
  ```
- **`prevent default`** — `<form onSubmit={e => { e.preventDefault(); handleSubmit() }}>`.
  Without `preventDefault`, the browser navigates to a new URL when the form submits (old HTML
  behavior). React forms always prevent this.

**Verify:** Submit button is disabled until all required fields are filled.
Clicking submit transitions to the OTP screen (which is blank for now).
**Commit:** `feat(auth): add form validation and submit transition to profile completion`

---

### Step 7 — Port the Secondary OTP Screen

**What:** Create `components/auth/SecondaryOTPScreen.tsx` — reuses `useOTPInputs` and
`useResendTimer`. On success, call `AuthContext.login(firstName)` and `router.push('/')`.

**Tools & concepts introduced:**
- **Full hook reuse** — `useOTPInputs` and `useResendTimer` are used for the third time
  (login, signup, and now here). This is the payoff for extracting them as hooks.
- **Back navigation** — the back button returns to the profile form, not to the signup page.
  `setView('form')` in the parent page component handles this.

**Verify:** Full flow works: signup → `/profile-completion?...` → fill form → OTP screen →
enter `123456` → lands on homepage → nav shows logged-in avatar with correct first name.
**Commit:** `feat(auth): add secondary OTP screen to profile completion flow`

---

### Step 8 — Build Verification

**What:** `npm run build`. Full auth flow tested end-to-end.
**Verify:** Build passes. The complete journey (signup → profile completion → homepage) works.
**Commit:** `chore(auth): verify profile completion page production build`
