# Homepage Redesign Plan — AntarYog

## Executive Summary

This document outlines a comprehensive redesign of the AntarYog homepage to shift from **philosophically strong but unclear** to **crystal clear value proposition with guided user journey**.

**Target:** New visitors understand in 3 seconds:
- **What is this?** → Vedic wisdom for modern life transformation
- **Why should I care?** → Clarity, strength, purpose in career/relationships/life
- **What should I do next?** → Clear call-to-action

---

## 1. Strategic Messaging Shift

### Current Problem
- Homepage is philosophically rich but unclear for new visitors
- Mission-focused messaging (Bharat as Vishwa Guru) alienates individual seekers
- No problem-solution framing
- Weak differentiation from hundreds of similar spiritual sites
- Missing social proof and concrete benefits

### New Messaging Framework

**Hero Headline:**
```
"Transform Your Life with Vedic Wisdom"
```

**Subheadline (Problem-Solution Bridge):**
```
"Are you struggling with clarity, stress, or purpose?
Find strength and direction through proven Vedic wisdom."
```

**Value Propositions (3 Core Benefits):**
1. **Clarity** → Life decisions become easier
2. **Strength** → Build mental resilience & emotional balance
3. **Purpose** → Align with Dharma for lasting success

---

## 2. Homepage Structure (9-Section Information Flow)

### Current Structure
- Hero
- Transformation Triptych
- DSS Shibir
- Footer

**❌ Problem:** Only 3 touchpoints; no messaging progression

### New Structure (Awareness → Desire → Action)

```
1. HERO (Stark, Minimal, Directional)
   ├─ Sharp headline + subheadline
   ├─ Problem-solution micro-copy
   ├─ Strong primary CTA ("Start Your Journey")
   └─ Secondary CTA ("Learn More")

2. PROBLEM SECTION (Relatability)
   "Are you facing these challenges?"
   ├─ Icon + text: Lack of clarity in decisions
   ├─ Icon + text: Stress & emotional instability
   ├─ Icon + text: Struggles in career/relationships
   └─ Icon + text: Loss of purpose/direction

3. SOLUTION SECTION (Your Unique Value)
   "How Antar Yog Helps"
   ├─ Gain clarity through Vedic wisdom
   ├─ Build mental strength & emotional balance
   └─ Align your life with Dharma for success

4. TRANSFORMATION SECTION (Social Proof - Redesigned)
   "Real People, Real Results"
   ├─ Before/After story cards (3–4)
   ├─ Each card: name, city, 1-2 line impact
   └─ "See more stories" → link to testimonials page

5. COURSES PREVIEW (Huge Opportunity!)
   "Featured Programs" (show 6–8 of your 56 courses)
   ├─ Course card design: image, title, duration, CTA
   ├─ Category filter (optional)
   └─ "Explore All Courses" CTA

6. HOW IT WORKS (3-Step Simplicity)
   ├─ Step 1: Choose your path (icon + text)
   ├─ Step 2: Learn from Acharya Ji (icon + text)
   └─ Step 3: Transform your life (icon + text)

7. TESTIMONIALS (Enhanced - 3–5 Quotes)
   Micro-testimonials with faces:
   ├─ Quote text
   ├─ Name + city + role (optional)
   └─ Small photo

8. GURU/LINEAGE SECTION
   "Guided by a Living Master"
   ├─ Acharya portrait + brief bio
   ├─ "Learn more about Acharya Ji"
   └─ Optional: lineage/credentials

9. FINAL CTA + FOOTER
   "Ready to transform?"
   └─ Bold button → Sign up / Explore
```

---

## 3. Visual Design Direction

### Aesthetic Principle
**Refined Elegance + Accessibility** (not generic spiritual slop)

### Typography Hierarchy

