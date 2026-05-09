import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

export function LocationSection() {
  const { event } = invitation

  return (
    <Section id="location" eyebrow="Location" title="오시는 길" muted>
      <div className="apple-card overflow-hidden">
        <div className="flex h-56 items-center justify-center bg-[#272729] px-6 text-white">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-[#cccccc]">Wedding Venue</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{event.venueName}</p>
            <p className="mt-2 text-lg text-[#f5f5f7]">{event.venueHall}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="mb-2 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">{event.venueName}</p>
          <dl className="grid gap-3">
            <div>
              <dt className="apple-caption">일시</dt>
              <dd className="apple-body mt-1">{event.dateText} · {event.timeText}</dd>
            </div>
            <div>
              <dt className="apple-caption">예식홀</dt>
              <dd className="apple-body mt-1">{event.venueHall}</dd>
            </div>
            <div>
              <dt className="apple-caption">주소</dt>
              <dd className="apple-body mt-1">{event.venueAddress}</dd>
            </div>
            <div>
              <dt className="apple-caption">대중교통</dt>
              <dd className="apple-body mt-1">{event.transitText}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton href={event.mapLinks.naver} target="_blank" rel="noreferrer" variant="primary">네이버 지도</ActionButton>
            <ActionButton href={event.mapLinks.kakao} target="_blank" rel="noreferrer">카카오맵</ActionButton>
            <ActionButton href={event.mapLinks.google} target="_blank" rel="noreferrer">구글맵</ActionButton>
          </div>
        </div>
      </div>
    </Section>
  )
}
