import React from 'react'
import { assetPath } from '@/lib/utils'

export const JoinMovementCTA: React.FC = () => {
  return (
    <section id="daily-meditation" className="pt-8 pb-10 lg:pt-14 lg:pb-16 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={assetPath('/assets/visuals/antar-yog-overview.jpg')}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">Be Part of the Transformation</h2>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Volunteer */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-text mb-6">Serve the Mission</h3>
            <a href="#" className="inline-flex items-center justify-center w-full bg-primary hover:bg-accent text-white px-6 py-3 rounded-full font-semibold transition-all">
              Become a Volunteer
            </a>
          </div>

          {/* Donate */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-text mb-6">Support Our Work</h3>
            <a href="https://payment.antaryogfoundation.in/donation?_gl=1*1bnbpg7*_gcl_au*MTE5OTEwNzg0MC4xNzcxNjcyMzg1" className="inline-flex items-center justify-center w-full bg-primary hover:bg-accent text-white px-6 py-3 rounded-full font-semibold transition-all">
              Make a Donation
            </a>
          </div>

          {/* Daily Meditation */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-text mb-6">Join Daily Sadhana</h3>
            <a href="#" className="inline-flex items-center justify-center w-full bg-primary hover:bg-accent text-white px-6 py-3 rounded-full font-semibold transition-all">
              Start Meditating
            </a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <p className="text-white/90 text-lg mb-4">Connect with us on social media for daily inspiration</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
