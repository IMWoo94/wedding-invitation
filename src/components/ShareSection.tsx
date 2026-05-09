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
    <Section centered muted>
      <div className="mx-auto flex max-w-[360px] flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <ActionButton href="#location" aria-label="위치 보기" className="w-full sm:w-auto" variant="secondary">
          위치 보기
        </ActionButton>
        <ActionButton href="#gallery" aria-label="갤러리 보기" className="w-full sm:w-auto" variant="secondary">
          갤러리 보기
        </ActionButton>
        <ActionButton aria-label="초대장 링크 복사하기" className="w-full sm:w-auto" onClick={share} variant="primary">
          {shareLabel}
        </ActionButton>
      </div>
    </Section>
  )
}
