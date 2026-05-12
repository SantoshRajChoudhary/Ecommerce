import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Editorial() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)
  const clipRef    = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(imgRef.current, { clearProps: 'all' })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1, y: 0 },
        {
          scale: 1.25,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: clipRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        margin: '4rem 0',
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'center',
        background: '#fff',
      }}
    >
      {/* overflow:hidden clips the zoom so it stays within bounds */}
      <div
        ref={clipRef}
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: 600,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=1000"
          alt="LifeWear editorial"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        />
      </div>
    </section>
  )
}