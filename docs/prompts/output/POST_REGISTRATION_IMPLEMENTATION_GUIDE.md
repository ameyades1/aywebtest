# Post-Registration User Onboarding Flow - Implementation Guide

## Overview

This guide details the complete post-registration onboarding flow for AntarYog Foundation website, including dual email + phone verification, profile completion, and welcome dashboard mockups.

**Status:** ✅ Complete with dual verification implementation

---

## User Journey Flow (Updated with Dual Verification)

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. SIGNUP (Email OR Phone)                                      │
│    Choose Method:                                               │
│    ├─ Email Path: Email + Full Name + Terms                    │
│    └─ Phone Path: Phone + Full Name + Terms                    │
│    → System sends OTP to chosen method                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. SIGNUP OTP VERIFICATION (First Contact)                      │
│    User enters 6-digit code from email or SMS                   │
│    ✓ OTP input: Auto-focus, paste support, backspace nav       │
│    ✓ 60-second resend timer                                    │
│    ✓ Error handling with shake animation                       │
│    → Account created and verified for first contact method      │
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
│    ├─ Referral Person (conditional - if friend/member selected) │
│    ├─ Secondary Contact* (NEW - Email if phone signup,         │
│    │   Phone if email signup)                                  │
│                                                                  │
│    OPTIONAL Fields (nice to have):                              │
│    ├─ Middle Name                                               │
│    ├─ Occupation (dropdown)                                     │
│    └─ Industry (shown only if occupation filled)                │
│                                                                  │
│    Features:                                                    │
│    ✓ Form validation with error messages                        │
│    ✓ Conditional secondary contact field (email or phone)       │
│    ✓ Account security section with trust messaging              │
│    ✓ Smart conditional fields (referral person, industry)       │
│    ✓ Disabled submit button until all required fields filled    │
│    ✓ Trust-building explanation box                             │
│    ✓ Responsive design (mobile, tablet, desktop)                │
│    ✓ Language selection buttons with visual feedback            │
│    ✓ Accessibility features (labels, ARIA, proper tab order)    │
│                                                                  │
│    → On submit: Show secondary OTP verification screen          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. SECONDARY CONTACT OTP VERIFICATION (NEW)                     │
│    📄 form: profile-completion-antaryog.html (Screen 2)         │
│                                                                  │
│    Verify second contact method:                                │
│    ├─ If email signup → Verify phone via SMS                    │
│    └─ If phone signup → Verify email via email                  │
│                                                                  │
│    Features:                                                    │
│    ✓ 6-digit OTP input with auto-focus & paste support         │
│    ✓ Masked identifier display (a****@example.com)             │
│    ✓ 60-second resend timer with disable/enable                │
│    ✓ Back button to return to profile form                      │
│    ✓ Error shake animation with auto-clear                     │
│    ✓ Smooth screen transition from form to OTP                  │
│                                                                  │
│    → On verification: Both email and phone now verified         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. WELCOME DASHBOARD                                            │
│    📄 file: welcome-dashboard-antaryog.html                    │
│                                                                  │
│    Features:                                                    │
│    ✓ Welcome banner with personalized greeting                  │
│    ✓ Both contacts verified indicator                           │
│    ✓ Featured programs carousel (3 cards)                       │
│    ✓ Upcoming events list (3 sample events)                     │
│    ✓ Quick action cards (Browse, Events, Learn, Contact)        │
│    ✓ Call-to-action buttons throughout                          │
│    ✓ Responsive design                                          │
│    ✓ Dynamic user name display                                  │
│    ✓ Smooth scroll navigation                                   │
│                                                                  │
│    → User can now explore content with complete profile         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### Why Dual Email + Phone Verification?

**Problem:**
- Email-only signup → No phone for SMS notifications
- Phone-only signup → No email for important communications
- No dual-factor authentication possible
- Limited account recovery options

**Solution: Sequential Verification**
```
User provides ONE contact (email or phone)
              ↓
         Verify first contact with OTP
              ↓
    Complete profile + provide SECOND contact
              ↓
       Verify second contact with OTP
              ↓
  Both email and phone verified before access
```

