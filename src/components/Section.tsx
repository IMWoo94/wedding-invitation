import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  eyebrow?: string
  title?: string
  muted?: boolean
  centered?: boolean
  children: ReactNode
}

export function Section({ id, eyebrow, title, muted = false, centered = false, children }: SectionProps) {
  return (
    <section id={id} className={`apple-section ${muted ? 'apple-section-muted' : ''}`}>
      <span className="section-petals" aria-hidden="true" />
      <div className={`section-content ${centered ? 'text-center' : ''}`}>
        {eyebrow ? <p className="apple-eyebrow mb-3">{eyebrow}</p> : null}
        {title ? <h2 className="apple-heading mb-6">{title}</h2> : null}
        {children}
      </div>
    </section>
  )
}
