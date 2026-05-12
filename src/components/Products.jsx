import { useState, useRef } from 'react'
import { products } from '../data/products'
import ProductCard from './ProductCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const filters = ['All', 'Men', 'Women', 'Kids', 'Baby', 'Outerwear', 'T-Shirts', 'Jeans']

export default function Products() {
  const [active, setActive] = useState('All')
  const sectionRef = useRef(null)

  useGSAP(() => {
    // Reveal Header
    gsap.from('.new-arrivals-title span', {
      yPercent: 100,
      stagger: 0.05,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%'
      }
    })

    // Reveal Filters
    gsap.from('.filter-btn', {
      y: 20,
      opacity: 0,
      stagger: 0.04,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.filter-container',
        start: 'top 90%'
      }
    })
  }, { scope: sectionRef })

  return (
    <section id="products" ref={sectionRef} style={{ padding: '10rem 5%', background: '#fff' }}>
      {/* Editorial Header */}
      <div style={{ marginBottom: '6rem', position: 'relative' }}>
        <div style={{ 
          fontSize: '12px', 
          fontFamily: 'JetBrains Mono, monospace', 
          textTransform: 'uppercase', 
          letterSpacing: '0.4em', 
          color: '#888',
          marginBottom: '1.5rem',
          display: 'block'
        }}>
          Curated Collection / 2026
        </div>
        <h2 className="new-arrivals-title" style={{ 
          fontFamily: 'Bebas Neue, sans-serif', 
          fontSize: 'clamp(60px, 10vw, 120px)', 
          fontWeight: 400, 
          textTransform: 'uppercase',
          lineHeight: 0.9,
          margin: 0,
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.2em'
        }}>
          {"NEW ARRIVALS".split(" ").map((word, i) => (
            <span key={i} style={{ display: 'inline-block' }}>{word}</span>
          ))}
        </h2>
      </div>

      {/* Modern Filter Bar */}
      <div className="filter-container" style={{ 
        display: 'flex', 
        gap: '0.8rem', 
        marginBottom: '4rem', 
        flexWrap: 'wrap',
        borderBottom: '1px solid #eee',
        paddingBottom: '2rem'
      }}>
        {filters.map(f => (
          <button 
            key={f} 
            className="filter-btn"
            onClick={() => setActive(f)} 
            style={{
              padding: '10px 24px', 
              background: active === f ? '#000' : 'transparent',
              border: active === f ? '1px solid #000' : '1px solid #eee',
              color: active === f ? '#fff' : '#444',
              borderRadius: '50px',
              fontFamily: 'Sora, sans-serif', 
              fontSize: 12, 
              fontWeight: 600,
              textTransform: 'uppercase', 
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry-Style Grid */}
      <div className="products-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} className="product-card" />
        ))}
      </div>
    </section>
  )
}