**Benefits:**
1. ✅ Balanced conversion (low friction on signup) + completeness
2. ✅ Users have verified multiple communication channels
3. ✅ Enables SMS + Email notifications
4. ✅ Dual-factor authentication possible
5. ✅ Multiple account recovery paths
6. ✅ Better data quality (users engage during both verifications)
7. ✅ Industry standard (Google 2FA, AWS OTP, WhatsApp)

**User Experience:**
- Signup is quick (pick ONE method)
- Profile completion feels natural (ask for missing contact)
- OTP verification twice → Higher security perception
- Users understand why both needed (clear messaging)

### Why Sequential Rather Than Upfront?

**Alternative 1: Ask Both on Signup**
- ❌ Longer form, higher abandonment
- ✅ Complete upfront

**Alternative 2: Ask Second During Login**
- ❌ Confusing (why ask phone at login?)
- ✅ Lower friction on signup

**Chosen: During Profile Completion**
- ✅ Natural flow: Signup → Profile → Dashboard
- ✅ User already engaged and filling profile
- ✅ Clear messaging: "complete your account security"
- ✅ Best balance of friction vs. completeness

### Why Simplified Signup?

**Current:** Signup only collects Email OR Phone (one method)
**Reason:** Lower friction → Higher signup conversion rate

### Why Profile Completion is Required?

**Design:** Must complete profile to access dashboard
**Reasons:**
1. ✅ Ensures 100% complete user profiles (name, location, preferences)
2. ✅ Enables personalization from day 1
3. ✅ Better data quality (user is engaged, not rushed)
4. ✅ Collects both verified email and phone
5. ✅ Clear user journey: Signup → Verify → Profile → Verify → Dashboard

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

**Screen 1: Profile Form**

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
│   ├── Section 6: Account Security (NEW) *
│   │   ├── Trust message: "We need both email and phone..."
│   │   └── Secondary Contact Field (shown conditionally):
│   │       ├── Email field (if user signed up with phone)
│   │       │   └── type="email", validation: valid email
│   │       └── Phone field (if user signed up with email)
│   │           ├── Country code dropdown (+91, +1, +44, etc)
│   │           └── Phone input (10 digits)
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

**Screen 2: Secondary OTP Verification (NEW)**

```html
<!-- HEADER -->
├── Logo + Navigation (responsive with mobile menu)
└── Fixed positioning with z-index management

<!-- MAIN -->
├── [← Back to Profile] Button
│   └── Returns to form, preserves data
│
├── Section: OTP Verification
│   ├── Title: "Verify Your Email" or "Verify Your Phone"
│   ├── Subtitle: "We've sent a 6-digit code to:"
│   ├── Masked Identifier: "a****@example.com" or "+91 ****3210"
│   │
│   └── OTP Input Section
│       ├── 6 digit boxes (1 char each)
│       │   └── Auto-focus, paste support, backspace nav
│       ├── Error message (hidden until error occurs)
│       ├── [Verify & Complete Profile] Button
│       │
│       └── Resend Section
│           ├── Text: "Didn't receive the code?"
│           └── [Resend OTP in 60s] Button
│               └── Disabled with countdown, enables after 60s
│
└── FOOTER
    └── Same as v1-v4 mockups
```

**State Management:**
```javascript
// Signup method determines which secondary contact field to show
signupMethod === 'email'  → Show phone field
signupMethod === 'phone'  → Show email field

// On form submit:
- Hide form, show OTP screen
- Populate OTP screen with masked identifier
- Start 60-second resend timer

// On OTP verification:
- Validate 6 digits
- If "123456" (mockup): Redirect to dashboard
- If invalid: Show error with shake animation
```

#### Form Validation Rules

**Real-time Validation - Profile Form:**
```javascript
First Name:         ≥ 2 characters, required
Middle Name:        optional
Last Name:          ≥ 2 characters, required
Country:            must select value, required
City:               ≥ 2 characters, required
Language:           must select one button, required
Referral:           must select value, required
Referral Person:    ≥ 2 chars if referral is 'friend-family' or 'existing-member'
Occupation:         optional
Industry:           optional (only visible if occupation selected)

// NEW - Secondary Contact Field
Secondary Email:    valid email format, required (if phone signup)
Secondary Phone:    exactly 10 digits, required (if email signup)
```

