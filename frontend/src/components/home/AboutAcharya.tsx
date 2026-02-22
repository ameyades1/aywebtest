import React from 'react'

export const AboutAcharya: React.FC = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-4 items-center">
          {/* Image */}
          <div className="max-w-lg">
            <div className="relative">
              <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/founder/acharya-upendra-ji-alt.jpg"
                  alt="Acharya Upendra Ji - Founder, AntarYog Foundation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Jeevan Mukt Sadguru</span>
              <h2 className="text-5xl lg:text-6xl font-bold text-text mt-3 mb-6">Meet Acharya Upendra Ji</h2>
            </div>

            <div className="text-xl lg:text-2xl text-text-secondary space-y-4">
              <p>
                A Jeevan Mukt Sadguru, Acharya Upendra Ji is a beacon of spiritual wisdom, dedicated to reviving the ancient knowledge of Sanatan Dharma and making Bharat a Vishwa Guru.
              </p>
              <p>
                With profound expertise in Vedanta, Yoga, Naadi Jyotish, and ancient healing sciences, he guides thousands on the path of self-realization and spiritual transformation.
              </p>
              <p>
                His vision encompasses the holistic development of individuals and society through the re-establishment of timeless spiritual principles, empowering youth leadership, and fostering national transformation.
              </p>
            </div>

            <div className="pt-6">
              <a href="#" className="inline-flex items-center text-primary hover:text-accent font-semibold text-xl group">
                Know the Master
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
