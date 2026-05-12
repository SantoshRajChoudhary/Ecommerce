import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { id: 1, title: "Men's Collection", subtitle: "Summer Essentials", bg: '#f4f4f4', img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1000' },
  { id: 2, title: "Women's Collection", subtitle: "New Arrivals", bg: '#e8e8e8', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000' },
  { id: 3, title: "Kids & Baby", subtitle: "Comfort First", bg: '#f9f9f9', img: 'https://images.unsplash.com/photo-1519704943920-18447d21751b?auto=format&fit=crop&q=80&w=1000' },
  { id: 4, title: "Accessories", subtitle: "Final Touches", bg: '#ececec', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000' },
]

export default function StackingSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const cardElements = gsap.utils.toArray('.stack-card')
    
    // Create a timeline for the stacking effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${(cardElements.length - 1) * 100}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      }
    })

    cardElements.forEach((card, i) => {
      if (i === 0) return // First card is already visible

      // Animate the current card sliding up from the bottom
      tl.fromTo(card, 
        { yPercent: 100 }, 
        { yPercent: 0, ease: 'none' }, 
        i - 1
      )

      // Animate the PREVIOUS card scaling down and blurring
      tl.to(cardElements[i-1], 
        { 
          scale: 0.9, 
          opacity: 0.4, 
          filter: 'blur(8px)',
          y: -50,
          ease: 'none' 
        }, 
        i - 1
      )
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} style={{ background: '#111', position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {cards.map((c, i) => (
        <div 
          key={c.id} 
          className="stack-card"
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: i + 1,
          }}
        >
          {/* Card Content Wrapper */}
          <div style={{
            width: '95%',
            height: '90%',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 50px 100px rgba(0,0,0,0.3)',
            background: c.bg
          }}>
            {/* Background Image with Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `url(${c.img}) center/cover no-repeat`,
              opacity: 1
            }} />
            
            {/* Overlay Gradient for Text Readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))',
              zIndex: 1
            }} />
            
            <div style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              color: '#fff',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '3.5rem',
                minWidth: '400px',
                borderRadius: '4px',
                color: '#000',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}>
                <h2 style={{ 
                  fontFamily: 'Helvetica, Arial, sans-serif', 
                  fontSize: 48, 
                  fontWeight: 900, 
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  letterSpacing: '-1px'
                }}>
                  {c.title}
                </h2>
                <div style={{ height: 2, width: 40, background: '#ff0000', margin: '0 auto 1.5rem' }} />
                <p style={{ 
                  fontFamily: 'Helvetica, Arial, sans-serif', 
                  fontSize: 14, 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  color: '#333'
                }}>
                  {c.subtitle}
                </p>
                <button style={{
                  marginTop: '2rem',
                  padding: '12px 30px',
                  border: '1px solid #000',
                  background: 'transparent',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
