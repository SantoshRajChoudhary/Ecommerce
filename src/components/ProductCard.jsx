import { useState } from 'react'

export default function ProductCard({ product, index, className }) {
  const [hover, setHover] = useState(false)

  return (
    <div 
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ 
        position: 'relative', 
        background: '#fff', 
        paddingBottom: '2rem',
        cursor: 'pointer'
      }}
    >
      {/* Image Container */}
      <div style={{ 
        aspectRatio: '3/4', 
        background: '#f4f4f4', 
        overflow: 'hidden', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Wishlist Heart */}
        <button style={{
          position: 'absolute', top: 12, right: 12,
          zIndex: 10, background: 'transparent', border: 'none',
          cursor: 'pointer', opacity: hover ? 1 : 0,
          transform: `translateY(${hover ? 0 : -10}px)`,
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Mock Product Image */}
        <div style={{
          width: '100%', height: '100%',
          background: `url(${product.image}) center/cover no-repeat`,
          transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: hover ? 'scale(1.1)' : 'scale(1)'
        }} />

        {/* Overlay buttons */}
        <div style={{
          position: 'absolute', bottom: 20, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', gap: 8,
          padding: '0 20px',
          transform: `translateY(${hover ? 0 : 20}px)`,
          opacity: hover ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
        }}>
          <button style={{
            background: '#fff', color: '#000',
            border: 'none', padding: '12px 0',
            fontWeight: 700, fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.1em', cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            Quick View
          </button>
          <button style={{
            background: '#000', color: '#fff',
            border: 'none', padding: '12px 0',
            fontWeight: 700, fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.1em', cursor: 'pointer'
          }}>
            Add to Bag
          </button>
        </div>

        {/* Uniqlo Badge */}
        {product.tag && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: '#ff0000', color: '#fff',
            fontSize: 10, fontWeight: 700, padding: '2px 8px',
            textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            {product.tag}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.2rem 0.5rem 0' }}>
        <p style={{ 
          fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 11, 
          color: '#888', marginBottom: 4, textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {product.category}
        </p>
        <h3 style={{ 
          fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, 
          fontSize: 14, color: '#000', marginBottom: 6,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          {product.name}
        </h3>
        <div style={{ 
          fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 900, 
          fontSize: 15, color: '#000' 
        }}>
          {product.price}
        </div>
        
        {/* Colors dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
          {['#fff', '#000', '#2d4b73', '#7a2e2e'].map(c => (
            <div key={c} style={{ 
              width: 12, height: 12, borderRadius: '50%', background: c,
              border: '1px solid #eee', cursor: 'pointer'
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
