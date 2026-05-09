import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

const rsvpSlackWebhookUrl = import.meta.env.VITE_RSVP_SLACK_WEBHOOK_URL as string | undefined
const rsvpSlackChannel = 'C0B2PFXVAPQ'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'not-ready'

export function RsvpSection() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestCount, setGuestCount] = useState('1')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const trimmedName = guestName.trim()
  const isSubmitting = submitState === 'submitting'
  const statusMessage = useMemo(() => {
    if (submitState === 'success') {
      return '방문 예정이 전달되었습니다. 귀한 걸음으로 함께해 주셔서 감사합니다.'
    }

    if (submitState === 'error') {
      return '전달 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    }

    if (submitState === 'not-ready') {
      return '방문 예정 접수용 Slack Webhook URL을 연결한 뒤 제출할 수 있습니다.'
    }

    return ''
  }, [submitState])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const webhookUrl = rsvpSlackWebhookUrl?.trim()

    if (!webhookUrl) {
      setSubmitState('not-ready')
      return
    }

    if (!trimmedName || isSubmitting) {
      return
    }

    const count = Number(guestCount)
    const submittedAt = new Date().toLocaleString('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
    const text = [
      ':envelope_with_arrow: 방문 예정 신청이 도착했습니다.',
      `• 이름: ${trimmedName}`,
      `• 인원수: ${Number.isFinite(count) ? count : 1}명`,
      `• 예식일: ${invitation.event.dateText} ${invitation.event.timeText}`,
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
          channel: rsvpSlackChannel,
          text,
        }),
      })
      setSubmitState('success')
      setGuestName('')
      setGuestCount('1')
      setIsFormOpen(false)
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <Section id="rsvp" eyebrow="RSVP" title="방문 예정" centered>
      <div className="apple-card overflow-hidden text-left shadow-[0_18px_52px_rgba(0,0,0,0.07)]">
        <div className="border-b border-[#e8e8ed] bg-[#fafafc] px-6 py-5 text-center">
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">참석해 주실 분들을 위해 준비하겠습니다</p>
          <p className="apple-caption mt-2">이름과 방문 인원수만 남겨 주세요.</p>
        </div>

        <div className="p-6">
          <ActionButton
            aria-expanded={isFormOpen}
            aria-controls="rsvp-form-panel"
            className="w-full justify-center py-4 text-[16px]"
            onClick={() => {
              setIsFormOpen((open) => !open)
              setSubmitState('idle')
            }}
            variant="primary"
          >
            {isFormOpen ? '방문 예정 입력 닫기' : '방문 예정 전달하기'}
          </ActionButton>

          {isFormOpen ? (
            <form id="rsvp-form-panel" className="mt-5 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="apple-caption font-semibold text-[#1d1d1f]">이름</span>
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
                <span className="apple-caption font-semibold text-[#1d1d1f]">인원수</span>
                <select
                  className="rsvp-input"
                  onChange={(event) => setGuestCount(event.target.value)}
                  value={guestCount}
                >
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <option key={count} value={count}>
                      {count}명
                    </option>
                  ))}
                </select>
              </label>

              <button
                aria-label="방문 예정 제출"
                className="apple-pill apple-pill-primary mt-1 w-full justify-center py-4 text-[16px] disabled:cursor-not-allowed disabled:opacity-55"
                disabled={isSubmitting || !trimmedName}
                type="submit"
              >
                {isSubmitting ? '전달 중...' : '제출하기'}
              </button>
            </form>
          ) : null}

          {statusMessage ? (
            <p
              className={`mt-4 rounded-[16px] px-4 py-3 text-center text-[14px] leading-relaxed ${
                submitState === 'success'
                  ? 'bg-[#effaf3] text-[#247a3e]'
                  : submitState === 'not-ready'
                    ? 'bg-[#fff8e8] text-[#8a5a00]'
                    : 'bg-[#fff2f2] text-[#b42318]'
              }`}
              role="status"
            >
              {statusMessage}
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
