# Frontend Guidelines Alignment Plan

**Purpose:** Audit current frontend pages and components against new Creative Guidelines. Identify gaps and required changes. Prepare implementation roadmap.

**Reference Documents:**
- `CREATIVE_GUIDELINES_EXTRACTED.md` — Complete brand guidelines
- `BRAND_STRATEGY_FESTIVAL_VS_COMMON_PAGES.md` — Colour strategy decision

**Date:** April 2026  
**Status:** Planning Phase

---

## Executive Summary

**Current State:** 15 HTML pages + 17 components with static v7 "White Copper" theme  
**Target State:** All pages aligned with new Creative Guidelines (5 festival themes + v7 core)

**Key Changes Needed:**
1. ✅ Logo system (minor refinement — mostly compliant)
2. 🔴 **Colour system** (implement 5 festival themes with CSS variables)
3. 🟡 Typography (audit fonts, add Hindi/Marathi support)
4. 🟡 Footer banner (standardize height, ensure QR code compatibility)
5. 🟠 Hero sizing rules (standardize 35-45% rule)
6. 🟠 Layout zones (document and enforce)

---

## Frontend Audit: Pages & Components

### PAGES CATEGORIZED BY THEME

#### **Tier 1: Core Brand Pages (Use v7 White Copper)**

These pages should retain v7 "White Copper" theme:

| Page | File | Status | Priority |
|------|------|--------|----------|
| Landing/Home | `index.html` | ✅ Compliant | Low |
| About Acharya | `pages/about-acharya-ji.html` | ✅ Mostly compliant | Low |
| Vision & Mission | `pages/vision-mission.html` | ⚠️ Audit needed | Medium |
| Discourses | `pages/discourses.html` | ⚠️ Audit needed | Medium |
| Login | `pages/login.html` | ✅ Compliant (auth) | Low |
| Signup | `pages/signup.html` | ✅ Compliant (auth) | Low |
| Profile Completion | `pages/profile-completion.html` | ✅ Compliant | Low |
| User Profile | `pages/profile.html` | ⚠️ Needs audit | Medium |

#### **Tier 2: Festival/Shibir-Specific Pages (Use Festival Palettes)**

These pages should adopt festival-specific themes:

| Page | Festival | Theme | File | Status |
|------|----------|-------|------|--------|
| Naadi Jyotish | Shukra (Wealth/Healing) | Pink/Plum | `pages/naadi-jyotish.html` | 🟠 Needs redesign |
| Solution Pages (6) | Mixed | Varies | `pages/[solution-name].html` | 🟡 Review each |
| Health & Wellness | Shukra/Navratri | Pink or Red | `pages/health-wellness.html` | 🟡 Review |

**Note:** Festival-specific pages are not fully implemented yet. Current solution pages use generic styling.

#### **Tier 3: Utility/Placeholder Pages (Keep Simple)**

| Page | File | Status |
|------|------|--------|
| Under Construction | `pages/under-construction.html` | ✅ Fine as-is |
| 404 Error | (Not yet built) | 🔲 Plan needed |

---

## COMPONENT AUDIT AGAINST GUIDELINES

### Logo System Compliance

**Guideline Requirements:**
- Mandatory on every page/section
- Placement: Top right (default) or bottom left (alternate)
- Size: 7-12% of canvas width
- Clear space: Height of inner icon circle
- Never recolour, stretch, or place on noisy backgrounds

**Current Implementation:**
- ✅ Logo in navbar (top right) — 56px desktop, 40px mobile
- ✅ Logo in footer (bottom left) — 40px
- ✅ Never recoloured
- ⚠️ Clear space not explicitly enforced in CSS
- ⚠️ Sizing in pixels, not percentage (need to audit if 7-12% range)

**Required Changes:**
1. Add CSS comment documenting logo clear space requirement
2. Audit navbar/footer logo sizing — verify falls within 7-12% of typical viewport
3. Consider adding utility class for logo clear space
4. **Priority:** LOW (mostly compliant)

---

### Colour System Compliance

