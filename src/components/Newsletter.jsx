import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <section style={{
      padding: '5rem 5%', background: '#f4f4f4',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
    }}>
      <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 28, fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase' }}>
        Get the latest Atfy news
      </h2>
      <p style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 14, color: '#333', marginBottom: '2.5rem', maxWidth: 600 }}>
        Sign up to receive information on new arrivals, sales, and exclusive offers. Plus, get ₹300 off on your first order.
      </p>
      
      <div style={{ display: 'flex', width: '100%', maxWidth: 500 }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
          style={{
            flex: 1, padding: '15px 20px', border: '1px solid #000',
            fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 14, outline: 'none'
          }}
        />
        <button style={{
          padding: '15px 40px', background: '#000', color: '#fff',
          border: 'none', fontWeight: 700, textTransform: 'uppercase',
          fontSize: 14, transition: 'background 0.2s'
        }}
          onMouseEnter={e => e.target.style.background = '#ff0000'}
          onMouseLeave={e => e.target.style.background = '#000'}
        >Subscribe</button>
      </div>
    </section>
  )
}
