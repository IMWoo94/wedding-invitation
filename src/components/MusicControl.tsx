import { useRef, useState } from 'react'

const configuredMusicSrc = (import.meta.env.VITE_WEDDING_MUSIC_URL as string | undefined)?.trim()
const musicSrc = configuredMusicSrc || `${import.meta.env.BASE_URL}music/lee-mujin-highlight-30s.mp3`

export function MusicControl() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [statusText, setStatusText] = useState('음악 켜기')

  const handleToggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      setStatusText('음악 켜기')
      return
    }

    try {
      audio.volume = 0.35
      await audio.play()
      setIsPlaying(true)
      setStatusText('음악 끄기')
    } catch {
      setIsPlaying(false)
      setStatusText('다시 눌러주세요')
      window.setTimeout(() => setStatusText('음악 켜기'), 1800)
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-full max-w-[480px] justify-end px-5 pointer-events-none">
      <audio ref={audioRef} loop preload="metadata" src={musicSrc} />
      <button
        aria-label={isPlaying ? '배경음악 끄기' : '배경음악 켜기'}
        aria-pressed={isPlaying}
        className="pointer-events-auto rounded-full border border-[#e0e0e0] bg-white/92 px-4 py-3 text-[14px] font-semibold tracking-[-0.02em] text-[#1d1d1f] shadow-[0_12px_34px_rgba(0,0,0,0.16)] backdrop-blur transition active:scale-95"
        type="button"
        onClick={handleToggleMusic}
      >
        <span aria-hidden="true" className="mr-1">{isPlaying ? '🔊' : '♪'}</span>
        {statusText}
      </button>
    </div>
  )
}