**Guideline Requirement:**
- Static palette on common pages (v7 White Copper)
- Festival-specific palettes on Shibir pages (5 themes)
- Consistent brand anchors: yellow halo + brown text + CTA structure

**Current Implementation:**
- ✅ v7 Copper/Gold used consistently across all pages
- ❌ No festival-specific themes implemented
- ❌ CSS custom properties not set up for theme switching
- ❌ No Hindi/Marathi language considerations in colour system

**Required Changes:**
1. 🔴 **HIGH PRIORITY: Create CSS custom property system**
   - Define base theme (v7 White Copper)
   - Define 5 festival theme variants
   - Implement theme switching via class/data attribute

2. 🔴 **HIGH PRIORITY: Refactor colour values across all CSS files**
   - Replace hardcoded hex codes with CSS variables
   - Files affected: ~20 CSS files
   - Variables: `--primary`, `--secondary`, `--accent`, `--bg`, `--text-primary`

3. 🟡 **MEDIUM PRIORITY: Create theme CSS file**
   - `css/themes.css` — Define all 5 festival themes
   - Documented with colour purposes and associations

4. 🟠 **LOW PRIORITY: Add theme switcher UI (optional)**
   - For admin/preview of themes
   - Not necessary for production (themes auto-applied per page)

**Effort Estimate:** 2-3 weeks for complete refactor

---

### Typography Compliance

**Guideline Requirements:**
- English headlines: Gotham or DinPro (current: Lora)
- English body: Calibri or Cambria (current: Inter)
- Hindi/Marathi headlines: Anek Devanagari or Tiro Devanagari Hindi (current: none)
- Hindi/Marathi body: Noto Serif Devanagari (current: none)
- **Max 2 font families per layout** (current: 3 — Lora + Inter + Cormorant)

**Current Implementation:**
- ✅ Clear font hierarchy (Lora headings + Inter body)
- ✅ Limited font families (3 total, but 2 per layout mostly)
- ❌ No Hindi/Marathi font support
- ⚠️ Lora (serif) vs. Gotham/DinPro (sans) — different aesthetic

**Required Changes:**
1. 🟡 **MEDIUM PRIORITY: Add Hindi/Marathi fonts**
   - Import Anek Devanagari (Google Fonts)
   - Import Noto Serif Devanagari (Google Fonts)
   - Add CSS classes for bilingual text

2. 🟠 **LOW PRIORITY: Consider font migration**
   - Current Lora + Inter combination is cohesive
   - Gotham/DinPro not available on Google Fonts easily
   - **Recommendation:** Keep Lora + Inter (compatible with guideline spirit)
   - Add note to CLAUDE.md about font equivalency

3. 🟠 **LOW PRIORITY: Audit bilingual pages**
   - Footer (Sanskrit tagline) — check hierarchy
   - Profile section (if bilingual) — check hierarchy
   - Add CSS for bilingual text scaling/hierarchy

**Effort Estimate:** 1 week

---

### Layout & Hierarchy Compliance

**Guideline Requirements:**
- Strict vertical zones: Logo → Hero → Message → Detail → CTA/Footer
- Hero occupies 35-45% of section
- Footer banner height: 12-16% of section
- QR code in lower-right with 20px clearance

**Current Implementation:**
- ✅ General top-to-bottom flow present
- ⚠️ Zones not explicitly defined in CSS
- ⚠️ Hero sizing varies by component (not standardized)
- ⚠️ Footer height ~80px (audit needed if within 12-16%)
- ⚠️ No QR code present (web-specific, not applicable)

**Required Changes:**
1. 🟠 **MEDIUM PRIORITY: Document zone structure**
   - Add CSS comments defining zones
   - Create utility classes: `.zone-logo`, `.zone-hero`, `.zone-message`, `.zone-detail`, `.zone-cta`
   - Document expected sizing for each

2. 🟠 **LOW PRIORITY: Standardize hero sizing**
   - Audit current hero sections
   - Implement 35-45% rule with max-width constraints
   - Test responsiveness across breakpoints

3. 🟠 **LOW PRIORITY: Review footer height**
   - Current: ~80px
   - Guideline: 12-16% of section height
   - If sections average 600px: 72-96px (80px is within range ✓)
   - Update footer CSS with percentage-based height if feasible

