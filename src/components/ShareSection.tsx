import { useState } from 'react'
import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

const invitationUrl = 'https://imwoo94.github.io/wedding-invitation/'

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

export function ShareSection() {
  const [shareLabel, setShareLabel] = useState('초대장 공유하기')

  const share = async () => {
    const shareData = {
      title: invitation.meta.title,
      text: `${invitation.couple.bride.name}와 ${invitation.couple.groom.name}의 결혼식에 초대합니다.`,
      url: invitationUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareLabel('공유 완료')
      } else {
        await copyTextToClipboard(invitationUrl)
        setShareLabel('링크 복사 완료')
      }
    } catch {
      await copyTextToClipboard(invitationUrl)
      setShareLabel('링크 복사 완료')
    }

    window.setTimeout(() => setShareLabel('초대장 공유하기'), 1800)
  }

  return (
    <Section eyebrow="Share" title="초대장 공유" centered muted>
      <p className="apple-body mx-auto mb-4 max-w-[310px]">확정된 초대장 링크를 바로 공유할 수 있습니다.</p>
      <a
        className="mb-6 block break-all text-[15px] font-medium leading-relaxed text-[#0066cc] no-underline"
        href={invitationUrl}
        target="_blank"
        rel="noreferrer"
      >
        {invitationUrl}
      </a>
      <ActionButton aria-label="초대장 링크 공유하기" onClick={share} variant="primary">
        {shareLabel}
      </ActionButton>
    </Section>
  )
}