| Level | Font | Size (Desktop) | Size (Mobile) | Weight | Use Case |
|-------|------|---|---|---|---|
| H1 (Hero) | Lora serif | 48–56px | 32–40px | Bold | Main headline, sharp value prop |
| H2 (Section) | Lora serif | 32–40px | 24–32px | Semi-bold | Section headers |
| Body | Inter sans | 16–18px | 16px | Regular | Main copy, generous leading |
| Micro-copy | Inter sans | 14px | 14px | Regular | Problem/benefit statements |
| Small | Inter sans | 12px | 12px | Regular | Metadata, testimonial attribution |

### Color System (v7 "White Copper" Preserved)

```
Primary (Copper):        #B87333  → Headlines, CTAs, icons
Secondary (Gold Light):  #E8B84B  → Accents, highlights, borders
Accent (Deep Brown):     #5C3010  → Icon fills, strong accents
Background (Paper):      #F9F6F0  → Page background
Text Primary (Warm):     #2D2D2D  → Headlines, main text
Text Secondary:          #6B6B6B  → Subtext, body
Transformation (Sage):   #2D5F4F  → "After" stories, success states
```

### Spacing & Layout

**Vertical Spacing:**
- Section spacing: 80–120px (desktop), 60–80px (mobile)
- Card padding: 1.5rem minimum
- Paragraph margin: 1.5rem
- Line-height: 1.6–1.8 (generous breathing)

**Horizontal Layout:**
- Container max-width: 1200px
- Side padding: 3rem (desktop), 1.5rem (mobile)
- Column gap: 2rem
- Mobile: 100% width with side margin

**Grid Systems:**
- Problems section: 2×2 (desktop), 1×4 (mobile)
- Courses: 3 columns (desktop), 1 column (mobile)
- Testimonials: 3–5 columns or carousel
- Steps: Horizontal (desktop), Vertical (mobile)

### Visual Effects & Details

**Textures:**
- Subtle background grain (warm linen, 3% opacity)
- No harsh edges: 12px border-radius on cards
- Soft shadows: `0 4px 12px rgba(0,0,0,0.08)`

**Icons:**
- Minimal, custom style (not emoji)
- 40–48px size for section headers
- Copper fill color
- Consistent stroke weight

**Animations:**
- Scroll-reveal staggered entrance (200ms delay between elements)
- Button hover: subtle lift (2–4px translateY) + color shift
- Smooth transitions: 300ms ease-out
- No jank: GPU-accelerated (transform, opacity only)

**Interactive States:**
- CTA hover: Copper BG → Gold border + white text
- Card hover: Lift + shadow intensify
- Mobile touch: No hover (just active state)

---

## 4. Detailed Component Specifications

### Hero Section

**Structure:**
```
┌─────────────────────────────┐
│   Headline (centered)       │
│   "Transform Your Life..."  │
│                             │
│   Subheadline (2 lines)     │
│   Problem statement         │
│                             │
│   [Primary CTA] [2ndary CTA]│
│                             │
│   Stats row (optional)      │
└─────────────────────────────┘
```

**Specifications:**
- Layout: Single centered column, 60% max-width
- Background: Linear gradient (white → warm paper)
- Decorative: 1 subtle geometric shape (copper triangle/circle, 10% opacity, top-right)
- **NO large image** (preserves message clarity for first-time visitors)
- Mobile: Full-width, stacked CTAs

**Content:**
- Headline: 48–56px, Lora bold, 1.1 line-height
- Subheadline: 20–24px, Inter regular, 1.6 line-height
- CTAs: 48px height, 16px font, full-width on mobile

---

### Problems Section

**Structure:**
```
4 Problem Cards (2×2 desktop, 1×4 mobile)
├─ Icon (40px copper)
├─ Problem title (16px bold)
└─ Problem description (14px secondary text)
```

**Spacing:**
- Between cards: 3rem (desktop), 2rem (mobile)
- No background boxes: icon + text only
- Generous negative space

**Content Cards:**
1. Icon: ❓ → "Lack of clarity in decisions"
2. Icon: 😰 → "Stress & emotional instability"
3. Icon: 🔗 → "Struggles in career/relationships"
4. Icon: 🌙 → "Loss of purpose/direction"

