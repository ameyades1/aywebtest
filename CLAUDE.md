# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AntarYog Foundation Website** - A modern, full-stack website for a spiritual and educational organization dedicated to reviving Vedantic knowledge and creating societal transformation.

**Technology Stack:**
- **Frontend:** Next.js 14+, React, Tailwind CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (or PostgreSQL/SQLite)
- **Authentication:** JWT
- **Design:** Tailwind CSS with custom spiritual color themes (Teal, Saffron)

**Current State:** MVP phase - basic pages structure in progress (frontend and backend directories are currently empty). Project includes design mockups in `index.html` and `docs/prompts/output/` for reference.

## Key Project Resources

- **ROLE_DEFINITION.md** (`docs/prompts/output/ROLE_DEFINITION.md`) - Spiritual mission context, organization values, and feature requirements
- **Design Mockups** (`docs/prompts/output/frontend-branded-antaryog-v*.html`) - Four design variations showing branding and layout approaches
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
- Teal theme: `ay-teal` (#09A59A), `ay-teal-dark` (#078078), `ay-teal-light` (#0BC4B7)
- Saffron theme: `ay-saffron` (#D97706), `ay-saffron-dark` (#B45309), `ay-saffron-light` (#F59E0B)
- Base colors: `ay-gray` (#2b3636), `ay-gray-light` (#4a5555), `ay-beige` (#F8F6F3)

**Typography** (in index.html Tailwind config):
- Serif: Lora (for headings) - represents traditional, spiritual aesthetic
- Sans: Inter (for body) - modern, clean readability

**Four Design Variations** (reference mockups in docs/prompts/output/):
- v1: Teal theme with traditional spiritual elements
- v2: Saffron theme emphasizing Indian cultural colors
- v3: Alternative Teal variation with different layouts
- v4: Enhanced Saffron with refined spiritual design

### MVP Phase Requirements

**Phase 1 (Current):**
- [ ] Frontend: Basic pages (home, about, login, dashboard)
- [ ] Backend: User authentication (register, login)
- [ ] Database: User model and connection
- [ ] Use design mockups as reference for page layouts

**Phase 2:** Content Management System
**Phase 3:** Community Features (events, programs, enrollment)
**Phase 4:** Advanced Features (consultation booking, donations, membership)

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
The `index.html` file contains a landing page showcasing four design mockup variations. View it in a browser to see different layout and color theme approaches. The branded mockups in `docs/prompts/output/` provide detailed reference for building actual pages.

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
**Last Updated:** February 2026
