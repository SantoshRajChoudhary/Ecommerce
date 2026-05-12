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
    // Text animation
    gsap.fromTo(
      '.heading-text',
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )

    // Staggered cards animation
    gsap.fromTo(
      '.product-card',
      { y: 100, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 85%',
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="products" ref={sectionRef} style={{ padding: '4rem 5%' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
        <h2 className="heading-text" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 32, fontWeight: 900, textTransform: 'uppercase' }}>New Arrivals</h2>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 15, marginBottom: '3rem', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{
            padding: '8px 24px', background: active === f ? '#000' : '#fff',
            border: '1px solid #000',
            color: active === f ? '#fff' : '#000',
            fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 13, fontWeight: 700,
            textTransform: 'uppercase', transition: 'all 0.2s',
          }}>{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} className="product-card" />
        ))}
      </div>
    </section>
  )
}
