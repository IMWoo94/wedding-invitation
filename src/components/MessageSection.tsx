import { invitation } from '../data/invitation'
import { Section } from './Section'

export function MessageSection() {
  return (
    <Section eyebrow="Invitation" title="초대합니다" centered>
      <p className="apple-body mx-auto max-w-[300px] whitespace-pre-line leading-[1.9] tracking-[-0.03em]">
        {invitation.message.body}
      </p>
      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
        <div>
          <p className="apple-caption mb-1">Groom</p>
          <p className="text-xl font-semibold tracking-[-0.03em]">{invitation.couple.groom.name}</p>
        </div>
        <span className="text-[#7a7a7a]">|</span>
        <div>
          <p className="apple-caption mb-1">Bride</p>
          <p className="text-xl font-semibold tracking-[-0.03em]">{invitation.couple.bride.name}</p>
        </div>
      </div>
    </Section>
  )
}
