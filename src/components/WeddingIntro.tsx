import { useEffect, useRef, useState } from 'react'
import { invitation } from '../data/invitation'

type IntroProps = {
  onDone: () => void
}

const FADE_MS = 1200
const FADE_AT = 4900

const STARS = [
  { top: '8%', left: '12%', size: 10 },
  { top: '14%', left: '78%', size: 13 },
  { top: '26%', left: '30%', size: 8 },
  { top: '34%', left: '88%', size: 9 },
  { top: '58%', left: '8%', size: 12 },
  { top: '72%', left: '84%', size: 10 },
  { top: '84%', left: '22%', size: 9 },
  { top: '90%', left: '64%', size: 12 },
]

type PkgProps = {
  name: string
  percent: number
}

function PackageLine({ name, percent }: PkgProps) {
  const filled = Math.round((percent / 100) * 18)

  return (
    <p className="whitespace-pre">
      <span className="text-[#4a463f] dark:text-[#f5f1e8]">{name.padEnd(16, ' ')}</span>
      <span className="text-[#a8a29e] dark:text-[#5a6478]">[</span>
      <span className="text-[#1f9d55] dark:text-[#7ee2a8]">{'█'.repeat(filled)}</span>
      <span className="text-[#ded8ca] dark:text-[#2e3648]">{'░'.repeat(18 - filled)}</span>
      <span className="text-[#a8a29e] dark:text-[#5a6478]">]</span>
      <span className="text-[#1f9d55] dark:text-[#7ee2a8]">{String(percent).padStart(4, ' ')}%</span>
    </p>
  )
}

