# V7 Theme vs. PDF Creative Guidelines: Detailed Comparison

**Purpose:** Identify gaps and differences between the current v7 "White Copper" design system implemented in the frontend and the new Antar Yog Creative Guidelines extracted from the PDF.

**Date:** April 2026  
**Related Documents:**
- Current v7 implementation: CLAUDE.md (Design System section)
- PDF Guidelines: CREATIVE_GUIDELINES_EXTRACTED.md
- Current Frontend: `/home/ameya/repo/aywebtest/frontend/`

---

## 1. COLOUR SYSTEM — 🔴 CRITICAL DIFFERENCE

### PDF Guidelines
- **Philosophy:** "Festival First, Brand Second" — dynamic, context-responsive
- **Flexibility:** 5+ festival/deity-specific colour palettes
- **Palette Structure:** Dominant colour + Support colour + Neutral
- **Available Palettes:**
  - **Navratri/Shakti:** Crimson (#BE2030), Vermillion (#F05A24), Saffron (#D4A017), Cream (#FFF5E6)
  - **Maha Shivratri:** Navy (#003070), Royal Blue (#102060), Teal (#5A7D8A), Off-white (#F6F3EA), Gold (#B98A28)
  - **Ganesh/Vidya:** Saffron (#D94A1E), Red (#C62828), Ivory (#FFF4E0), Gold (#E0B84F), Beige (#E6D2B3)
  - **Saraswati/Children:** Aqua (#A8E0E0), Soft Yellow (#F4D83D), Pink-Magenta (#CC3F8C), White (#FFFFFF), Teal (#3E8C8C)
  - **Shukra/Wealth/Healing:** Blush Pink (#EFC9D7), Plum (#801080), Silver-Grey (#C9C9C9), Cream (#FFF8F1), Gold (#D7B15A)
- **Brand Consistency:** Yellow halo in logo + Brown logo text + Consistent CTA structure (remains constant across all palettes)

### Current V7 Theme
- **Approach:** Single static palette used everywhere
- **Palette:** 
  - **Primary (Copper):** #B87333
  - **Secondary (Gold):** #E8B84B
  - **Accent (Dark Brown):** #5C3010
  - **Background (Off-white):** #F9F6F0
  - **Alt Background:** #FDFBF8
- **Application:** Same colours across all pages, sections, and contexts

### Impact
- ❌ V7 cannot express festival-specific moods (Navratri needs red/crimson, Shivratri needs navy/blue)
- ❌ V7 lacks the flexibility to align colours with deity imagery
- ✅ V7 maintains consistency (which is the brand safety net in PDF approach)
- **Architectural Gap:** PDF requires a themeable color system; v7 requires complete redesign for each festival

### Recommendation
- Consider implementing CSS custom properties for festival themes
- Create 5 colour theme variants (one for each festival)
- Allow pages/sections to toggle between themes while keeping structure constant

---

## 2. TYPOGRAPHY — 🟡 HIGH PRIORITY DIFFERENCE

### PDF Guidelines
| Use | Font | Fallback | Purpose |
|-----|------|----------|---------|
| **English Headlines** | Gotham or DinPro | Sans-serif | Bold, direct feel |
| **English Body** | Calibri or Cambria | Serif/Sans | Readable, simple |
| **Hindi/Marathi Headlines** | Anek Devanagari or Tiro Devanagari Hindi | Devanagari serif | Traditional authority |
| **Hindi/Marathi Body** | Noto Serif Devanagari | Devanagari serif | Traditional tone when needed |

- **Maximum:** 2 font families per layout (one for headlines, one for body)
- **Emphasis:** Headlines bold and direct; body simple and never compressed

### Current V7 Theme
| Use | Font | Files |
|-----|------|-------|
| **Headings (H1-H6)** | Lora (serif) | All CSS, Google Fonts |
| **Body & UI** | Inter (sans-serif) | All CSS, Google Fonts |
| **Elegant Taglines** | Cormorant Garamond (serif italic) | hero.css specifically |
| **Count** | 3 font families | Exceeds PDF guideline |

### Gaps
- ❌ **Font Family Choice:** PDF recommends Gotham/DinPro (sans) for headlines; v7 uses Lora (serif)
- ❌ **Font Family Choice:** PDF recommends Calibri/Cambria for body; v7 uses Inter (sans)
- ❌ **Font Count:** v7 uses 3 families (Lora + Inter + Cormorant Garamond); PDF specifies max 2
- ❌ **Bilingual Support:** PDF provides specific Hindi/Marathi fonts (Anek Devanagari, Noto Serif); v7 doesn't address
- ✅ **Intent Alignment:** Both aim for clean, readable, premium typography

### Recommendation
- Add Hindi/Marathi font imports (Anek Devanagari, Noto Serif Devanagari)
- Consider transitioning headings to Gotham/DinPro (or compatible sans-serif)
- Reduce font family count to 2 per layout
- Create bilingual typography hierarchy rules

---

## 3. LOGO SYSTEM — ✅ MOSTLY ALIGNED

### PDF Guidelines
- **Mandatory:** Every page must have logo (non-negotiable)
- **Placement:** Top right (default) OR bottom left (when top is crowded or deity occupies upper zone)
- **Sizing:** 7–12% of canvas width
- **Clear Space:** Minimum = height of inner icon circle
- **Protection Rules:**
  - Never recolour
  - Never stretch, crop, or tuck into curves
  - Never place on noisy backgrounds without clean backing
  - Visible but never larger than main headline or hero image

### Current V7 Theme
- **Navbar Logo:** `<h-14>` (56px height, auto width) ✓
- **Footer Logo:** 40px height, auto width ✓
- **Placement:** Top right (navbar) + Bottom left (footer) ✓
- **Recoloring:** Not applied (follows rule) ✓
- **Background:** Always on solid backgrounds ✓
- **Sizing:** Need to verify if 56px = 7–12% of typical canvas width

### Gaps
- ⚠️ **Sizing Percentage:** V7 uses fixed pixel sizes; PDF specifies percentage-based sizing (responsive)
- ⚠️ **Clear Space:** PDF rule not explicitly coded in CSS
- ⚠️ **Alternate Placement:** V7 always uses top-right + bottom-left; doesn't support dynamic positioning

### Status
- Generally compliant; logo handling is solid

---

## 4. LAYOUT HIERARCHY — 🟡 MODERATE DIFFERENCE

### PDF Guidelines
Strict vertical zone structure:
1. **Logo Zone** (top 10–12%) — Logo + optional campaign tag
2. **Hero Zone** — Acharya/deity/strong visual
3. **Headline Zone** — One clear promise
4. **Info Zone** — Date, time, venue, Zoom, dakshina, seats
5. **QR/Scan Zone** — Lower-right, scannable
6. **Footer Banner** — Website link, scan code, phone

**Sizing Rule:** Hero occupies 35–45% of post; CTA strip closes at bottom

### Current V7 Theme
- **General Flow:** Sections follow a general top-to-bottom flow ✓
- **Component Structure:** Navbar → Hero → Sections → Final CTA → Footer ✓
- **Explicit Zones:** Not formally defined in CSS
- **Hero Sizing:** Varies by section (no standardized 35–45% rule)
- **Footer Banner:** Present but sizing not standardized (~80px, not 12–16% of section height)
- **QR Code:** Not applicable for web (social media feature)

### Gaps
- ⚠️ **Zone Explicitness:** PDF requires strict zone definitions; v7 follows general flow
- ⚠️ **Hero Sizing:** PDF rule (35–45%) not enforced in v7 CSS
- ⚠️ **Footer Height:** PDF spec (12–16% of section) not coded in v7
- ⚠️ **Zone Spacing:** PDF defines clear info hierarchy; v7 is component-based

### Recommendation
- Document zone structure in CSS comments
- Create utility classes for zone sizing (logo-zone, hero-zone, etc.)
- Standardize footer height to 12–16% of section

---

## 5. FOOTER & CTA IMPLEMENTATION — 🟠 MODERATE DIFFERENCE

### PDF Guidelines
**Mandatory Footer Banner:**
- **Required Elements:** Website link + QR code (always); phone + social (optional)
- **Height:** 12–16% of total section height
- **Order:** Website link first, CTA/"Register now" second, QR code right
- **QR Clearance:** 20px from outer edge
- **Layout:** Full-width strip or lower strip (clearly visible)

### Current V7 Theme
- **Footer File:** `/frontend/components/footer.html`
- **Background:** #5C3010 (dark brown) ✓
- **Content:** Logo, org name, Sanskrit tagline, 4-column link grid, social icons, copyright
- **Height:** ~80px (not 12–16% standardized)
- **Elements Present:**
  - ✅ Logo
  - ✅ Links to sections
  - ✅ Social icons
  - ❌ QR code (not applicable to web)
  - ❌ Website link highlighted as primary
- **Mobile Responsive:** 2 columns tablet, 1 column mobile ✓

### Gaps
- ⚠️ **Height Standardization:** V7 uses fixed ~80px; PDF specifies 12–16% of section
- ⚠️ **Element Priority:** PDF prioritizes website link + QR; v7 prioritizes brand + links
- ⚠️ **QR Code:** PDF requires; v7 doesn't (web-specific difference)
- ⚠️ **Content Hierarchy:** PDF: link-first; v7: brand-first

### Status
- Footer is well-designed but follows different priority order than PDF
- QR code omission is appropriate for web (not mobile-oriented)

---

## 6. THREE VISUAL ANCHORS — ✅ ALIGNED

### PDF Guidelines (Non-negotiable Consistency)
1. **Antar Yog identity mark (logo)** — Present on every post
2. **Acharya imagery** — Consistent portraiture
3. **Strong bottom CTA zone** — Registration/action strip at bottom

### Current V7 Theme
1. ✅ **Logo:** Navbar (top right) + Footer (bottom left) — present on every page
2. ✅ **Acharya imagery:** Used in hero sections, about pages, testimonials
3. ✅ **CTA zone:** final-cta.html section with primary/secondary buttons

### Status
- All three anchors well-established in v7
- No changes needed

---

## 7. IMAGE TREATMENT — ✅ MOSTLY ALIGNED

### PDF Guidelines
- **Selection:** One primary image (Acharya, deity, ritual, child, or symbol)
- **Sacred Respect:** Breathing room, no awkward crops through faces
- **Enhancement:** Soft glows, radial light, gradients, festival textures
- **Avoid:** Glossy, stock-heavy, chaotic backgrounds
- **Portrait Quality:** Bright, clean, high-res; consistent edge quality for cut-outs

### Current V7 Theme
- **Hero Images:** Background images with overlays ✓
- **Cards:** Image sections with clean backgrounds ✓
- **Testimonials:** Portrait images with circular frames ✓
- **Enhancement:** Uses subtle shadows and overlays ✓
- **Respect:** No visible awkward cropping ✓

### Status
- V7 follows PDF principles well
- No critical gaps

---

## 8. CONTENT & COPY RULES — ✅ GOOD ALIGNMENT

### PDF Guidelines
- **Lead** with one clear spiritual/personal outcome
- **Limit** to 3–5 benefit points
- **Date/Time:** Always visible and easy to find
- **Registration:** Never compete with headline
- **Text:** Short lines, icons, separators, compact cards
- **Bilingual:** Clear hierarchy; don't mix at same visual level

### Current V7 Theme
- **Headlines:** Bold, clear CTAs ✓
- **Body Copy:** Modular cards, short paragraphs ✓
- **Icons & Separators:** Used throughout ✓
- **Bilingual:** Sanskrit/Hindi used in footer and guru section ✓
- **Overload:** Generally avoided ✓

### Status
- V7 follows content principles well
- Content hierarchy is strong

---

## 9. DO & DON'T CHECKLIST — ✅ MOSTLY COMPLIANT

### Critical Rules
| Rule | PDF Requirement | V7 Status |
|------|---|---|
| Logo placement consistent | Top right default, bottom left when needed | ✅ Compliant (but static) |
| Festival decides palette | Dynamic palette selection | ❌ Single static palette |
| One headline + one CTA | Single strong promise | ✅ Compliant |
| QR code functional | Large, scannable | N/A for web |
| Never recolor logo | Brand protection | ✅ Compliant |
| Max 2 font families | Gotham/Calibri or DinPro/Cambria | ❌ Uses 3 families |
| Don't crop sacred images | Respect and breathing room | ✅ Compliant |
| Don't fill empty areas | Avoid clutter | ✅ Compliant |
| Don't hide website link | Prominent, readable | ✅ Compliant |
| Don't mix unrelated palettes | Festival-specific only | ✅ Compliant (because only 1 palette) |

---

## SUMMARY: Critical Gaps & Priorities

| Priority | Issue | Current State | Required Change | Effort |
|----------|-------|---|---|---|
| 🔴 **CRITICAL** | Festival-responsive colour system | Single palette (#B87333/#E8B84B) | Implement 5 festival themes | High |
| 🟡 **HIGH** | Typography fonts | Lora + Inter + Cormorant | Reduce to 2 families; add Hindi fonts | Medium |
| 🟡 **HIGH** | Hindi/Marathi typography | Not addressed | Add Anek Devanagari, Noto Serif | Medium |
| 🟠 **MEDIUM** | Hero sizing rule | Varies by component | Standardize to 35–45% | Low |
| 🟠 **MEDIUM** | Footer height standard | ~80px fixed | Make 12–16% of section height | Low |
| 🟠 **MEDIUM** | Logo sizing percentage | Fixed pixels (56px, 40px) | Convert to 7–12% canvas width | Low |
| 🟢 **LOW** | Logo clear space CSS | Not enforced | Document in CSS comments | Low |
| 🟢 **LOW** | Zone explicitness | Implicit in components | Document zones in CSS | Low |

---

## Key Architectural Shift Required

**The biggest difference:** The PDF demands a **festival-responsive, dynamic colour system**, while v7 is built on a **static, single-palette approach**.

### Options for Alignment:

**Option A: Full Redesign (High Effort)**
- Implement CSS custom properties for each festival theme
- Create 5 colour variants (Navratri, Shivratri, Ganesh, Saraswati, Shukra)
- Allow theme switching via data attributes or class names
- Redesign all components to support theme switching

**Option B: Selective Implementation (Medium Effort)**
- Keep v7 as the "default/core" theme
- Add festival-specific theme variants as separate CSS files
- Use theme switcher for festival-specific pages/sections
- Keeps v7 intact while allowing flexibility

**Option C: Gradual Migration (Low Effort)**
- Document current gaps
- Update typography first (font stack, Hindi support)
- Add hero sizing and footer height standards
- Plan colour system refactor for later phase

**Recommendation:** Option B (Selective Implementation) provides best balance of flexibility and effort.

---

## Related Documents
- `CREATIVE_GUIDELINES_EXTRACTED.md` — Full PDF guidelines
- `CLAUDE.md` — Current v7 design system documentation
- `Antar_Yog_Creative_Guidelines.pdf` — Original source document
