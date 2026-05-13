import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import MenuOverlay from './MenuOverlay'

export default function OrderNav() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const menuTextRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    if (isMenuOpen) {
      tl.to(line1Ref.current, { y: 3, rotation: 45, duration: 0.4, ease: 'power2.inOut' })
        .to(line2Ref.current, { y: -3, width: 25, rotation: -45, duration: 0.4, ease: 'power2.inOut' }, 0)
        .to(menuTextRef.current, { opacity: 0, x: 10, duration: 0.2 }, 0)
    } else {
      tl.to(line1Ref.current, { y: 0, rotation: 0, duration: 0.4, ease: 'power2.inOut' })
        .to(line2Ref.current, { y: 0, width: 15, rotation: 0, duration: 0.4, ease: 'power2.inOut' }, 0)
        .to(menuTextRef.current, { opacity: 1, x: 0, duration: 0.2 }, 0)
    }
  }, [isMenuOpen])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%',
      padding: scrolled ? '1.5rem 5%' : '2.5rem 5%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 1000, transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      background: 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none'
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: '0.1em', color: isMenuOpen ? '#000' : '#fff',
        transition: 'color 0.4s'
      }}>
        ATFY
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <button style={{
          background: '#c19a6b', color: '#fff', border: 'none',
          padding: '12px 30px', borderRadius: '50px',
          fontFamily: 'Helvetica, sans-serif', fontWeight: 700, fontSize: 13,
          letterSpacing: '0.1em', cursor: 'pointer', transition: 'transform 0.3s',
          opacity: isMenuOpen ? 0 : 1, pointerEvents: isMenuOpen ? 'none' : 'auto'
        }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        >
          COLLECTIONS
        </button>

        {/* Hamburger Menu */}
        <div 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', position: 'relative', zIndex: 1001 }}
        >
          <span 
            ref={menuTextRef}
            style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em' }}
          >
            {isMenuOpen ? '' : 'START'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div ref={line1Ref} style={{ width: 25, height: 2, background: isMenuOpen ? '#000' : '#fff' }} />
            <div ref={line2Ref} style={{ width: 15, height: 2, background: isMenuOpen ? '#000' : '#fff', alignSelf: 'flex-end' }} />
          </div>
        </div>
      </div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  )
}
