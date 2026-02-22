# AntarYog Frontend Development Guide

## Quick Start

```bash
# Install dependencies (already done)
npm install

# Start development server on http://localhost:3000
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint
```

## Project Structure

```
frontend/src/
├── app/
│   ├── layout.tsx              # Root layout with fonts and metadata
│   ├── page.tsx                # Homepage assembling all sections
│   ├── globals.css             # Global styles (300+ lines from v7)
│   └── favicon.ico
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Fixed nav with dropdowns & auth state
│   │   ├── MobileMenu.tsx      # Slide-in panel (mobile)
│   │   └── Footer.tsx          # 4-column footer with social links
│   │
│   ├── home/
│   │   ├── HeroSection.tsx     # Hero with 4 stats grid
│   │   ├── FeaturedDiscourses.tsx
│   │   ├── AboutAcharya.tsx
│   │   ├── ProgramsCarousel.tsx
│   │   ├── UpcomingEvents.tsx
│   │   └── JoinMovementCTA.tsx
│   │
│   └── ui/
│       ├── Button.tsx          # Reusable button (3 variants)
│       └── SectionHeader.tsx   # Section header pattern
│
├── lib/data/
│   ├── discourses.ts           # 4 featured discourses
│   ├── programs.ts             # 5 programs
│   └── events.ts               # 3 upcoming events
│
├── contexts/
│   └── AuthContext.tsx         # Auth state management
│
└── hooks/
    └── (future custom hooks)

public/
├── assets → ../../../assets    # Symlink to root assets directory
└── [SVGs and static files]
```

## Theme & Styling

### Color Palette (White Copper Theme v7)

```typescript
// From tailwind.config.ts
colors: {
  'primary':        '#B87333',  // Copper - CTAs, links
  'secondary':      '#E8B84B',  // Gold Light - hover states
  'accent':         '#5C3010',  // Logo Brown - secondary CTAs
  'background':     '#F9F6F0',  // Paper
  'section-alt':    '#FDFBF8',  // Warm White
  'text':           '#5C3010',  // Primary text
  'text-secondary': '#7A6858',  // Secondary text
}
```

### Fonts

- **Serif (Headings):** Lora (var(--font-lora))
- **Sans (Body):** Inter (var(--font-inter))
- Loaded via next/font/google (no external CDN)

### Custom CSS

All non-utility styles in `globals.css`:
- Mobile menu animations (300ms transitions)
- Dropdown menu positioning and hover
- Programs carousel (flex scroll, drag support, dots)
- Featured Discourses animation (stagger fadeInUp)

## Key Components

### Header
- Fixed positioning with shadow
- Responsive navigation (desktop dropdowns, mobile accordion)
- Auth state detection from localStorage
- Mobile hamburger menu toggle

### ProgramsCarousel
- Horizontal scrolling carousel
- Drag-to-scroll support
- Dot navigation with active state
- Previous/Next arrow buttons (disabled at boundaries)
- Smooth scroll animation

### FeaturedDiscourses
- 4-card grid (1 col mobile, 2 col tablet, 4 col desktop)
- Category badges with copper background
- Staggered fadeInUp animation
- Ghost number in background (01-04)

### SectionHeader
- Reusable pattern: eyebrow + h2 + optional link
- Can arrange as row (side-by-side) or column (stacked)
- Arrow CTA with hover animation

## Data Management

Content is stored in TypeScript data files (not hardcoded):

```typescript
// lib/data/discourses.ts
export interface Discourse {
  id: string
  number: string
  category: string
  title: string
  description: string
  href: string
}

export const FEATURED_DISCOURSES: Discourse[] = [...]
```

Benefits:
- Easily update content without touching component logic
- Type-safe imports
- Single source of truth
- Can migrate to CMS later

## Authentication State

Currently using localStorage for mockup:

```typescript
// Header.tsx reads/writes localStorage
localStorage.setItem('firstName', 'John')
localStorage.setItem('userEmail', 'john@example.com')

// AuthContext.tsx provides reusable access
const { isLoggedIn, firstName, logout } = useAuth()
```

**Note:** This is mockup-only. Backend integration required for:
- Real login/signup flow
- Password hashing
- JWT tokens
- Session management

## Responsive Breakpoints

- **Mobile:** < 768px (Tailwind `sm:` prefix)
- **Tablet:** 768px - 1023px (Tailwind `md:` prefix)
- **Desktop:** ≥ 1024px (Tailwind `lg:` prefix)

Test with:
- iPhone 375px (nav responsive, stats grid stacks)
- iPad 768px (2-col event grid, tablets version of carousel)
- Desktop 1024px+ (full layout with 4-col discourses)

## Known Issues & TODOs

### MVP Limitations
- [ ] Header dropdowns toggle on click (no hover detection on mobile)
- [ ] Carousel doesn't persist scroll position on page reload
- [ ] Mobile menu doesn't auto-close on navigation
- [ ] No image lazy-loading (images load immediately)
- [ ] No error boundaries

### Not Yet Implemented
- [ ] Login page (exists as mockup: login-branded-antaryog.html)
- [ ] Signup page (exists as mockup: signup-branded-antaryog.html)
- [ ] Profile page (exists as mockup: profile-page-antaryog.html)
- [ ] Backend API routes
- [ ] Database integration
- [ ] Email verification flow
- [ ] Password reset
- [ ] 404/error pages

## Building for Production

```bash
npm run build

# Output is in .next/ directory
# Can be deployed to Vercel, Netlify, etc.
```

**Vercel Deployment (Recommended):**
```bash
npm i -g vercel
vercel

# Follow prompts to deploy
# Automatic deployments on git push
```

## Environment Variables

None required for MVP (mockup-only). When adding backend:

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
API_SECRET=xxx
```

## ESLint & Code Quality

```bash
npm run lint
# Checks TypeScript, React rules, Next.js best practices
```

Rules enforced:
- No unused imports
- No console.log in production
- Proper React hooks dependencies
- Next.js Image optimization

## Performance Considerations

### Current
- No image optimization (images loaded as-is)
- CSS-only animations (performant, no JS)
- Carousel uses scroll-snap (native browser support)

### Future Improvements
- Use `next/image` for automatic optimization
- Implement code splitting for routes
- Add dynamic imports for heavy components
- Optimize bundle size with webpack analysis
- Add Page Speed Insights monitoring

## Browser Support

Tested/supported:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari 14+
- Android Chrome

## Contribution Guidelines

When adding features:

1. **Create components in `src/components/`**
   - Keep components focused and reusable
   - Use TypeScript for type safety
   - Add prop interfaces

2. **Use Tailwind CSS**
   - Avoid inline styles
   - Use custom colors from theme
   - Mobile-first approach (sm: → md: → lg:)

3. **Extract data to `lib/data/`**
   - Never hardcode content in components
   - Use TypeScript interfaces
   - Keep data flat (avoid nesting)

4. **Follow naming conventions**
   - Components: PascalCase (.tsx)
   - Utilities: camelCase (.ts)
   - CSS classes: kebab-case

5. **Commit message format** (from CONTRIBUTING.md)
   ```
   feat(frontend): add [feature name]
   fix(frontend): resolve [issue]
   docs(frontend): update [docs]
   ```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Support

For questions, refer to:
1. Inline code comments
2. CLAUDE.md (project instructions)
3. Git history (commit messages explain decisions)
4. Code examples in existing components

---

**Last Updated:** February 22, 2026
**Status:** MVP Ready - Next.js project modularized from v7 mockup
