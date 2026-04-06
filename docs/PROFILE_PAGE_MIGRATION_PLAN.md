# Profile Page Migration Plan (v7 → Frontend)

## Context

The v7 profile page (`docs/prompts/output/profile-page-antaryog.html`) is a 5,448-line single-file prototype with 8 sections, 4 modals, ~2,500 lines of inline CSS, and ~1,609 lines of inline JS. This plan migrates it to the established frontend component architecture: pure HTML component files, external CSS, external JS — exactly like navbar, footer, hero, and DSS-Shibir.

---

## Key Architectural Decisions

### 1. Components = Pure HTML, No Script Tags
`loadComponent()` in `main.js` uses `innerHTML` injection — browsers do not execute scripts injected this way. Therefore **all section component files must be pure HTML**. All JS lives in `frontend/js/profile.js`.

### 2. Where Modals Live
Modals use `position: fixed`. If a modal is inside a section container that gets `display: none` (section hidden), the modal disappears even when open. Solution: **all 4 modal HTML blocks go directly in `profile.html`** (not inside section components), mirroring how v7 places modals at the bottom of `<body>` outside section divs.

### 3. JS in `profile.js`, Not Inline
With ~1,609 lines of JS (mock data, rendering functions, section switcher, modal utils, auth guard), a dedicated `frontend/js/profile.js` is the right call — mirrors how `auth.css` is page-specific.

### 4. Eager Section Loading
`profile.js` fetches all 8 section components via `Promise.all()` at page load. After all are injected into the DOM, it runs all rendering functions. Simple and keeps tab-switching instant.

---

## Files to Create / Modify

| Action | File | Phase |
|--------|------|-------|
| Create | `frontend/pages/profile.html` | 0 |
| Create | `frontend/css/profile.css` | 0 |
| Create | `frontend/js/profile.js` | 0 |
| Modify | `frontend/components/navbar.html` | 0 — add "View Profile" to logged-in dropdown |
| Create | `frontend/components/profile/settings.html` | 1 |
| Create | `frontend/components/profile/sadhak.html` | 1 |
| Create | `frontend/components/profile/enrolled-center.html` | 2 |
| Create | `frontend/components/profile/browse-centers.html` | 2 |
| Create | `frontend/components/profile/shibir-history.html` | 3 |
| Create | `frontend/components/profile/naadi-jyotish.html` | 3 |
| Create | `frontend/components/profile/personal.html` | 4 |
| Create | `frontend/components/profile/volunteering.html` | 5 |

---

## `profile.html` Page Shell Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Shared base (every page) -->
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/navbar.css">
    <link rel="stylesheet" href="../css/footer.css">
    <!-- Profile-specific -->
    <link rel="stylesheet" href="../css/profile.css">
    <!-- Google Fonts: Inter + Lora -->
