import { useState } from 'react'
import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

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

export function AccountSection() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)

  const handleCopy = async (label: string, number: string) => {
    try {
      await copyTextToClipboard(number)
      setCopiedLabel(label)
      window.setTimeout(() => setCopiedLabel((current) => (current === label ? null : current)), 1800)
    } catch {
      setCopiedLabel(null)
    }
  }

  return (
    <Section eyebrow="Account" title="마음 전하실 곳" centered>
      <div className="grid gap-3">
        {invitation.accounts.map((account) => (
          <div className="apple-card p-5 text-left" key={account.label}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="apple-caption">{account.label}</p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                  {account.enabled ? `${account.bank} ${account.holder}` : account.placeholder}
                </p>
                {account.enabled ? <p className="apple-body mt-1">{account.number}</p> : null}
              </div>
              <ActionButton
                aria-disabled={!account.enabled}
                className={!account.enabled ? 'pointer-events-none opacity-50' : ''}
                onClick={() => account.enabled && handleCopy(account.label, account.number)}
              >
                {copiedLabel === account.label ? '복사 완료' : '복사'}
              </ActionButton>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
