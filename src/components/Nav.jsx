import { useEffect, useRef, useState } from 'react'

const categories = ['WOMEN', 'MEN', 'KIDS', 'BABY']

export default function Nav({ ready }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 32, left: 0, right: 0, zIndex: 1000,
      background: '#ffffff',
      borderBottom: '1px solid #eeeeee',
      height: 70,
      display: 'flex', alignItems: 'center', padding: '0 5%',
      transition: 'box-shadow 0.3s',
      boxShadow: scrolled ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
    }}>
      {/* Logo */}
      {/* <a href="#" style={{
        background: '#ff0000', color: '#fff',
        width: 45, height: 45,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 900, fontSize: 12,
        lineHeight: 1, textAlign: 'center', marginRight: 40,
        flexShrink: 0
      }}>
        UNI<br/>QLO
      </a> */}

      {/* Categories */}
      <div style={{ display: 'flex', gap: 30, marginRight: 'auto' }}>
        {categories.map(c => (
          <a key={c} href="#" style={{
            fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 14,
            color: '#000000', textDecoration: 'none', padding: '10px 0',
            borderBottom: '3px solid transparent',
            transition: 'border-color 0.2s'
          }}
            onMouseEnter={e => e.target.style.borderColor = '#ff0000'}
            onMouseLeave={e => e.target.style.borderColor = 'transparent'}
          >{c}</a>
        ))}
      </div>

      {/* Search Bar */}
      <div style={{
        position: 'relative', width: 300, marginRight: 40,
        display: 'flex', alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search by keyword"
          style={{
            width: '100%', padding: '10px 40px 10px 15px',
            borderRadius: 20, border: '1px solid #dddddd',
            background: '#f4f4f4', fontSize: 13, outline: 'none'
          }}
        />
        <span style={{ position: 'absolute', right: 15, fontSize: 16, color: '#666' }}>🔍</span>
      </div>

      {/* Icons */}
      <div style={{ display: 'flex', gap: 25, alignItems: 'center' }}>
        <a href="#" style={{ fontSize: 20 }}>👤</a>
        <a href="#" style={{ fontSize: 20 }}>♡</a>
        <a href="#" style={{ fontSize: 20, position: 'relative' }}>
          🛒
          <span style={{
            position: 'absolute', top: -5, right: -10,
            background: '#ff0000', color: '#fff', fontSize: 10,
            width: 18, height: 18, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700
          }}>0</span>
        </a>
      </div>
    </nav>
  )
}
