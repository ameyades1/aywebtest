import React from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FEATURED_DISCOURSES } from '@/lib/data/discourses'

export const FeaturedDiscourses: React.FC = () => {
  return (
    <section className="py-12 lg:py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          eyebrow="Sacred Knowledge"
          title="Featured Discourses"
          linkText="View All Discourses"
          linkHref="https://learn.antaryogfoundation.in/l/products"
          layout="row"
        />

        {/* 4-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {FEATURED_DISCOURSES.map((discourse) => (
            <div
              key={discourse.id}
              className="discourse-card relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div
                className="absolute top-4 right-4 text-6xl font-bold text-primary/10 select-none leading-none"
                aria-hidden="true"
              >
                {discourse.number}
              </div>
              <div className="mb-4">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {discourse.category}
                </span>
              </div>
              <h3 className="font-bold text-xl text-text leading-snug mb-3 pr-8">
                {discourse.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {discourse.description}
              </p>
              <div className="border-t border-gray-100 mt-4 pt-4">
                <a
                  href={discourse.href}
                  className="text-primary hover:text-accent font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Explore Discourse
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
