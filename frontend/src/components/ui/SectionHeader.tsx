import React from 'react'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  linkText?: string
  linkHref?: string
  layout?: 'row' | 'column'
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  linkText,
  linkHref,
  layout = 'column',
}) => {
  const containerClass = layout === 'row'
    ? 'flex flex-col lg:flex-row justify-between items-start lg:items-center'
    : 'flex flex-col'

  const linkClass = layout === 'row' ? 'mt-6 lg:mt-0' : 'mt-4'

  return (
    <div className={containerClass}>
      <div>
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">{eyebrow}</span>
        <h2 className="text-4xl lg:text-5xl font-bold text-text mt-2">{title}</h2>
        {subtitle && <p className="text-text-secondary text-lg mt-3">{subtitle}</p>}
      </div>
      {linkText && linkHref && (
        <a href={linkHref} className={`${linkClass} text-primary hover:text-accent font-semibold text-lg flex items-center group`}>
          {linkText}
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  )
}
