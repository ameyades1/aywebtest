# Solution Pages — "Find Solutions For" Section

## Overview

Six dedicated pages, one per transformation card in `frontend/components/transformations.html`. Each card will link to its own page (`frontend/pages/<slug>.html`).

**Shared page structure:**
1. **Unique Hero** — emotionally resonant to the visitor's specific problem
2. **DSS How It Works** — shared component (`how-it-works.html` section, reused verbatim)
3. **Unique Content Block** — featured YouTube video + relevant product from catalog

---

## Page Map

### 1. Relationships
- **File:** `frontend/pages/relationships.html`
- **Hero tone:** Warm amber, fractured-then-whole motif
- **Card link:** `pages/relationships.html`
- **YouTube video:** "Unlocking the Key to Happy Relationships | Acharya Upendra Ji"
  - URL: https://www.youtube.com/watch?v=biGK39IUAmY
  - Video ID: `biGK39IUAmY`
- **Catalog product:** ID 13 — "REMOVING NEGATIVITIES IN RELATIONSHIPS" (Rs. 2,500)

---

### 2. Inner Peace
- **File:** `frontend/pages/inner-peace.html`
- **Hero tone:** Deep indigo → dawn gradient, stillness
- **Card link:** `pages/inner-peace.html`
- **YouTube video:** "Masterkey to Your Every Problem | Acharya Upendra Ji"
  - URL: https://www.youtube.com/watch?v=LnZ6CPxy6ak
  - Video ID: `LnZ6CPxy6ak`
- **Catalog product:** ID 10 — "SECRET TO ULTIMATE HAPPINESS" (Rs. 3,950)

---

### 3. Success & Prosperity
- **File:** `frontend/pages/success-prosperity.html`
- **Hero tone:** Gold/copper, ascending geometry
- **Card link:** `pages/success-prosperity.html`
- **YouTube video:** "100% Growth In Turnover In Just 6 Months | Miraculous Stories"
  - URL: https://www.youtube.com/watch?v=sF9UG4sTqUo
  - Video ID: `sF9UG4sTqUo`
- **Catalog product:** ID 5 — "Unlocking the Real Route to Lasting Success" (Rs. 3,500)

---

### 4. Life Purpose
- **File:** `frontend/pages/life-purpose.html`
- **Hero tone:** Cosmic, star-field, introspective
- **Card link:** `pages/life-purpose.html`
- **YouTube video:** "What Decides Your Destiny — Your Karma or Something Else?"
  - URL: https://www.youtube.com/watch?v=tIhv44VSkqg
  - Video ID: `tIhv44VSkqg`
- **Catalog product:** ID 7 — "FINDING PURPOSE OF YOUR LIFE: SUCCESS BLUEPRINT" (Rs. 3,500)

---

### 5. Parenting
- **File:** `frontend/pages/parenting.html`
- **Hero tone:** Earthy warm greens, nurturing, soft light
- **Card link:** `pages/parenting.html`
- **YouTube video:** "SPIRITUALITY FOR KIDS — GET SUCCESS AS A REFLEX FOR YOUR CHILD"
  - URL: https://www.youtube.com/watch?v=Jr0CoUVfsOw
  - Video ID: `Jr0CoUVfsOw`
- **Catalog product:** ID 33 — "SARASWATI / VIDYA KARYA SIDDHI MOOL MANTRA SADHANA" (Rs. 8,500)

---

### 6. Health & Wellness
- **File:** `frontend/pages/health-wellness.html`
- **Hero tone:** Clean ivory, healing botanicals, quiet authority
- **Card link:** `pages/health-wellness.html`
- **YouTube video:** "Antar Yog Science of Healing Workshop Changed Everything for Me"
  - URL: https://www.youtube.com/watch?v=JBYxiTuflzk
  - Video ID: `JBYxiTuflzk`
- **Catalog product:** ID 29 — "MAHAMRUTYUNJAY MOOL MANTRA SADHANA" (Rs. 8,500)
- **Additional CTA:** Science of Healing program → https://events.antaryogfoundation.in/soh-webinar

---

## Implementation Checklist

- [ ] Create `frontend/css/solution-page.css` — shared styles for hero, video block, product card
- [ ] Build `frontend/pages/relationships.html`
- [ ] Build `frontend/pages/inner-peace.html`
- [ ] Build `frontend/pages/success-prosperity.html`
- [ ] Build `frontend/pages/life-purpose.html`
- [ ] Build `frontend/pages/parenting.html`
- [ ] Build `frontend/pages/health-wellness.html`
- [ ] Update `frontend/components/transformations.html` — link each card to its page
- [ ] Test all six pages: hero renders, DSS section loads, video embeds, catalog product links

---

## Design System Reference

| Token | Value |
|---|---|
| Primary (copper) | `#B87333` |
| Secondary (gold) | `#E8B84B` |
| Text (brown) | `#5C3010` |
| Text secondary | `#7A6858` |
| Background | `#F9F6F0` |
| Section alt | `#FDFBF8` |
| Heading font | Lora (serif) |
| Body font | Inter (sans) |
| Navbar height | 64px |

## References

- Product catalog: `docs/product_catalog/product-catalog.json`
- YouTube videos: `docs/Youtube_knowledge/antaryog_videos.json`
- How it works component: `frontend/components/how-it-works.html`
- Discourses page (design reference): `frontend/pages/discourses.html`
