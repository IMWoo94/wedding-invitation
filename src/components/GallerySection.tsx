import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import photo1 from '../assets/gallery/photo-1.jpeg'
import photo2 from '../assets/gallery/photo-2.jpeg'
import photo3 from '../assets/gallery/photo-3.jpeg'
import photo4 from '../assets/gallery/photo-4.jpeg'
import photo5 from '../assets/gallery/photo-5.jpeg'
import photo6 from '../assets/gallery/photo-6.jpeg'
import photo7 from '../assets/gallery/photo-7.jpeg'
import photo8 from '../assets/gallery/photo-8.jpeg'
import photo9 from '../assets/gallery/photo-9.jpeg'
import photo10 from '../assets/gallery/photo-10.jpeg'
import photo11 from '../assets/gallery/photo-11.jpeg'
import { invitation } from '../data/invitation'
import { Section } from './Section'

const photos = [
  { src: photo1, alt: '누리와 상민 웨딩 사진 1' },
  { src: photo2, alt: '누리와 상민 웨딩 사진 2' },
  { src: photo3, alt: '누리와 상민 웨딩 사진 3' },
  { src: photo4, alt: '누리와 상민 웨딩 사진 4' },
  { src: photo5, alt: '누리와 상민 웨딩 사진 5' },
  { src: photo6, alt: '누리와 상민 웨딩 사진 6' },
  { src: photo7, alt: '누리와 상민 웨딩 사진 7' },
  { src: photo8, alt: '누리와 상민 웨딩 사진 8' },
  { src: photo9, alt: '누리와 상민 웨딩 사진 9' },
  { src: photo10, alt: '누리와 상민 웨딩 사진 10' },
  { src: photo11, alt: '누리와 상민 웨딩 사진 11' },
]

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  // WCAG 2.2.2: auto-advance must be pausable; reduced-motion users start paused.
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const touchStartXRef = useRef<number | null>(null)

  // Render only the active slide and its neighbors instead of all photos at
  // once; the browser cache makes revisited slides instant.
  const loadedIndexes = useMemo(
    () =>
      new Set([
        activeIndex,
        (activeIndex + 1) % photos.length,
        (activeIndex - 1 + photos.length) % photos.length,
      ]),
    [activeIndex],
  )
  const isModalOpen = modalIndex !== null
  const slideLabel = useMemo(() => `${activeIndex + 1} / ${photos.length}`, [activeIndex])
  const modalSlideLabel = useMemo(
    () => (modalIndex === null ? '' : `${modalIndex + 1} / ${photos.length}`),
    [modalIndex],
  )

  const showPreviousPhoto = useCallback(() => {
    setModalIndex((current) => {
      if (current === null) {
        return current
      }

      return (current - 1 + photos.length) % photos.length
    })
  }, [])

  const showNextPhoto = useCallback(() => {
    setModalIndex((current) => {
      if (current === null) {
        return current
      }

      return (current + 1) % photos.length
    })
  }, [])

  const handleModalTouchStart = (clientX: number) => {
    touchStartXRef.current = clientX
  }

  const handleModalTouchEnd = (clientX: number) => {
    const startX = touchStartXRef.current
    touchStartXRef.current = null

    if (startX === null) {
      return
    }

    const delta = clientX - startX

    if (Math.abs(delta) < 48) {
      return
    }

    if (delta > 0) {
      showPreviousPhoto()
    } else {
      showNextPhoto()
    }
  }

  const openPhotoModal = (index: number) => {
    setModalIndex(index)
    setActiveIndex(index)
  }

  const closePhotoModal = () => {
    setModalIndex(null)
  }

  useEffect(() => {
    if (isModalOpen || isAutoplayPaused) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [isModalOpen, isAutoplayPaused])

  useEffect(() => {
    if (!isModalOpen) {
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePhotoModal()
      }

      if (event.key === 'ArrowLeft') {
        showPreviousPhoto()
      }

      if (event.key === 'ArrowRight') {
        showNextPhoto()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, showNextPhoto, showPreviousPhoto])

  return (
    <Section id="gallery" eyebrow="Gallery" title="사진첩" centered>
      <div className="overflow-hidden rounded-[32px] bg-[#f5f5f7] shadow-[0_24px_70px_rgba(0,0,0,0.1)] dark:bg-[#2c2c2e]">
        <button
          aria-label={`${activeIndex + 1}번째 사진 크게 보기`}
          className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden text-left"
          onClick={() => openPhotoModal(activeIndex)}
          type="button"
        >
          {photos.map((photo, index) =>
            loadedIndexes.has(index) ? (
              <img
                alt={photo.alt}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
                key={photo.src}
                src={photo.src}
              />
            ) : null,
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 text-left text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">Nuri &amp; Sangmin</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="text-lg font-semibold tracking-[-0.03em]">{slideLabel}</p>
              <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-medium text-white/90 opacity-90 backdrop-blur transition group-hover:bg-white/26">
                크게 보기
              </span>
            </div>
          </div>
        </button>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2" aria-label="사진 슬라이드 위치">
        {photos.map((photo, index) => (
          <button
            aria-label={`${index + 1}번째 사진 보기`}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-[#0066cc] dark:bg-[#409cff]' : 'w-2 bg-[#d2d2d7] dark:bg-[#48484a]'}`}
            key={photo.src}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
        <button
          aria-label={isAutoplayPaused ? '자동 넘김 재생' : '자동 넘김 일시정지'}
          aria-pressed={isAutoplayPaused}
          className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f7] text-[11px] text-[#555555] transition active:scale-95 dark:bg-[#2c2c2e] dark:text-[#c7c7cc]"
          onClick={() => setIsAutoplayPaused((paused) => !paused)}
          type="button"
        >
          {isAutoplayPaused ? '▶' : '❚❚'}
        </button>
      </div>
      <p className="apple-caption mt-5">{invitation.gallery.note}</p>

      {isModalOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 px-4 py-8 backdrop-blur-sm"
          onClick={closePhotoModal}
          onTouchEnd={(event) => handleModalTouchEnd(event.changedTouches[0].clientX)}
          onTouchStart={(event) => handleModalTouchStart(event.touches[0].clientX)}
          role="dialog"
        >
          <button
            aria-label="확대 사진 닫기"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-2xl leading-none text-white backdrop-blur transition hover:bg-white/24 focus:outline-none focus:ring-2 focus:ring-white/70"
            onClick={closePhotoModal}
            type="button"
          >
            ×
          </button>

          <button
            aria-label="이전 사진 보기"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 text-4xl leading-none text-white backdrop-blur transition hover:bg-white/24 focus:outline-none focus:ring-2 focus:ring-white/70 sm:left-6"
            onClick={(event) => {
              event.stopPropagation()
              showPreviousPhoto()
            }}
            type="button"
          >
            ‹
          </button>

          <figure
            className="relative m-0 flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              alt={photos[modalIndex].alt}
              className="max-h-[82vh] w-full rounded-2xl object-contain shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
              src={photos[modalIndex].src}
            />
            <figcaption className="rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white/86 backdrop-blur">
              {modalSlideLabel}
            </figcaption>
          </figure>

          <button
            aria-label="다음 사진 보기"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 text-4xl leading-none text-white backdrop-blur transition hover:bg-white/24 focus:outline-none focus:ring-2 focus:ring-white/70 sm:right-6"
            onClick={(event) => {
              event.stopPropagation()
              showNextPhoto()
            }}
            type="button"
          >
            ›
          </button>
        </div>
      ) : null}
    </Section>
  )
}
