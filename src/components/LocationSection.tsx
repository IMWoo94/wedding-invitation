import { useState } from 'react'
import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

const venueMapSrc = `${import.meta.env.BASE_URL}${invitation.event.venueMapImage}`

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function LocationSection() {
  const { event } = invitation
  const [copyLabel, setCopyLabel] = useState('주소 복사')
  const [isMapExpanded, setIsMapExpanded] = useState(false)

  const handleCopyAddress = async () => {
    try {
      await copyTextToClipboard(event.venueAddress)
      setCopyLabel('복사 완료')
      window.setTimeout(() => setCopyLabel('주소 복사'), 1800)
    } catch {
      setCopyLabel('복사 실패')
      window.setTimeout(() => setCopyLabel('주소 복사'), 1800)
    }
  }

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
              <dd className="mt-2 flex flex-wrap items-center gap-2">
                <span className="apple-body">{event.venueAddress}</span>
                <ActionButton
                  aria-label={`${event.venueAddress} 주소 복사`}
                  className="px-3 py-2 text-[13px]"
                  onClick={handleCopyAddress}
                >
                  {copyLabel}
                </ActionButton>
              </dd>
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
        <div className="border-t border-[#e0e0e0] bg-white p-4">
          <button
            aria-controls="venue-map-panel"
            aria-expanded={isMapExpanded}
            className="flex w-full items-center justify-between rounded-[16px] border border-[#e0e0e0] bg-[#fafafc] px-4 py-3 text-left transition active:scale-[0.99]"
            type="button"
            onClick={() => setIsMapExpanded((expanded) => !expanded)}
          >
            <span>
              <span className="block text-[15px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">M스타하우스 약도</span>
              <span className="apple-caption mt-1 block">필요하실 때 펼쳐서 확인해 주세요.</span>
            </span>
            <span className="text-[13px] font-medium text-[#0066cc]">
              {isMapExpanded ? '접기' : '펼쳐 보기'}
            </span>
          </button>
          {isMapExpanded ? (
            <div id="venue-map-panel" className="mt-4">
              <a
                aria-label="M스타하우스 약도 이미지 새 창에서 보기"
                className="block overflow-hidden rounded-[18px] border border-[#e0e0e0] bg-white"
                href={venueMapSrc}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="M스타하우스 웨딩&컨벤션 약도와 교통 안내"
                  className="h-auto w-full"
                  loading="lazy"
                  src={venueMapSrc}
                />
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
