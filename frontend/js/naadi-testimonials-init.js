// =====================================================
// NAADI JYOTISH TESTIMONIALS INITIALIZATION
// Handles both text and video testimonials carousels
// =====================================================

// Initialize text testimonials carousel
function initializeNaadiTextTestimonials() {
  const testimonials = [
    {
      name: "Gopal Chitre",
      role: "Manager, National Stock Exchange",
      quote: "Within a few days after sincerely completing all the remedies prescribed in my Antar Yog Naadi reading, I received a job offer from one of the largest stock exchange companies in the world i.e., the National Stock Exchange (NSE) of India without applying for it.",
      category: "career",
      imageUrl: "https://uploads.teachablecdn.com/attachments/EwcDCZySOikjKvqQE_Gopal+Chitre.png"
    },
    {
      name: "Dr. Aishwarya Kharade",
      role: "Dentist, Public Health Professional",
      quote: "Within a week of completing the prescribed Antar Yog Naadi Jyotish remedies, I witnessed Acharya Upendra Ji's divine grace when my parents gave their long awaited blessings for our marriage.",
      category: "relationships",
      imageUrl: "https://uploads.teachablecdn.com/attachments/Aem5Ii7FRJoBXOwhJKC3_Ashwarya+kharade.png"
    },
    {
      name: "Anuradha Bhole",
      role: "Business Development Manager, Hindustan Vibrotech Pvt. Ltd",
      quote: "After attending various discourses and faithfully completing all the prescribed remedies, this severe health issue was negated with a minor discomfort.",
      category: "health",
      imageUrl: "https://uploads.teachablecdn.com/attachments/U9n8NicMQK9e4jrg5HWX_Anuradha+Bhole.png"
    },
    {
      name: "Renuka Purandare",
      role: "Student, Masters in Entertainment Media & Advertising",
      quote: "After sincerely completing all the remedies, attending shibirs and correcting all mistakes, today I am studying in one of the leading colleges in India and passing with flying colours every semester.",
      category: "education",
      imageUrl: "https://uploads.teachablecdn.com/attachments/q7DDCNAUntJu3LKX2XvYA_Renuka+Purandare.png"
    },
    {
      name: "Hemant Sathe",
      role: "Project Manager, Siemens Mobility",
      quote: "I followed their guidance and performed remedies with full faith. Soon after, my career soared, I got my dream job at a prestigious organisation.",
      category: "career",
      imageUrl: "https://uploads.teachablecdn.com/attachments/HEgBARPrT6uQgjrSqZsT_Hemant+Sathe.png"
    }
  ];

  const track = document.getElementById('text-testimonials-track');
  const dotsContainer = document.getElementById('text-testimonials-dots');
  const trackOuter = document.getElementById('text-testimonials-track-outer');
  const prevBtn = document.getElementById('text-tcard-prev');
  const nextBtn = document.getElementById('text-tcard-next');

  if (!track) return;

  function renderCards() {
    testimonials.forEach((testimonial, index) => {
      const card = document.createElement('div');
      card.className = 'text-tcard';
      card.innerHTML = `
        <div class="text-tcard-mark">"</div>
        <p class="text-tcard-quote">${testimonial.quote}</p>
        <div class="text-tcard-footer">
          <p class="text-tcard-speaker">${testimonial.name}</p>
          <p class="text-tcard-category">${testimonial.category}</p>
        </div>
      `;
      track.appendChild(card);

      const dot = document.createElement('button');
      dot.className = `text-tdot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Testimonial ${index + 1}`);
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
    document.querySelectorAll('.text-tdot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
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
    const targetIndex = Math.min(testimonials.length - 1, currentIndex + 1);
    scrollToCard(targetIndex);
  });

  // Update dots when user scrolls naturally (swipe on mobile)
  trackOuter.addEventListener('scroll', () => {
    const currentScroll = trackOuter.scrollLeft;
    const cardWidth = track.children[0].offsetWidth + 20;
    const currentIndex = Math.round(currentScroll / cardWidth);
    updateDots(currentIndex);
  });

  renderCards();
}

// Initialize video testimonials carousel
function initializeNaadiVideoTestimonials() {
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

// Initialize both carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeNaadiTextTestimonials();
  initializeNaadiVideoTestimonials();
});