</head>
<body>
    <div id="navbar"></div>

    <main>
        <div class="profile-main-container">

            <!-- Desktop sticky sidebar nav -->
            <aside class="left-sidebar">
                <button class="nav-item active" onclick="showSection('personal', event)">My Profile</button>
                <button class="nav-item" onclick="showSection('settings', event)">Account Settings</button>
                <button class="nav-item" onclick="showSection('sadhak', event)">Sadhak ID & Membership</button>
                <button class="nav-item" onclick="showSection('enrolled-center', event)">Enrolled Center</button>
                <button class="nav-item" onclick="showSection('browse-centers', event)">Browse Centers</button>
                <button class="nav-item" onclick="showSection('shibir-history', event)">Shibir History</button>
                <button class="nav-item" onclick="showSection('volunteering', event)">Volunteering</button>
                <button class="nav-item" onclick="showSection('naadi-jyotish', event)">Naadi Jyotish</button>
            </aside>

            <!-- Section content area: containers get filled by profile.js fetch() -->
            <div class="main-content-area">
                <div id="personal-section"        class="content-section active"></div>
                <div id="settings-section"        class="content-section"></div>
                <div id="sadhak-section"          class="content-section"></div>
                <div id="enrolled-center-section" class="content-section"></div>
                <div id="browse-centers-section"  class="content-section"></div>
                <div id="shibir-history-section"  class="content-section"></div>
                <div id="volunteering-section"    class="content-section"></div>
                <div id="naadi-jyotish-section"   class="content-section"></div>
            </div>
        </div>
    </main>

    <!-- Mobile drawer navigation -->
    <div id="profile-drawer" class="profile-drawer"> ... </div>

    <!-- Mobile FAB -->
    <button class="profile-nav-fab" onclick="toggleProfileDrawer()">☰</button>

    <!-- All 4 modals — inline here, NOT inside section components -->
    <!-- #editProfileModal        (personal info + location fields) -->
    <!-- #aadhaarVerificationModal (Aadhaar + 6-digit OTP) -->
    <!-- #confirmModal             (generic confirm/cancel) -->
    <!-- #editVolunteeringModal    (large 7-group form, ~420 lines) -->

    <div id="footer"></div>

    <script>window.ROOT_PATH = '../';</script>
    <script src="../js/tailwind-config.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="../js/main.js"></script>    <!-- loads navbar + footer -->
    <script src="../js/profile.js"></script> <!-- loads all 8 sections + wires all JS -->
</body>
</html>
```

---

## `profile.js` Structure

```js
// ── Auth Guard ────────────────────────────────────────────────────────────
if (!localStorage.getItem('firstName')) {
    window.location.href = 'login.html';
}

// ── Mock Data ─────────────────────────────────────────────────────────────
const centersData = [ ... ];          // 8 center objects
const shibirsData = [ ... ];          // 7 shibir records
const naadiUserProfile = { ... };     // birth profile
const naadiConsultations = [ ... ];   // 3 past consultations
const naadiUpcomingConsultations = [ ... ]; // 2 upcoming

// ── Section Switching ─────────────────────────────────────────────────────
window.showSection = function(name, event) { ... }
window.showSectionMobile = function(name) { ... }
window.toggleProfileDrawer = function() { ... }

// ── Modal Utilities ───────────────────────────────────────────────────────
window.openModal = function(id) { ... }
window.closeModal = function(id) { ... }
window.openConfirmModal = function(title, msg, cb) { ... }
window.confirmAction = function() { ... }

// ── Render Functions ──────────────────────────────────────────────────────
function renderCenters(centers) { ... }
window.filterCenters = function() { ... }
window.resetFilters = function() { ... }
window.loadMoreCenters = function() { ... }
function renderShibirs(shibirs) { ... }
function renderNaadiBirthProfile(profile) { ... }
function renderNaadiConsultations(consultations) { ... }
function renderNaadiUpcomingConsultations(consultations) { ... }
function renderVolunteeringProfile(data) { ... }

// ── Action Handlers ───────────────────────────────────────────────────────
window.openEditProfileModal = function() { ... }
window.saveProfile = function() { ... }
window.joinCenter = function(id) { ... }
window.leaveCenter = function() { ... }
window.openAadhaarVerification = function() { ... }
window.verifyAadhaarOTP = function() { ... }
// ... etc.

// ── Profile Section Loader ────────────────────────────────────────────────
const PROFILE_ROOT = window.ROOT_PATH || '';
const SECTIONS = [
    { id: 'personal-section',        file: 'profile/personal.html' },
    { id: 'settings-section',        file: 'profile/settings.html' },
    { id: 'sadhak-section',          file: 'profile/sadhak.html' },
    { id: 'enrolled-center-section', file: 'profile/enrolled-center.html' },
    { id: 'browse-centers-section',  file: 'profile/browse-centers.html' },
    { id: 'shibir-history-section',  file: 'profile/shibir-history.html' },
    { id: 'volunteering-section',    file: 'profile/volunteering.html' },
    { id: 'naadi-jyotish-section',   file: 'profile/naadi-jyotish.html' },
];