---

### Solution Section

**Structure:**
```
Headline | Benefit 1  | Benefit 2  | Benefit 3
"How     | Icon      | Icon       | Icon
Antar    | + Clarity | + Strength | + Purpose
Yog      |           |            |
Helps"   |           |            |
```

**Layout:**
- Left: Headline + intro text (40% width)
- Right: 3 benefit columns with icons
- Gold underline under "Antar Yog Helps"

---

### Transformation Stories (Before/After)

**Card Design:**
```
┌────────────────────────┐
│ BEFORE | AFTER         │
├────────────────────────┤
│ State before | Outcome │
│ (warm tint)  | (sage)  │
├────────────────────────┤
│ Name, City, Impact     │
│ "Read full story" CTA  │
└────────────────────────┘
```

**Grid:** 2×2 (desktop), 1×4 (mobile)

**Animation:** Slide-in from left on scroll (staggered)

**Content Needed:**
- 3–4 real before/after stories
- Each: name, city, 1–2 line impact statement
- Warm/cool color tinting for visual contrast

---

### Courses Preview Section

**Grid:** 3 columns (desktop), 1 column (mobile)

**Card Design:**
```
┌──────────────────┐
│  Course Image    │
│  (2:3 ratio)     │
├──────────────────┤
│ Course Title     │
│ Duration/Level   │
│ (small text)     │
│                  │
│ Description      │
│ (1 line)         │
│                  │
│ [Explore] CTA    │
└──────────────────┘
```

**Hover Effect:**
- Subtle lift (4px)
- Border highlight (copper)
- Slight shadow intensify

**Quantity:** 6–8 featured courses

**Footer CTA:** "Explore All 56 Programs" (links to courses page)

---

### How It Works Section

**Visual:** 3-step timeline

**Desktop:**
```
Step 1        Step 2        Step 3
  |       ─────────       |
Choose → Learn from    → Transform
  |       Acharya Ji      |
```

**Mobile:**
```
Step 1 ↓
Step 2 ↓
Step 3
```

**Spacing:** Generous vertical/horizontal breathing room

---

### Testimonials Section

**Grid:** 3–5 quotes

**Card Design:**
```
┌─────────────────────────┐
│  "Quote text in italic  │
│   with context and      │
│   genuine transformation" │
│                         │
│  — Name, City          │
│  [Small Photo]          │
└─────────────────────────┘
```

**Visual Details:**
- Large copper quotation mark icon (100px, 5% opacity, background)
- Italic serif quote text
- No card background: white text on subtle gradient

---

### Guru/Lineage Section

**Layout:**
- Acharya portrait (left, 300px)
- Bio text (right)
- "Learn more" CTA button
- Optional: credential/lineage statement

---

## 5. Information Architecture Decisions

| Aspect | Current | New | Rationale |
|--------|---------|-----|-----------|
| Hero approach | Philosophical vision | Problem-solution framing | Clarity for new visitors |
| Sections | 3 | 9 | Guide visitor through awareness → desire → action |
| Social proof | Stats (10K, 500+, 50+) | Stories + testimonials + stats | Narrative builds trust better than numbers |
| Course visibility | Not showcased | Featured 6–8 of 56 | Leverage product inventory; show variety |
| Imagery | Large hero portrait | Distributed throughout | Breathing room; better visual hierarchy |
| Navigation | Simple menu | Enhanced mobile menu | Easier exploration across touchpoints |
| CTAs | Generic buttons | Sharp, contextual | Multiple conversion opportunities |

---

## 6. Mobile-First Implementation Strategy

### Critical Mobile Optimization Rules

**Touch & Interaction:**
- All buttons: minimum 48px height (thumb-friendly)
- Tap targets: minimum 44px (WCAG standard)
- No hover states (use active/focus instead)
- Swipe-friendly carousels for courses/testimonials

