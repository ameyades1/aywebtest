'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { assetPath } from '@/lib/utils'

export const Header: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [firstName, setFirstName] = useState('')

  // Initialize auth state from localStorage on mount
  React.useEffect(() => {
    const firstName = localStorage.getItem('firstName')
    const userEmail = localStorage.getItem('userEmail')
    if (firstName && userEmail) {
      setFirstName(firstName)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('firstName')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    setFirstName('')
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img
                  src={assetPath('/assets/logo-antaryog.png')}
                  alt="AntarYog Foundation Logo"
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            {/* Right: Navigation, Actions, and Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                <a href="https://learn.antaryogfoundation.in/p/our-work-en" className="text-text hover:text-primary transition-colors font-medium text-sm">
                  Our Work
                </a>

                {/* Programs dropdown */}
                <div className="nav-dropdown">
                  <button
                    className="flex items-center gap-1 text-text hover:text-primary transition-colors font-medium text-sm"
                    onClick={() => setOpenDropdown(openDropdown === 'programs' ? null : 'programs')}
                  >
                    Programs
                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'programs' && (
                    <div className="nav-dropdown-panel">
                      <a href="https://learn.antaryogfoundation.in/p/events">Upcoming Events</a>
                      <a href="https://learn.antaryogfoundation.in/l/products?sortKey=recommended&sortDirection=asc&page=1">Discourses</a>
                      <a href="https://learn.antaryogfoundation.in/p/naadi-jyotish">Naadi Jyotish</a>
                      <a href="https://payment.antaryogfoundation.in/soh">Science of Healing</a>
                      <a href="https://vasturupantaran.antaryogfoundation.in/">Vastu Rupantaran</a>
                      <a href="https://nirjanvas.antaryogfoundation.in/">Nirjanwas</a>
                    </div>
                  )}
                </div>

                {/* Shibir dropdown */}
                <div className="nav-dropdown">
                  <button
                    className="flex items-center gap-1 text-text hover:text-primary transition-colors font-medium text-sm"
                    onClick={() => setOpenDropdown(openDropdown === 'shibir' ? null : 'shibir')}
                  >
                    Shibir
                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'shibir' && (
                    <div className="nav-dropdown-panel">
                      <a href="#">Durga Sapta Shati</a>
                      <a href="#">Pitru Rin Mukti</a>
                      <a href="#">Shree Vidya</a>
                      <a href="#">Navagraha</a>
                      <a href="#">Ganesh Vidya</a>
                    </div>
                  )}
                </div>

                <a href="https://payment.antaryogfoundation.in/donation?_gl=1*1bnbpg7*_gcl_au*MTE5OTEwNzg0MC4xNzcxNjcyMzg1" className="text-text hover:text-primary transition-colors font-medium text-sm">
                  Donate
                </a>
                <a href="https://learn.antaryogfoundation.in/p/press" className="text-text hover:text-primary transition-colors font-medium text-sm">
                  Newsroom
                </a>
                <a href="https://wellness.antaryogfoundation.in/" className="text-text hover:text-primary transition-colors font-medium text-sm">
                  Store
                </a>
              </div>

              {/* Separator */}
              <div className="hidden lg:block w-px h-6 bg-gray-300"></div>

              {/* Desktop auth */}
              <div className="hidden lg:flex items-center gap-3">
                {!isLoggedIn ? (
                  <>
                    <a href="/login" className="text-text hover:text-primary transition-colors font-medium">
                      Login
                    </a>
                    <a href="/signup" className="bg-primary hover:bg-accent text-white px-6 py-2.5 rounded-full font-medium transition-colors">
                      Sign Up
                    </a>
                    <button className="text-text hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-accent transition-colors">
                      <span>{firstName}</span>
                      <svg className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-text hover:bg-background rounded-lg transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          firstName={firstName}
          onClose={() => setMobileMenuOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}
