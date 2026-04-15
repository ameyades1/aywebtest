# Testimonials Scroll Component

A refined, luxury-aesthetic testimonial carousel component inspired by Art of Living's design, tailored for AntarYog Foundation's spiritual brand.

## Overview

This component creates a beautiful, scrollable testimonial section that displays one full-screen quote at a time, with smooth animations and navigation. The design emphasizes elegant typography and spiritual wisdom with a sophisticated copper/gold color scheme.

## Features

✨ **Design Excellence**
- Refined, luxury aesthetic with spiritual undertones
- Elegant serif typography (Lora) for quotes paired with clean sans-serif (Inter)
- Copper (#B87333) and gold (#E8B84B) color scheme
- Subtle radial gradient backgrounds on cards
- Smooth animations and transitions

🎯 **Functionality**
- Horizontal scroll carousel with full-screen cards
- Auto-scroll with 8-second intervals
- Manual navigation with left/right arrows
- Dot indicators with active state
- Display counter (current/total)
- Fully responsive design
- Accessibility-first implementation

📱 **Responsive**
- Desktop: Large, readable quotes with hover effects
- Tablet: Optimized spacing and card sizing
- Mobile: Touch-friendly navigation and full viewport cards
- Dark mode support (CSS)
- Reduced motion preferences supported

## Files

### 1. **TestimonialsScroll.jsx** (React Component)
Production-ready React component with state management and auto-scroll logic.

```jsx
import TestimonialsScroll from './components/testimonials/TestimonialsScroll';

export default function App() {
  return <TestimonialsScroll />;
}
```

### 2. **TestimonialsScroll.css** (Styled Component)
Comprehensive styling with animations, responsive breakpoints, and dark mode support.

### 3. **testimonials-standalone.html** (Vanilla HTML/CSS/JS)
Self-contained HTML file that works without any build tools or frameworks. Perfect for quick testing or simple integration.

Open in browser:
```bash
open frontend/components/testimonials/testimonials-standalone.html
# or
start frontend/components/testimonials/testimonials-standalone.html
```

## Implementation

### Option 1: React (Recommended for Next.js app)

```jsx
// pages/index.js or App.tsx
import TestimonialsScroll from '@/components/testimonials/TestimonialsScroll';

export default function Home() {
  return (
    <div>
      {/* Other sections */}
      <TestimonialsScroll />
    </div>
  );
}
```

### Option 2: Vanilla HTML
Simply embed the standalone HTML file or copy the HTML/CSS/JS to your existing page.

## Customization

### Adding More Testimonials

Edit the `testimonials` array in either file:

```javascript
const testimonials = [
  {
    id: 1,
    quote: "Your quote here...",
    speaker: "Speaker Name",
    category: "Category",
    achievement: "Brief achievement"
  },
  // Add more...
];
```

### Changing Colors

Update CSS variables in the `:root` section:

```css
:root {
  --color-primary-copper: #B87333;      /* Main accent */
  --color-secondary-gold: #E8B84B;      /* Highlights */
  --color-accent-brown: #5C3010;        /* Text/Headers */
  --color-bg-paper: #F9F6F0;            /* Background */
  --color-text-dark: #2C1810;           /* Primary text */
  --color-text-light: #6B4423;          /* Secondary text */
}
```

### Modifying Auto-Scroll Duration

Change the interval in the `useEffect` hook (React) or `setInterval` function (HTML):

```javascript
// 8000ms = 8 seconds
}, 8000);
```

### Adjusting Card Height

Modify the `min-height` of `.testimonial-card`:

```css
.testimonial-card {
  min-height: 500px;  /* Change this value */
}
```

## Design Details

### Typography Stack

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Quote | Lora (serif) | 1.5rem - 2rem | 500 |
| Speaker Name | Lora (serif) | 1.125rem | 600 |
| Category | Inter (sans) | 0.875rem | 500 |
| Achievement Badge | Inter (sans) | 0.8rem | 500 |

### Color Palette

```
Copper (Primary):     #B87333 - Main accent color
Gold (Secondary):     #E8B84B - Highlights and accents
Brown (Accent):       #5C3010 - Headlines and dark text
Paper (Background):   #F9F6F0 - Light background
Text Dark:            #2C1810 - Primary text
Text Light:           #6B4423 - Secondary text
Border:               #D4C4B0 - Card borders
White:                #FFFFFF - Card background
```

### Spacing System

- Gap between cards: 32px (desktop), 20px (tablet), 16px (mobile)
- Card padding: 60px 48px (desktop), 40px 32px (tablet), 32px 24px (mobile)
- Section padding: 120px top/bottom
- Header margin-bottom: 80px

### Animation Details

| Animation | Duration | Timing | Trigger |
|-----------|----------|--------|---------|
| fadeInUp | 0.8s | ease-out | Page load (header) |
| slideIn | 0.6s | ease-out | Card appears |
| fadeIn | 1s | ease-out 0.3s | Dots appear |
| Scroll | smooth | smooth scroll | Navigation click |
| Hover | 0.4s | cubic-bezier | Card hover |

## Accessibility

✓ ARIA labels on all buttons  
✓ Semantic HTML structure  
✓ Keyboard navigation (Tab, arrows)  
✓ Color contrast meets WCAG AA standards  
✓ Respects `prefers-reduced-motion` setting  
✓ Proper heading hierarchy  
✓ Focus indicators on interactive elements  

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- IE11: Partial support (no CSS gradients, transitions work)

## Performance Considerations

- CSS animations use `transform` and `opacity` for optimal performance
- No external animation libraries required
- Lazy loading compatible for images (when added)
- ~15KB CSS, minimal JavaScript
- Fast paint/composite performance

## Integration with Data

To pull testimonials from your JSON file:

```jsx
import testimonialData from '@/data/testimonials_cleaned.json';

export default function TestimonialsScroll() {
  const [testimonials, setTestimonials] = useState(testimonialData.testimonials);
  
  // Rest of component...
}
```

## Mobile Experience

The component is optimized for touch:
- Swipe-friendly card sizing
- Large touch targets (48px minimum)
- Clear visual feedback on interaction
- No hover states on mobile (uses active states instead)

## Dark Mode

Automatically adapts to system dark mode preference:

```css
@media (prefers-color-scheme: dark) {
  /* Dark theme colors */
}
```

## Extending

### Adding Video Links

```jsx
{
  id: 4,
  quote: "...",
  speaker: "...",
  category: "...",
  achievement: "...",
  videoUrl: "https://youtube.com/watch?v=..."  // Add this
}
```

Then in the card:
```jsx
<a href={testimonial.videoUrl} target="_blank" className="watch-button">
  Watch Full Video
</a>
```

### Adding Images

```jsx
<img src={testimonial.image} alt={testimonial.speaker} className="speaker-image" />
```

## Troubleshooting

**Cards not scrolling?**
- Check if parent container has `overflow-x: hidden`
- Ensure `scroll-behavior: smooth` is set

**Animations not playing?**
- Check if `prefers-reduced-motion` is enabled in system settings
- Verify CSS file is loaded properly

**Colors not showing?**
- Clear browser cache
- Ensure CSS variables are defined in `:root`

**Dots not working?**
- Check if JavaScript is enabled
- Verify click handlers are attached to dots

## Performance Tips

1. Use CSS containment for better paint performance
2. Lazy-load testimonial data with intersection observer
3. Consider virtualization if testimonials exceed 50
4. Use WebP images if you add them later
5. Monitor CLS (Cumulative Layout Shift) for animations

## Migration from Old Design

If upgrading from an existing testimonial section:

1. Update testimonial data structure to match the new format
2. Replace old CSS with new component styles
3. Update HTML structure to match card layout
4. Test navigation on all devices
5. Verify animations perform well on slower devices

## Browser DevTools Tips

**Chrome DevTools:**
- Device toolbar to test responsive design
- Performance tab to monitor animations
- Rendering tab to check paint times

**Reduce Motion:**
Settings > Accessibility > Display > Reduce motion

## Support & Maintenance

For updates to testimonials, edit:
- `docs/testimonials/transcripts/testimonials_cleaned.json` (data)
- `components/testimonials/TestimonialsScroll.jsx` (component)

For styling changes, edit:
- `components/testimonials/TestimonialsScroll.css`

---

**Version:** 1.0  
**Created:** April 15, 2026  
**Last Updated:** April 15, 2026  
**Status:** Production Ready ✓

Made with intentional design for AntarYog Foundation
