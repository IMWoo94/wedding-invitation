import { useState } from 'react'
import phoneBlack from '../assets/icons/phone-black.png'
import phoneGreen from '../assets/icons/phone-green.png'
import { invitation, type ContactPerson } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

type SideKey = 'groom' | 'bride'

const groups: Array<{ key: SideKey; title: string; people: readonly ContactPerson[] }> = [
  { key: 'groom', title: '신랑 측', people: invitation.contacts.groom },
  { key: 'bride', title: '신부 측', people: invitation.contacts.bride },
]

export function ContactSection() {
  const [openGroups, setOpenGroups] = useState<Record<SideKey, boolean>>({ groom: false, bride: false })

  return (
    <Section id="contact" eyebrow="Contact" title="연락처" muted centered>
      <div className="grid gap-3">
        {groups.map((group) => {
          const hasPeople = group.people.length > 0
          const isOpen = hasPeople && openGroups[group.key]

          return (
            <div className="apple-card overflow-hidden text-left" key={group.key}>
              <button
                aria-controls={`contact-panel-${group.key}`}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition active:scale-[0.995] disabled:cursor-default"
                disabled={!hasPeople}
                onClick={() => setOpenGroups((current) => ({ ...current, [group.key]: !current[group.key] }))}
                type="button"
              >
                <span>
                  <span className="apple-caption block font-semibold">{group.title}</span>
                  <span className="apple-caption mt-1 block">
                    {hasPeople
                      ? isOpen
                        ? `연락처 ${group.people.length}개`
                        : '눌러서 연락처를 확인해 주세요.'
                      : '필요 시 공개 예정'}
                  </span>
                </span>
                {hasPeople ? (
                  <span className="shrink-0 text-[13px] font-medium text-[#0066cc] dark:text-[#409cff]">
                    {isOpen ? '접기' : '펼쳐 보기'}
                  </span>
                ) : null}
              </button>
              {isOpen ? (
                <div
                  className="border-t border-[#e8e8ed] px-5 dark:border-[#3a3a3c]"
                  id={`contact-panel-${group.key}`}
                >
                  {group.people.map((person) => (
                    <div
                      className="flex items-center justify-between gap-4 border-b border-[#e8e8ed] py-4 last:border-b-0 dark:border-[#3a3a3c]"
                      key={`${person.relation}-${person.phone}`}
                    >
                      <div>
                        <p className="apple-caption">{person.relation}</p>
                        <p className="mt-0.5 text-lg font-semibold tracking-[-0.03em]">{person.name}</p>
                        <p className="apple-caption mt-0.5">{person.phone}</p>
                      </div>
                      <ActionButton
                        aria-label={`${group.title} ${person.relation} ${person.name}에게 전화`}
                        className="px-3 py-3"
                        href={`tel:${person.phone}`}
                        variant="secondary"
                      >
                        <img alt="" aria-hidden="true" className="h-[18px] w-[18px] dark:hidden" src={phoneBlack} />
                        <img alt="" aria-hidden="true" className="hidden h-[18px] w-[18px] dark:inline-block" src={phoneGreen} />
                      </ActionButton>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
