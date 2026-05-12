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

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const { left, top, width, height } = card.getBoundingClientRect()
    
    // Calculate mouse position relative to the card center
    const xPercent = (e.clientX - left) / width - 0.5
    const yPercent = (e.clientY - top) / height - 0.5

    gsap.to(card, {
      x: xPercent * 30, // Slight movement
      y: yPercent * 30,
      rotationY: xPercent * 30, // 3D tilt
      rotationX: -yPercent * 30,
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  const handleMouseLeave = (e) => {
    // Reset card position smoothly
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
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
        perspective: '1200px'
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
        gap: '2.5rem', 
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
              flex: '0 0 240px',
              height: '340px',
              background: `url(${item.src}) center/cover no-repeat`,
              borderRadius: '2px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1.5rem',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              willChange: 'transform'
            }}
          >
            <div style={{
              background: '#000',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontFamily: 'Helvetica, Arial, sans-serif',
              letterSpacing: '1px',
              pointerEvents: 'none' // Ensure text doesn't interfere with mousemove
            }}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
