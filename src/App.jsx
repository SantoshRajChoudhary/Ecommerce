import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import OrderNav from './components/OrderNav'
import Hero from './components/Hero'
import KindredSlider from './components/KindredSlider'
import StackingSection from './components/StackingSection'
import Editorial from './components/Editorial'
import CircularCarousel from './components/CircularCarousel'
import CategoryStrip from './components/CategoryStrip'
import PalmReveal from './components/PalmReveal'
import Products from './components/Products'
import InteractiveCards from './components/InteractiveCards'
import TextMarquee from './components/TextMarquee'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(true)

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* Page Reveal Transition */}
      <PageTransition ready={loaded} />

      <OrderNav />

      <div className="main-content">
        <main style={{ paddingTop: 0 }}>
          <Hero ready={loaded} />
          <KindredSlider />
          <StackingSection />
          <Editorial />
          <CircularCarousel />
          <CategoryStrip />
          <PalmReveal />
          <Products />
          <InteractiveCards />
          <TextMarquee text="UNIQUE DESIGNS · QUALITY · COMFORT · SIMPLICITY · EVERYDAY WEAR ·" />
          <Newsletter />
        </main>
      </div>
      
      <Footer />
    </div>
  )
}
