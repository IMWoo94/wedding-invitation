import { invitation } from '../data/invitation'
import { Section } from './Section'

export function GallerySection() {
  return (
    <Section eyebrow="Gallery" title="사진첩" centered>
      <div className="grid gap-3">
        {invitation.gallery.items.map((item, index) => (
          <div
            className={`flex ${index === 0 ? 'h-72' : 'h-56'} items-center justify-center rounded-[28px] bg-[#f5f5f7] text-sm tracking-[0.24em] text-[#7a7a7a]`}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
      <p className="apple-caption mt-5">{invitation.gallery.note}</p>
    </Section>
  )
}
