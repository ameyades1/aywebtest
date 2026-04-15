// =====================================================
// TEXT TESTIMONIALS SCROLL — Carousel Functionality
// =====================================================

function initializeTestimonials() {
  const testimonials = [
    {
      quote: "When we do Guru Kya with all our heart, the things that actually could never happen do manifest automatically.",
      speaker: "Pramesh Ala"
    },
    {
      quote: "Due to Guru's grace, I have undergone so much transformation that even those who practice yoga, meditation, etc. for 20 years would not have achieved this much.",
      speaker: "Chinmay Prabhu Ghat"
    },
    {
      quote: "For Sadguru, a moment is enough to bring about transformation.",
      speaker: "Chinmay Prabhu Ghat"
    },
    {
      quote: "A huge transformation took place when I attended the Durga Saptashati camp during Navratri and learned about relationships from the Bhagavad Gita through Guruji's teachings.",
      speaker: "Chinmay Prabhu Ghat"
    },
    {
      quote: "The knowledge in Antar Yoga is that which cannot be found anywhere else in the world.",
      speaker: "Seeker"
    },
    {
      quote: "Every word from a living guru transforms your life.",
      speaker: "Devotee"
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
          <p class="text-tcard-speaker">${testimonial.speaker}</p>
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

  renderCards();
}
