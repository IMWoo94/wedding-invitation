import { useEffect, useMemo, useState } from 'react'
import photo1 from '../assets/gallery/photo-1.jpeg'
import photo2 from '../assets/gallery/photo-2.jpeg'
import photo3 from '../assets/gallery/photo-3.jpeg'
import photo4 from '../assets/gallery/photo-4.jpeg'
import { invitation } from '../data/invitation'
import { Section } from './Section'

const photos = [
  { src: photo1, alt: '웨딩 장소 샘플 사진 1' },
  { src: photo2, alt: '웨딩 장소 샘플 사진 2' },
  { src: photo3, alt: '웨딩 장소 샘플 사진 3' },
  { src: photo4, alt: '웨딩 장소 샘플 사진 4' },
]

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideLabel = useMemo(() => `${activeIndex + 1} / ${photos.length}`, [activeIndex])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <Section eyebrow="Gallery" title="사진첩" centered>
      <div className="overflow-hidden rounded-[32px] bg-[#f5f5f7] shadow-[0_24px_70px_rgba(0,0,0,0.1)]">
        <div className="relative aspect-[4/5] w-full">
          {photos.map((photo, index) => (
            <img
              alt={photo.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
              key={photo.src}
              src={photo.src}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 text-left text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">Sample Photo</p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">{slideLabel}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2" aria-label="사진 슬라이드 위치">
        {photos.map((photo, index) => (
          <button
            aria-label={`${index + 1}번째 사진 보기`}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-[#0066cc]' : 'w-2 bg-[#d2d2d7]'}`}
            key={photo.src}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
      <p className="apple-caption mt-5">{invitation.gallery.note}</p>
    </Section>
  )
}
