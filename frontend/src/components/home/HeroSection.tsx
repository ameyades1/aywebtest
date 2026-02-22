import React from 'react'
import { assetPath } from '@/lib/utils'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-white overflow-hidden">
      {/* Background image - very subtle */}
      <div className="absolute inset-0 opacity-5">
        <img src={assetPath('/assets/visuals/antar-yog-overview.jpg')} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 pt-8 lg:pt-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Hero Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">Under the Guidance of Jeevan Mukt Sadguru</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-text leading-tight">
              Making Bharat a <span className="text-primary">Vishwa Guru</span> and a Superpower
            </h1>

            <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed">
              Reviving the timeless knowledge of ancient scriptures under the guidance of Acharya Upendra Ji.
              <br />
              Re-establishing Sanatan Dharma for Global Transformation
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#programs" className="bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-semibold text-center transition-all transform hover:scale-105 shadow-lg">
                Explore Our Programs
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-text-secondary mt-1">Lives Transformed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-text-secondary mt-1">Events Conducted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-text-secondary mt-1">Cities Reached</div>
              </div>
            </div>
          </div>

          {/* Right: Visual element (could be added later) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
