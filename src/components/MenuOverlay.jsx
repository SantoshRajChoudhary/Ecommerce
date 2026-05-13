import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const menuItems = [
  { name: 'MEN', count: '124', image: 'images/men.png' },
  { name: 'WOMEN', count: '156', image: 'images/hero_model.png' },
  { name: 'KIDS', count: '82', image: 'images/kids.png' },
  { name: 'OUTERWEAR', count: '45', image: 'images/outerwear.png' },
  { name: 'ACCESSORIES', count: '31', image: 'images/hero_accessory.png' },
]

export default function MenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null)
  const menuRef = useRef(null)
  const itemsRef = useRef([])
  const bgRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline()
      
      gsap.set(overlayRef.current, { display: 'flex' })
      
      tl.fromTo(bgRef.current, 
        { y: '-100%' }, 
        { y: '0%', duration: 1, ease: 'expo.inOut' }
      )
      .fromTo(itemsRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out' },
        '-=0.5'
      )
    } else {
      const tl = gsap.timeline()
      tl.to(itemsRef.current, {
        y: -50, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.in'
      })
      .to(bgRef.current, {
        y: '100%', duration: 0.8, ease: 'expo.inOut',
        onComplete: () => gsap.set(overlayRef.current, { display: 'none' })
      }, '-=0.2')
    }
  }, [isOpen])

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        display: 'none', flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={bgRef}
        style={{
          position: 'absolute', inset: 0, background: '#c19a6b',
          zIndex: -1
        }}
      />

      <div 
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '100px 5%'
        }}
      >
        <div 
          ref={menuRef}
          style={{
            display: 'flex', flexDirection: 'column', gap: '1rem',
            width: '100%', maxWidth: 1200
          }}
        >
          {menuItems.map((item, i) => (
            <div 
              key={item.name}
              ref={el => itemsRef.current[i] = el}
              style={{
                display: 'flex', alignItems: 'baseline', gap: '2rem',
                cursor: 'pointer', group: 'true', position: 'relative'
              }}
              onMouseEnter={() => {
                gsap.to(`.menu-img-${i}`, { opacity: 1, scale: 1.1, duration: 0.6 })
              }}
              onMouseLeave={() => {
                gsap.to(`.menu-img-${i}`, { opacity: 0, scale: 1, duration: 0.6 })
              }}
            >
              <span style={{
                fontFamily: 'Helvetica, sans-serif', fontSize: 14, color: '#000',
                minWidth: 40, opacity: 0.6
              }}>0{i + 1}</span>
              
              <h2 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(40px, 8vw, 100px)',
                color: '#000', margin: 0, lineHeight: 0.9,
                letterSpacing: '0.02em', transition: 'transform 0.3s'
              }}>
                {item.name}
              </h2>
              
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#000',
                marginLeft: '1rem', opacity: 0.8
              }}>[{item.count} items]</span>

              {/* Hover Image Reveal */}
              <div 
                className={`menu-img-${i}`}
                style={{
                  position: 'fixed', top: '50%', right: '15%',
                  width: '30vw', height: '40vh',
                  background: `url(${item.image}) center/cover no-repeat`,
                  transform: 'translateY(-50%)',
                  opacity: 0, pointerEvents: 'none', zIndex: -1,
                  borderRadius: 20, transition: 'opacity 0.6s, transform 0.6s'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info in Menu */}
      <div style={{
        padding: '3rem 5%', display: 'flex', justifyContent: 'space-between',
        borderTop: '1px solid rgba(0,0,0,0.1)', color: '#000'
      }}>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Helvetica', fontSize: 12, opacity: 0.6 }}>
          <span>INSTAGRAM</span>
          <span>TWITTER</span>
          <span>BEHANCE</span>
        </div>
        <div style={{ fontFamily: 'Helvetica', fontSize: 12, opacity: 0.6 }}>
          © 2026 ATFY COLLECTIONS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  )
}
