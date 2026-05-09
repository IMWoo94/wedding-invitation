import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'

const heroImageSrc = `${import.meta.env.BASE_URL}wedding_og.png`

export function HeroSection() {
  return (
    <header className="wedding-entrance relative flex min-h-[760px] flex-col justify-between overflow-hidden bg-white px-6 py-8 text-center">
      <div className="wedding-petals" aria-hidden="true" />
      <nav className="relative z-10 flex items-center justify-between text-[12px] text-[#7a7a7a]" aria-label="Invitation navigation">
        <span>Wedding</span>
        <a className="text-[#0066cc] no-underline" href="#location">오시는 길</a>
      </nav>

      <div className="hero-illustration mx-auto mt-8 flex h-80 w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[36px] bg-[#f5f5f7] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-white">
          <img
            alt="신랑 신부 웨딩 일러스트"
            className="h-full w-full object-contain"
            src={heroImageSrc}
          />
        </div>
      </div>

      <div className="hero-copy mx-auto max-w-[360px] pb-10">
        <p className="apple-eyebrow mb-4">{invitation.event.dateText} · {invitation.event.timeText}</p>
        <h1 className="apple-title mb-5">
          {invitation.couple.bride.name}
          <span className="mx-2 text-[#7a7a7a]">&</span>
          {invitation.couple.groom.name}
        </h1>
        <p className="apple-body mb-8 whitespace-pre-line text-[16px] text-[#555555]">
          {invitation.event.venueName}
          {'\n'}
          {invitation.event.venueHall}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ActionButton href="#location" variant="primary">위치 보기</ActionButton>
          <ActionButton href="#contact">연락처</ActionButton>
        </div>
      </div>
    </header>
  )
}