**Typography:**
- Minimum body font: 16px (prevents automatic zoom on iOS)
- Headlines: responsive scaling (32px mobile → 56px desktop)
- No font smaller than 12px for main content

**Layout:**
- Single column below 768px
- Full-width buttons (no side-by-side on mobile)
- Stack CTAs vertically
- 60–80px section spacing (not 120px)

**Image Optimization:**
- Responsive images (srcset for 1x, 2x, 3x)
- Lazy loading for below-fold sections
- Optimized file sizes (<200KB per image)

### Mobile Layout Order (Above-the-Fold)

1. **Hero** (headline + subline + primary CTA)
2. **Problems** (1-col stack, 4 cards)
3. **Solution** (1-col stack)
4. **Stories** (carousel, swipe-able)
5. **Courses** (carousel, swipe-able)
6. **How It Works** (vertical timeline)
7. **Testimonials** (1-col stack or carousel)
8. **Guru Section** (portrait full-width)
9. **Footer CTA** + Footer

---

## 7. Implementation Roadmap

### Phase 1: Content Strategy (Week 1)

**Gather Required Content:**
- [ ] Write 3–4 before/after story cards (name, city, impact)
- [ ] Select 6–8 featured courses from catalog
- [ ] Collect 3–5 short testimonials (real quotes with attribution)
- [ ] Define 4 problem statements (final wording)
- [ ] Create/source 8–12 custom icons
- [ ] Write: Guru bio, lineage/credentials statement

**Deliverables:**
- Content document with all copy
- Icon asset list
- Testimonial spreadsheet

---

### Phase 2: Component Build (Week 2)

**Create/Update HTML Components:**

- [ ] `components/hero.html` — Redesign with new structure
- [ ] `components/problems.html` — NEW: 4-card problem section
- [ ] `components/solution.html` — NEW: 3-benefit solution
- [ ] `components/stories.html` — NEW: Before/After cards (refactor existing triptych)
- [ ] `components/courses-preview.html` — NEW: 6–8 featured courses
- [ ] `components/how-it-works.html` — NEW: 3-step timeline
- [ ] `components/testimonials.html` — NEW: 3–5 micro-testimonials
- [ ] `components/guru-section.html` — NEW: Acharya bio + lineage
- [ ] `components/footer.html` — Update with final CTA

**Update Main Template:**
- [ ] `frontend/index.html` — Add new component divs in correct order

**Update JavaScript:**
- [ ] `js/main.js` — Add lazy loading, scroll-reveal animations
- [ ] Ensure component loading works for all new sections

---

### Phase 3: Design & Styling (Week 3)

**CSS Updates:**

- [ ] `css/styles.css` — Add typography hierarchy, spacing system
- [ ] `css/hero.css` — New hero design
- [ ] `css/problems.css` — NEW: Problems section styling
- [ ] `css/solution.css` — NEW: Solution section styling
- [ ] `css/stories.css` — NEW: Before/After cards
- [ ] `css/courses-preview.css` — NEW: Course grid + hover
- [ ] `css/how-it-works.css` — NEW: Timeline styling
- [ ] `css/testimonials.css` — NEW: Testimonial cards
- [ ] `css/guru-section.css` — NEW: Guru bio layout
- [ ] `css/animations.css` — NEW: Scroll reveal, hover effects

**Icon Implementation:**
- [ ] Create/download icon SVGs
- [ ] Style icons with CSS variables (copper color)
- [ ] Ensure accessibility (aria-label)

---

### Phase 4: Mobile Optimization (Week 4)

**Responsive Testing:**
- [ ] Test all sections at 375px (iPhone SE)
- [ ] Test all sections at 768px (iPad)
- [ ] Test all sections at 1024px (iPad Pro)
- [ ] Test all sections at 1200px (desktop)
- [ ] Fix layout shifts, button sizing, image scaling
- [ ] Verify carousels swipe on mobile

