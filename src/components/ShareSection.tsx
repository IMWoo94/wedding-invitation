import { ActionButton } from './ActionButton'
import { Section } from './Section'

export function ShareSection() {
  const share = () => {
    if (navigator.share) {
      void navigator.share({ title: 'Wedding Invitation', url: window.location.href })
      return
    }

    void navigator.clipboard.writeText(window.location.href)
  }

  return (
    <Section eyebrow="Share" title="초대장 공유" centered muted>
      <p className="apple-body mx-auto mb-8 max-w-[310px]">링크가 확정되면 이 버튼으로 초대장을 바로 공유할 수 있습니다.</p>
      <ActionButton onClick={share} variant="primary">링크 공유하기</ActionButton>
    </Section>
  )
}
