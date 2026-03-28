async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    if (id === 'navbar') {
        initDropdowns();      // existing desktop dropdown
        initMobileMenu();     // new mobile drawer
    }
}


function initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const panel  = dropdown.querySelector('.nav-dropdown-panel');
        
        button.addEventListener('mouseenter', () => dropdown.classList.add('open'));
        panel.addEventListener('mouseenter', () => dropdown.classList.add('open'));
        
        dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('open'));
        panel.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => dropdown.classList.remove('open'));
            });
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
        if (window.innerWidth >= 1024 && !mobileMenu.classList.contains('hidden')) closeMenu();
    });
}

loadComponent("navbar", "components/navbar.html");
loadComponent("hero", "components/hero.html");
loadComponent("footer", "components/footer.html");