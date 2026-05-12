import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const items = [
  'FREE SHIPPING ON ALL ORDERS',
  '•',
  'DOWNLOAD THE PALM ANGELS APP FOR EXCLUSIVE OFFERS',
  '•',
  'NEW ARRIVALS: SPRING/SUMMER COLLECTION',
  '•',
  'WELCOME OFFER: ₹300 OFF ON FIRST APP PURCHASE',
  '•',
]

export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tw = gsap.to(track, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })
    return () => tw.kill()
  }, [])

  const repeated = [...items, ...items]

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
      background: '#ff0000', overflow: 'hidden',
      height: 32, display: 'flex', alignItems: 'center',
    }}>
      <div ref={trackRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {repeated.map((t, i) => (
          <span key={i} style={{ 
            padding: '0 3rem', 
            fontFamily: 'Helvetica, Arial, sans-serif', 
            fontWeight: 700, 
            fontSize: 11, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase', 
            color: '#ffffff' 
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}
