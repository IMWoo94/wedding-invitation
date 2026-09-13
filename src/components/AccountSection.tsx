import { useState } from 'react'
import { invitation, type AccountEntry } from '../data/invitation'
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

type SideKey = 'groom' | 'bride'

const groups: Array<{ key: SideKey; title: string; accounts: readonly AccountEntry[] }> = [
  { key: 'groom', title: '신랑 측 마음 전하실 곳', accounts: invitation.accounts.groom },
  { key: 'bride', title: '신부 측 마음 전하실 곳', accounts: invitation.accounts.bride },
]

export function AccountSection() {
  const [openGroups, setOpenGroups] = useState<Record<SideKey, boolean>>({ groom: false, bride: false })
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = async (rowKey: string, number: string) => {
    try {
      await copyTextToClipboard(number)
      setCopiedKey(rowKey)
      window.setTimeout(() => setCopiedKey((current) => (current === rowKey ? null : current)), 1800)
    } catch {
      setCopiedKey(null)
    }
  }

  return (
    <Section eyebrow="Account" title="마음 전하실 곳" centered>
      <div className="grid gap-3">
        {groups.map((group) => {
          const hasAccounts = group.accounts.length > 0
          const isOpen = hasAccounts && openGroups[group.key]

          return (
            <div className="apple-card overflow-hidden text-left" key={group.key}>
              <button
                aria-controls={`account-panel-${group.key}`}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition active:scale-[0.995] disabled:cursor-default"
                disabled={!hasAccounts}
                onClick={() => setOpenGroups((current) => ({ ...current, [group.key]: !current[group.key] }))}
                type="button"
              >
                <span>
                  <span className="apple-caption block font-semibold">{group.title}</span>
                  <span className="apple-caption mt-1 block">
                    {hasAccounts
                      ? isOpen
                        ? `계좌 ${group.accounts.length}개`
                        : '눌러서 계좌번호를 확인해 주세요.'
                      : '필요 시 공개 예정'}
                  </span>
                </span>
                {hasAccounts ? (
                  <span className="shrink-0 text-[13px] font-medium text-[#0066cc] dark:text-[#409cff]">
                    {isOpen ? '접기' : '펼쳐 보기'}
                  </span>
                ) : null}
              </button>
              {isOpen ? (
                <div
                  className="border-t border-[#e8e8ed] px-5 dark:border-[#3a3a3c]"
                  id={`account-panel-${group.key}`}
                >
                  {group.accounts.map((account, index) => {
                    const rowKey = `${group.key}-${index}`

                    return (
                      <div
                        className="flex items-center justify-between gap-4 border-b border-[#e8e8ed] py-4 last:border-b-0 dark:border-[#3a3a3c]"
                        key={rowKey}
                      >
                        <div>
                          <p className="apple-caption">{account.relation}</p>
                          <p className="mt-1 font-semibold tracking-[-0.02em]">
                            {account.bank} {account.holder}
                          </p>
                          <p className="apple-body mt-0.5 text-[15px]">{account.number}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-stretch gap-2">
                          <ActionButton
                            aria-label={`${group.title} ${account.relation} 계좌번호 복사`}
                            className="justify-center"
                            onClick={() => handleCopy(rowKey, account.number)}
                          >
                            {copiedKey === rowKey ? '복사 완료' : '복사'}
                          </ActionButton>
                          {account.tossBank ? (
                            <ActionButton
                              aria-label={`${group.title} ${account.relation} 계좌로 토스 송금`}
                              className="justify-center"
                              href={`supertoss://send?bank=${encodeURIComponent(account.tossBank)}&accountNo=${account.number.replace(/[^0-9]/g, '')}&origin=qr`}
                              variant="primary"
                            >
                              토스 송금
                            </ActionButton>
                          ) : null}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
