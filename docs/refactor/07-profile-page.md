# Plan: Profile Page — Incremental Refactor (Newcomer Edition)

## Context

`docs/prompts/output/profile-page-antaryog.html` (5,448 lines) is the largest and most complex
file in the project. It has 8 sections, 4 modals, ~2,500 lines of CSS, and ~1,600 lines of JS.

**The 8 sections (easiest → hardest):**
1. Account Settings — 2 checkboxes, no JS
2. Sadhak ID & Membership — static display, 3 stub actions
3. My Enrolled Center — 1 card, confirm modal
4. Shibir History — JS-rendered from mock data array
5. Browse Centers — JS-rendered + 4-filter client-side search
6. My Profile (personal) — edit form + Aadhaar 2-stage modal
7. Naadi Jyotish — 3 JS-rendered sub-sections, domain-specific data
8. Volunteering Profile — 421-line form modal, ~25 fields, character counters, conditional visibility

**The 4 modals (simplest → hardest):**
- Confirmation Modal (generic reusable dialog)
- Edit Profile Modal (photo upload + 10 fields)
- Aadhaar Verification Modal (2-stage OTP flow)
- Edit Volunteering Modal (421 lines, most complex in the whole project)

**Prerequisite:** Homepage plan (01-homepage.md) — reuses Header, Footer, AuthContext.
Welcome dashboard plan (06-welcome-dashboard.md) — reuses `useRequireAuth`.

---

## Phase A: Foundation

### Step 1 — Create the Profile Page Shell and Section Navigation

**What:** Create `frontend/src/app/profile/page.tsx`. Add sidebar navigation that switches
between 8 sections via `useState<ProfileSection>`.

**Tools & concepts introduced:**
- **`ProfileSection` enum** — TypeScript `enum` names all valid section IDs:
  ```ts
  type ProfileSection = 'personal' | 'settings' | 'sadhak' | 'enrolled-center' |
                        'browse-centers' | 'shibir-history' | 'volunteering' | 'naadi-jyotish'
  ```
- **Sidebar layout pattern** — `<div className="flex">` with `<aside>` (sidebar nav) and
  `<main>` (section content). Classic two-column layout with sticky sidebar.
- **Active section highlight** — `className={section === active ? 'bg-primary/10 text-primary' : ''}`.
  The `/10` suffix is Tailwind's opacity modifier: `primary` color at 10% opacity.

**Verify:** Profile page renders with sidebar. Clicking nav items switches between blank section placeholders.
**Commit:** `feat(profile): add profile page shell with section navigation`

---

### Step 2 — Port Account Settings Section

**What:** Create `components/profile/SettingsSection.tsx` — 2 toggles (email notifications,
SMS notifications) and 2 read-only info fields.

**Why first:** Zero JS complexity. Good first component to establish the section pattern.

**Tools & concepts introduced:**
- **Toggle/switch component** — a styled checkbox that looks like a switch. The HTML uses a
  `<label>` with a `<span>` overlay for the visual. The underlying `<input type="checkbox">`
  provides the value and accessibility.
- **`useAuth()` shortcut** — create `export function useAuth() { return useContext(AuthContext) }`
  in `AuthContext.tsx`. Cleaner than `useContext(AuthContext)` every time.

**Verify:** Settings section renders with 2 toggles. Toggling them updates state (no backend yet).
**Commit:** `feat(profile): add account settings section`

---

### Step 3 — Port Sadhak ID & Membership Section

**What:** Create `components/profile/SadhakSection.tsx` — Sadhak ID display, mock QR code SVG,
membership dates, referral link with clipboard copy.

**Tools & concepts introduced:**
- **`navigator.clipboard.writeText`** — the browser Clipboard API. Must be used inside a
  `useEffect` or event handler (not during render). Wrap in try/catch because it can fail if
  the browser denies clipboard permission.
- **Stub actions** — `downloadQRCode`, `printMembershipCard` are stubs (`alert()` in the mockup).
  Replace with `console.log('TODO: connect to API')` for now. Note in a comment that these are
  pending backend work.

**Verify:** Sadhak ID and membership dates display. Clicking "Copy link" copies the referral URL.
**Commit:** `feat(profile): add Sadhak ID and membership section`

---

## Phase B: Modal Infrastructure

### Step 4 — Create the ConfirmModal Component

**What:** Create `components/ui/ConfirmModal.tsx` — a generic reusable dialog with title,
message, confirm button, and cancel button.

**Why before the other sections:** The enrolled center section (Step 5) needs this modal.
Building it standalone first means it can be tested independently.

**Tools & concepts introduced:**
- **Generic modal pattern** — a modal takes `isOpen`, `title`, `message`, `onConfirm`, `onCancel`
  as props. The parent controls `isOpen` state; the modal just renders and calls callbacks.
- **`<dialog>` or div overlay** — the HTML mockup uses a fixed-overlay div pattern. Use the same:
  `<div className="fixed inset-0 bg-black/50 flex items-center justify-center">`.
- **Body scroll lock** — while a modal is open, the page behind shouldn't scroll.
  `useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : '' }, [isOpen])`.
