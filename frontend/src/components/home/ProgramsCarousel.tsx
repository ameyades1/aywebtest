'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PROGRAMS } from '@/lib/data/programs'
import { assetPath } from '@/lib/utils'

export const ProgramsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollTrackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(PROGRAMS.length - 1, prev + 1))
  }

  const handleDot = (index: number) => {
    setCurrentIndex(index)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollTrackRef.current) return
    const diff = e.clientX - dragStart
    if (Math.abs(diff) > 50) {
      if (diff > 0) handlePrev()
      else handleNext()
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Scroll to current index
  useEffect(() => {
    if (scrollTrackRef.current) {
      const scrollTrack = scrollTrackRef.current
      const cards = scrollTrack.querySelectorAll('.prog-card')
      if (cards[currentIndex]) {
        const card = cards[currentIndex] as HTMLElement
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      }
    }
  }, [currentIndex])

  return (
    <section id="programs" className="pt-8 pb-10 lg:pt-14 lg:pb-16 bg-gradient-to-b from-background to-white overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-8">
        <SectionHeader
          eyebrow="Ancient Wisdom"
          title="Our Programs"
        />
      </div>

      {/* Scroll Track */}
      <div
        ref={scrollTrackRef}
        className={`prog-scroll-track ${isDragging ? 'grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {PROGRAMS.map((program, index) => (
          <div
            key={program.id}
            className={`prog-card ${index === currentIndex ? 'active' : ''}`}
            data-index={index}
          >
            <img
              src={assetPath(program.imageUrl)}
              alt={program.imageAlt}
              className="prog-card-img"
            />
            <div className="prog-card-overlay">
              <div className="prog-card-number">{program.number}</div>
              <h3 className="prog-card-title">{program.title}</h3>
              <p className="prog-card-desc">{program.description}</p>
              <a href={program.href} className="prog-card-cta">
                Explore Program →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 lg:px-8 mt-6">
        <div className="flex items-center justify-center gap-5">
          <button
            id="prog-prev"
            className="prog-arrow"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous program"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div id="prog-dots" className="flex gap-2">
            {PROGRAMS.map((_, index) => (
              <button
                key={index}
                className={`prog-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDot(index)}
                aria-label={`Go to program ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            id="prog-next"
            className="prog-arrow"
            onClick={handleNext}
            disabled={currentIndex === PROGRAMS.length - 1}
            aria-label="Next program"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