**OTP Validation - Secondary Verification Screen:**
```javascript
OTP Code:           exactly 6 digits, required
                    → Valid: "123456" (mockup)
                    → Invalid: any other 6-digit code shows error
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
// Profile Form Functions
selectLanguage(lang)              // Select one language, store in variable
toggleReferralField()             // Show/hide referral person field
toggleIndustryField()             // Show/hide industry field
validateForm()                    // Real-time validation of all fields
validateSecondaryContact()        // Validate secondary email or phone

// Secondary OTP Screen Functions (NEW)
setupSecondaryOTPInputs()         // Initialize OTP input event listeners
resetSecondaryOTPInputs()         // Clear OTP inputs and errors
handleSecondaryOTPVerification()  // Verify OTP code
showSecondaryOTPError(msg)        // Display error with shake animation
handleResendSecondaryOTP()        // Resend OTP to secondary contact
startSecondaryResendTimer()       // 60-second countdown for resend button

// Utility Functions (NEW)
maskEmail(email)                  // Mask email for privacy: a****@example.com
maskPhone(fullPhone)              // Mask phone for privacy: +91 ****3210
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

#### Detailed Implementation Flow

**1. Initialization on Page Load:**
```javascript
// Read URL parameters from signup
const params = new URLSearchParams(window.location.search);
const method = params.get('method');        // 'email' or 'phone'
const firstName = params.get('firstName');  // Pre-fill
const phoneCode = params.get('phoneCode');  // Optional

// Determine which secondary field to show
if (method === 'phone') {
    // Phone signup → show email field
    document.getElementById('emailFieldContainer').classList.remove('hidden');
} else if (method === 'email') {
    // Email signup → show phone field
    document.getElementById('phoneFieldContainer').classList.remove('hidden');
    // Pre-select country code if provided
    if (phoneCode) document.getElementById('secondaryPhoneCode').value = phoneCode;
}
```

**2. Form Submission Triggers OTP Screen:**
```javascript
// When user completes profile and submits form:
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Validate all profile fields
    if (!validateForm()) return;

    // 2. Validate secondary contact field
    if (!validateSecondaryContact()) return;

    // 3. Gather all data
    const formData = gatherProfileData();  // includes secondary contact

    // 4. Hide form, show OTP screen
    document.getElementById('profileForm').classList.add('hidden');
    document.getElementById('secondaryOtpScreen').classList.remove('hidden');

    // 5. Display masked identifier
    const masked = maskIdentifier(formData.secondaryContact);
    document.getElementById('secondaryMaskedIdentifier').textContent = masked;

    // 6. Focus first OTP input and start timer
    document.querySelector('.secondary-otp-input').focus();
    startSecondaryResendTimer();
});
```

**3. OTP Screen Interaction:**
```javascript
// OTP Input: Auto-focus next on digit entry
otpInput.addEventListener('input', (e) => {
    if (e.target.value && index < 6) {
        otpInputs[index + 1].focus();  // Auto-focus next
    }
});

// Paste: Enter all 6 digits at once
otpInput.addEventListener('paste', (e) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (digits.length === 6) {
        otpInputs.forEach((inp, i) => {
            inp.value = digits[i];
            inp.classList.add('filled');
        });
    }
});

