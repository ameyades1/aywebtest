/* =========================================
   DISCOURSES PAGE — DISCOURSES.JS
   ========================================= */

const ROOT_PATH = window.ROOT_PATH || '../';

// Product grouping logic
const DISCOURSE_GROUPS = {
  'life-lessons': [10, 11, 12, 13, 17, 20, 56],
  'wealth-leadership': [1, 2, 5, 8, 16, 18],
  gita: [3, 4, 5, 6, 7, 8, 9],
  upanishad: [21, 15],
  navagraha: [14, 22, 23, 24, 25, 26],
  'mool-mantra': [19, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
};

const CAROUSEL_IDS = [1, 3, 5, 6, 7, 10]; // Featured discourses for carousel

let carousel = {
  currentIndex: 0,
  autoplayInterval: null,
  products: [],
};

let catalog = null;
let currentTab = 'life-lessons';

// =========================================
// INIT
// =========================================

document.addEventListener('DOMContentLoaded', async () => {
  catalog = await loadCatalog();

  // Initialize carousel
  initCarousel(catalog.products);

  // Use URL hash as initial tab if valid, otherwise default to life-lessons
  const hashTab = window.location.hash.replace('#', '');
  const initialTab = DISCOURSE_GROUPS[hashTab] ? hashTab : 'life-lessons';
  currentTab = initialTab;

  // Render initial content
  renderContent(initialTab, catalog.products);

  // Setup tab switching
  setupTabSwitching();
});

// =========================================
// LOAD CATALOG
// =========================================

async function loadCatalog() {
  try {
    const res = await fetch('../../docs/product_catalog/product-catalog.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to load catalog:', err);
    return { products: [] };
  }
}

// =========================================
// TAB SWITCHING & CONTENT RENDERING
// =========================================

function initCarousel(products) {
  carousel.products = products.filter(p => CAROUSEL_IDS.includes(p.id));
  carousel.currentIndex = 0;

  const container = document.getElementById('featured-carousel');
  if (!container) return;

  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  const inner = document.createElement('div');
  inner.className = 'carousel-inner';

  // Build track with all slides
  const track = document.createElement('div');
  track.className = 'carousel-track';
  track.id = 'carousel-track';

  carousel.products.forEach((p) => {
    const slide = document.createElement('a');
    slide.className = 'carousel-slide';
    slide.href = p.url;
    slide.target = '_blank';
    slide.rel = 'noopener';
    slide.innerHTML = `<img src="${p.thumbnail_url}" alt="${p.name}" loading="lazy">`;
    track.appendChild(slide);
  });

  inner.appendChild(track);
  carouselContainer.appendChild(inner);

  // Dots
  const dotsDiv = document.createElement('div');
  dotsDiv.className = 'carousel-dots';
  dotsDiv.id = 'carousel-dots';
  dotsDiv.innerHTML = carousel.products.map((_, i) => {
    const isActive = i === 0 ? 'active' : '';
    return `<button class="carousel-dot ${isActive}" data-index="${i}"></button>`;
  }).join('');
  carouselContainer.appendChild(dotsDiv);

  container.appendChild(carouselContainer);

  // Setup dot click handlers
  dotsDiv.querySelectorAll('.carousel-dot').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      setActiveSlide(idx);
      stopAutoplay();
      startAutoplay();
    });
  });

  // Setup inactive slide click handlers
  const slides = track.querySelectorAll('.carousel-slide');
  slides.forEach((slide, i) => {
    slide.addEventListener('click', (e) => {
      if (i !== carousel.currentIndex) {
        e.preventDefault();
        setActiveSlide(i);
        stopAutoplay();
        startAutoplay();
      }
    });
  });

  // Initial render
  setActiveSlide(0);

  // Attach swipe observer for snap detection
  attachSwipeObserver();

  // Start autoplay
  startAutoplay();

  // Pause on hover
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
}

