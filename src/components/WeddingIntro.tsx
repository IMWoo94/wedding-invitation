import { useEffect, useRef, useState } from 'react'
import { invitation } from '../data/invitation'

type IntroProps = {
  onDone: () => void
}

const FADE_MS = 600
const FADE_AT = 4000

type PkgProps = {
  name: string
  percent: number
}

function PackageLine({ name, percent }: PkgProps) {
  const filled = Math.round((percent / 100) * 18)

  return (
    <p className="whitespace-pre">
      <span className="text-[#f5f1e8]">{name.padEnd(16, ' ')}</span>
      <span className="text-[#5a6478]">[</span>
      <span className="text-[#7ee2a8]">{'█'.repeat(filled)}</span>
      <span className="text-[#2e3648]">{'░'.repeat(18 - filled)}</span>
      <span className="text-[#5a6478]">]</span>
      <span className="text-[#7ee2a8]">{String(percent).padStart(4, ' ')}%</span>
    </p>
  )
}

export function WeddingIntro({ onDone }: IntroProps) {
  const [step, setStep] = useState(0)
  const [memoriesPercent, setMemoriesPercent] = useState(0)
  const [fading, setFading] = useState(false)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) {
      return
    }

    doneRef.current = true
    setFading(true)
    window.setTimeout(onDone, FADE_MS)
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return undefined
    }

    const stepSchedule = [300, 550, 700, 850, 1100, 1250, 1400, 1550, 2350, 2600, 2850, 3100, 3350]
    const timers = stepSchedule.map((at, index) =>
      window.setTimeout(() => setStep(index + 1), at),
    )

    const memorySchedule: Array<[number, number]> = [
      [1650, 18],
      [1850, 47],
      [2050, 82],
      [2250, 100],
    ]
    memorySchedule.forEach(([at, percent]) => {
      timers.push(window.setTimeout(() => setMemoriesPercent(percent), at))
    })

    timers.push(window.setTimeout(finish, FADE_AT))

    return () => timers.forEach((timer) => window.clearTimeout(timer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex touch-none items-center justify-center overscroll-none bg-[#0a0e1a] px-6 transition-opacity duration-[600ms] ease-out ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={finish}
    >
      <div className="w-full max-w-[340px] font-mono text-[13px] leading-[1.9] text-[#f5f1e8]">
        <p className="text-[17px] font-semibold tracking-[0.3em] text-white">WEDDING OS</p>
        <p className="mb-4 text-[#5a6478]">Version 2027.01</p>

        {step >= 1 ? <p className="text-[#8b93a7]">Initializing system...</p> : null}
        {step >= 2 ? (
          <p className="whitespace-pre">
            LOVE_MODULE ......... <span className="text-[#7ee2a8]">OK</span>
          </p>
        ) : null}
        {step >= 3 ? (
          <p className="whitespace-pre">
            MEMORIES ............ <span className="text-[#7ee2a8]">OK</span>
          </p>
        ) : null}
        {step >= 4 ? (
          <p className="whitespace-pre">
            FAMILY .............. <span className="text-[#7ee2a8]">OK</span>
          </p>
        ) : null}

        {step >= 5 ? <p className="mt-3 text-[#8b93a7]">Downloading wedding packages...</p> : null}
        {step >= 6 ? <PackageLine name="love.pkg" percent={100} /> : null}
        {step >= 7 ? <PackageLine name="trust.pkg" percent={100} /> : null}
        {step >= 8 ? <PackageLine name="memories.pkg" percent={memoriesPercent} /> : null}
        {step >= 8 ? <PackageLine name="happiness.pkg" percent={100} /> : null}

        {step >= 9 ? <p className="mt-3 text-[#8b93a7]">Connecting two lives...</p> : null}
        {step >= 10 ? (
          <p className="text-center text-[14px]">
            {invitation.couple.bride.name}
            <span className="text-[#5a6478]"> ────── </span>
            <span className="text-[#ff8fa3]">♥</span>
            <span className="text-[#5a6478]"> ────── </span>
            {invitation.couple.groom.name}
          </p>
        ) : null}
        {step >= 11 ? (
          <p className="text-center tracking-[0.12em] text-[#7ee2a8]">[ CONNECTION ESTABLISHED ]</p>
        ) : null}

        {step >= 12 ? <p className="mt-3 text-[#8b93a7]">Building a lifetime together...</p> : null}
        {step >= 13 ? (
          <p className="mt-1 text-center text-[16px] tracking-[0.2em] text-[#9db8ff]">2027. 01. 31</p>
        ) : null}

        <p className="mt-2">
          <span className="inline-block h-[14px] w-[8px] animate-pulse bg-[#f5f1e8]" />
        </p>
      </div>
    </div>
  )
}
