import { AccountSection } from './components/AccountSection'
import { ContactSection } from './components/ContactSection'
import { GallerySection } from './components/GallerySection'
import { HeroSection } from './components/HeroSection'
import { LocationSection } from './components/LocationSection'
import { MessageSection } from './components/MessageSection'
import { ShareSection } from './components/ShareSection'

function App() {
  return (
    <main className="apple-frame">
      <HeroSection />
      <MessageSection />
      <LocationSection />
      <GallerySection />
      <ContactSection />
      <AccountSection />
      <ShareSection />
      <footer className="px-6 py-10 text-center text-[12px] leading-relaxed text-[#7a7a7a]">
        Built as a private-first static invitation. Sensitive values stay blank until intentionally opened.
      </footer>
    </main>
  )
}

export default App
