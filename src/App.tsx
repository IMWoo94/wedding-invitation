import { useState } from 'react'
import { AccountSection } from './components/AccountSection'
import { ContactSection } from './components/ContactSection'
import { GallerySection } from './components/GallerySection'
import { HeroSection } from './components/HeroSection'
import { LocationSection } from './components/LocationSection'
import { MessageSection } from './components/MessageSection'
import { MusicControl } from './components/MusicControl'
import { RsvpGuestbookSection } from './components/RsvpGuestbookSection'
import { ShareSection } from './components/ShareSection'
import { ThemeToggle } from './components/ThemeToggle'
import { WeddingIntro } from './components/WeddingIntro'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {introDone ? null : <WeddingIntro onDone={() => setIntroDone(true)} />}
      <main className="apple-frame">
        <HeroSection />
        <MessageSection />
        <GallerySection />
        <LocationSection />
        <ContactSection />
        <AccountSection />
        <RsvpGuestbookSection />
        <ShareSection />
        <footer className="px-6 pb-24 pt-10 text-center text-[12px] leading-relaxed text-[#7a7a7a] dark:text-[#98989d]">
          Made in Sangmin with love.<br />
          © 2026 Sangmin. All rights reserved.
        </footer>
        <ThemeToggle />
        <MusicControl />
      </main>
    </>
  )
}

export default App