async function loadProfileSections() {
    await Promise.all(SECTIONS.map(async ({ id, file }) => {
        const res  = await fetch(PROFILE_ROOT + 'components/' + file);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    }));
    initProfilePage();
}

function initProfilePage() {
    renderCenters(centersData);
    renderShibirs(shibirsData);
    renderNaadiBirthProfile(naadiUserProfile);
    renderNaadiConsultations(naadiConsultations);
    renderNaadiUpcomingConsultations(naadiUpcomingConsultations);
    loadVolunteeringProfile();
    initAadhaarState(true);   // mock: verified
    setupCharacterCounters();
}

document.addEventListener('DOMContentLoaded', loadProfileSections);
```

---

## CSS Strategy for `profile.css`

Extract from v7 lines 11–2509 **excluding**:
- Header/nav CSS → already in `navbar.css`
- Footer CSS → already in `footer.css`
- Tailwind config block → handled by `tailwind-config.js`

**Include all of:**
- `:root` CSS variable block (`--primary`, `--secondary`, `--accent`, `--background`, `--text`, `--text-secondary`)
- Layout: `.profile-main-container`, `.left-sidebar`, `.main-content-area`
- Section toggle: `.content-section`, `.content-section.active`, `@keyframes fadeIn`
- Sidebar nav: `.nav-item`, `.nav-item.active`, `.nav-section-title`
- Cards & forms: `.content-card`, `.section-header`, `.form-grid`, `.form-grid-2`, form input styles
- Modal system: `.modal`, `.modal.active`, `.modal-content`, `.modal-content-large`, `.modal-header`, `.modal-body`, `.modal-actions`, `.modal-field-group`, `.modal-group-title`
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-sm`
- Mobile nav: `.profile-drawer`, `.profile-nav-fab`, `.profile-drawer-item`
- Section-specific: `.center-card`, `.centers-grid`, `.enrolled-center`, `.enrolled-badge`, `.center-grid`, `.shibir-card`, `.naadi-birth-profile`, `.naadi-consultation-card`, `.volunteering-card`, `.sadhak-code`, `.qr-container`
- Shared patterns: `.empty-state`, `.verification-status`, `.interest-badge`, `.shibir-count-badge`, `.otp-digit`
- All `@media` responsive rules

---

## Phased Implementation Order

### Phase 0: Infrastructure
Sets up the skeleton that all phases build on.

1. Create `frontend/css/profile.css` — full CSS extraction from v7
2. Create `frontend/js/profile.js` — full JS: auth guard + all data + all functions + section loader (sections will be empty until Phase 1+)
3. Create `frontend/pages/profile.html` — page shell: sidebar (all 8 nav items), section containers (empty divs), all 4 modals, mobile drawer, FAB
4. Update `frontend/components/navbar.html` — add "View Profile" link to the `#user-dropdown` above "Logout"

**Acceptance test:** Load `profile.html` while logged in → sidebar shows all 8 nav items, sections are empty, clicking nav items switches active state. Load while logged out → redirects to `login.html`.

---

### Phase 1: Simple Sections
Validates that the component fetch/inject pipeline works end-to-end.

1. `frontend/components/profile/settings.html` — 2 cards, fully static, no JS
2. `frontend/components/profile/sadhak.html` — Sadhak ID card, QR mock, referral link + `copyReferralLink()`

**Acceptance test:** Settings section shows account status + notification toggles. Sadhak ID section shows membership code + QR SVG + referral link. Copy button works.

---

### Phase 2: Center Sections

1. `frontend/components/profile/enrolled-center.html` — center card + action buttons; "Leave Center" triggers `#confirmModal`
2. `frontend/components/profile/browse-centers.html` — search input + 3 dropdowns + `#centersGrid` div; "Join" triggers `#confirmModal`

