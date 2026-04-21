// =====================================================
// VIDEO TESTIMONIALS CAROUSEL — Naadi Jyotish Page
// =====================================================

function initializeVideoTestimonials() {
  // Naadi-specific video testimonials
  const videoTestimonials = [
    {
      id: 26,
      title: "Antar Yog Naadi Jyotish Changed Our Life",
      url: "https://www.youtube.com/watch?v=wCpwP3_ixUc",
      youtubeId: "wCpwP3_ixUc",
      description: "Success in marriage and career"
    },
    {
      id: 31,
      title: "How Antar Yog Naadi Astrology Helped Manali Realise Her Dream of Motherhood",
      url: "https://www.youtube.com/watch?v=M-IxuaxQFW8",
      youtubeId: "M-IxuaxQFW8",
      description: "Health and motherhood transformation"
    },
    {
      id: 38,
      title: "How My Health, Wealth and Relationships Transformed Completely After Joining Antar Yog",
      url: "https://www.youtube.com/watch?v=z_XHAqg1lvE",
      youtubeId: "z_XHAqg1lvE",
      description: "Complete life transformation"
    }
  ];

  const track = document.getElementById('video-testimonials-track');
  const dotsContainer = document.getElementById('video-testimonials-dots');
  const trackOuter = document.getElementById('video-testimonials-track-outer');
  const prevBtn = document.getElementById('video-tcard-prev');
  const nextBtn = document.getElementById('video-tcard-next');
  const lightbox = document.getElementById('video-lightbox');
  const lightboxClose = document.getElementById('video-lightbox-close');
  const lightboxPlayer = document.getElementById('video-lightbox-player');

  if (!track) return;

  function renderCards() {
    videoTestimonials.forEach((testimonial, index) => {
      const card = document.createElement('div');
      card.className = 'video-tcard';
      card.innerHTML = `
        <div class="video-tcard__thumbnail" style="background-image: url('https://img.youtube.com/vi/${testimonial.youtubeId}/sddefault.jpg');">
          <button class="video-tcard__play-btn" aria-label="Play video: ${testimonial.title}">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </button>
        </div>
        <div class="video-tcard__content">
          <h4 class="video-tcard__title">${testimonial.title}</h4>
          <p class="video-tcard__description">${testimonial.description}</p>
        </div>
      `;

      const playBtn = card.querySelector('.video-tcard__play-btn');
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openVideoLightbox(testimonial.youtubeId, testimonial.title);
      });

      track.appendChild(card);

      // Create dot
      const dot = document.createElement('button');
      dot.className = `video-tdot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Video testimonial ${index + 1}`);
      dot.addEventListener('click', () => scrollToCard(index));
      dotsContainer.appendChild(dot);
    });
  }

  function scrollToCard(index) {
    const cardWidth = track.children[0].offsetWidth + 20; // card width + gap
    trackOuter.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    updateDots(index);
  }

  function updateDots(index) {
    document.querySelectorAll('.video-tdot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function openVideoLightbox(youtubeId, title) {
    lightboxPlayer.innerHTML = `
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"
        title="${title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeVideoLightbox() {
    lightbox.style.display = 'none';
    lightboxPlayer.innerHTML = '';
    document.body.style.overflow = 'auto';
  }

  prevBtn.addEventListener('click', () => {
    const currentScroll = trackOuter.scrollLeft;
    const cardWidth = track.children[0].offsetWidth + 20;
    const currentIndex = Math.round(currentScroll / cardWidth);
    const targetIndex = Math.max(0, currentIndex - 1);
    scrollToCard(targetIndex);
  });

  nextBtn.addEventListener('click', () => {
    const currentScroll = trackOuter.scrollLeft;
    const cardWidth = track.children[0].offsetWidth + 20;
    const currentIndex = Math.round(currentScroll / cardWidth);
    const targetIndex = Math.min(videoTestimonials.length - 1, currentIndex + 1);
    scrollToCard(targetIndex);
  });

  // Update dots when user scrolls naturally
  trackOuter.addEventListener('scroll', () => {
    const currentScroll = trackOuter.scrollLeft;
    const cardWidth = track.children[0].offsetWidth + 20;
    const currentIndex = Math.round(currentScroll / cardWidth);
    updateDots(currentIndex);
  });

  // Lightbox controls
  lightboxClose.addEventListener('click', closeVideoLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeVideoLightbox();
    }
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('video-lightbox__overlay')) {
      closeVideoLightbox();
    }
  });

  renderCards();
}
