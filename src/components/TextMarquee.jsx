import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TextMarquee({ text = 'LUXURY · STREETWEAR · SS26 · NEW COLLECTION ·', reverse = false }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const tw = gsap.to(trackRef.current, {
      xPercent: reverse ? 50 : -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })
    return () => tw.kill()
  }, [reverse])

  const repeated = Array(6).fill(text).join(' ')

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '1.2rem 0' }}>
      <div ref={trackRef} style={{ whiteSpace: 'nowrap', display: 'inline-block', willChange: 'transform' }}>
        <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, letterSpacing: '0.15em', color: 'rgba(184,151,90,0.4)' }}>
          {repeated + ' ' + repeated}
        </span>
      </div>
    </div>
  )
}
