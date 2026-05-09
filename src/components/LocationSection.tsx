import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

export function LocationSection() {
  const { event } = invitation

  return (
    <Section id="location" eyebrow="Location" title="오시는 길" muted>
      <div className="apple-card overflow-hidden">
        <div className="flex h-52 items-center justify-center bg-[#272729] text-white">
          <div className="text-center">
            <p className="text-sm text-[#cccccc]">MAP</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{event.venueName}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="mb-2 text-lg font-semibold tracking-[-0.03em] text-[#1d1d1f]">{event.venueName}</p>
          <p className="apple-body">{event.venueAddress}</p>
          <p className="apple-caption mt-3">지도 링크는 장소 확정 후 추가 예정입니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton href={event.mapLinks.naver || '#location'} variant="primary">네이버 지도</ActionButton>
            <ActionButton href={event.mapLinks.kakao || '#location'}>카카오맵</ActionButton>
            <ActionButton href={event.mapLinks.google || '#location'}>구글맵</ActionButton>
          </div>
        </div>
      </div>
    </Section>
  )
}
