import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'

const illustrationSrc = `${import.meta.env.BASE_URL}illustration.svg`

export function HeroSection() {
  return (
    <header className="relative flex min-h-[760px] flex-col justify-between overflow-hidden bg-white px-6 py-8 text-center">
      <nav className="flex items-center justify-between text-[12px] text-[#7a7a7a]" aria-label="Invitation navigation">
        <span>Wedding</span>
        <a className="text-[#0066cc] no-underline" href="#location">오시는 길</a>
      </nav>

      <div className="mx-auto mt-8 flex h-80 w-full max-w-[360px] items-center justify-center rounded-[36px] bg-[#f5f5f7]">
        <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
          <img
            alt="도수치료사와 백엔드 개발자 손그림 일러스트"
            className="h-full w-full object-contain"
            src={illustrationSrc}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[360px] pb-10">
        <p className="apple-eyebrow mb-4">{invitation.event.dateText} · {invitation.event.timeText}</p>
        <h1 className="apple-title mb-5">
          {invitation.couple.groom.name}
          <span className="mx-2 text-[#7a7a7a]">&</span>
          {invitation.couple.bride.name}
        </h1>
        <p className="apple-body mb-8 whitespace-pre-line">{invitation.message.headline}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ActionButton href="#location" variant="primary">위치 보기</ActionButton>
          <ActionButton href="#contact">연락처</ActionButton>
        </div>
      </div>
    </header>
  )
}
