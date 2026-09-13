import { invitation, type ContactPerson } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

const groups: Array<{ key: string; title: string; people: readonly ContactPerson[] }> = [
  { key: 'groom', title: '신랑 측', people: invitation.contacts.groom },
  { key: 'bride', title: '신부 측', people: invitation.contacts.bride },
]

export function ContactSection() {
  return (
    <Section id="contact" eyebrow="Contact" title="연락처" muted centered>
      <div className="grid gap-3">
        {groups.map((group) => (
          <div className="apple-card px-5 py-4 text-left" key={group.key}>
            <p className="apple-caption font-semibold">{group.title}</p>
            {group.people.length ? (
              <div>
                {group.people.map((person) => (
                  <div
                    className="flex items-center justify-between gap-4 border-b border-[#e8e8ed] py-4 last:border-b-0 last:pb-1 dark:border-[#3a3a3c]"
                    key={`${person.relation}-${person.phone}`}
                  >
                    <div>
                      <p className="apple-caption">{person.relation}</p>
                      <p className="mt-0.5 text-lg font-semibold tracking-[-0.03em]">{person.name}</p>
                      <p className="apple-caption mt-0.5">{person.phone}</p>
                    </div>
                    <ActionButton
                      aria-label={`${group.title} ${person.relation} ${person.name}에게 전화`}
                      href={`tel:${person.phone}`}
                      variant="secondary"
                    >
                      전화
                    </ActionButton>
                  </div>
                ))}
              </div>
            ) : (
              <p className="apple-caption mt-3 pb-1">필요 시 공개 예정</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