- **Focus trap** — when a modal opens, focus should go to it. Add `autoFocus` to the confirm button.

**Verify:** Render `<ConfirmModal>` in a test scenario. It opens, "Confirm" calls `onConfirm`,
"Cancel" calls `onCancel`. Body scroll is locked while open.
**Commit:** `feat(ui): add generic ConfirmModal component`

---

### Step 5 — Port My Enrolled Center Section

**What:** Create `components/profile/EnrolledCenterSection.tsx` — single center card with
"Get Directions" (stub) and "Leave Center" (opens ConfirmModal).

**Tools & concepts introduced:**
- **Lifting modal state** — `const [showConfirm, setShowConfirm] = useState(false)` lives in
  `EnrolledCenterSection`, not in the modal. The modal is "dumb" — it renders when told to.
- **Callback closure** — `onConfirm={() => handleLeaveCenter()}` — the confirm action is defined
  in the parent and passed down. The modal doesn't know what "leave center" means.

**Verify:** "Leave Center" opens the confirm modal. "Confirm" triggers console log. "Cancel" closes it.
**Commit:** `feat(profile): add enrolled center section with confirm modal`

---

## Phase C: Data-Driven Sections

### Step 6 — Port Shibir History Section

**What:** Create `components/profile/ShibirHistorySection.tsx`. Render the `shibirsData` mock
array as cards with date sorting and empty state.

**Tools & concepts introduced:**
- **`.map()` to render lists** — `shibirsData.map(shibir => <ShibirCard key={shibir.id} {...shibir} />)`.
  Every item in a list needs a `key` prop — React uses it to track which items changed.
- **`.sort()` before `.map()`** — `[...shibirsData].sort((a, b) => new Date(b.date) - new Date(a.date))`
  sorts by date descending. The spread `[...]` creates a copy (`.sort()` mutates arrays — avoid
  mutating the original).
- **Empty state** — `{shibirsData.length === 0 && <EmptyState message="No shibirs yet" />}`.

**Verify:** Shibir history cards render sorted by date. Empty state shows when array is empty.
**Commit:** `feat(profile): add shibir history section with date-sorted mock data`

---

### Step 7 — Port Browse Centers Section

**What:** Create `components/profile/BrowseCentersSection.tsx`. Render center cards with
4-filter search (text, state, language, day) and load-more pagination.

**Tools & concepts introduced:**
- **`useMemo` for filtered lists** — recompute the filtered list only when filters or data change:
  ```ts
  const filtered = useMemo(() =>
    centersData.filter(c =>
      c.name.includes(search) && (!state || c.state === state) && ...
    ), [search, state, language, day])
  ```
  Without `useMemo`, the filter runs on every render (even irrelevant ones).
- **Pagination with `displayCount`** — `const [displayCount, setDisplayCount] = useState(6)`.
  Show `filtered.slice(0, displayCount)`. "Load More" does `setDisplayCount(c => c + 6)`.
- **Reset displayCount on filter change** — `useEffect(() => setDisplayCount(6), [search, state, language, day])`.

**Verify:** Centers display. Typing in search filters results. Each dropdown filters independently.
"Load More" shows additional cards. Changing any filter resets to showing 6 results.
**Commit:** `feat(profile): add browse centers section with client-side filtering`

---

## Phase D: Complex Sections

### Step 8 — Port My Profile Section (Display + Edit Button)

**What:** Create `components/profile/PersonalSection.tsx` — read-only profile display with
an "Edit Profile" button. Does not include the modal yet.

**Why split from modal:** The display section works without the modal. Build and verify it first.

**Tools & concepts introduced:**
- **Read-only display vs. edit mode** — the section has two views: a display card and an edit
  modal. Start with the display card. The edit button will open the modal (added in Step 9).
- **Profile photo display** — show either the uploaded photo (from localStorage or state) or
  a default SVG avatar placeholder. `{photo ? <img src={photo} /> : <DefaultAvatar />}`.

**Verify:** Profile display section renders with placeholder data. Edit button exists but does nothing yet.
**Commit:** `feat(profile): add personal profile section display`

---

### Step 9 — Port the Edit Profile Modal

**What:** Create `components/profile/EditProfileModal.tsx` — photo upload, 10 fields across
2 groups, save handler.

**Tools & concepts introduced:**
- **`FileReader` for image preview** — `<input type="file" accept="image/*">` gives a File object.
  `const reader = new FileReader(); reader.onload = e => setPreview(e.target.result)` converts it
  to a base64 data URL for the `<img src>` preview.
- **`useRef` for hidden file input** — the styled "Upload Photo" button isn't the actual file input.
  The real `<input type="file">` is hidden, and a `useRef` lets the button trigger it: `inputRef.current.click()`.
- **Form state initialization from props** — the modal receives current profile values as props and
  initializes its local state from them:
  `useState({ firstName: props.firstName, ... })`. Changes only apply on "Save".

**Verify:** "Edit Profile" button opens the modal. Photo upload shows a live preview.
Saving updates the displayed profile data.
**Commit:** `feat(profile): add edit profile modal with photo upload`

---

### Step 10 — Port the Aadhaar Verification Modal