**Acceptance test:** Enrolled Center card renders. Leave Center → confirm modal appears. Browse Centers shows 6 center cards. Search + filter + reset work. Load More increments by 4.

---

### Phase 3: History & Naadi

1. `frontend/components/profile/shibir-history.html` — `#shibirHistoryContent` div rendered by `renderShibirs()`
2. `frontend/components/profile/naadi-jyotish.html` — birth profile card + `#consultationsContent` + `#upcomingConsultationsContent`

**Acceptance test:** Shibir History shows 7 cards with certificate download buttons. Naadi shows rashi/nakshatra badges + 3 past consultations + 2 upcoming consultation cards.

---

### Phase 4: My Profile (Personal)
The most important section. Contains the Aadhaar verification flow.

1. `frontend/components/profile/personal.html` — Profile summary card, read-only form (8 personal fields + 5 location fields), Aadhaar sub-card with verification status

**Acceptance test:** Profile card shows name + location. All fields display hardcoded mock data. "Edit Profile" → `#editProfileModal` opens → save works. "Verify Aadhaar" → `#aadhaarVerificationModal` → enter 12-digit number → OTP flow → verified badge updates.

---

### Phase 5: Volunteering (Most Complex)
420-line modal with 25+ form fields + localStorage persistence.

1. `frontend/components/profile/volunteering.html` — `#volunteeringContent` div with empty-state or rendered profile

**Acceptance test:** Fresh load → empty state shown. "Get Started" → `#editVolunteeringModal` opens → fill all 7 groups of fields → save → profile renders in read-only cards → reload → data persists from localStorage.

---

## Complexity Reference

| Section | Component File | Modals Used | Dynamic Rendering | Complexity |
|---------|---------------|-------------|-------------------|------------|
| My Profile | `personal.html` | `#editProfileModal`, `#aadhaarVerificationModal` | No | Complex |
| Account Settings | `settings.html` | None | No | **Simple** |
| Sadhak ID | `sadhak.html` | None | No | **Simple** |
| Enrolled Center | `enrolled-center.html` | `#confirmModal` | No | Medium |
| Browse Centers | `browse-centers.html` | `#confirmModal` | `renderCenters`, filter, paginate | Complex |
| Shibir History | `shibir-history.html` | None | `renderShibirs` | Medium |
| Naadi Jyotish | `naadi-jyotish.html` | None | 3 render functions | Complex |
| Volunteering | `volunteering.html` | `#editVolunteeringModal` (~420 lines) | `renderVolunteeringProfile`, localStorage | **Most Complex** |

---

## Critical Implementation Notes

1. **`window.` scope required** — Every function called via `onclick=""` in component HTML must be on `window` in `profile.js`. Example: `window.showSection = function(name, event) {...}`. Without this, onclick attributes fail silently.

2. **Auth guard placement** — Run the guard synchronously at the top of `profile.js`, before `DOMContentLoaded`. This prevents any profile content from flashing before the redirect.

3. **Section IDs** — Component HTML files contain the section's inner content only (no wrapper div). The wrapper `<div id="X-section" class="content-section">` lives in `profile.html`. IDs must match exactly: `personal-section`, `settings-section`, `sadhak-section`, `enrolled-center-section`, `browse-centers-section`, `shibir-history-section`, `volunteering-section`, `naadi-jyotish-section`.

4. **Navbar "View Profile" link** — The `#user-dropdown` in `navbar.html` currently has only a Logout button. Phase 0 adds a "View Profile" anchor (`href="pages/profile.html"`) above Logout.

5. **`handleLogout()` in profile.js** — Must redirect to `../index.html`, not to the v7 mockup path.

6. **Tailwind tokens available** — `profile.html` loads `tailwind-config.js` + Tailwind CDN, so all existing tokens (`text-primary`, `bg-accent`, `text-background`, etc.) are available in both the shell and component HTML files.
