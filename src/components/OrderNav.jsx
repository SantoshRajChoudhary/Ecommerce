import { useState, useEffect } from 'react'
import gsap from 'gsap'

export default function OrderNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: '0.1em', color: '#fff'
      }}>
        PALM
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <button style={{
          background: '#c19a6b', color: '#fff', border: 'none',
          padding: '12px 30px', borderRadius: '50px',
          fontFamily: 'Helvetica, sans-serif', fontWeight: 700, fontSize: 13,
          letterSpacing: '0.1em', cursor: 'pointer', transition: 'transform 0.3s'
        }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        >
          COLLECTIONS
        </button>

        {/* Hamburger Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em' }}>START</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: 25, height: 2, background: '#fff' }} />
            <div style={{ width: 15, height: 2, background: '#fff', alignSelf: 'flex-end' }} />
          </div>
        </div>
      </div>
    </nav>
  )
}
