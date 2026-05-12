import { useState, useRef } from 'react'

export default function ProductCard({ product, index, className }) {
  const [hover, setHover] = useState(false)
  const cardRef = useRef(null)

  return (
    <div 
      ref={cardRef}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ 
        position: 'relative', 
        background: 'transparent', 
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: hover ? 'translateY(-10px)' : 'translateY(0)'
      }}
    >
      {/* Image Container */}
      <div style={{ 
        aspectRatio: '3/4', 
        background: '#f9f9f9', 
        overflow: 'hidden', 
        position: 'relative',
        borderRadius: '4px',
        boxShadow: hover ? '0 40px 80px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.03)',
        transition: 'box-shadow 0.4s ease'
      }}>
        {/* Wishlist Heart */}
        <button style={{
          position: 'absolute', top: 15, right: 15,
          zIndex: 10, background: 'rgba(255,255,255,0.8)', 
          backdropFilter: 'blur(10px)',
          border: 'none', width: 35, height: 35, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', opacity: hover ? 1 : 0,
          transform: `scale(${hover ? 1 : 0.8})`,
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          color: '#000'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Product Image */}
        <div style={{
          width: '100%', height: '100%',
          background: `url(${product.image}) center/cover no-repeat`,
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hover ? 'scale(1.08)' : 'scale(1)',
          willChange: 'transform'
        }} />

        {/* Glassmorphic Actions */}
        <div style={{
          position: 'absolute', bottom: 15, left: 15, right: 15,
          display: 'flex', gap: 8,
          transform: `translateY(${hover ? 0 : 20}px)`,
          opacity: hover ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          zIndex: 5
        }}>
          <button style={{
            flex: 1,
            background: 'rgba(255,255,255,0.9)', 
            backdropFilter: 'blur(15px)',
            color: '#000', border: 'none', padding: '12px 0',
            fontWeight: 700, fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.1em', cursor: 'pointer',
            borderRadius: '2px'
          }}>
            Quick Add
          </button>
        </div>

        {/* Badge */}
        {product.tag && (
          <div style={{
            position: 'absolute', top: 15, left: 15,
            background: '#000', color: '#fff',
            fontSize: 9, fontWeight: 800, padding: '4px 10px',
            textTransform: 'uppercase', letterSpacing: '0.15em',
            borderRadius: '1px'
          }}>
            {product.tag}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.5rem 0.2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h3 style={{ 
            fontFamily: 'Sora, sans-serif', fontWeight: 600, 
            fontSize: 15, color: '#000', margin: 0,
            transition: 'color 0.3s ease'
          }}>
            {product.name}
          </h3>
          <div style={{ 
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, 
            fontSize: 14, color: '#000' 
          }}>
            {product.price}
          </div>
        </div>
        
        <p style={{ 
          fontFamily: 'Sora, sans-serif', fontSize: 11, 
          color: '#888', margin: 0, textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {product.category}
        </p>

        {/* Color Options */}
        <div style={{ display: 'flex', gap: 8, marginTop: 15 }}>
          {['#000', '#eee', '#b8975a'].map((c, i) => (
            <div key={i} style={{ 
              width: 10, height: 10, borderRadius: '50%', background: c,
              border: c === '#eee' ? '1px solid #ddd' : 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              transform: hover ? 'scale(1.2)' : 'scale(1)'
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
