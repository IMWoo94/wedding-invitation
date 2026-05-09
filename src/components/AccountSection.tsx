import { invitation } from '../data/invitation'
import { ActionButton } from './ActionButton'
import { Section } from './Section'

export function AccountSection() {
  return (
    <Section eyebrow="Account" title="마음 전하실 곳">
      <div className="grid gap-3">
        {invitation.accounts.map((account) => (
          <div className="apple-card p-5" key={account.label}>
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
                onClick={() => account.enabled && navigator.clipboard.writeText(account.number)}
              >
                복사
              </ActionButton>
            </div>
          </div>
        ))}
      </div>
      <p className="apple-caption mt-5">민감정보는 기본적으로 공개 저장소와 Git history에 남기지 않습니다.</p>
    </Section>
  )
}
