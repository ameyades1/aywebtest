'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  isLoggedIn: boolean
  firstName: string
  onClose: () => void
  onLogout: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isLoggedIn,
  firstName,
  onClose,
  onLogout,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  useEffect(() => {
    document.body.classList.add('menu-open')
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        id="mobile-menu-backdrop"
        className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div
        id="mobile-menu-panel"
        className="fixed top-20 right-0 h-[calc(100vh-80px)] w-[85vw] max-w-xs bg-white shadow-xl z-40 overflow-y-auto"
      >
        {/* Auth Section */}
        <div className="border-b border-gray-100 p-4">
          {!isLoggedIn ? (
            <div className="flex gap-3">
              <a href="/login" className="flex-1 text-center bg-background text-text px-4 py-2.5 rounded-lg font-semibold hover:bg-section-alt transition-colors text-sm">
                Login
              </a>
              <a href="/signup" className="flex-1 text-center bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-accent transition-colors text-sm">
                Sign Up
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-text">{firstName}</span>
              </div>
              <button
                onClick={() => {
                  onLogout()
                  onClose()
                }}
                className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-1">
          <a href="https://learn.antaryogfoundation.in/p/our-work-en" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
            Our Work
          </a>

          {/* Programs Accordion */}
          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === 'programs' ? null : 'programs')}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors"
            >
              Programs
              <svg
                className={`w-4 h-4 mobile-accordion-chevron ${openAccordion === 'programs' ? 'open' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordion === 'programs' && (
              <div className="mobile-accordion-content open space-y-1">
                <a href="https://learn.antaryogfoundation.in/p/events" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Upcoming Events
                </a>
                <a href="https://learn.antaryogfoundation.in/l/products?sortKey=recommended&sortDirection=asc&page=1" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Discourses
                </a>
                <a href="https://learn.antaryogfoundation.in/p/naadi-jyotish" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Naadi Jyotish
                </a>
                <a href="https://payment.antaryogfoundation.in/soh" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Science of Healing
                </a>
                <a href="https://vasturupantaran.antaryogfoundation.in/" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Vastu Rupantaran
                </a>
                <a href="https://nirjanvas.antaryogfoundation.in/" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Nirjanwas
                </a>
              </div>
            )}
          </div>

          {/* Shibir Accordion */}
          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === 'shibir' ? null : 'shibir')}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors"
            >
              Shibir
              <svg
                className={`w-4 h-4 mobile-accordion-chevron ${openAccordion === 'shibir' ? 'open' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordion === 'shibir' && (
              <div className="mobile-accordion-content open space-y-1">
                <a href="#" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Durga Sapta Shati
                </a>
                <a href="#" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Pitru Rin Mukti
                </a>
                <a href="#" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Shree Vidya
                </a>
                <a href="#" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Navagraha
                </a>
                <a href="#" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
                  Ganesh Vidya
                </a>
              </div>
            )}
          </div>

          <a href="https://payment.antaryogfoundation.in/donation?_gl=1*1bnbpg7*_gcl_au*MTE5OTEwNzg0MC4xNzcxNjcyMzg1" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
            Donate
          </a>
          <a href="https://learn.antaryogfoundation.in/p/press" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
            Newsroom
          </a>
          <a href="https://wellness.antaryogfoundation.in/" className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg transition-colors">
            Store
          </a>
        </div>
      </div>
    </>
  )
}