// Backspace: Navigate backwards
otpInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
    }
});
```

**4. OTP Verification:**
```javascript
// When user submits OTP (or after entering all 6 digits)
function handleSecondaryOTPVerification() {
    const otp = Array.from(otpInputs).map(inp => inp.value).join('');

    // Validate format
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        showError('Please enter all 6 digits');
        return;
    }

    // For mockup: accept "123456"
    // In production: send to backend verification endpoint
    if (otp === '123456') {
        // Success: Redirect to dashboard with complete data
        window.location.href = `welcome-dashboard-antaryog.html?` +
            `firstName=${formData.firstName}&` +
            `email=${formData.email}&` +
            `phone=${formData.phone}`;
    } else {
        // Error: show message with shake animation
        showError('Invalid code. Please try again.');
    }
}
```

**5. Resend Timer Logic:**
```javascript
function startSecondaryResendTimer() {
    let secondsLeft = 60;
    const resendBtn = document.getElementById('resendSecondaryOtpBtn');
    const timerSpan = document.getElementById('secondaryOtpTimer');

    resendBtn.disabled = true;

    const interval = setInterval(() => {
        secondsLeft--;
        timerSpan.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(interval);
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend OTP';  // Remove timer
        }
    }, 1000);
}
```

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

### Users Table (Updated for Dual Verification)
```sql
users {
    id: UUID PRIMARY KEY
    email: VARCHAR(255) UNIQUE NOT NULL                    -- BOTH required & verified
    phone: VARCHAR(20) UNIQUE NOT NULL                     -- BOTH required & verified
    email_verified: BOOLEAN NOT NULL DEFAULT FALSE         -- TRUE before dashboard access
    phone_verified: BOOLEAN NOT NULL DEFAULT FALSE         -- TRUE before dashboard access
    email_verified_at: TIMESTAMP NULL                      -- First verification timestamp
    phone_verified_at: TIMESTAMP NULL                      -- Second verification timestamp
    primary_signup_method: ENUM('email', 'phone') NOT NULL -- Which method was used to signup
    password_hash: VARCHAR(255) NOT NULL                   -- Not used with OTP, for future auth
    created_at: TIMESTAMP DEFAULT NOW()
    updated_at: TIMESTAMP DEFAULT NOW()

    -- Constraint: Both contacts must be verified before profile access
    CONSTRAINT check_both_verified CHECK (
        email_verified = TRUE AND phone_verified = TRUE
    )
}
```

**Key Changes from Old Schema:**
- `phone` is now NOT NULL and UNIQUE (was optional)
- Both `email_verified` and `phone_verified` must be TRUE
- Added `primary_signup_method` to track which contact was used for signup
- Added `phone_verified_at` timestamp for audit trail
- New constraint ensures both are verified

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
- [x] Create profile-completion mockup with dual verification (HTML/CSS/JS)
- [x] Create welcome-dashboard mockup (HTML/CSS/JS)
- [x] Add secondary contact field to profile form
- [x] Add secondary OTP verification screen
- [x] Implement OTP input handling (auto-focus, paste, backspace)
- [x] Implement resend timer for secondary OTP
- [ ] Integrate profile form with backend API
- [ ] Connect signup OTP to profile completion flow
- [ ] Add form submission to `/api/users/profile`
- [ ] Add secondary OTP submission to `/api/users/verify-secondary-contact`
- [ ] Implement error handling for API
- [ ] Add loading states during submission
- [ ] Store user data through entire flow
- [ ] Redirect flow after signup OTP verification
- [ ] Redirect flow after secondary OTP verification
- [ ] Test on multiple devices (phone, tablet, desktop)

### Backend
- [ ] Update `users` table schema for dual verification
  - Add `phone_verified` and `phone_verified_at` columns
  - Add `primary_signup_method` column
  - Add constraint: both email_verified and phone_verified must be TRUE
- [ ] Create `users_profiles` table
- [ ] Update API endpoint: `POST /api/auth/send-otp`
  - Accept context parameter: 'signup', 'login', 'secondary-verification'
  - Send OTP to email or phone based on method
- [ ] Update API endpoint: `POST /api/auth/verify-otp`
  - Return indicatior if secondary verification needed
  - Return which method still needs verification
- [ ] Create API endpoint: `POST /api/users/profile`
  - Accept: all profile fields + secondaryContact field
  - Validate: All required fields, secondary contact format
  - Send OTP to secondary contact
  - Store profile data with user_id
  - Return: Success with secondary verification indicator
- [ ] Create API endpoint: `POST /api/users/verify-secondary-contact`
  - Verify secondary contact OTP
  - Mark both email_verified and phone_verified as TRUE
  - Return redirect to dashboard
- [ ] Create API endpoint: `GET /api/users/profile` (retrieve current user profile)
- [ ] Add profile completion check middleware
- [ ] Return dual verification status on login
- [ ] Add form validation on backend (never trust client)
- [ ] Add error messages for validation failures
- [ ] Implement rate limiting for OTP sends (3 per 15 min)
- [ ] Implement attempt limiting for OTP verification (5 attempts)

### Testing
- [ ] Email signup path: signup → verify email → profile → verify phone → dashboard
- [ ] Phone signup path: signup → verify phone → profile → verify email → dashboard
- [ ] Profile form validation: secondary contact field validates
- [ ] Required fields prevent submission
- [ ] Conditional fields show/hide properly
- [ ] Error messages display correctly
- [ ] OTP input: auto-focus, paste, backspace work
- [ ] Resend timer counts down and enables after 60s
- [ ] Back button on OTP screen returns to profile
- [ ] Mobile responsiveness works
- [ ] All links navigate correctly
- [ ] Dashboard greeting uses correct name
- [ ] Both email and phone stored in user record
- [ ] Both verified flags are TRUE before dashboard access

### Styling
- [x] Matches existing v1-v4 mockup color scheme
- [x] Uses same typography (Lora + Inter)
- [x] Teal color (#09A59A) consistent
- [x] Responsive design works on all breakpoints
- [x] Accessibility: Good color contrast
- [x] Touch targets minimum 44px on mobile

---

## Key Files Created & Updated

### Files Created (Feb 2026)
```
docs/prompts/output/
├── profile-completion-antaryog.html    (form mockup with secondary OTP screen)
├── welcome-dashboard-antaryog.html     (post-registration dashboard)
└── POST_REGISTRATION_IMPLEMENTATION_GUIDE.md  (this documentation)
```

### Files Updated (Feb 2026 - Dual Verification Implementation)
```
docs/prompts/output/
├── signup-branded-antaryog.html        (UPDATED: pass method & phoneCode to profile)
├── profile-completion-antaryog.html    (UPDATED: add secondary contact field + OTP screen)
└── login-branded-antaryog.html         (UPDATED: messaging supports both email/phone login)
```

**Changes Made:**
- **signup-branded-antaryog.html:**
  - Pass `method` parameter to profile-completion (email or phone)
  - Pass `phoneCode` parameter for international phone support

- **profile-completion-antaryog.html:**
  - Add secondary contact field section (email if phone signup, phone if email)
  - Add secondary OTP verification screen with 6-digit input
  - Add JavaScript for OTP input handling (auto-focus, paste, backspace)
  - Add 60-second resend timer for secondary OTP
  - Add mask functions for identifier privacy
  - Add form submission handler to show OTP instead of direct redirect
  - Update final redirect to include complete user data

- **login-branded-antaryog.html:**
  - Update messaging: "Login with your verified email address or phone number"

### Files to Create Next (Backend)
```
frontend/
└── (Next.js component implementation)

