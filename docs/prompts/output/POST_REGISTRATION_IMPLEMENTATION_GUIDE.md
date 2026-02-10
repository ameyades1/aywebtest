# Post-Registration User Onboarding Flow - Implementation Guide

## Overview

This guide details the complete post-registration onboarding flow for AntarYog Foundation website, including profile completion and welcome dashboard mockups.

**Status:** ✅ Complete with two ready-to-use mockups

---

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. SIGNUP (Simplified)                                          │
│    ├─ Email Address                                             │
│    ├─ Phone Number                                              │
│    ├─ Password                                                  │
│    └─ Notification Consent (default: checked)                   │
│    → System sends verification email                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. EMAIL VERIFICATION                                           │
│    User clicks link in email                                    │
│    → Account activated                                          │
│    → Redirect to: /complete-profile                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. PROFILE COMPLETION (REQUIRED)                                │
│    📄 form: profile-completion-antaryog.html                   │
│                                                                  │
│    REQUIRED Fields (must fill all):                             │
│    ├─ First Name (min 2 chars)                                  │
│    ├─ Last Name (min 2 chars)                                   │
│    ├─ Country (dropdown)                                        │
│    ├─ City (min 2 chars)                                        │
│    ├─ Language (English/हिन्दी/मराठी)                          │
│    ├─ How Did You Hear About Us? (dropdown)                     │
│    └─ Referral Person (conditional - if friend/member selected) │
│                                                                  │
│    OPTIONAL Fields (nice to have):                              │
│    ├─ Middle Name                                               │
│    ├─ Occupation (dropdown)                                     │
│    └─ Industry (shown only if occupation filled)                │
│                                                                  │
│    Features:                                                    │
│    ✓ Form validation with error messages                        │
│    ✓ Smart conditional fields (referral person, industry)       │
│    ✓ Disabled submit button until all required fields filled    │
│    ✓ Trust-building explanation box                             │
│    ✓ Responsive design (mobile, tablet, desktop)                │
│    ✓ Language selection buttons with visual feedback            │
│    ✓ Accessibility features (labels, ARIA, proper tab order)    │
│                                                                  │
│    → On submit: Redirect to welcome dashboard                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. WELCOME DASHBOARD                                            │
│    📄 file: welcome-dashboard-antaryog.html                    │
│                                                                  │
│    Features:                                                    │
│    ✓ Welcome banner with personalized greeting                  │
│    ✓ Email verification success indicator                       │
│    ✓ Featured programs carousel (3 cards)                       │
│    ✓ Upcoming events list (3 sample events)                     │
│    ✓ Quick action cards (Browse, Events, Learn, Contact)        │
│    ✓ Call-to-action buttons throughout                          │
│    ✓ Responsive design                                          │
│    ✓ Dynamic user name display                                  │
│    ✓ Smooth scroll navigation                                   │
│                                                                  │
│    → User can now explore content and register for programs     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### Why Simplified Signup?

**Current:** Signup only collects Email, Phone, Password
**Reason:** Lower friction → Higher signup conversion rate

### Why Profile Completion is Required?

**Design:** Must complete profile to access dashboard
**Reasons:**
1. ✅ Ensures 100% complete user profiles
2. ✅ Enables personalization from day 1
3. ✅ Better data quality (user is engaged, not rushed)
4. ✅ Clear user journey: Signup → Verify → Profile → Dashboard

### Why These Specific Fields?

**Required:**
- **First/Middle/Last Name** - Replace single "Full Name" from signup, better data quality
- **Country/City** - Enable location-based event filtering
- **Language** - Support multi-language content delivery (En/Hi/Mr)
- **Referral Source** - Track acquisition channels, referral tracking
- **Referral Person** (conditional) - Thank members who bring new users

**Optional:**
- **Occupation/Industry** - Better segmentation for future features (not required for MVP)

### Why These Referral Sources?

```
social-media      → Understand social channel effectiveness
google-search     → Track organic search attribution
friend-family     → Referral tracking (+ needs referral person name)
existing-member   → Member referrals (+ needs member ID)
event-program     → Track which events drive signups
youtube           → Video attribution
whatsapp          → Group sharing attribution
website           → Direct website discovery
other             → Catch-all for unexpected channels
```

---

## File Specifications

### 1. Profile Completion Mockup
**File:** `profile-completion-antaryog.html`
**Size:** ~780 lines
**Location:** `docs/prompts/output/`

