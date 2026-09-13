import heroPhoto from '../assets/gallery/photo-7.jpeg'
import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'

const heroImageSrc = `${import.meta.env.BASE_URL}wedding_og.png`

// 2027-01-31 14:30–16:00 KST. Keep in sync with public/wedding.ics.
const eventTitle = '누리 ❤︎ 상민 결혼식'
const eventLocation = `${invitation.event.venueName} ${invitation.event.venueHall} (${invitation.event.venueAddress})`
const eventDetails = '누리와 상민의 결혼식에 초대합니다.'

const googleCalendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(eventTitle)}` +
  '&dates=20270131T053000Z/20270131T070000Z' +
  `&location=${encodeURIComponent(eventLocation)}` +
  `&details=${encodeURIComponent(eventDetails)}`

// Android: system "insert event" intent — opens whichever calendar app is the default (Samsung, Google, ...).
const androidCalendarUrl =
  'intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.item/event' +
  `;S.title=${encodeURIComponent(eventTitle)}` +
  `;S.eventLocation=${encodeURIComponent(eventLocation)}` +
  `;S.description=${encodeURIComponent(eventDetails)}` +
  `;l.beginTime=${Date.UTC(2027, 0, 31, 5, 30)};l.endTime=${Date.UTC(2027, 0, 31, 7, 0)}` +
  `;S.browser_fallback_url=${encodeURIComponent(googleCalendarUrl)};end`

// iOS/desktop: static .ics — Safari shows the native "Add to Calendar" sheet without any app.
const isAndroid = /android/i.test(navigator.userAgent)
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
const deviceCalendar = isAndroid
  ? { href: androidCalendarUrl, label: '기본 캘린더' }
  : { href: `${import.meta.env.BASE_URL}wedding.ics`, label: isIOS ? 'iPhone 캘린더' : '캘린더 파일' }

function getDdayLabel() {
  const weddingDay = new Date(2027, 0, 31)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.round((weddingDay.getTime() - today.getTime()) / 86_400_000)

  if (diff > 0) {
    return `D-${diff}`
  }

  return diff === 0 ? 'D-DAY' : `D+${-diff}`
}

export function HeroSection() {
  return (
    <header className="wedding-entrance relative flex min-h-[760px] flex-col justify-between overflow-hidden bg-white px-6 py-8 text-center dark:bg-[#1c1c1e]">
      <div className="wedding-petals" aria-hidden="true" />
      <nav className="relative z-10 flex items-center justify-between text-[12px] text-[#7a7a7a] dark:text-[#98989d]" aria-label="Invitation navigation">
        <span>Wedding</span>
        <a className="text-[#0066cc] no-underline dark:text-[#409cff]" href="#location">오시는 길</a>
      </nav>

      <div className="hero-illustration mx-auto mt-8 flex h-80 w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[36px] bg-[#f5f5f7] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.08)] dark:bg-[#2c2c2e]">
        <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-white">
          <img
            alt="신랑 신부 웨딩 일러스트"
            className="hero-media-illustration absolute inset-0 h-full w-full object-contain"
            src={heroImageSrc}
          />
          <img
            alt="들판에서 함께 웃는 신랑 신부"
            className="hero-media-photo absolute inset-0 h-full w-full object-cover"
            src={heroPhoto}
          />
        </div>
      </div>

      <div className="hero-copy mx-auto max-w-[360px] pb-10">
        <p className="apple-eyebrow mb-2">{invitation.event.dateText} · {invitation.event.timeText}</p>
        <p className="mb-4 font-mono text-[13px] font-semibold tracking-[0.14em] text-[#0066cc] dark:text-[#409cff]">
          {getDdayLabel()}
        </p>
        <h1 className="apple-title mb-5">
          {invitation.couple.bride.name}
          <span className="mx-2 text-[#7a7a7a] dark:text-[#98989d]">&</span>
          {invitation.couple.groom.name}
        </h1>
        <p className="apple-body mb-8 whitespace-pre-line text-[16px] text-[#555555] dark:text-[#c7c7cc]">
          {invitation.event.venueName}
          {'\n'}
          {invitation.event.venueHall}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ActionButton href="#location" variant="primary">위치 보기</ActionButton>
          <ActionButton href={deviceCalendar.href}>{deviceCalendar.label}</ActionButton>
          <ActionButton href={googleCalendarUrl} rel="noreferrer" target="_blank">Google 캘린더</ActionButton>
          <ActionButton href="#contact">연락처</ActionButton>
        </div>
      </div>
    </header>
  )
}
