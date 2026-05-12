import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

function CategoryItem({ cat, i, total }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const itemRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div 
      ref={itemRef}
      className="cat-item" 
      style={{
        flex: 1, padding: '1.4rem 2rem',
        borderRight: i < total - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: 'none', transition: 'background 0.3s',
        overflow: 'visible', position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.07em', color: '#000000' }}>{cat.name}</div>
        <div style={{ fontSize: 11, color: '#444', letterSpacing: '0.06em', marginTop: 2, fontWeight: 500 }}>{cat.count}</div>
      </div>
      <span className="arr" style={{ 
        color: '#b8975a', fontSize: 20, transition: 'transform 0.25s',
        transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
        position: 'relative', zIndex: 2
      }}>→</span>

      {/* Hover Image */}
      <img 
        src={cat.img} 
        alt={cat.name} 
        style={{
          position: 'absolute',
          width: 150,
          height: 200,
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: 4,
          boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
          opacity: isHovered ? 1 : 0,
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.8})`,
          transition: 'opacity 0.3s, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      />
    </div>
  )
}

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
        <CategoryItem key={i} cat={cat} i={i} total={categories.length} />
      ))}
    </div>
  )
}
