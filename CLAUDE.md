# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AntarYog Foundation Website** - A modern, full-stack website for a spiritual and educational organization dedicated to reviving Vedantic knowledge and creating societal transformation.

**Technology Stack:**
- **Frontend:** Next.js 14+, React, Tailwind CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (or PostgreSQL/SQLite)
- **Authentication:** JWT
- **Design:** Tailwind CSS with custom spiritual color themes (Teal, Saffron, Earth-Gold Harmony)

**Current State:** MVP phase - basic pages structure in progress (frontend and backend directories are currently empty). Project includes design mockups in `index.html` and `docs/prompts/output/` for reference.

## Key Project Resources

- **ROLE_DEFINITION.md** (`docs/prompts/output/ROLE_DEFINITION.md`) - Spiritual mission context, organization values, and feature requirements
- **Design Mockups** (`docs/prompts/output/frontend-branded-antaryog-v*.html`) - Six design variations (three themes × two content levels) showing branding and layout approaches
- **CONTRIBUTING.md** (`docs/CONTRIBUTING.md`) - Commit message format (Conventional Commits), code style guidelines, development workflow
- **Asset Download Script** (`download-assets.sh`) - Hybrid downloader that auto-discovers 40+ assets from learn.antaryogfoundation.in (images, CSS)

## Common Development Commands

### Project Setup
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install

# Set up environment files
# frontend/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000

# backend/.env.local:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aywebtest
JWT_SECRET=your-secret-key-here
```

### Running the Project
```bash
# Terminal 1 - Backend (Express.js on port 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (Next.js on port 3000)
cd frontend
npm run dev

# Or run both simultaneously (if configured)
npm run dev:all
```

### Assets Management
```bash
# Download all assets from live website (images, CSS)
./download-assets.sh

# Preview what would be downloaded
./download-assets.sh --dry-run

# Force re-download existing assets
./download-assets.sh --force

# Download only images (skip CSS/fonts)
./download-assets.sh --skip-css --skip-fonts
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, then commit with proper format
git commit -m "feat(frontend): add home page component"

