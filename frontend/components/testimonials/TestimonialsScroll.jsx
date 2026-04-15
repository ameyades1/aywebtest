import React, { useRef, useEffect, useState } from 'react';
import './TestimonialsScroll.css';

const testimonials = [
  {
    id: 1,
    quote: "When we do Guru Kya with all our heart, the things that actually could never happen do manifest automatically.",
    speaker: "Pramesh Ala",
    category: "Career & Prosperity",
    achievement: "Executive promoted to Director"
  },
  {
    id: 2,
    quote: "Due to Guru's grace, I have undergone so much transformation that even those who practice yoga, meditation, etc. for 20 years would not have achieved this much.",
    speaker: "Chinmay Prabhu Ghat",
    category: "Relationships",
    achievement: "Sibling rivalry transformed to love in 2 years"
  },
  {
    id: 3,
    quote: "For Sadguru, a moment is enough to bring about transformation.",
    speaker: "Chinmay Prabhu Ghat",
    category: "Spiritual Growth",
    achievement: "Rapid inner transformation through guidance"
  },
  {
    id: 4,
    quote: "A huge transformation took place when I attended the Durga Saptashati camp during Navratri and learned about relationships from the Bhagavad Gita through Guruji's teachings.",
    speaker: "Chinmay Prabhu Ghat",
    category: "Spiritual Learning",
    achievement: "Understanding of relationships shifted"
  },
  {
    id: 5,
    quote: "The knowledge in Antar Yoga is that which cannot be found anywhere else in the world.",
    speaker: "Seeker",
    category: "Spiritual Wisdom",
    achievement: "Discovered unique spiritual knowledge"
  },
  {
    id: 6,
    quote: "Every word from a living guru transforms your life.",
    speaker: "Devotee",
    category: "Spiritual Path",
    achievement: "Life transformed through guru's guidance"
  }
];

export default function TestimonialsScroll() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    if (!isAutoScroll) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Change testimonial every 8 seconds

    return () => clearInterval(interval);
  }, [isAutoScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targetScroll = currentIndex * container.clientWidth;
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  const handlePrev = () => {
    setIsAutoScroll(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoScroll(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setIsAutoScroll(false);
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials-scroll-section">
      <div className="testimonials-header">
        <h2>Transformations Through Practice</h2>
        <p className="testimonials-subtitle">Real stories from seekers who found clarity and growth</p>
      </div>

      <div className="testimonials-container">
        <div className="testimonials-scroll-track" ref={containerRef}>
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-mark">"</div>

              <p className="quote-text">{testimonial.quote}</p>

              <div className="testimonial-footer">
                <div className="speaker-info">
                  <h4 className="speaker-name">{testimonial.speaker}</h4>
                  <span className="speaker-category">{testimonial.category}</span>
                </div>
                <span className="achievement-badge">{testimonial.achievement}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="nav-arrow nav-arrow-left"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          className="nav-arrow nav-arrow-right"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 19l7-7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="testimonials-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Counter */}
      <div className="testimonials-counter">
        <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="divider">/</span>
        <span className="total">{String(testimonials.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