**Performance:**
- [ ] Optimize images (WebP + fallback)
- [ ] Lazy load below-fold images
- [ ] Measure Lighthouse scores (target: 90+ Performance)
- [ ] Test on 4G throttling

**Accessibility:**
- [ ] WCAG 2.1 AA compliance
- [ ] Color contrast ratios (4.5:1 minimum)
- [ ] Keyboard navigation (Tab, Enter)
- [ ] Screen reader testing (NVDA/JAWS)

---

### Phase 5: Testing & Refinement (Week 5)

**Cross-Browser Testing:**
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

**Device Testing:**
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Samsung Internet

**User Testing (Optional):**
- [ ] A/B test hero CTA copy
- [ ] Track click rates on all CTAs
- [ ] Measure time-to-first-conversion

**Final Polish:**
- [ ] Refine animations (no jank)
- [ ] Fix any spacing inconsistencies
- [ ] Verify all links work
- [ ] Spell check all copy

---

## 8. Implementation Priority Order

### Do These First (Biggest Impact)

1. **Fix Hero Section** (unclear message is the core problem)
   - New headline + subheadline
   - Clear, directional CTAs
   - Remove/minimize large image

2. **Add Problem Section** (builds immediate relatability)
   - 4 problem cards with icons
   - Validates visitor's pain points
   - Sets up solution section

3. **Add Solution Section** (position your value)
   - 3 core benefits (Clarity, Strength, Purpose)
   - Tie back to Vedic wisdom
   - Build desire for transformation

4. **Feature Courses Preview** (monetization signal + engagement)
   - 6–8 course cards
   - Clear "Explore All" CTA
   - Links to full course catalog

5. **Enhance Stories with Testimonials** (social proof)
   - Real before/after narratives
   - Names, cities, impact statements
   - Build credibility

### Then Polish Design

6. Improve spacing & typography hierarchy
7. Add scroll-reveal animations
8. Optimize mobile experience
9. Performance tuning
10. Analytics implementation

---

## 9. Key Design Wins This Plan Delivers

| Problem | Solution | Impact |
|---------|----------|--------|
| Unclear message | Problem-solution framing | 3-second clarity |
| Generic spiritual site | Sharp value props + proof | Differentiation |
| No conversion funnel | 9-section journey | Higher engagement |
| Underutilized content | Course preview + testimonials | Monetization signal |
| Text-heavy, cramped | Generous spacing + icons | Better readability |
| Desktop-only experience | Mobile-first design | 60%+ of traffic |
| Weak CTAs | Multiple contextual CTAs | Higher conversion |
| No social proof | Real stories + testimonials | Trust building |

---

## 10. Success Metrics

### Baseline (Before Redesign)
- Measure current: bounce rate, time-on-page, CTAs clicked

### Target (After Redesign)
- **Bounce rate:** -30% (visitors stay engaged through story)
- **Average session duration:** +60% (9 sections vs 3)
- **Course page clicks:** +100% (feature preview drives exploration)
- **Sign-up clicks:** +50% (multiple CTAs)
- **Mobile time-on-page:** +40% (optimized mobile UX)

---

## 11. Maintenance & Future Updates

**Content Rotation:**
- Testimonials: Update quarterly with fresh stories
- Courses: Update featured section seasonally
- Stories: Add new before/after narratives as users transform

**Analytics Review:**
- Monthly: Review CTA click rates by section
- Quarterly: A/B test headline variations
- Annually: Full user research on new visitor perception

**Design Evolution:**
- Keep v7 "White Copper" color system long-term
- Maintain spacing/typography hierarchy established here
- Any new sections should follow same patterns

---

## Reference Files

- Design System: `CLAUDE.md` (v7 "White Copper" specs)
- Current Structure: `frontend/index.html`
- Hero Component: `frontend/components/hero.html`
- Main JS: `frontend/js/main.js`
- Tailwind Config: `frontend/js/tailwind-config.js`

---

**Document Version:** 1.0  
**Last Updated:** 2026-04-08  
**Status:** Ready for Implementation
