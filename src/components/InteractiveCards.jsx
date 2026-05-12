import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const items = [
  { id: 1, src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400", title: "Casual Outerwear" },
  { id: 2, src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400", title: "Premium Denim" },
  { id: 3, src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=400", title: "Spring Knits" },
  { id: 4, src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400", title: "Classic Basics" },
  { id: 5, src: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=400", title: "Modern Layers" },
]

export default function InteractiveCards() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Scroll Entrance
    gsap.from('.interactive-card', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%'
      }
    })
  }, { scope: containerRef })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const label = card.querySelector('.card-label')
    const { left, top, width, height } = card.getBoundingClientRect()
    
    const x = e.clientX - left - width / 2
    const y = e.clientY - top - height / 2

    // Magnetic Card
    gsap.to(card, {
      x: x * 0.2,
      y: y * 0.2,
      scale: 1.02,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto'
    })

    // Parallax Label (moves further than card for depth)
    gsap.to(label, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto'
    })
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    const label = card.querySelector('.card-label')

    gsap.to(card, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    })

    gsap.to(label, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      overwrite: 'auto'
    })
  }

  return (
    <section 
      ref={containerRef} 
      style={{ 
        padding: '10rem 5%', 
        background: '#fff', 
        overflow: 'hidden',
      }}
    >
      <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h2 style={{ 
          fontFamily: 'Helvetica, Arial, sans-serif', 
          fontSize: 32, 
          fontWeight: 900, 
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Seasonal Discovery
        </h2>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '3rem', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {items.map((item) => (
          <div 
            key={item.id}
            className="interactive-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              flex: '0 0 260px',
              height: '360px',
              background: `url(${item.src}) center/cover no-repeat`,
              borderRadius: '0px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '2.5rem',
              cursor: 'pointer',
              position: 'relative',
              willChange: 'transform'
            }}
          >
            <div className="card-label" style={{
              background: '#000',
              color: '#fff',
              padding: '12px 24px',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              fontFamily: 'Helvetica, Arial, sans-serif',
              letterSpacing: '2px',
              pointerEvents: 'none',
              boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 10
            }}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
