# Mobile Accordion Navbar

## Why this is different from desktop

The desktop navbar uses **hover** to show dropdown menus (CSS `:hover` + JS mouseenter).
Mobile devices have **no hover** — fingers tap, not hover. So we need:
- A **hamburger button** (☰) to open a fullscreen drawer
- An **accordion** inside the drawer — tap to expand/collapse sections
- A **backdrop** (dim overlay) so tapping outside closes the menu

This is a standard pattern used by almost every production website.

---

## How it works (mental model)

```
Desktop (≥ lg = 1024px):         Mobile (< lg):
┌────────────────────────────┐   ┌───────────┐
│ Logo  Our Work  About Us ▾ │   │ Logo    ☰ │  ← hamburger
└────────────────────────────┘   └───────────┘
                                    ↓ tap ☰
                                 ┌──────────────┐
                                 │ dim backdrop │
                                 │   ┌──────────┤
                                 │   │ Logo  ✕  │  ← close button
                                 │   │──────────│
                                 │   │ Our Work │  ← flat link
                                 │   │ About Us │  ← tap to expand
                                 │   │  Vision  │
                                 │   │  Mission │
                                 │   │ Programs │  ← tap to expand
                                 │   │  ...     │
                                 └───┴──────────┘
```

---

## Three things that control this

1. **Tailwind visibility classes** — `lg:hidden` / `hidden lg:flex`
   - Desktop nav: `hidden lg:flex` = hidden on mobile, shown on desktop
   - Hamburger button: `lg:hidden` = shown on mobile, hidden on desktop
   - This single pattern is how every responsive navbar works

2. **CSS transitions** — the panel slides in from the right
   - Default: `transform: translateX(100%)` = off-screen to the right
   - When open: `transform: translateX(0)` = visible
   - CSS `transition: transform 300ms cubic-bezier(...)` = smooth animation

3. **JS toggle** — adds/removes CSS classes to trigger the transitions
   - `mobileMenu.classList.remove('hidden')` = show the overlay
   - `menuPanel.classList.remove('translate-x-full')` = slide panel in (10ms later for reflow)
   - Reverse to close (with 300ms delay before hiding overlay)

---

## Files to Change

| File | What changes |
|---|---|
| `frontend/components/navbar.html` | Add hamburger button + full mobile drawer HTML |
| `frontend/css/styles.css` | Add mobile panel transition, accordion, backdrop CSS |
| `frontend/js/main.js` | Add `openMenu`, `closeMenu`, `toggleMobileAccordion` |

---

## 1. navbar.html — Full Structure

### A: Add hamburger button (inside existing `<header>`)
Add `lg:hidden` hamburger button next to the desktop nav:
```html
<!-- Hamburger (mobile only) -->
<button id="mobile-menu-button" class="lg:hidden text-[#5C3010] hover:text-[#B87333]">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
</button>
```

### B: Add mobile drawer (at the bottom of navbar.html, after `</header>`)
navbar.html is a **component fragment** (no `<html>/<body>` tags). The drawer goes after the `</header>` closing tag.

