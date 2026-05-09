import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

export function ContactSection() {
  const people = [invitation.couple.groom, invitation.couple.bride]

  return (
    <Section id="contact" eyebrow="Contact" title="연락처" muted centered>
      <div className="grid gap-3">
        {people.map((person) => (
          <div className="apple-card flex items-center justify-between gap-4 p-5 text-left" key={person.role}>
            <div>
              <p className="apple-caption">{person.phone.label}</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">{person.fullName}</p>
              <p className="apple-caption mt-1">{person.phone.enabled ? person.phone.value : person.phone.placeholder}</p>
            </div>
            <ActionButton
              aria-disabled={!person.phone.enabled}
              className={!person.phone.enabled ? 'pointer-events-none opacity-50' : ''}
              href={person.phone.enabled ? `tel:${person.phone.value}` : '#contact'}
              variant="secondary"
            >
              전화
            </ActionButton>
          </div>
        ))}
      </div>
    </Section>
  )
}