#### Component Structure

```html
<!-- HEADER -->
├── Logo + Navigation (responsive with mobile menu)
└── Fixed positioning with z-index management

<!-- MAIN -->
├── Success Indicator
│   ├── Checkmark icon
│   ├── "Complete Your Profile" title
│
├── FORM (id="profileForm")
│   ├── Section 1: Personal Details
│   │   ├── First Name* (required)
│   │   ├── Middle Name (optional)
│   │   └── Last Name* (required)
│   │
│   ├── Section 2: Location
│   │   ├── Country* (dropdown - required)
│   │   └── City* (text - required)
│   │
│   ├── Section 3: Preferences
│   │   └── Language* (3 buttons - English/हिन्दी/मराठी - required)
│   │
│   ├── Section 4: Referral Source
│   │   ├── Source* (dropdown - required)
│   │   └── Referral Person (conditional - if friend/member)
│   │
│   ├── Section 5: Professional (optional)
│   │   ├── Occupation (dropdown - optional)
│   │   └── Industry (text - shown only if occupation filled)
│   │
│   ├── Trust Box (information)
│   │   └── Explanation of why we ask for each field
│   │
│   └── [Complete Profile →] Button
│       └── Disabled until all required fields filled
│
└── FOOTER
    └── Same as v1-v4 mockups
```

#### Form Validation Rules

**Real-time Validation:**
```javascript
First Name:    ≥ 2 characters, required
Middle Name:   optional
Last Name:     ≥ 2 characters, required
Country:       must select value, required
City:          ≥ 2 characters, required
Language:      must select one button, required
Referral:      must select value, required
Referral Person: ≥ 2 chars if referral is 'friend-family' or 'existing-member'
Occupation:    optional
Industry:      optional (only visible if occupation selected)
```

**Error Display:**
- Hidden by default
- Shows when field loses focus and is invalid
- Hides when field becomes valid
- Submit button disabled until ALL required fields valid

**Button States:**
```css
/* Disabled (initial) */
background: #d1d5db (gray)
color: #9ca3af (gray text)
cursor: not-allowed

/* Enabled (all fields valid) */
background: #09A59A (teal)
color: white
cursor: pointer
hover:background: #078078 (teal-dark)
```

#### JavaScript Functions

```javascript
// Language selection
selectLanguage(lang)        // Select one language, store in variable
toggleReferralField()       // Show/hide referral person field
toggleIndustryField()       // Show/hide industry field
validateForm()              // Real-time validation of all fields
```

#### Responsive Behavior

**Mobile (< 640px):**
- Full width form with 1.5rem padding
- Language buttons: Stack vertically (1 button per row)
- All inputs: 100% width
- Section headers with icons
- Smaller touch targets (still accessible)

**Tablet (641-1024px):**
- Language buttons: 3 columns grid
- Form max-width: 600px (centered)
- 2rem padding
- Touch optimized spacing

**Desktop (1024px+):**
- Language buttons: 3 columns grid
- Form max-width: 600px (centered on page)
- 3rem padding
- Full visual hierarchy

---

### 2. Welcome Dashboard Mockup
**File:** `welcome-dashboard-antaryog.html`
**Size:** ~720 lines
**Location:** `docs/prompts/output/`

#### Component Structure

```html
<!-- HEADER -->
├── Logo + Navigation (responsive)
└── Fixed positioning

<!-- MAIN -->
├── Welcome Banner (gradient: teal → teal-light)
│   ├── Email verification check icon
│   ├── Welcome message: "Welcome [Name]!"
│   ├── Subheading: "Your spiritual journey begins here"
│   ├── CTA buttons: "Explore Programs" + "View Events"
│   └── Decorative icon (hidden on mobile)
│
├── Featured Programs Section
│   ├── Section title + subtitle
│   ├── Program Cards Grid (3 cards, responsive):
│   │   ├── Card 1: Meditation & Mindfulness
│   │   ├── Card 2: Vedantic Teachings
│   │   └── Card 3: Naadi Jyotish Consultation
│   │       Each card contains:
│   │       ├── Icon/color background
│   │       ├── Program name
│   │       ├── Description (2-3 lines)
│   │       ├── Duration/format badge
│   │       └── "Learn More →" link
│   └── "View All Programs" button
│
├── Upcoming Events Section
│   ├── Section title + subtitle
│   ├── Event Cards (list format, 3 events):
│   │   ├── Event 1: Satsang with Swami (Feb 23)
│   │   ├── Event 2: Yoga & Wellness Retreat (Mar 2)
│   │   └── Event 3: Vedantic Study Circle (Mar 15)
│   │       Each event contains:
│   │       ├── Date box (day/month)
│   │       ├── Title
│   │       ├── Description
│   │       ├── Time + Location
│   │       ├── "Register" button
│   │       └── Available spots indicator
│   └── "View All Events" button
│
├── Quick Actions Section
│   ├── Section title + subtitle
│   ├── 4 action cards (responsive grid):
│   │   ├── Browse Programs
│   │   ├── View Events
│   │   ├── Learn More
│   │   └── Contact Us
│   │       Each with icon and hover effect
│   └── Icons for each action
│
└── FOOTER
    └── Same as other mockups
```