**What:** Create `components/profile/AadhaarVerificationModal.tsx` — 2-stage modal:
Stage 1 = 12-digit Aadhaar entry with auto-space formatting; Stage 2 = 6-box OTP.

**Tools & concepts introduced:**
- **Multi-stage modal state** — `const [stage, setStage] = useState<'aadhaar' | 'otp'>('aadhaar')`.
  Same screen-switching pattern as the login flow, just inside a modal.
- **Input auto-formatting** — `formatAadhaarNumber` inserts spaces every 4 digits as the user types:
  `value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()`. This runs in the `onChange` handler.
- **Permanent verification lock** — once verified, the Aadhaar field is `disabled` and shows a green
  "Verified" badge. Store `isVerified: boolean` in profile state. Once `true`, never show the
  verification modal again.
- **Reusing `useOTPInputs`** — the Stage 2 OTP boxes use the hook built in the login plan.

**Verify:** Aadhaar modal opens. Entering a 12-digit number enables "Send OTP".
Stage 2 shows OTP boxes. Entering `123456` marks Aadhaar as verified and locks the field.
**Commit:** `feat(profile): add 2-stage Aadhaar verification modal`

---

### Step 11 — Port Naadi Jyotish Section

**What:** Create `components/profile/NaadiJyotishSection.tsx` — 3 sub-sections: birth profile,
upcoming consultations, past consultations. All rendered from mock data arrays.

**Tools & concepts introduced:**
- **Sub-section tabs within a section** — a tab bar inside the section content area.
  Uses the same `useState` section-switching pattern, just nested one level deeper.
- **Date formatting** — `new Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(new Date(dateStr))`
  — the `Intl` API formats dates according to locale. Never hardcode date formatting.
- **Lookup map** — `const rashiSymbols: Record<string, string> = { 'Aries': '♈', ... }`.
  A plain JS object used as a dictionary. `rashiSymbols[profile.rashi]` gets the symbol.

**Verify:** Birth profile displays. Upcoming and past consultation lists render with correct dates.
Empty states show when arrays are empty.
**Commit:** `feat(profile): add Naadi Jyotish section with birth profile and consultations`

---

### Step 12 — Port Volunteering Section (Display View)

**What:** Create `components/profile/VolunteeringSection.tsx` — the read-only display of
the volunteering profile. Shows current data or empty state with "Complete Your Profile" CTA.

**Why separate from the modal:** The display is simpler. Port it first, verify it, then
tackle the enormous edit modal in Step 13.

**Tools & concepts introduced:**
- **JSON.parse from localStorage** — `JSON.parse(localStorage.getItem('volunteeringProfile') ?? 'null')`.
  The `?? 'null'` provides a fallback if nothing is stored. `JSON.parse('null')` returns `null`.
- **`useEffect` for localStorage read** — same pattern as `AuthContext`: read in `useEffect`
  to avoid SSR/client mismatch.

**Verify:** Volunteering section renders empty state with CTA. With mock data in localStorage, shows
the read-only profile view.
**Commit:** `feat(profile): add volunteering section display view`

---

### Step 13 — Port the Edit Volunteering Modal (The Final Boss)

**What:** Create `components/profile/EditVolunteeringModal.tsx` — 421-line form with 6 field
groups, ~25 fields, 7 character-counted textareas, checkbox grids, radio groups, and conditional visibility.

**Why last:** This is the most complex component in the entire project. Every concept from
previous steps is used here simultaneously. Save it for when you're confident with React.

**Tools & concepts introduced:**
- **`useReducer` for complex form state** — with ~25 fields, individual `useState` calls become
  hard to manage. `useReducer` handles all field updates via one dispatcher:
  ```ts
  const [form, dispatch] = useReducer(formReducer, initialState)
  dispatch({ type: 'SET_FIELD', field: 'motivation', value: e.target.value })
  ```
- **Character counter** — `{form.motivation.length} / 500 chars`. Apply a warning class when near
  the limit: `className={form.motivation.length > 450 ? 'text-red-500' : 'text-gray-400'}`.
- **Checkbox grid with controlled state** — skills are an array of selected strings:
  ```ts
  const toggleSkill = (skill: string) =>
    dispatch({ type: 'TOGGLE_SKILL', skill })
  // reducer: [...current, skill] or current.filter(s => s !== skill)
  ```
- **Conditional sub-fields from checkboxes** — `{form.languages.includes('Sanskrit') && <SanskritLevelSelect />}`.
- **localStorage serialization** — `JSON.stringify(form)` on save, `JSON.parse` on load.
  Later replaced by an API call when the backend exists.

**Verify:** Full modal opens. All 25 fields accept input. Character counters update. Sanskrit level
appears when Sanskrit is checked. Travel distance appears for non-local travel option. Save writes
to localStorage. Reloading the page reloads the saved data.
**Commit:** `feat(profile): add edit volunteering modal with full form and localStorage persistence`

---

### Step 14 — Build Verification

**What:** `npm run build`. This is the largest build so far.
**Verify:** Zero TypeScript errors. All 8 sections and 4 modals work in production mode.
Profile page is accessible only when logged in.
**Commit:** `chore(profile): verify profile page production build`