function attachSwipeObserver() {
  const inner = document.querySelector('.carousel-inner');
  const slides = document.querySelectorAll('.carousel-slide');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        const index = Array.from(slides).indexOf(entry.target);
        if (index !== carousel.currentIndex) {
          carousel.currentIndex = index;
          slides.forEach((s, i) => s.classList.toggle('active', i === index));
          updateDots(index);
        }
      }
    });
  }, { root: inner, threshold: 0.6 });

  slides.forEach(s => observer.observe(s));
}

function updateDots(index) {
  const dotsContainer = document.getElementById('carousel-dots');
  if (!dotsContainer) return;
  dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function setActiveSlide(index) {
  const total = carousel.products.length;
  carousel.currentIndex = ((index % total) + total) % total;

  const track = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const inner = track?.parentElement;

  // Update active class
  slides.forEach((s, i) => s.classList.toggle('active', i === carousel.currentIndex));

  // Scroll to center active slide using scroll-snap
  if (inner && track) {
    const slide = slides[carousel.currentIndex];
    const slideLeft = slide.offsetLeft;
    const slideWidth = slide.offsetWidth;
    const innerWidth = inner.offsetWidth;
    inner.scrollTo({
      left: slideLeft - (innerWidth / 2) + (slideWidth / 2),
      behavior: 'smooth'
    });
  }

  // Update dots
  updateDots(carousel.currentIndex);
}

function startAutoplay() {
  stopAutoplay(); // Clear existing
  carousel.autoplayInterval = setInterval(() => {
    setActiveSlide(carousel.currentIndex + 1);
  }, 3000);
}

function stopAutoplay() {
  if (carousel.autoplayInterval) {
    clearInterval(carousel.autoplayInterval);
    carousel.autoplayInterval = null;
  }
}


// =========================================
// TAB SWITCHING & CONTENT RENDERING
// =========================================

function setupTabSwitching() {
  const tabButtons = document.querySelectorAll('[data-tab]');

  // Set active button to match initial tab
  tabButtons.forEach(b => {
    b.classList.toggle('active', b.dataset.tab === currentTab);
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      currentTab = tabName;

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Render content for this tab
      renderContent(tabName, catalog.products);
    });
  });
}

function renderContent(tabName, products) {
  const container = document.getElementById('content-area');
  if (!container) return;

  // Clear classes
  container.className = '';

  if (tabName === 'mool-mantra') {
    renderMoolMantraContent(container, products);
  } else {
    renderDiscourseContent(container, tabName, products);
  }
}

// =========================================
// DISCOURSE TABS (All, Life, Gita)
// =========================================

function renderDiscourseContent(container, tabName, products) {
  const productIds = DISCOURSE_GROUPS[tabName];
  const tabProducts = products.filter(p => productIds.includes(p.id));

  const grid = document.createElement('div');
  grid.className = 'discourse-grid';
  grid.innerHTML = tabProducts.map(p => `
    <a href="${p.url}" target="_blank" rel="noopener" class="teaching-card">
      <img src="${p.thumbnail_url}" alt="${p.name}" loading="lazy">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.description || ''}</p>
      </div>
    </a>
  `).join('');

  container.innerHTML = '';
  container.appendChild(grid);
}

// =========================================
// MOOL MANTRA
// =========================================

function renderMoolMantraContent(container, products) {
  const moolMantraIds = DISCOURSE_GROUPS['mool-mantra'];
  const moolMantraGroup = products.filter(p => moolMantraIds.includes(p.id));

  const grid = document.createElement('div');
  grid.className = 'mool-mantra-grid';
  grid.innerHTML = moolMantraGroup.map(p => `
    <a href="${p.url}" target="_blank" rel="noopener" class="compact-card">
      <img src="${p.thumbnail_url}" alt="${p.name}" loading="lazy">
      <div class="compact-body">
        <h4>${p.name}</h4>
      </div>
    </a>
  `).join('');

  container.innerHTML = '';
  container.appendChild(grid);
}
