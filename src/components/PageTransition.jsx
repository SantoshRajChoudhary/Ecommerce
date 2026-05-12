import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageTransition({ ready }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (ready) {
      const tl = gsap.timeline()
      
      tl.to('.transition-panel', {
        height: 0,
        duration: 0.8, // Reduced from 1.2
        stagger: 0.05, // Reduced from 0.1
        ease: 'power4.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none'
          }
        }
      })
    }
  }, [ready])

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="transition-panel"
          style={{
            width: '100%',
            height: '20vh',
            background: '#000',
            position: 'relative'
          }}
        />
      ))}
    </div>
  )
}
