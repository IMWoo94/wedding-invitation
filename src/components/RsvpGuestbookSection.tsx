import { useState } from 'react'
import { GuestbookCard } from './GuestbookSection'
import { RsvpCard, segmentClass } from './RsvpSection'
import { Section } from './Section'

type Tab = 'rsvp' | 'guestbook'

const tabs: Array<{ value: Tab; label: string }> = [
  { value: 'rsvp', label: '참석 의사 전하기' },
  { value: 'guestbook', label: '축하 메시지' },
]

export function RsvpGuestbookSection() {
  const [activeTab, setActiveTab] = useState<Tab>('rsvp')

  return (
    <Section id="rsvp" eyebrow="RSVP · Guestbook" title="마음 남기기" muted centered>
      <div className="mb-5 flex justify-center gap-2" role="tablist" aria-label="참석 의사와 축하 메시지 선택">
        {tabs.map((tab) => (
          <button
            aria-selected={activeTab === tab.value}
            className={segmentClass(activeTab === tab.value)}
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Keep both mounted so typed input survives tab switches. */}
      <div className={activeTab === 'rsvp' ? '' : 'hidden'}>
        <RsvpCard />
      </div>
      <div className={activeTab === 'guestbook' ? '' : 'hidden'}>
        <GuestbookCard />
      </div>
    </Section>
  )
}
