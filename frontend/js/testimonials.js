/* =====================================================
   TESTIMONIALS CAROUSEL
   ===================================================== */

function initTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  const outer = document.getElementById('testimonials-track-outer');
  const dots  = document.querySelectorAll('.tdot');
  const cards = document.querySelectorAll('.tcard');
  const btnPrev = document.getElementById('tcard-prev');
  const btnNext = document.getElementById('tcard-next');

  // Guard: exit if elements not found
  if (!outer || !cards.length || !btnPrev || !btnNext) return;

  let current = 0;
  const cardWidth = cards[0].offsetWidth;
  const gap = 20; // matches CSS gap

  function scrollToCard(index) {
    current = Math.max(0, Math.min(index, cards.length - 1));
    const scrollLeft = current * (cardWidth + gap);
    outer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
    updateDots();
  }

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => scrollToCard(+dot.dataset.index));
  });

  // Arrow clicks
  btnPrev.addEventListener('click', () => scrollToCard(current - 1));
  btnNext.addEventListener('click', () => scrollToCard(current + 1));

  // Sync dots on native scroll
  let scrollTimer;
  outer.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      current = Math.round(outer.scrollLeft / (cardWidth + gap));
      current = Math.max(0, Math.min(current, cards.length - 1));
      updateDots();
    }, 80);
  });
}

// Auto-init when DOM is ready (if component is already loaded)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);
} else {
  initTestimonialsCarousel();
}
