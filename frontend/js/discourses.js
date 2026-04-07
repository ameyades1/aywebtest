/* =========================================
   DISCOURSES PAGE — DISCOURSES.JS
   ========================================= */

const ROOT_PATH = window.ROOT_PATH || '../';

// Product grouping logic
const DISCOURSE_GROUPS = {
  'life-lessons': [10, 11, 12, 13, 17, 20],
  'wealth-leadership': [1, 2, 5, 8, 16, 18],
  gita: [3, 4, 5, 6, 7, 8, 9, 15, 21],
  navagraha: [14, 22, 23, 24, 25, 26],
  'mool-mantra': [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
  'other-chants': [19, 20, 52, 53, 54, 55, 56],
  all: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 52, 53, 54, 55, 56],
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

  // Render initial content
  renderContent('life-lessons', catalog.products);

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
  const total = carousel.products.length;
  carousel.currentIndex = ((index % total) + total) % total;

  // Update slides active state
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach((slide, i) => {
    const isActive = i === carousel.currentIndex;
    slide.classList.toggle('active', isActive);

    // Remove any existing click listeners by cloning (removes all listeners)
    if (slide.parentNode) {
      const newSlide = slide.cloneNode(true);
      slide.parentNode.replaceChild(newSlide, slide);

      // For inactive slides, prevent default link behavior and navigate carousel instead
      if (!isActive) {
        newSlide.addEventListener('click', (e) => {
          e.preventDefault();
          setActiveSlide(i);
          stopAutoplay();
          startAutoplay();
        });
      }
    }
  });

  // Shift track to center active slide
  const track = document.getElementById('carousel-track');
  if (track) {
    // Each slide is 75% + 16px gap
    // To center active slide: offset = -(currentIndex * (75% + 16px)) + container center compensation
    const slideWidth = 75; // percent
    const slideGap = 16; // pixels
    const containerWidth = track.parentElement.offsetWidth;

    // Calculate offset: position active slide to center of container
    const slideWidthPx = (slideWidth / 100) * containerWidth;
    const totalSlideWithGap = slideWidthPx + slideGap;
    const offset = -(carousel.currentIndex * totalSlideWithGap) + (containerWidth / 2) - (slideWidthPx / 2);

    track.style.transform = `translateX(${offset}px)`;
  }

  // Update dots
  const dots = document.getElementById('carousel-dots');
  if (dots) {
    dots.innerHTML = carousel.products.map((_, i) => {
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
