import { useState } from 'react'
import type { FormEvent } from 'react'
import { slackChannel, slackWebhookUrl } from '../lib/slack'
import { ActionButton } from './ActionButton'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'not-ready'

const statusMessages: Partial<Record<SubmitState, string>> = {
  success: '따뜻한 축하 메시지가 전달되었습니다. 감사합니다!',
  error: '전달 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  'not-ready': '메시지 전달용 Slack Webhook URL을 연결한 뒤 남길 수 있습니다.',
}

export function GuestbookCard() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [message, setMessage] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const trimmedName = guestName.trim()
  const trimmedMessage = message.trim()
  const isSubmitting = submitState === 'submitting'
  const statusMessage = statusMessages[submitState] ?? ''

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const webhookUrl = slackWebhookUrl?.trim()

    if (!webhookUrl) {
      setSubmitState('not-ready')
      return
    }

    if (!trimmedName || !trimmedMessage || isSubmitting) {
      return
    }

    const submittedAt = new Date().toLocaleString('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
    const text = [
      ':speech_balloon: 축하 메시지가 도착했습니다.',
      `• 이름: ${trimmedName}`,
      `• 메시지: ${trimmedMessage}`,
      `• 접수일시: ${submittedAt}`,
    ].join('\n')

    try {
      setSubmitState('submitting')
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          channel: slackChannel,
          text,
        }),
      })
      setSubmitState('success')
      setGuestName('')
      setMessage('')
      setIsFormOpen(false)
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <div className="apple-card overflow-hidden text-left shadow-[0_18px_52px_rgba(0,0,0,0.07)]">
        <div className="border-b border-[#e8e8ed] bg-[#fafafc] px-6 py-5 text-center dark:border-[#3a3a3c] dark:bg-[#232325]">
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-[#f5f5f7]">따뜻한 한마디를 남겨 주세요</p>
          <p className="apple-caption mt-3 whitespace-pre-line leading-[1.75]">
            {`남겨 주신 메시지는 두 사람에게\n소중히 전달됩니다.`}
          </p>
        </div>

        <div className="p-6">
          <ActionButton
            aria-expanded={isFormOpen}
            aria-controls="guestbook-form-panel"
            className="w-full justify-center py-4 text-[16px]"
            onClick={() => {
              setIsFormOpen((open) => !open)
              setSubmitState('idle')
            }}
            variant="primary"
          >
            {isFormOpen ? '입력 닫기' : '축하 메시지 남기기'}
          </ActionButton>

          {isFormOpen ? (
            <form id="guestbook-form-panel" className="mt-5 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="apple-caption font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">이름</span>
                <input
                  autoComplete="name"
                  className="rsvp-input"
                  maxLength={30}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="예: 홍길동"
                  required
                  type="text"
                  value={guestName}
                />
              </label>

              <label className="grid gap-2">
                <span className="apple-caption font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">메시지</span>
                <textarea
                  className="rsvp-input min-h-[120px] resize-y"
                  maxLength={500}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="축하의 마음을 자유롭게 남겨 주세요."
                  required
                  value={message}
                />
              </label>

              <button
                aria-label="축하 메시지 제출"
                className="apple-pill apple-pill-primary mt-1 w-full justify-center py-4 text-[16px] disabled:cursor-not-allowed disabled:opacity-55"
                disabled={isSubmitting || !trimmedName || !trimmedMessage}
                type="submit"
              >
                {isSubmitting ? '전달 중...' : '메시지 보내기'}
              </button>
            </form>
          ) : null}

          {statusMessage ? (
            <p
              className={`mt-4 rounded-[16px] px-4 py-3 text-center text-[14px] leading-relaxed ${
                submitState === 'success'
                  ? 'bg-[#effaf3] text-[#247a3e] dark:bg-[#12291a] dark:text-[#7ee2a8]'
                  : submitState === 'not-ready'
                    ? 'bg-[#fff8e8] text-[#8a5a00] dark:bg-[#2b2411] dark:text-[#e8c25a]'
                    : 'bg-[#fff2f2] text-[#b42318] dark:bg-[#2d1414] dark:text-[#ff8a80]'
              }`}
              role="status"
            >
              {statusMessage}
            </p>
          ) : null}
        </div>
    </div>
  )
}