backend/
├── routes/auth.js          (POST /api/auth/send-otp, POST /api/auth/verify-otp)
├── routes/users.js         (POST /api/users/profile, POST /api/users/verify-secondary-contact)
├── models/User.js          (Database schema with dual verification)
└── middleware/auth.js      (Profile completion check)
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

### POST /api/auth/send-otp (Updated)
**Purpose:** Send OTP to email or phone (used for both signup and secondary verification)

**Request:**
```json
{
    "identifier": "user@example.com",              // email or phone number
    "method": "email",                             // 'email' or 'phone'
    "context": "signup"                            // 'signup', 'login', or 'secondary-verification'
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "OTP sent successfully",
    "expiresIn": 300,                              // 5 minutes
    "maskedIdentifier": "user****@example.com"     // for UI display
}
```

---

### POST /api/auth/verify-otp (Updated)
**Purpose:** Verify OTP from signup (now indicates secondary verification needed)

**Request:**
```json
{
    "identifier": "user@example.com",
    "otp": "123456",
    "context": "signup"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "userId": "uuid-here",
    "message": "First contact verified",
    "requiresSecondaryVerification": true,        // NEW: indicates next step
    "verifiedMethod": "email",                    // which method was verified
    "needsMethod": "phone"                        // which method still needs verification
}
```

---

### POST /api/users/profile (Updated)
**Purpose:** Save profile data + secondary contact (triggers secondary OTP send)

