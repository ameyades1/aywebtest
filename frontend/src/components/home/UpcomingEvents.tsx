import React from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { UPCOMING_EVENTS } from '@/lib/data/events'

export const UpcomingEvents: React.FC = () => {
  return (
    <section className="pt-8 pb-10 lg:pt-14 lg:pb-16 bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Transformative Experiences"
          title="Upcoming Events"
          linkText="View All Events"
          linkHref="#"
          layout="row"
        />

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="p-5">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {event.dateRange}
                  </div>
                  <div className="flex items-center text-text-secondary text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">{event.title}</h3>
                <p className="text-text-secondary mb-4">{event.description}</p>
                <a href={event.href} className="inline-flex items-center justify-center w-full bg-primary hover:bg-accent text-white px-6 py-3 rounded-full font-semibold transition-all">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
