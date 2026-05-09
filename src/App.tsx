import { AccountSection } from './components/AccountSection'
import { ContactSection } from './components/ContactSection'
import { GallerySection } from './components/GallerySection'
import { HeroSection } from './components/HeroSection'
import { LocationSection } from './components/LocationSection'
import { MessageSection } from './components/MessageSection'
import { MusicControl } from './components/MusicControl'
import { RsvpSection } from './components/RsvpSection'
import { ShareSection } from './components/ShareSection'

function App() {
  return (
    <main className="apple-frame">
      <HeroSection />
      <MessageSection />
      <GallerySection />
      <LocationSection />
      <RsvpSection />
      <ContactSection />
      <AccountSection />
      <ShareSection />
      <footer className="px-6 pb-24 pt-10 text-center text-[12px] leading-relaxed text-[#7a7a7a]">
        Made in Sangmin with love.<br />
        © 2026 Sangmin. All rights reserved.
      </footer>
      <MusicControl />
    </main>
  )
}

export default App