**Effort Estimate:** 1 week

---

### Footer & CTA Compliance

**Guideline Requirements:**
- Mandatory footer on all pages
- Contents: Website link + QR code + phone (optional) + social (optional)
- Order: Website link first, CTA second, QR code right
- Height: 12-16% of section
- QR code clearance: 20px from edge

**Current Implementation:**
- ✅ Footer present on all pages
- ✅ Dark brown background (#5C3010)
- ✅ Logo, links, social icons present
- ✅ 4-column grid responsive to mobile
- ❌ No QR code (web-specific, not applicable)
- ⚠️ Height not standardized as percentage
- ⚠️ Website link not emphasized as primary (brand-first layout)

**Required Changes:**
1. 🟠 **LOW PRIORITY: Document footer structure**
   - Add CSS comments for footer zones
   - Note: QR code omission is acceptable for web

2. 🟠 **OPTIONAL: Emphasize website link**
   - If needed, could make website URL more prominent
   - Current layout is brand-first (which is also valid)

**Effort Estimate:** A few hours (mostly documentation)

---

### Image Treatment Compliance

**Guideline Requirements:**
- One primary image per section (Acharya, deity, ritual, child, or symbol)
- Give sacred imagery breathing room
- Use soft glows, radial light, gradients
- Avoid glossy, stock-heavy, chaotic backgrounds
- Portraits: bright, clean, high-resolution

**Current Implementation:**
- ✅ One primary image per section (Acharya portrait, solution visuals)
- ✅ No awkward crops through faces
- ✅ Gradient overlays on hero sections
- ✅ High-quality imagery
- ⚠️ Some sections could use more "breathing room"
- ⚠️ Background textures could be more festival-specific (when using festival palettes)

**Required Changes:**
1. 🟠 **LOW PRIORITY: Add breathing room to sacred imagery**
   - Review Acharya portraits in hero
   - Increase padding/margin around images
   - Ensure backgrounds don't crowd images

2. 🟠 **LOW PRIORITY: Add festival-specific textures**
   - When implementing festival themes, add textures matching festival mood
   - Navratri: warm, energetic textures
   - Shivratri: cool, meditative textures
   - Saraswati: bright, learning-focused textures

**Effort Estimate:** Few hours (mostly visual refinement)

---

### Content & Copy Compliance

**Guideline Requirements:**
- Lead with one clear spiritual/personal outcome
- 3-5 benefit points maximum
- Short lines, icons, separators, compact cards
- Bilingual hierarchy clear
- Date/time always visible
- Registration info doesn't compete with headline

**Current Implementation:**
- ✅ Clear headlines and CTAs
- ✅ Modular card layouts
- ✅ Benefits listed concisely
- ✅ No overcrowding
- ⚠️ Some form fields could be more scannable
- ⚠️ Bilingual text hierarchy not explicitly defined (footer Sanskrit)

**Required Changes:**
1. 🟠 **LOW PRIORITY: Add bilingual hierarchy CSS**
   - Define size ratios for English vs. Hindi
   - Create `.bilingual-primary` and `.bilingual-secondary` classes

2. 🟠 **LOW PRIORITY: Audit profile form fields**
   - Some fields in profile-completion and volunteering forms are dense
   - Consider breaking into smaller steps
   - But this is content-level, not CSS guideline issue

**Effort Estimate:** Few hours

---

## DETAILED ALIGNMENT BY PAGE/COMPONENT

### 🔴 HIGH PRIORITY CHANGES

#### 1. Implement Festival Theme System
**Status:** Not started  
**Impact:** Required for all Shibir-specific pages  
**Tasks:**
- [ ] Create `css/themes.css` with 5 festival palettes
- [ ] Refactor existing CSS files to use custom properties
- [ ] Update `js/main.js` to handle theme switching
- [ ] Test all pages with each theme
- [ ] Document theme application rules

**Files Affected:** 20+ CSS files, 1 JS file  
**Estimated Effort:** 2-3 weeks

#### 2. Refactor Colours to Custom Properties
**Status:** Not started  
**Impact:** Foundation for theme switching  
**Tasks:**
- [ ] Create `:root` CSS custom property definitions
- [ ] Replace hardcoded `#B87333`, `#E8B84B`, `#5C3010`, `#F9F6F0` with variables
- [ ] Test colour rendering across all pages
- [ ] Ensure WCAG contrast ratios maintained

**Files Affected:** `styles.css`, `navbar.css`, `footer.css`, all component CSS  
**Estimated Effort:** 2 weeks

#### 3. Add Hindi/Marathi Font Support
**Status:** Not started  
**Impact:** Enable bilingual content  
**Tasks:**
- [ ] Import Anek Devanagari from Google Fonts
- [ ] Import Noto Serif Devanagari from Google Fonts
- [ ] Create CSS classes for Hindi/Marathi text
- [ ] Update HTML for bilingual labels (footer, forms)
- [ ] Test on Windows, Mac, mobile

**Files Affected:** `index.html`, component HTML files, `styles.css`  
**Estimated Effort:** 1 week

---

### 🟡 MEDIUM PRIORITY CHANGES

#### 4. Standardize Layout Zones
**Status:** Partially done (implicit)  
**Impact:** Ensures consistent visual hierarchy  
**Tasks:**
- [ ] Document zone structure in CSS comments
- [ ] Create zone utility classes
- [ ] Review each page for zone compliance
- [ ] Add CSS grid/flex annotations

**Files Affected:** All CSS files  
**Estimated Effort:** 1 week

#### 5. Audit & Standardize Hero Sizing
**Status:** Varies by component  
**Impact:** Ensures 35-45% rule  
**Tasks:**
- [ ] Measure current hero sizes
- [ ] Calculate as % of viewport/container
- [ ] Adjust to fall within 35-45% rule
- [ ] Test responsive breakpoints

**Files Affected:** `hero.css`, `naadi-jyotish.css`, solution page CSS  
**Estimated Effort:** 1 week

#### 6. Add Bilingual Typography Rules
**Status:** Not started  
**Impact:** Enables clear English + Hindi hierarchy  
**Tasks:**
- [ ] Define scaling rules (e.g., Hindi 0.9x English size)
- [ ] Create `.bilingual` CSS classes
- [ ] Add language-aware font-weight rules
- [ ] Test readability

**Files Affected:** `styles.css`  
**Estimated Effort:** Few hours

---

### 🟠 LOW PRIORITY CHANGES

#### 7. Document Logo Clear Space
**Status:** Partially done  
**Impact:** Brand consistency  
**Tasks:**
- [ ] Add CSS comment noting clear space requirement
- [ ] Create optional utility class `.logo-clearspace`
- [ ] Verify navbar/footer comply

**Files Affected:** `navbar.css`, `footer.css`  
**Estimated Effort:** 1 hour

#### 8. Review Footer Height Standardization
**Status:** Mostly compliant (~80px)  
**Impact:** Minor refinement  
**Tasks:**
- [ ] Confirm footer is within 12-16% range
- [ ] Document height rule in CSS
- [ ] Consider percentage-based sizing

**Files Affected:** `footer.css`  
**Estimated Effort:** 2 hours

#### 9. Add Breathing Room to Sacred Imagery
**Status:** Generally good, minor refinement needed  
**Impact:** Visual refinement  
**Tasks:**
- [ ] Audit Acharya portrait spacing in hero
- [ ] Increase padding around images
- [ ] Ensure background doesn't crowd image

**Files Affected:** `hero.css`, `acharya.css`  
**Estimated Effort:** Few hours

#### 10. Add Festival-Specific Textures
**Status:** Not started  
**Impact:** Visual polish for Shibir pages  
**Tasks:**
- [ ] Create texture/pattern assets per festival
- [ ] Apply via background-image in theme CSS
- [ ] Test performance (image loading)

**Files Affected:** `themes.css`, new texture assets  
**Estimated Effort:** 1 week (design + implementation)

---

## IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Weeks 1-2)
**Goal:** Set up theme system infrastructure

- [ ] Create `css/themes.css`
- [ ] Define CSS custom properties in `:root`
- [ ] Refactor `styles.css` to use variables
- [ ] Test base theme (v7 White Copper)

**Deliverable:** Base colour system working with variables

---

### Phase 2: Theme Variants (Week 3)
**Goal:** Implement all 5 festival themes

- [ ] Define Navratri theme colours
- [ ] Define Shivratri theme colours
- [ ] Define Ganesh theme colours
- [ ] Define Saraswati theme colours
- [ ] Define Shukra theme colours
- [ ] Test all pages with each theme variant

**Deliverable:** All 5 themes defined and tested

---

### Phase 3: Refactor Existing Pages (Week 4)
**Goal:** Update all CSS files to use variables

- [ ] Refactor navbar.css
- [ ] Refactor footer.css
- [ ] Refactor hero.css
- [ ] Refactor all component CSS
- [ ] Test colour consistency

**Deliverable:** All pages use CSS variables (no hardcoded colours)

---

### Phase 4: Typography & Internationalization (Week 5)
**Goal:** Add Hindi/Marathi support

- [ ] Import Devanagari fonts
- [ ] Create bilingual CSS classes
- [ ] Update footer Sanskrit
- [ ] Update form labels (if bilingual)
- [ ] Test on all devices

**Deliverable:** Bilingual text hierarchy established

---

### Phase 5: Layout & Sizing Standardization (Week 6)
**Goal:** Enforce layout guidelines

- [ ] Document zone structure
- [ ] Create zone utility classes
- [ ] Standardize hero sizing (35-45%)
- [ ] Verify footer height (12-16%)
- [ ] Test responsive behaviour

**Deliverable:** Layout zones documented and standardized

---

### Phase 6: Polish & Refinement (Week 7)
**Goal:** Visual enhancements

- [ ] Add breathing room to sacred imagery
- [ ] Add festival-specific textures
- [ ] Review logo clear space
- [ ] Final QA across all pages
- [ ] Cross-browser testing

**Deliverable:** Production-ready aligned pages

---

### Phase 7: Implementation & Rollout (Week 8)
**Goal:** Deploy to production

- [ ] Final testing on staging
- [ ] Update CLAUDE.md with new guidelines
- [ ] Deploy CSS changes
- [ ] Monitor for issues
- [ ] Celebrate! 🎉

**Deliverable:** Updated frontend aligned with Creative Guidelines

---

## PAGE-BY-PAGE IMPLEMENTATION CHECKLIST

### Core Brand Pages (v7 White Copper)

- [ ] **index.html** — Landing page
  - [x] Uses v7 colours
  - [x] Logo, Acharya imagery, CTA structure present
  - [ ] Audit hero sizing (should be 35-45%)
  - [ ] Verify footer height (should be 12-16%)
  - [ ] Add bilingual support (if needed)

- [ ] **pages/about-acharya-ji.html** — Acharya biography
  - [x] Compliant with guidelines
  - [ ] Verify image breathing room
  - [ ] Check footer sizing

- [ ] **pages/vision-mission.html** — Mission statement
  - [x] Keep v7 colours
  - [ ] Ensure CTA is prominent
  - [ ] Verify layout zones

- [ ] **pages/discourses.html** — Discourse listing
  - [x] Keep v7 colours
  - [ ] Verify page structure follows zones

- [ ] **pages/login.html** — Authentication
  - [x] Keep v7 colours
  - [ ] Ensure form fields have proper labels
  - [ ] Verify date/time display (if applicable)

- [ ] **pages/signup.html** — Registration
  - [x] Keep v7 colours
  - [ ] Verify terms & conditions display
  - [ ] Ensure CTA clear

- [ ] **pages/profile-completion.html** — Profile setup
  - [x] Keep v7 colours
  - [ ] Verify form is scannable
  - [ ] Ensure progress indicator present

- [ ] **pages/profile.html** — User dashboard
  - [x] Keep v7 colours
  - [ ] Verify sidebar/modal responsiveness
  - [ ] Ensure Acharya imagery (if present) has breathing room

### Festival/Shibir Pages (Theme-Specific)

- [ ] **pages/naadi-jyotish.html** — Shukra/Wealth theme
  - [ ] Implement Pink/Plum palette
  - [ ] Maintain structure consistency
  - [ ] Test with festival theme

- [ ] **pages/health-wellness.html** — Review & theme
  - [ ] Determine correct festival association
  - [ ] Apply matching theme
  - [ ] Verify testimonials use correct theme

- [ ] **Solution pages** (6 pages)
  - [ ] Assign festival themes to each
  - [ ] Implement themes
  - [ ] Verify page structure consistency

---

## CSS FILES: Refactoring Checklist

**Files requiring variable conversion:**

- [ ] `styles.css` — Replace `#B87333`, `#E8B84B`, `#5C3010`, `#F9F6F0` with variables
- [ ] `navbar.css` — Update logo, hover, active states
- [ ] `footer.css` — Update background, text, link colours
- [ ] `hero.css` — Update background, text, overlays
- [ ] `transformations.css` — Update card styling
- [ ] `testimonials.css` — Update card, tags, overlay
- [ ] `programs.css` — Update card styling
- [ ] `courses-preview.css` — Update card styling
- [ ] `profile.css` — Update sidebar, modal, accent colours
- [ ] `naadi-jyotish.css` — Update all colours
- [ ] `auth.css` — Update form styling
- [ ] `solution-page.css` — Update all styling
- [ ] `final-cta.css` — Update button colours
- [ ] `guru.css` — Update styling
- [ ] `wisdom-section.css` — Update card styling
- [ ] `acharya.css` — Update styling
- [ ] `discourses.css` — Update styling
- [ ] `profile-completion.css` — Update form styling
- [ ] `upcoming-programs.css` — Update card styling
- [ ] `how-it-works.css` — Update styling

---

## Success Metrics

After implementation, all pages should meet these criteria:

- ✅ Logo present on every page (top right or bottom left)
- ✅ Logo halo yellow, text brown (constant)
- ✅ Acharya imagery present and respected (breathing room)
- ✅ CTA/footer structure consistent across all pages
- ✅ Hero occupies 35-45% of section
- ✅ Footer height 12-16% of section height
- ✅ Typography max 2 fonts per layout
- ✅ Bilingual text has clear hierarchy
- ✅ No overcrowding of copy
- ✅ Sacred imagery never awkwardly cropped
- ✅ Soft glows/gradients on hero sections
- ✅ Festival pages use festival-specific themes
- ✅ Core pages use v7 White Copper theme
- ✅ WCAG AA colour contrast maintained
- ✅ Responsive design maintained across breakpoints

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Theme switching breaks old layouts | Gradual refactor, test each page with each theme |
| Colour variable names conflict | Use clear naming convention: `--primary`, `--secondary`, `--accent`, `--bg`, `--text-primary` |
| Font loading performance | Use `font-display: swap` in Google Fonts imports |
| Bilingual text breaks layouts | Test extensively; use `lang` attribute for proper rendering |
| Mobile responsiveness issues | Test all themes on iPhone, Android, tablet sizes |

---

## Dependencies & Prerequisites

- [ ] All CSS files read and understood
- [ ] All JavaScript theme switching logic planned
- [ ] Stakeholder approval on festival theme assignments
- [ ] Design assets for festival textures (if adding)
- [ ] QA testing plan for multi-theme pages

---

## Conclusion

**Current State:** Frontend is well-structured with v7 theme, mostly compliant with Logo and general structure guidelines.

**Work Required:** Implement festival theme system (CSS variables), add Hindi/Marathi fonts, standardize sizing rules, add visual polish.

**Timeline:** 7-8 weeks for full implementation (can be done in phases).

**Recommendation:** Start with Phase 1-2 (theme infrastructure) to unblock Shibir page design work. Phases 3-7 can proceed in parallel with other feature development.

---

**Next Steps:**
1. Get stakeholder buy-in on timeline
2. Assign team members to phases
3. Create detailed task tickets for each phase
4. Begin Phase 1: CSS variable system setup
