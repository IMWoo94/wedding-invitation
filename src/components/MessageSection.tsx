import { invitation } from '../data/invitation'
import { Section } from './Section'

export function MessageSection() {
  return (
    <Section eyebrow="Invitation" title="초대합니다" centered>
      <p className="apple-body mx-auto max-w-[300px] whitespace-pre-line leading-[1.9] tracking-[-0.03em]">
        {invitation.message.body}
      </p>
      <div className="mx-auto mt-10 grid max-w-[320px] grid-cols-2 overflow-hidden rounded-[22px] border border-[#e0e0e0] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.05)]">
        <div className="border-r border-[#e8e8ed]">
          <p className="border-b border-[#e8e8ed] bg-[#f5f5f7] px-3 py-2 text-[13px] font-semibold tracking-[-0.02em] text-[#7a7a7a]">신부</p>
          <p className="px-3 py-4 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">{invitation.couple.bride.fullName}</p>
        </div>
        <div>
          <p className="border-b border-[#e8e8ed] bg-[#f5f5f7] px-3 py-2 text-[13px] font-semibold tracking-[-0.02em] text-[#7a7a7a]">신랑</p>
          <p className="px-3 py-4 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">{invitation.couple.groom.fullName}</p>
        </div>
      </div>
    </Section>
  )
}