# Push to remote
git push origin feature/your-feature-name
```

## Architecture Overview

### Directory Structure
```
aywebtest/
├── frontend/                          # Next.js React application (EMPTY - to be built)
│   ├── src/app/                      # Pages and routes
│   ├── src/components/               # Reusable UI components
│   ├── src/lib/                      # Utilities and API client
│   └── package.json
├── backend/                           # Express.js API server (EMPTY - to be built)
│   ├── routes/                       # API endpoints
│   ├── models/                       # Database schemas
│   ├── middleware/                   # Auth and other middleware
│   └── package.json
├── assets/                            # Project assets (auto-discovered)
│   ├── images/                       # Logo, founder, programs, events, gallery, visuals
│   ├── css/                          # Teachable stylesheet
│   └── .gitignore                    # Excludes binaries, tracks manifests
├── docs/
│   ├── prompts/                      # AI-generated documentation and design mockups
│   │   ├── input/                   # Original prompt requests
│   │   ├── output/                  # Generated outputs (design mockups, role definition)
│   │   └── ROLE_DEFINITION.md       # Organization mission and feature requirements
│   ├── ASSET_DOWNLOAD_GUIDE.md      # Guide for asset downloader script
│   └── CONTRIBUTING.md              # Commit format, code style, development workflow
├── index.html                        # Landing page showcasing design mockups
├── download-assets.sh                # Hybrid asset downloader (723 lines, auto-discovers assets)
├── README.md                         # Project overview and quick start
└── CLAUDE.md                         # This file
```

### Key Design Patterns

**Color System** (Tailwind custom colors):
- **Teal theme:** `ay-teal` (#09A59A), `ay-teal-dark` (#078078), `ay-teal-light` (#0BC4B7) - Modern, cool aesthetic
- **Saffron theme:** `ay-saffron` (#D97706), `ay-saffron-dark` (#B45309), `ay-saffron-light` (#F59E0B) - Traditional Indian cultural colors
- **Earth-Gold Harmony theme:** `primary` (#6B3E2E), `secondary` (#D9A441), `accent` (#B45309), `background` (#F6F1E7), `text` (#3A2418), `text-secondary` (#6E5C4F) - Warm earthy tones with spiritual prosperity
- **Base colors:** `ay-gray` (#2b3636), `ay-gray-light` (#4a5555), `ay-beige` (#F8F6F3)

**Typography** (in index.html Tailwind config):
- Serif: Lora (for headings) - represents traditional, spiritual aesthetic
- Sans: Inter (for body) - modern, clean readability

**Six Design Variations** (reference mockups in docs/prompts/output/):

*Teal Theme (Modern & Contemporary):*
- v1: Teal theme with minimal content
- v2: Teal theme with enhanced official content

*Saffron Theme (Traditional Indian Cultural):*
- v3: Saffron theme with minimal content
- v4: Saffron theme with enhanced official content

*Earth-Gold Harmony Theme (Grounded & Spiritual):*
- v5: Earth-Gold Harmony with minimal content
- v6: Earth-Gold Harmony with enhanced official content

**Design Pattern:** Odd versions (1, 3, 5) feature core design with minimal content; even versions (2, 4, 6) include full official AntarYog Foundation content, programs, and detailed information.

### MVP Phase Requirements

**Phase 1 (Current):**
- [ ] Frontend: Basic pages (home, about, login, dashboard)
- [ ] Backend: User authentication (register, login)
- [ ] Database: User model and connection
- [ ] Use design mockups as reference for page layouts

**Phase 2:** Content Management System
**Phase 3:** Community Features (events, programs, enrollment)
**Phase 4:** Advanced Features (consultation booking, donations, membership)

## Responsive Navigation System

### Mobile-First Design Mockups

All design mockups (`frontend-branded-antaryog-v1.html` through `v6.html`) include a **comprehensive responsive navigation system** that ensures proper display on all devices:

**Mobile/Tablet (< 1024px):**
- Hamburger menu button (visible on small screens)
- Slide-in mobile menu panel from the right (320px width, max 85vw)
- Smooth CSS animations (300ms transitions)
- All navigation links accessible in scrollable menu
- Login/Signup buttons prominent at top of menu

**Desktop (1024px+):**
- Full desktop navigation bar displayed
- Login/Signup buttons inline (right-aligned)
- Mobile menu hidden and non-functional
- No layout shifts or responsive breakpoint issues

**Key Implementation Details:**
- **Fixed header** with proper z-index (40 for header, 50 for overlay)
- **Flexbox layout** restructured to prevent centering conflicts when desktop nav is hidden
- **Vanilla JavaScript** for menu toggle (no dependencies) - opens via hamburger, closes via X button, backdrop click, or Escape key
- **iOS Safari fixes** - bounce scroll prevention, viewport height adjustments
- **Touch optimizations** - minimum 44px targets on mobile, 1.5rem padding on tablets
- **Three color themes:**
  - Teal (v1, v2): `ay-teal` (#09A59A), `ay-teal-dark` (#078078) - Modern and cool
  - Saffron (v3, v4): `ay-saffron` (#D97706), `ay-saffron-dark` (#B45309) - Traditional and warm
  - Earth-Gold (v5, v6): `primary` (#6B3E2E), `accent` (#B45309) - Grounded and spiritual

**Device Support:**
- iPhone 375-428px ✅
- Android phones 360-428px ✅
- Tablets 768-1024px ✅
- Desktop 1024px+ ✅

See `RESPONSIVE_NAVIGATION_GUIDE.md` in memory for complete testing checklist and technical specifications.

## Earth-Gold Harmony Theme (v5 & v6)

### Overview

The Earth-Gold Harmony theme (versions v5 and v6) represents a warm, grounded aesthetic that combines the stability of earth tones with the spiritual prosperity of gold. This theme is ideal for users seeking a traditional, spiritual feel while maintaining modern design principles.

### Color Palette

**Primary Colors:**
- **Primary (Brand Brown):** #6B3E2E - Header links, primary CTAs, key text elements
- **Secondary (Soft Gold):** #D9A441 - Hover states, highlights, and accents
- **Accent (Copper):** #B45309 - Secondary CTAs and emphasis elements

**Background Colors:**
- **Background (Warm Cream):** #F6F1E7 - Main page backgrounds, light elements
- **Section Alt (Soft Sand):** #EFE6D6 - Alternating section backgrounds for visual separation

**Text Colors:**
- **Text (Deep Brown):** #3A2418 - Primary text, headings (excellent contrast)
- **Text Secondary (Muted Earth):** #6E5C4F - Secondary text, captions, descriptions

### Design Characteristics

- **Warm aesthetic:** Earth tones evoke stability, tradition, and groundedness
- **Spiritual symbolism:** Gold represents prosperity and spiritual energy
- **WCAG AA compliant:** All color combinations meet accessibility contrast standards (9.2:1 primary, 7.1:1 secondary)
- **Responsive design:** Full mobile-first approach with 300ms animations
- **Professional appearance:** Suitable for international reach and diverse audiences

### Available Versions

**v5 - Earth-Gold Harmony (Minimal Content):**
- Location: `docs/prompts/output/frontend-branded-antaryog-v5.html`
- Size: 1,025 lines
- Content: Core design elements without full AntarYog Foundation content
- Ideal for: Landing pages, feature showcases, focused messaging

**v6 - Earth-Gold Harmony (Enhanced Content):**
- Location: `docs/prompts/output/frontend-branded-antaryog-v6.html`
- Size: 1,073 lines
- Content: Full official AntarYog Foundation content, programs, mission, events
- Ideal for: Complete website, comprehensive information, engagement

### Implementation Details

All Earth-Gold theme versions include:
- Responsive header with fixed positioning
- Mobile menu with slide-in panel (300ms animation)
- Hero section with gradient backgrounds
- Program cards with hover effects
- Mission/values section
- Upcoming events listing
- Call-to-action sections
- Footer with links and social integration
- Touch-optimized interactive elements (44px minimum)

### Browser & Device Support

- ✅ iPhone 375-428px
- ✅ Android phones 360-428px
- ✅ Tablets 768-1024px
- ✅ Desktop 1024px+
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)

## Asset Management

### Asset Discovery System (`download-assets.sh`)

The project includes a sophisticated hybrid asset downloader that:
- **Auto-discovers** assets from live website (learn.antaryogfoundation.in)
- **Downloads** 40 images + 1 CSS file automatically
- **Categorizes** assets by filename patterns (logo, founder, programs, events, gallery, visuals)
- **Validates** MIME types and file integrity
- **Idempotent:** Safe to run multiple times, skips existing files
- **Manifest system:** Records all downloads with timestamp for audit trail

### Asset Organization
```
assets/
├── images/
│   ├── logo/              # 2 files (AY logo, favicon)
│   ├── founder/           # 38 files (Acharya portraits, brochure pages)
│   ├── programs/          # Program-related images
│   ├── events/            # Event-related images
│   ├── gallery/           # Collages and gallery images
│   └── visuals/           # General visuals
├── css/
│   └── teachable/         # 1 file (stylesheet)
└── .gitignore             # Excludes binaries, tracks manifests
```

Use `./download-assets.sh --dry-run` to preview discovered assets before downloading.

## Commit Message Format

**Follow Conventional Commits** (see CONTRIBUTING.md for full details):

```
<type>(<scope>): <short description>
```

**Types:** feat, fix, docs, style, refactor, test, chore
**Scopes:** frontend, backend, auth, db, assets, config, docs

**Examples:**
```bash
git commit -m "feat(frontend): add home page component"
git commit -m "fix(auth): resolve JWT token expiration issue"
git commit -m "feat(backend): create user authentication API"
git commit -m "docs(prompts): update role definition"
git commit -m "chore(backend): update express to latest version"
```

**Guidelines:**
- Use imperative mood: "add feature" not "added feature"
- Keep subject under 50 characters
- Use clear, descriptive messages
- No emojis in commit history

## Code Style Guidelines

### Frontend (React/Next.js)
- Use functional components with hooks
- Meaningful variable and component names
- Keep components focused and reusable
- Follow Tailwind CSS conventions
- Add comments for complex logic
- Reference design mockups for layouts and color usage

### Backend (Express.js)
- Use async/await for asynchronous operations
- Organize routes logically by feature
- Add middleware for cross-cutting concerns
- Descriptive function and variable names
- Proper error handling with appropriate HTTP status codes

### General
- Keep lines reasonably short (max 100-120 characters)
- Consistent indentation (2 or 4 spaces)
- Remove unused imports and variables
- Meaningful variable names

## Testing

### Frontend Testing
- Test changes in browser (localhost:3000)
- Check different browsers if possible
- Verify no console errors or warnings
- Test API calls with backend
- Test responsive design on mobile

### Backend Testing
- Use Postman, curl, or API testing tools
- Test API endpoints with sample requests
- Verify database integration
- Check MongoDB/database directly for data persistence
- Test authentication flows (register, login, token validation)

## Important Notes

**Design Reference:**
The `index.html` file contains a landing page showcasing six design mockup variations across three color themes (Teal, Saffron, Earth-Gold Harmony). View it in a browser to see different layout and color theme approaches. The branded mockups in `docs/prompts/output/` provide detailed reference for building actual pages. Each theme is available in minimal and enhanced versions to suit different content needs.

**Empty Directories:**
The `frontend/` and `backend/` directories are currently empty. Implement according to the structure defined in README.md and informed by the design mockups.

**Organization Mission:**
Review ROLE_DEFINITION.md to understand the spiritual mission context and organizational values. This should inform design decisions, content organization, and feature prioritization.

**Multi-Language Support:**
Current platform supports English, Hindi, and Marathi. Plan for i18n implementation in Phase 2.

**Database Flexibility:**
README mentions MongoDB as primary choice but supports PostgreSQL/SQLite. Choose database early in backend implementation.

## Quick Reference Links

- **Development:** Next.js (https://nextjs.org/docs), Express.js (https://expressjs.com/)
- **Database:** MongoDB (https://mongoosejs.com/)
- **Styling:** Tailwind CSS (https://tailwindcss.com/)
- **Commit Format:** Conventional Commits (https://www.conventionalcommits.org/)
- **Authentication:** JWT pattern
- **Color System:** Custom Tailwind theme defined in index.html

---

**Project Status:** MVP Phase (In Development)
**Design Mockups:** 6 variations across 3 themes (Teal, Saffron, Earth-Gold Harmony)
**Last Updated:** February 10, 2026
