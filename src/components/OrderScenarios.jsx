import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OrderScenarios() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.from('.scenario-bg', { scale: 1.1, duration: 2, ease: 'power2.out' })
      .from('.scenario-content-white', { x: -100, opacity: 0, duration: 1, ease: 'power4.out' }, '-=1.5')
      .from('.scenario-content-dark', { x: 100, opacity: 0, duration: 1, ease: 'power4.out' }, '-=1')
  }, { scope: containerRef })

  return (
    <section ref={containerRef} style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image */}
      <div className="scenario-bg" style={{
        position: 'absolute', inset: 0,
        background: 'url("https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=1800") center/cover no-repeat'
      }} />

      {/* Foreground UI Elements */}
      <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Scenario Numbering */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em' }}>
          01 / 05 — THE STREETS
        </div>

        {/* Content Layout */}
        <div style={{ display: 'flex', width: '90%', maxWidth: 1200, alignItems: 'flex-start' }}>
          
          {/* White Box (Title) */}
          <div className="scenario-content-white" style={{
            background: '#fff', padding: '4rem 5rem', width: '50%',
            boxShadow: '0 50px 100px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 80, lineHeight: 0.9, color: '#000', margin: 0 }}>
              NIGHT<br/>REBELS
            </h2>
          </div>

          {/* Dark Box (Description) */}
          <div className="scenario-content-dark" style={{
            background: '#1a1a1a', padding: '4rem', width: '40%', marginTop: '15rem', marginLeft: '-5rem'
          }}>
            <p style={{ color: '#fff', fontFamily: 'Helvetica, sans-serif', lineHeight: 1.8, fontSize: 16, marginBottom: '2rem' }}>
              Our Night Rebels collection is designed for those who thrive after dark. Combining high-visibility reflective materials with raw urban aesthetics.
            </p>
            <button style={{
              background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
              padding: '15px 30px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '1rem',
              cursor: 'pointer', transition: 'all 0.3s'
            }}
              onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#000' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#fff' }}
            >
              EXPLORE COLLECTION <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