```html
<!-- Mobile Menu Drawer (outside header) -->
<div id="mobile-menu" class="fixed inset-0 z-50 hidden">

    <!-- Dim backdrop -->
    <div id="mobile-menu-backdrop"
         class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Slide-in panel (right side) -->
    <div id="mobile-menu-panel"
         class="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform translate-x-full">

        <div class="flex flex-col h-full">

            <!-- Panel header: logo + close -->
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
                <a href="/index.html">
                    <img src="/assets/logo.png" alt="AntarYog" class="h-10 w-auto">
                </a>
                <button id="mobile-menu-close" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Scrollable nav items -->
            <nav class="flex-1 overflow-y-auto p-4">
                <div class="space-y-1">

                    <!-- Flat link -->
                    <a href="https://learn.antaryogfoundation.in/p/our-work-en"
                       class="mobile-nav-link" target="_blank">Our Work</a>

                    <!-- About Us accordion -->
                    <div>
                        <button onclick="toggleMobileAccordion('about')"
                                class="mobile-accordion-btn">
                            About Us
                            <svg id="about-chevron" class="mobile-accordion-chevron"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div id="about-accordion" class="mobile-accordion-content">
                            <a href="/pages/vision.html" class="mobile-sub-link">Vision</a>
                            <a href="/pages/mission.html" class="mobile-sub-link">Mission</a>
                        </div>
                    </div>

                    <!-- Programs accordion -->
                    <div>
                        <button onclick="toggleMobileAccordion('programs')"
                                class="mobile-accordion-btn">
                            Programs
                            <svg id="programs-chevron" class="mobile-accordion-chevron"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div id="programs-accordion" class="mobile-accordion-content">
                            <a href="https://learn.antaryogfoundation.in/p/events"
                               class="mobile-sub-link" target="_blank">Upcoming Events</a>
                            <a href="https://learn.antaryogfoundation.in/l/products?sortKey=recommended&sortDirection=asc&page=1"
                               class="mobile-sub-link" target="_blank">Discourses</a>
                            <a href="https://learn.antaryogfoundation.in/p/naadi-jyotish"
                               class="mobile-sub-link" target="_blank">Naadi Jyotish</a>
                            <a href="https://payment.antaryogfoundation.in/soh"
                               class="mobile-sub-link" target="_blank">Science of Healing</a>
                            <a href="https://vasturupantaran.antaryogfoundation.in/"
                               class="mobile-sub-link" target="_blank">Vastu Rupantaran</a>
                            <a href="https://nirjanvas.antaryogfoundation.in/"
                               class="mobile-sub-link" target="_blank">Nirjanwas</a>
                        </div>
                    </div>

                    <!-- Shibir accordion -->
                    <div>
                        <button onclick="toggleMobileAccordion('shibir')"
                                class="mobile-accordion-btn">
                            Shibir
                            <svg id="shibir-chevron" class="mobile-accordion-chevron"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div id="shibir-accordion" class="mobile-accordion-content">
                            <a href="#" class="mobile-sub-link">Durga Sapta Shati</a>
                            <a href="#" class="mobile-sub-link">Pitru Rin Mukti</a>
                            <a href="#" class="mobile-sub-link">Shree Vidya</a>
                            <a href="#" class="mobile-sub-link">Navagraha</a>
                            <a href="#" class="mobile-sub-link">Ganesh Vidya</a>
                        </div>
                    </div>

                    <!-- Flat links -->
                    <a href="https://payment.antaryogfoundation.in/donation"
                       class="mobile-nav-link" target="_blank">Donate</a>
                    <a href="https://learn.antaryogfoundation.in/p/press"
                       class="mobile-nav-link" target="_blank">Newsroom</a>
                    <a href="https://wellness.antaryogfoundation.in/"
                       class="mobile-nav-link" target="_blank">Store</a>

                </div>
            </nav>
        </div>
    </div>
</div>
```

Also: wrap the desktop `<nav>` in `hidden lg:flex items-center` so it hides on mobile.

---

## 2. styles.css — New CSS to Append

```css
/* Mobile menu — drawer panel animation */
#mobile-menu-panel {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

#mobile-menu-backdrop {
    transition: opacity 300ms ease-in-out;
}

/* Mobile nav flat links */
.mobile-nav-link {
    display: block;
    padding: 0.75rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: #5C3010;
    border-radius: 8px;
    transition: background 150ms, color 150ms;
}
.mobile-nav-link:hover {
    background: #F9F6F0;
    color: #B87333;
}

/* Accordion trigger button */
.mobile-accordion-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: #5C3010;
    border-radius: 8px;
    transition: background 150ms, color 150ms;
}
.mobile-accordion-btn:hover {
    background: #F9F6F0;
    color: #B87333;
}

/* Accordion panel (sub-links) */
.mobile-accordion-content {
    display: none;
    padding-left: 1rem;
}
.mobile-accordion-content.open {
    display: block;
}

/* Accordion sub-links */
.mobile-sub-link {
    display: block;
    padding: 0.625rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: #7A6858;
    border-radius: 8px;
    transition: background 150ms, color 150ms;
}
.mobile-sub-link:hover {
    background: #F9F6F0;
    color: #B87333;
}

/* Chevron icon */
.mobile-accordion-chevron {
    width: 1rem;
    height: 1rem;
    opacity: 0.6;
    transition: transform 200ms ease;
    flex-shrink: 0;
}
.mobile-accordion-chevron.open {
    transform: rotate(180deg);
}
```

