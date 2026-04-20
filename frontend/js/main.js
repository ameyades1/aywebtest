async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    // Rewrite relative hrefs and srcs to be correct from any directory depth
    const container = document.getElementById(id);
    container.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('/')) {
            a.setAttribute('href', ROOT + href);
        }
    });
    container.querySelectorAll('img[src]').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
            img.setAttribute('src', ROOT + src);
        }
    });

    if (id === 'navbar') {
        initAuthState();      // check localStorage and toggle logged-in/out state
        initDropdowns();      // existing desktop dropdown
        initMobileMenu();     // new mobile drawer
    }
}


function initAuthState() {
    const firstName = localStorage.getItem('firstName');
    const navOut = document.getElementById('nav-logged-out');
    const navIn  = document.getElementById('nav-logged-in');
    if (!navOut || !navIn) return;

    if (firstName) {
        navOut.style.display = 'none';
        navIn.style.display  = 'flex';
        document.getElementById('nav-first-name').textContent = firstName;

        document.getElementById('mobile-nav-logged-out').style.display = 'none';
        document.getElementById('mobile-nav-logged-in').style.display  = 'block';
        document.getElementById('mobile-first-name').textContent = firstName;
    } else {
        navOut.style.display = 'flex';
        navIn.style.display  = 'none';
    }

    // Dropdown toggle
    const userMenuBtn  = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', function() {
            userDropdown.classList.add('hidden');
        });
    }
}

window.handleLogout = function() {
    localStorage.removeItem('firstName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    window.location.reload();
};


function initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const panel  = dropdown.querySelector('.nav-dropdown-panel') || dropdown.querySelector('.nav-megamenu-panel');

        button.addEventListener('mouseenter', () => dropdown.classList.add('open'));
        if (panel) panel.addEventListener('mouseenter', () => dropdown.classList.add('open'));

        dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('open'));
        if (panel) {
            panel.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => dropdown.classList.remove('open'));
            });
        }
    });
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
        if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) closeMenu();
    });
}

const ROOT = window.ROOT_PATH || '';
loadComponent("navbar", ROOT + "components/navbar.html");
loadComponent("hero", ROOT + "components/hero.html");
loadComponent("transformations", ROOT + "components/transformations.html");
if (document.getElementById('courses-preview')) {
    loadComponent("courses-preview", ROOT + "components/courses-preview.html");
}
if (document.getElementById('testimonials')) {
    loadComponent("testimonials", ROOT + "components/testimonials.html").then(() => {
        if (typeof initTestimonialsCarousel === 'function') {
            initTestimonialsCarousel();
        }
    });
}
if (document.getElementById('programs')) {
    loadComponent("programs", ROOT + "components/programs.html").then(() => {
        initProgramsCarousel();
    });
}
if (document.getElementById('how-it-works')) {
    loadComponent("how-it-works", ROOT + "components/how-it-works.html");
}
if (document.getElementById('upcoming-programs')) {
    loadComponent("upcoming-programs", ROOT + "components/upcoming-programs.html");
}
if (document.getElementById('guru')) {
    loadComponent("guru", ROOT + "components/guru.html");
}
if (document.getElementById('wisdom-section')) {
    loadComponent("wisdom-section", ROOT + "components/wisdom-section.html").then(() => {
        loadWisdomVideos();
    });
}
if (document.getElementById('final-cta')) {
    loadComponent("final-cta", ROOT + "components/final-cta.html");
}
loadComponent("footer", ROOT + "components/footer.html");

// Load wisdom videos from JSON — YouTube thumbnail carousel (6 videos, 3 visible)
async function loadWisdomVideos() {
    try {
        const response = await fetch('../docs/Youtube_knowledge/wisdom_videos.json');
        const videos = await response.json();
        const track = document.getElementById('wisdom-track');

        if (!track) {
            return;
        }

        // Show only 6 videos in the carousel
        const featured = videos.slice(0, 6);

        track.innerHTML = featured.map(video => {
            const videoId = new URL(video.url).searchParams.get('v');
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return `
                <a href="${video.url}" target="_blank" rel="noopener" class="wisdom-card">
                    <div class="wisdom-thumb">
                        <img src="${thumbnailUrl}" alt="${video.description}" loading="lazy">
                        <div class="wisdom-play">
                            <img src="assets/icons/play.svg" alt="" width="44" height="44">
                        </div>
                    </div>
                    <p class="wisdom-description">${video.description}</p>
                </a>
            `;
        }).join('');

        initWisdomCarousel();
    } catch (error) {
        console.error('Failed to load wisdom videos:', error);
    }
}

function initWisdomCarousel() {
    const outer   = document.getElementById('wisdom-track-outer');
    const cards   = document.querySelectorAll('.wisdom-card');
    const dots    = document.querySelectorAll('.wdot');
    const btnPrev = document.getElementById('wisdom-prev');
    const btnNext = document.getElementById('wisdom-next');

    if (!outer || !cards.length || !btnPrev || !btnNext) return;

    let current = 0;
    const gap = 20;

    function getCardWidth() {
        return cards[0].offsetWidth;
    }

    function scrollToCard(index) {
        current = Math.max(0, Math.min(index, cards.length - 1));
        outer.scrollTo({ left: current * (getCardWidth() + gap), behavior: 'smooth' });
        updateDots();
    }

    function updateDots() {
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => scrollToCard(+dot.dataset.index));
    });

    btnPrev.addEventListener('click', () => scrollToCard(current - 1));
    btnNext.addEventListener('click', () => scrollToCard(current + 1));

    let scrollTimer;
    outer.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            current = Math.round(outer.scrollLeft / (getCardWidth() + gap));
            current = Math.max(0, Math.min(current, cards.length - 1));
            updateDots();
        }, 80);
    });
}

function initProgramsCarousel() {
    const outer   = document.getElementById('prog-track-outer');
    const cards   = document.querySelectorAll('.prog-card');
    const dots    = document.querySelectorAll('.pdot');
    const btnPrev = document.getElementById('prog-prev');
    const btnNext = document.getElementById('prog-next');

    if (!outer || !cards.length || !btnPrev || !btnNext) return;

    let current = 0;
    const gap = 20;

    function getCardWidth() {
        return cards[0].offsetWidth;
    }

    function scrollToCard(index) {
        current = Math.max(0, Math.min(index, cards.length - 1));
        outer.scrollTo({ left: current * (getCardWidth() + gap), behavior: 'smooth' });
        updateDots();
    }

    function updateDots() {
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => scrollToCard(+dot.dataset.index));
    });

    btnPrev.addEventListener('click', () => scrollToCard(current - 1));
    btnNext.addEventListener('click', () => scrollToCard(current + 1));

    let scrollTimer;
    outer.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            current = Math.round(outer.scrollLeft / (getCardWidth() + gap));
            current = Math.max(0, Math.min(current, cards.length - 1));
            updateDots();
        }, 80);
    });
}