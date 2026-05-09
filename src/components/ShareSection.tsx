import { useState } from 'react'
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
  const [shareLabel, setShareLabel] = useState('초대장 링크 복사하기')

  const share = async () => {
    try {
      await copyTextToClipboard(invitationUrl)
      setShareLabel('링크 복사 완료')
    } catch {
      setShareLabel('복사 실패')
    }

    window.setTimeout(() => setShareLabel('초대장 링크 복사하기'), 1800)
  }

  return (
    <Section eyebrow="Share" title="초대장 공유" centered muted>
      <ActionButton aria-label="초대장 링크 복사하기" onClick={share} variant="primary">
        {shareLabel}
      </ActionButton>
    </Section>
  )
}
