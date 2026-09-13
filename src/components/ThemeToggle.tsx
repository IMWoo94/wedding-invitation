import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'wedding-theme'

function getInitialTheme(): Theme {
  return window.localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 mx-auto flex w-full max-w-[480px] justify-start px-5">
      <button
        aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
        aria-pressed={theme === 'dark'}
        className="pointer-events-auto rounded-full border border-[#e0e0e0] bg-white/92 px-4 py-3 text-[14px] font-semibold tracking-[-0.02em] text-[#1d1d1f] shadow-[0_12px_34px_rgba(0,0,0,0.16)] backdrop-blur transition active:scale-95 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]/92 dark:text-[#f5f5f7]"
        type="button"
        onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
      >
        <span aria-hidden="true" className="mr-1">{theme === 'light' ? '🌙' : '☀️'}</span>
        {theme === 'light' ? '다크' : '라이트'}
      </button>
    </div>
  )
}