---

## 3. main.js — New Functions

```javascript
async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    if (id === 'navbar') {
        initDropdowns();      // existing desktop dropdown
        initMobileMenu();     // new mobile drawer
    }
}

// Accordion toggle — called inline via onclick="toggleMobileAccordion('about')"
// Made global (window.) so onclick attribute in HTML can find it
window.toggleMobileAccordion = function(id) {
    const content = document.getElementById(id + '-accordion');
    const chevron = document.getElementById(id + '-chevron');
    content.classList.toggle('open');
    chevron.classList.toggle('open');
};

function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuPanel  = document.getElementById('mobile-menu-panel');
    const closeBtn   = document.getElementById('mobile-menu-close');
    const backdrop   = document.getElementById('mobile-menu-backdrop');

    // Guard: exit if elements not found (e.g. on pages without navbar)
    if (!menuButton || !mobileMenu || !menuPanel) return;

    function openMenu() {
        mobileMenu.classList.remove('hidden');    // 1. show overlay
        setTimeout(() => {
            menuPanel.classList.remove('translate-x-full'); // 2. slide panel in
        }, 10);                                   // tiny delay triggers CSS transition
        document.body.style.overflow = 'hidden';  // 3. lock page scroll
    }

    function closeMenu() {
        menuPanel.classList.add('translate-x-full'); // 1. slide panel out
        setTimeout(() => {
            mobileMenu.classList.add('hidden');       // 2. hide overlay after transition
            document.body.style.overflow = '';        // 3. restore scroll
        }, 300);                                      // matches CSS transition duration
    }

    menuButton.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) closeMenu();
    });

    // Auto-close if user resizes to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && !mobileMenu.classList.contains('hidden')) closeMenu();
    });
}
```

---

## Key Concepts

**Why `window.toggleMobileAccordion`?**
The HTML uses `onclick="toggleMobileAccordion('about')"` — an inline handler. Inline handlers look for functions on the `window` object. If you define `function toggleMobileAccordion()` inside `initMobileMenu()` or inside an IIFE, the `onclick` won't find it. Making it `window.toggleMobileAccordion` makes it globally accessible.

**Why the 10ms `setTimeout` in `openMenu`?**
Browsers batch DOM changes. If you remove `hidden` AND `translate-x-full` in the same tick, the browser hasn't painted the element yet when you remove the transform class — so no animation plays. The 10ms gap forces a repaint first, then the CSS transition kicks in.

**Why `cubic-bezier(0.4, 0, 0.2, 1)`?**
This is Material Design's "standard easing". It starts fast (0.4) and decelerates at the end (0.2) — feels natural for a panel sliding in. Compare to `ease-in-out` which is symmetric. Most professional slide animations use this.

---

## Verification

1. `python3 -m http.server 8000` from `frontend/`
2. Open `http://localhost:8000` in browser
3. Resize window to < 1024px (or use DevTools device mode)
4. ☰ hamburger button should appear, desktop nav should hide
5. Tap ☰ → drawer slides in from right
6. Tap "About Us" → Vision/Mission expand below with chevron rotating
7. Tap "Programs" → 6 items expand
8. Tap backdrop or ✕ → drawer slides out
9. Press Escape → drawer closes
10. Resize back to desktop → drawer auto-closes