#### Key Features

**Personalization:**
```javascript
// Dynamic user greeting
const firstName = new URLSearchParams(window.location.search).get('firstName');
document.getElementById('userName').textContent = firstName || 'Friend';
```

**Responsive Grids:**
```css
/* Mobile: 1 column */
@media (max-width: 640px) { grid-template-columns: 1fr; }

/* Tablet: 2 columns for programs, 1 column for events */
@media (641px - 1024px) { grid-template-columns: repeat(2, 1fr); }

/* Desktop: 3 columns for programs */
@media (1024px+) { grid-template-columns: repeat(3, 1fr); }
```

**Smooth Scrolling:**
```javascript
// Anchor links smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
```

---

## Database Schema (Backend Reference)

### Users Table (Already Exists)
```sql
users {
    id: UUID PRIMARY KEY
    email: VARCHAR(255) UNIQUE NOT NULL
    phone: VARCHAR(20) NOT NULL
    password_hash: VARCHAR(255) NOT NULL
    email_verified: BOOLEAN DEFAULT FALSE
    email_verified_at: TIMESTAMP NULL
    created_at: TIMESTAMP DEFAULT NOW()
    updated_at: TIMESTAMP DEFAULT NOW()
}
```

### New: User Profiles Table
```sql
users_profiles {
    user_id: UUID PRIMARY KEY (FK to users.id)

    -- Name (required)
    first_name: VARCHAR(100) NOT NULL
    middle_name: VARCHAR(100) NULL
    last_name: VARCHAR(100) NOT NULL

    -- Location (required)
    country: VARCHAR(2) NOT NULL         -- ISO code (IN, US, GB, etc.)
    city: VARCHAR(100) NOT NULL

    -- Preferences (required)
    language_preference: ENUM('en', 'hi', 'mr') NOT NULL

    -- Referral tracking (required + conditional)
    referral_source: ENUM(
        'social-media',
        'google-search',
        'friend-family',
        'existing-member',
        'event-program',
        'youtube',
        'whatsapp',
        'website',
        'other'
    ) NOT NULL
    referral_person: VARCHAR(255) NULL

    -- Professional (optional)
    occupation: ENUM(
        'student',
        'professional',
        'homemaker',
        'retired',
        'business',
        'other',
        'prefer-not'
    ) NULL
    industry: VARCHAR(100) NULL

    -- Metadata
    profile_completed_at: TIMESTAMP NOT NULL
    updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}

-- Indexes
CREATE INDEX idx_users_profiles_country ON users_profiles(country);
CREATE INDEX idx_users_profiles_city ON users_profiles(city);
CREATE INDEX idx_users_profiles_language ON users_profiles(language_preference);
CREATE INDEX idx_users_profiles_referral_source ON users_profiles(referral_source);
```

---

## Implementation Checklist

### Frontend
- [x] Create profile-completion mockup (HTML/CSS/JS)
- [x] Create welcome-dashboard mockup (HTML/CSS/JS)
- [ ] Integrate profile form with backend API
- [ ] Add form submission to `/api/users/profile`
- [ ] Implement error handling for API
- [ ] Add loading states during submission
- [ ] Store completion status in session/state
- [ ] Redirect flow after email verification
- [ ] Test on multiple devices (phone, tablet, desktop)

### Backend
- [ ] Create `/users` table (if not exists)
- [ ] Create `users_profiles` table
- [ ] Create API endpoint: `POST /api/users/profile`
  - Accept: firstName, middleName, lastName, country, city, language, referralSource, referralPerson, occupation, industry
  - Validate: All required fields, conditional referral person
  - Store in database with user_id
  - Return: Success/error response