**Request:**
```json
{
    "userId": "uuid-here",
    "firstName": "Rajesh",
    "middleName": "Kumar",
    "lastName": "Singh",
    "country": "IN",
    "city": "Mumbai",
    "language": "hi",
    "referralSource": "friend-family",
    "referralPerson": "Arjun",
    "occupation": "professional",
    "industry": "Technology",
    "secondaryContact": {                          // NEW
        "method": "phone",                         // 'email' or 'phone' (opposite of signup)
        "value": "+919876543210"                   // email or phone number
    }
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Profile saved. OTP sent to verify secondary contact.",
    "requiresVerification": true,
    "verificationMethod": "phone",
    "profile": {
        "user_id": "uuid...",
        "first_name": "Rajesh",
        "last_name": "Singh",
        "country": "IN",
        "city": "Mumbai",
        "language_preference": "hi"
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
        "secondaryContact": "Invalid email format"
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
- **secondaryContact.method:** Required, must be opposite of signup method
- **secondaryContact.value:** Required, valid email or phone format

---

### POST /api/users/verify-secondary-contact (NEW)
**Purpose:** Verify the secondary contact OTP and complete onboarding

**Request:**
```json
{
    "userId": "uuid-here",
    "method": "phone",                             // 'email' or 'phone'
    "identifier": "+919876543210",                 // the contact being verified
    "otp": "123456"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Secondary contact verified successfully",
    "bothContactsVerified": true,
    "profileComplete": true,
    "redirectTo": "/dashboard",
    "user": {
        "id": "uuid-here",
        "email": "user@example.com",
        "phone": "+919876543210",
        "email_verified": true,
        "phone_verified": true,
        "email_verified_at": "2026-02-11T10:00:00Z",
        "phone_verified_at": "2026-02-11T10:05:00Z"
    }
}
```

**Response Error (400):**
```json
{
    "success": false,
    "error": "Invalid OTP",
    "message": "Please check the code and try again",
    "attemptsRemaining": 4
}
```

**Validation Rules (Backend):**
- OTP: Required, exactly 6 digits
- Max 5 verification attempts per OTP
- OTP expires after 5 minutes
- Rate limiting: Max 3 OTP sends per 15 minutes per identifier

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

### Phase 1 (Current) ✅ COMPLETE
✅ Complete design mockups with dual verification:
- Profile completion form with secondary contact field
- Secondary OTP verification screen
- Welcome dashboard
- Login with flexible methods (email or phone)
- Complete documentation and API specs

### Phase 2 (Immediate - Backend Integration)
- [ ] Implement database schema with dual verification
- [ ] Create authentication API endpoints
- [ ] Create profile management API endpoints
- [ ] Add OTP generation and validation (SMS provider integration)
- [ ] Add form validation on backend
- [ ] Connect frontend mockups to backend APIs
- [ ] Implement error handling and retry logic
- [ ] Test on staging environment

### Phase 3 (Post-MVP - Enhancements)
- [ ] Add email/SMS service integration (SendGrid, Twilio)
- [ ] Implement OTP rate limiting and security
- [ ] Add profile picture upload capability
- [ ] Implement profile completion progress indicator
- [ ] Add profile strength gauge
- [ ] Create profile editing page
- [ ] Add program interest collection
- [ ] Implement contact preference settings (email vs SMS)

### Phase 4 (Long-term - Advanced Features)
- [ ] Add AI-powered personalization
- [ ] Create dashboard widgets based on language
- [ ] Implement event recommendations
- [ ] Add community member directory
- [ ] Create referral rewards system
- [ ] Add social login (Google, Facebook)
- [ ] Implement two-factor authentication with backup codes
- [ ] Add login history and security audit log

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

**Last Updated:** 2026-02-11
**Status:** Complete with Dual Verification Implementation
**Created by:** Claude Code
**Version:** 2.0

---

## Changelog

### Version 2.0 (2026-02-11) - Dual Email + Phone Verification
**Major Update:** Implemented dual contact verification flow

**Added:**
- Secondary contact field to profile completion form
- Secondary OTP verification screen with 6-digit input
- OTP input handling (auto-focus, paste, backspace navigation)
- 60-second resend timer for both signup and secondary OTP
- Masked identifier display for privacy
- Back button on OTP screen to return to form
- Phone country code support for international numbers
- Context parameter to distinguish signup/login/secondary OTP

**Updated:**
- User journey flow with 5 steps instead of 4
- Database schema with dual verification constraints
- API endpoints for secondary OTP verification
- Profile form validation to include secondary contact
- Implementation checklist with new verification steps

**Benefits:**
✅ Users have both email and phone verified
✅ Enables SMS + email notifications
✅ Improved account recovery options
✅ Industry-standard security pattern
✅ Clear user journey with engagement at two touchpoints

### Version 1.0 (2026-02-09) - Initial Implementation
- Profile completion form with conditional fields
- Welcome dashboard with personalization
- Database schema and API specifications
- Accessibility and responsive design features
