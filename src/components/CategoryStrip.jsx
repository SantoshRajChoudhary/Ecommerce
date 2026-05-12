import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function CategoryStrip() {
  const stripRef = useRef(null)

  useEffect(() => {
    const items = stripRef.current.querySelectorAll('.cat-item')
    gsap.from(items, {
      yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: stripRef.current, start: 'top 90%' }
    })
  }, [])

  return (
    <div ref={stripRef} style={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      {categories.map((cat, i) => (
        <div key={i} className="cat-item" style={{
          flex: 1, padding: '1.4rem 2rem',
          borderRight: i < categories.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'none', transition: 'background 0.3s',
          overflow: 'hidden',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(184,151,90,0.04)'
            e.currentTarget.querySelector('.arr').style.transform = 'translateX(6px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.querySelector('.arr').style.transform = 'translateX(0)'
          }}
        >
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.07em', color: '#000000' }}>{cat.name}</div>
            <div style={{ fontSize: 11, color: '#444', letterSpacing: '0.06em', marginTop: 2, fontWeight: 500 }}>{cat.count}</div>
          </div>
          <span className="arr" style={{ color: '#b8975a', fontSize: 20, transition: 'transform 0.25s' }}>→</span>
        </div>
      ))}
    </div>
  )
}