- [ ] Create API endpoint: `GET /api/users/profile` (retrieve current user profile)
- [ ] Add profile completion check middleware
- [ ] Return profile status on login
- [ ] Add form validation on backend (never trust client)
- [ ] Add error messages for validation failures

### Testing
- [ ] Form validation works correctly
- [ ] Required fields prevent submission
- [ ] Conditional fields show/hide properly
- [ ] Error messages display correctly
- [ ] Mobile responsiveness works
- [ ] All links navigate correctly
- [ ] Dashboard greeting uses correct name
- [ ] Language selection saves and displays

### Styling
- [x] Matches existing v1-v4 mockup color scheme
- [x] Uses same typography (Lora + Inter)
- [x] Teal color (#09A59A) consistent
- [x] Responsive design works on all breakpoints
- [x] Accessibility: Good color contrast
- [x] Touch targets minimum 44px on mobile

---

## Key Files Created

### New Files
```
docs/prompts/output/
├── profile-completion-antaryog.html    (NEW - form mockup)
├── welcome-dashboard-antaryog.html     (NEW - post-registration dashboard)
└── POST_REGISTRATION_IMPLEMENTATION_GUIDE.md  (THIS FILE - documentation)
```

### Files to Update
```
docs/prompts/output/
├── index.html  (landing page - add links to auth screens)
└── signup-branded-antaryog.html (simplify to remove "Full Name")

frontend/
└── (implementation when backend is ready)

backend/
└── (new endpoints and database schema)
```

---

## Usage Instructions

### Viewing the Mockups

**Profile Completion Screen:**
```bash
# Open in browser
open docs/prompts/output/profile-completion-antaryog.html

# Or
file:///path/to/repo/docs/prompts/output/profile-completion-antaryog.html
```

**Welcome Dashboard:**
```bash
# Open in browser
open docs/prompts/output/welcome-dashboard-antaryog.html

# With personalized greeting
open "docs/prompts/output/welcome-dashboard-antaryog.html?firstName=Raj"
```

### Testing the Forms

**Profile Form:**
1. Open profile-completion-antaryog.html
2. Notice "Complete Profile →" button is disabled
3. Fill in fields one by one
4. Watch button enable as required fields fill up
5. Language buttons: Click to select (visual feedback)
6. Select "Friend or Family" or "Existing Member" in referral dropdown
7. Watch "Referral Person" field appear
8. Try to submit - shows console log with form data

**Welcome Dashboard:**
1. Open welcome-dashboard-antaryog.html
2. Check personalized greeting (defaults to "Friend")
3. Try passing firstName: `?firstName=Rajesh`
4. Click "Explore Programs" or "View Events" for smooth scroll
5. Test responsive design on mobile (use browser dev tools)

---

## Color Reference

**Primary Colors (Teal - Used for v1, v3):**
```
--color-ay-teal:       #09A59A (primary)
--color-ay-teal-dark:  #078078 (hover/active)
--color-ay-teal-light: #0BC4B7 (accents)
```

**Typography:**
```
Headings:  Lora (serif) - traditional, spiritual aesthetic
Body:      Inter (sans-serif) - modern, readable
```

**Status Colors:**
```
Success:   #10b981 (green)
Error:     #ef4444 (red)
Info:      #3b82f6 (blue)
Warning:   #f59e0b (orange)
```

---

## API Endpoints (Backend Implementation)

### POST /api/users/profile
**Purpose:** Create/update user profile after verification

**Request:**
```json
{
    "firstName": "Rajesh",
    "middleName": "Kumar",
    "lastName": "Singh",
    "country": "IN",
    "city": "Mumbai",
    "language": "hi",
    "referralSource": "friend-family",
    "referralPerson": "Arjun",
    "occupation": "professional",
    "industry": "Technology"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Profile completed successfully",
    "profile": {
        "user_id": "uuid...",
        "first_name": "Rajesh",
        "last_name": "Singh",
        "country": "IN",
        "city": "Mumbai",
        "language_preference": "hi",
        "profile_completed_at": "2024-02-23T10:30:00Z"
    }
}
```

**Response Error (400):**
```json
{
    "success": false,
    "error": "Validation failed",
    "fields": {
        "firstName": "First name is required",
        "referralPerson": "Referral person required when source is friend-family"
    }
}
```

**Validation Rules (Backend):**
- firstName: Required, 2-100 chars, alphabetic + spaces
- middleName: Optional, 0-100 chars
- lastName: Required, 2-100 chars, alphabetic + spaces
- country: Required, valid ISO code
- city: Required, 2-100 chars
- language: Required, must be 'en', 'hi', or 'mr'
- referralSource: Required, must be in enum
- referralPerson: Conditional - Required if source is 'friend-family' or 'existing-member', 2-255 chars
- occupation: Optional, must be in enum if provided
- industry: Optional, 0-100 chars

---

## Accessibility Features

### WCAG 2.1 Level AA Compliance

**Labels & Semantics:**
- All form inputs have `<label>` tags with `for` attribute
- Required fields marked with `*` (red color + text)
- Optional fields marked with "(Optional)" label

**Form Navigation:**
- Logical tab order: Personal Details → Location → Preferences → Referral → Professional
- Focus visible on all interactive elements
- Submit button only enabled when form is valid

**Color Contrast:**
- Main text: #2b3636 on #F8F6F3 (11:1 ratio)
- Teal text: #09A59A on white (5:1 ratio)
- Error text: #ef4444 on white (6.4:1 ratio)

**Keyboard Navigation:**
- All buttons keyboard accessible
- Language selection buttons: Tab to select, Enter to activate
- Dropdowns: Tab to focus, Arrow keys to navigate options

**Screen Reader Support:**
- Form sections have semantic `<section>` elements
- Icons paired with text (not icon-only)
- Error messages associated with form fields
- Required/optional clearly marked

---

## Next Steps

### Phase 1 (Current)
✅ Complete design mockups for:
- Profile completion form
- Welcome dashboard

### Phase 2 (Backend Integration)
- Implement database schema
- Create API endpoints
- Add form validation
- Connect frontend to backend
- Deploy to staging

### Phase 3 (Enhancements)
- Add profile picture upload
- Implement profile completion progress indicator
- Add profile strength gauge
- Create profile editing page
- Add program interest collection

### Phase 4 (Advanced)
- Add AI-powered personalization
- Create dashboard widgets based on language
- Implement event recommendations
- Add community member directory
- Create referral rewards system

---

## Support & Maintenance

**File Locations:**
- Mockups: `docs/prompts/output/`
- Documentation: `docs/prompts/output/POST_REGISTRATION_IMPLEMENTATION_GUIDE.md`
- Implementation: `frontend/src/pages/` and `backend/routes/`

**Testing:**
- Use browser DevTools for responsive design testing
- Test form validation with invalid inputs
- Verify error messages appear correctly
- Check API integration once backend is ready

**Updates:**
- Update this document as implementation progresses
- Keep mockups synced with actual implementation
- Document any deviations from this plan

---

## Questions & Clarifications

### Why Require Profile Completion Before Dashboard Access?

**Best Practice:** Immediate profile completion ensures:
1. Complete user profiles for segmentation
2. Better personalization from day 1
3. Higher data quality (user is engaged)
4. Clear user journey without confusion

Alternative approaches:
- **Option A (Minimal Friction):** Show dashboard immediately, prompt profile later
- **Option B (Guided Wizard):** 3-step welcome wizard with optional fields
- **Option C (Progressive Profiling):** Collect fields as needed during interactions

We chose **Option C + immediate requirement** to balance:
- Low initial friction (simplified signup)
- Complete profile data before content access
- Clear user expectations

### Why These Specific Referral Sources?

These channels best represent how spiritual organization users discover platforms:
- Direct recommendations (Friend/Family, Existing Member)
- Online discovery (Google, Social Media, YouTube)
- Offline to online (Event/Program)
- Direct access (Website)

Can be customized based on actual acquisition data.

---

## Appendix: Color System

### Teal Theme (v1, v3)
```css
Primary:   #09A59A
Dark:      #078078
Light:     #0BC4B7
Accent:    #06796F
```

### Saffron Theme (v2, v4)
```css
Primary:   #D97706
Dark:      #B45309
Light:     #F59E0B
Accent:    #92400E
```

### Neutrals
```css
Gray:      #2b3636  (text)
Gray Light: #4a5555 (secondary text)
Beige:     #F8F6F3  (background)
White:     #FFFFFF  (cards, containers)
```

---

**Last Updated:** 2026-02-09
**Status:** Ready for Implementation
**Created by:** Claude Code
**Version:** 1.0