export function WeddingIntro({ onDone }: IntroProps) {
  const [step, setStep] = useState(0)
  const [memoriesPercent, setMemoriesPercent] = useState(0)
  const [happinessPercent, setHappinessPercent] = useState(0)
  const [fading, setFading] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  // Random twinkle phase per visit.
  const [starDelays] = useState(() => STARS.map(() => `${(Math.random() * 2).toFixed(2)}s`))
  // Pac-Man chomp speed varies a little per visit.
  const [chompDuration] = useState(() => `${(0.24 + Math.random() * 0.12).toFixed(2)}s`)
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

    // Jitter every timing and progress step a little so each visit boots like
    // a real system. Steps stay monotonic and the total stays within ±0.3s.
    const between = (min: number, max: number) => min + Math.random() * (max - min)
    const jitter = (at: number, range = 90) => at + between(-range, range)

    const stepBase = [
      300, // Initializing system...
      550, // LOVE_MODULE OK
      700, // MEMORIES OK
      850, // FAMILY OK
      1100, // Downloading wedding packages...
      1250, // love.pkg
      1400, // trust.pkg
      1550, // memories.pkg (animated)
      1700, // promise.pkg
      1850, // laughter.pkg
      2000, // happiness.pkg (animated)
      3050, // Connecting two lives...
      3300, // 누리 ♥ 상민
      3550, // [ CONNECTION ESTABLISHED ]
      3800, // Building a lifetime together...
      4050, // 2027. 01. 31
    ]
    let previousAt = 0
    const stepSchedule = stepBase.map((at) => {
      previousAt = Math.max(previousAt + 60, jitter(at))
      return previousAt
    })
    const timers = stepSchedule.map((at, index) =>
      window.setTimeout(() => setStep(index + 1), at),
    )

    const memoryPercents = [
      Math.round(between(12, 28)),
      Math.round(between(38, 58)),
      Math.round(between(66, 88)),
      100,
    ]
    memoryPercents.forEach((percent, index) => {
      timers.push(window.setTimeout(() => setMemoriesPercent(percent), jitter(1650 + index * 200, 60)))
    })

    const happinessPercents = [
      Math.round(between(8, 20)),
      Math.round(between(30, 46)),
      Math.round(between(54, 70)),
      Math.round(between(80, 94)),
      100,
    ]
    happinessPercents.forEach((percent, index) => {
      timers.push(window.setTimeout(() => setHappinessPercent(percent), jitter(2150 + index * 200, 60)))
    })

    // 4~8 random jumps along the run, at least 400ms apart.
    const jumpCount = 4 + Math.floor(Math.random() * 5)
    let jumpAt = between(300, 700)
    for (let i = 0; i < jumpCount && jumpAt < 3900; i += 1) {
      const at = jumpAt
      timers.push(window.setTimeout(() => setIsJumping(true), at))
      timers.push(window.setTimeout(() => setIsJumping(false), at + 320))
      jumpAt += 400 + between(0, (3900 - jumpAt) / Math.max(1, jumpCount - i))
    }

    timers.push(window.setTimeout(finish, FADE_AT + between(-150, 300)))

    return () => timers.forEach((timer) => window.clearTimeout(timer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex touch-none items-center justify-center overscroll-none bg-[#f7f4ec] px-6 transition-opacity duration-[1200ms] ease-out dark:bg-[#0a0e1a] ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={finish}
    >
      {STARS.map((star, index) => (
        <span
          aria-hidden="true"
          className="intro-star"
          key={`${star.top}-${star.left}`}
          style={{ top: star.top, left: star.left, fontSize: star.size, animationDelay: starDelays[index] }}
        >
          ✦
        </span>
      ))}
      <div className="w-full max-w-[340px] font-mono text-[13px] leading-[1.9] text-[#4a463f] dark:text-[#f5f1e8]">
        <p className="text-[17px] font-semibold tracking-[0.3em] text-[#1d1d1f] dark:text-white">WEDDING OS</p>
        <p className="text-[#a8a29e] dark:text-[#5a6478]">Version 2027.01</p>

        <div aria-hidden="true" className="relative mb-4 mt-2 h-7">
          {[10, 19, 28, 37, 46, 55, 64, 73, 82].map((percent) => (
            <span
              className="intro-pellet absolute top-[11px] h-[6px] w-[6px] rounded-full bg-[#f0b429]"
              key={percent}
              style={{ left: `${percent}%`, animationDelay: `${Math.max(0, Math.round(percent * 43) - 150)}ms` }}
            />
          ))}
          <span
            className="intro-pellet absolute right-0 top-[8px] h-3 w-3 rounded-full bg-[#f0b429]"
            style={{ animationDelay: '4200ms' }}
          />
          <span className="intro-runner absolute left-0 top-[6px]">
            <span className={`block ${isJumping ? 'intro-runner-jump' : ''}`}>
              <span className="intro-pacman block" style={{ animationDuration: chompDuration }} />
            </span>
          </span>
        </div>

        {step >= 1 ? <p className="text-[#78716c] dark:text-[#8b93a7]">Initializing system...</p> : null}
        {step >= 2 ? (
          <p className="whitespace-pre">
            LOVE_MODULE ......... <span className="text-[#1f9d55] dark:text-[#7ee2a8]">OK</span>
          </p>
        ) : null}
        {step >= 3 ? (
          <p className="whitespace-pre">
            MEMORIES ............ <span className="text-[#1f9d55] dark:text-[#7ee2a8]">OK</span>
          </p>
        ) : null}
        {step >= 4 ? (
          <p className="whitespace-pre">
            FAMILY .............. <span className="text-[#1f9d55] dark:text-[#7ee2a8]">OK</span>
          </p>
        ) : null}

        {step >= 5 ? (
          <p className="mt-3 text-[#78716c] dark:text-[#8b93a7]">Downloading wedding packages...</p>
        ) : null}
        {step >= 6 ? <PackageLine name="love.pkg" percent={100} /> : null}
        {step >= 7 ? <PackageLine name="trust.pkg" percent={100} /> : null}
        {step >= 8 ? <PackageLine name="memories.pkg" percent={memoriesPercent} /> : null}
        {step >= 9 ? <PackageLine name="promise.pkg" percent={100} /> : null}
        {step >= 10 ? <PackageLine name="laughter.pkg" percent={100} /> : null}
        {step >= 11 ? <PackageLine name="happiness.pkg" percent={happinessPercent} /> : null}

        {step >= 12 ? (
          <p className="mt-3 text-[#78716c] dark:text-[#8b93a7]">Connecting two lives...</p>
        ) : null}
        {step >= 13 ? (
          <p className="text-center text-[14px]">
            {invitation.couple.bride.name}
            <span className="text-[#a8a29e] dark:text-[#5a6478]"> ────── </span>
            <span className="intro-heart text-[#e0526f] dark:text-[#ff8fa3]">♥</span>
            <span className="text-[#a8a29e] dark:text-[#5a6478]"> ────── </span>
            {invitation.couple.groom.name}
          </p>
        ) : null}
        {step >= 14 ? (
          <p className="text-center tracking-[0.12em] text-[#1f9d55] [text-shadow:0_0_14px_rgba(31,157,85,0.35)] dark:text-[#7ee2a8] dark:[text-shadow:0_0_14px_rgba(126,226,168,0.5)]">
            [ CONNECTION ESTABLISHED ]
          </p>
        ) : null}

        {step >= 15 ? (
          <p className="mt-3 text-[#78716c] dark:text-[#8b93a7]">Building a lifetime together...</p>
        ) : null}
        {step >= 16 ? (
          <p className="mt-1 text-center text-[16px] tracking-[0.2em] text-[#3a6fd8] dark:text-[#9db8ff]">
            2027. 01. 31
          </p>
        ) : null}

        <p className="mt-2">
          <span className="inline-block h-[14px] w-[8px] animate-pulse bg-[#4a463f] dark:bg-[#f5f1e8]" />
        </p>
      </div>
    </div>
  )
}
