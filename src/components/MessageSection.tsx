import { invitation } from '../data/invitation'
import { Section } from './Section'

export function MessageSection() {
  return (
    <Section eyebrow="Invitation" title="초대합니다" centered>
      <p className="apple-body mx-auto max-w-[300px] whitespace-pre-line leading-[1.9] tracking-[-0.03em]">
        {invitation.message.body}
      </p>
      <div className="mt-10 grid gap-3 text-center">
        <p className="text-lg font-semibold tracking-[-0.03em] text-[#1d1d1f]">
          신부 : {invitation.couple.bride.fullName}
        </p>
        <p className="text-lg font-semibold tracking-[-0.03em] text-[#1d1d1f]">
          신랑 : {invitation.couple.groom.fullName}
        </p>
      </div>
    </Section>
  )
}
