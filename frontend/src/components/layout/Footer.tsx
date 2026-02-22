import React from 'react'
import Link from 'next/link'
import { assetPath } from '@/lib/utils'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-accent text-white py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img
                src={assetPath('/assets/logo-antaryog.png')}
                alt="AntarYog Foundation Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white/80 text-sm">
              Reviving Vedantic knowledge and creating societal transformation through spiritual wisdom and ancient practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white/80 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="https://learn.antaryogfoundation.in/p/our-work-en" className="text-white/80 hover:text-primary transition-colors">Our Work</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Upcoming Events</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">About Acharya</a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Programs</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://learn.antaryogfoundation.in/l/products?sortKey=recommended&sortDirection=asc&page=1" className="text-white/80 hover:text-primary transition-colors">Discourses</a>
              </li>
              <li>
                <a href="https://learn.antaryogfoundation.in/p/naadi-jyotish" className="text-white/80 hover:text-primary transition-colors">Naadi Jyotish</a>
              </li>
              <li>
                <a href="https://payment.antaryogfoundation.in/soh" className="text-white/80 hover:text-primary transition-colors">Science of Healing</a>
              </li>
              <li>
                <a href="https://vasturupantaran.antaryogfoundation.in/" className="text-white/80 hover:text-primary transition-colors">Vastu Rupantaran</a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AntarYog Foundation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
