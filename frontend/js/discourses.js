/* =========================================
   DISCOURSES PAGE — DISCOURSES.JS
   ========================================= */

const ROOT_PATH = window.ROOT_PATH || '../';

// Product grouping logic
const DISCOURSE_GROUPS = {
  all: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 52, 53, 54, 55, 56],
  life: [10, 11, 12, 13, 14, 16, 17, 18, 19, 20],
  gita: [3, 4, 5, 6, 7, 8, 9, 15, 21],
  navagraha: [22, 23, 24, 25, 26],
  'mool-mantra': [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 50, 51, 47, 49, 48],
};

const CAROUSEL_IDS = [1, 2, 3, 5, 6, 7]; // Featured discourses for carousel

const PLANET_NAMES = {
  22: { symbol: '☉', name: 'Surya', english: 'Sun' },
  23: { symbol: '☽', name: 'Chandra', english: 'Moon' },
  24: { symbol: '♂', name: 'Mangal', english: 'Mars' },
  25: { symbol: '☿', name: 'Budh', english: 'Mercury' },
  26: { symbol: '♃', name: 'Guru', english: 'Jupiter' },
};

let carousel = {
  currentIndex: 0,
  autoplayInterval: null,
  products: [],
};

let catalog = null;
let currentTab = 'all';

// =========================================
// INIT
// =========================================

document.addEventListener('DOMContentLoaded', async () => {
  catalog = await loadCatalog();

  // Initialize carousel
  initCarousel(catalog.products);

  // Render initial content
  renderContent('all', catalog.products);

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
// CAROUSEL
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

  // Spotlight
  const spotlight = document.createElement('div');
  spotlight.className = 'carousel-spotlight';
  spotlight.id = 'carousel-spotlight';
  inner.appendChild(spotlight);

  carouselContainer.appendChild(inner);

  // Arrow buttons
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-arrow prev';
  prevBtn.innerHTML = '&#10094;';
  prevBtn.addEventListener('click', () => {
    setActiveSlide(carousel.currentIndex - 1);
    stopAutoplay();
    startAutoplay();
  });
  carouselContainer.appendChild(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-arrow next';
  nextBtn.innerHTML = '&#10095;';
  nextBtn.addEventListener('click', () => {
    setActiveSlide(carousel.currentIndex + 1);
    stopAutoplay();
    startAutoplay();
  });
  carouselContainer.appendChild(nextBtn);

  // Dots
  const dotsDiv = document.createElement('div');
  dotsDiv.className = 'carousel-dots';
  dotsDiv.id = 'carousel-dots';
  carouselContainer.appendChild(dotsDiv);

  container.appendChild(carouselContainer);

  // Initial render
  setActiveSlide(0);

  // Start autoplay
  startAutoplay();

  // Pause on hover
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
}

function setActiveSlide(index) {
  carousel.currentIndex = index % carousel.products.length;
  const products = carousel.products;

  // Update spotlight
  const spotlight = document.getElementById('carousel-spotlight');
  if (spotlight) {
    const product = products[carousel.currentIndex];
    spotlight.innerHTML = `
      <div class="carousel-split">
        <div class="carousel-text">
          <span class="carousel-badge">${getBadgeText(product)}</span>
          <h2 class="carousel-title">${product.name}</h2>
          <p class="carousel-desc">${product.description || ''}</p>
          <a href="${product.url}" target="_blank" rel="noopener" class="carousel-explore">
            Explore this teaching →
          </a>
        </div>
        <div class="carousel-image">
          <img src="${product.thumbnail_url}" alt="${product.name}" loading="lazy">
        </div>
      </div>
    `;
  }

  // Update dots
  const dots = document.getElementById('carousel-dots');
  if (dots) {
    dots.innerHTML = products.map((_, i) => {
      const isActive = i === carousel.currentIndex ? 'active' : '';
      return `<button class="carousel-dot ${isActive}" data-index="${i}"></button>`;
    }).join('');

    dots.querySelectorAll('.carousel-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        setActiveSlide(idx);
        stopAutoplay();
        startAutoplay();
      });
    });
  }
}

function startAutoplay() {
  stopAutoplay(); // Clear existing
  carousel.autoplayInterval = setInterval(() => {
    setActiveSlide(carousel.currentIndex + 1);
  }, 5000);
}

function stopAutoplay() {
  if (carousel.autoplayInterval) {
    clearInterval(carousel.autoplayInterval);
    carousel.autoplayInterval = null;
  }
}

function getBadgeText(product) {
  if ([3, 4, 5, 6, 7, 8, 9].includes(product.id)) {
    return 'Gita Series';
  }
  if ([15, 21].includes(product.id)) {
    return 'Upanishads';
  }
  if ([16, 17, 18, 19].includes(product.id)) {
    return 'Advanced';
  }
  return 'Discourse';
}

// =========================================
// TAB SWITCHING & CONTENT RENDERING
// =========================================

function setupTabSwitching() {
  const tabButtons = document.querySelectorAll('[data-tab]');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      currentTab = tabName;

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Render content for this tab
      renderContent(tabName, catalog.products);

      // Smooth scroll to content area
      document.getElementById('content-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderContent(tabName, products) {
  const container = document.getElementById('content-area');
  if (!container) return;

  // Clear classes
  container.className = '';

  if (tabName === 'navagraha') {
    renderNavagrahaContent(container, products);
  } else if (tabName === 'mool-mantra') {
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
// NAVAGRAHA
// =========================================

function renderNavagrahaContent(container, products) {
  container.className = '';

  const planetsGroup = products.filter(p => p.id >= 22 && p.id <= 26);

  const grid = document.createElement('div');
  grid.className = 'planet-grid';
  grid.innerHTML = planetsGroup.map(p => {
    const planet = PLANET_NAMES[p.id] || { symbol: '☆', name: 'Unknown', english: '' };
    return `
      <a href="${p.url}" target="_blank" rel="noopener" class="planet-card">
        <img src="${p.thumbnail_url}" alt="${planet.name}" loading="lazy">
        <div class="card-body">
          <h3>${planet.name}</h3>
          <p>${planet.english}</p>
        </div>
      </a>
    `;
  }).join('');

  container.innerHTML = '';
  container.appendChild(grid);
}

// =========================================
// MOOL MANTRA
// =========================================

function renderMoolMantraContent(container, products) {
  const moolMantraGroup = products.filter(p => p.id >= 27 && p.id <= 51);

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
