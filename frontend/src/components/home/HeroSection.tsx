import React from 'react'

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-background via-white to-section-alt pt-8 pb-12 lg:pt-16 lg:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
          {/* Left: Content */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Reviving Ancient Wisdom</span>
              <h1 className="text-5xl lg:text-7xl font-bold text-text mt-3 mb-4 leading-tight">
                Making Bharat a<br className="hidden md:block" /> Vishwa Guru
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-lg">
              Discover the timeless knowledge of Vedanta, spiritual transformation, and sacred sciences under the guidance of Jeevan Mukt Sadguru Acharya Upendra Ji.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://learn.antaryogfoundation.in/l/products" className="inline-flex items-center justify-center bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-semibold transition-colors">
                Explore Programs
              </a>
              <a href="#" className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-colors">
                Learn More
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8 lg:ml-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">50K+</div>
              <p className="text-text-secondary font-medium">Sadhaks Worldwide</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">100+</div>
              <p className="text-text-secondary font-medium">Programs & Courses</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center col-span-2 lg:col-span-1">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">20+</div>
              <p className="text-text-secondary font-medium">Years of Service</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center lg:col-span-1">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">7</div>
              <p className="text-text-secondary font-medium">Ashrams & Centers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
