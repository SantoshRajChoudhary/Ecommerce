import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const heroImages = [
  { src: "images/hero_model.png", top: '12%', left: '8%', width: 220, height: 300, r: -8 },
  { src: "images/hero_fabric.png", top: '15%', right: '10%', width: 240, height: 280, r: 12 },
  { src: "images/hangers.png", bottom: '12%', left: '10%', width: 200, height: 260, r: 6 },
  { src: "images/hero_accessory.png", bottom: '15%', right: '8%', width: 260, height: 320, r: -10 },
]

export default function Hero({ ready }) {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const bgImageRef = useRef(null)
  const buttonRefs = useRef([])
  const floatImagesRef = useRef([])

  useEffect(() => {
    if (!ready) return
    const tl = gsap.timeline()
    
    // 1. Initial State
    gsap.set('.char', { y: 100, opacity: 0 })
    gsap.set('.hero-float-img', { scale: 0, opacity: 0, rotate: (i) => heroImages[i].r * 2 })
    
    // 2. The Animation Sequence
    tl.to(bgImageRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      scale: 1,
      duration: 2.2,
      ease: 'expo.inOut'
    })
    .to('.char', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      ease: 'power4.out'
    }, '-=1.2')
    .to('.hero-float-img', {
      scale: 1,
      opacity: 1,
      rotate: (i) => heroImages[i].r,
      duration: 1.5,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=1.4')
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=1.2')
    .to(buttonRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=1')

    // Ambient floating for images
    floatImagesRef.current.forEach((img, i) => {
      gsap.to(img, {
        y: '+=20',
        x: '+=10',
        duration: 2 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    // Mouse Parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const xPercent = (clientX / window.innerWidth - 0.5)
      const yPercent = (clientY / window.innerHeight - 0.5)

      gsap.to('.hero-content', {
        x: xPercent * 50,
        y: yPercent * 50,
        duration: 1.5,
        ease: 'power2.out'
      })

      gsap.to(bgImageRef.current, {
        x: xPercent * -30,
        y: yPercent * -30,
        scale: 1.05,
        duration: 2,
        ease: 'power2.out'
      })

      floatImagesRef.current.forEach((img, i) => {
        const factor = (i + 1) * 40
        gsap.to(img, {
          x: xPercent * factor,
          y: yPercent * factor,
          duration: 1 + (i * 0.5),
          ease: 'power2.out'
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [ready])

  const titleText = "PALM COLLECTIONS"
  const chars = titleText.split("")

  return (
    <section style={{ 
      height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', 
      background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      {/* Big Hero Background Image */}
      <div
        ref={bgImageRef}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          background: 'url("images/hero_bg.png") center/cover no-repeat',
          opacity: 0.6,
          transform: 'scale(1.2)', // Initial scale for zoom-out effect
          clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
          willChange: 'transform, clip-path'
        }}
      />

      {/* Floating Hero Images */}
      {heroImages.map((img, i) => (
        <div 
          key={i}
          ref={el => floatImagesRef.current[i] = el}
          className="hero-float-img"
          style={{
            position: 'absolute',
            top: img.top,
            left: img.left,
            right: img.right,
            bottom: img.bottom,
            width: img.width || img.size,
            height: img.height || img.size * 1.3,
            zIndex: 15,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            background: `url(${img.src}) center/cover no-repeat`,
            border: '1px solid rgba(255,255,255,0.1)',
            willChange: 'transform'
          }}
        />
      ))}

      {/* Central Content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 20, textAlign: 'center' }}>
        <h1 
          ref={titleRef}
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(80px, 15vw, 180px)',
            color: '#fff',
            lineHeight: 0.9,
            margin: 0,
            letterSpacing: '0.02em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          {chars.map((char, i) => (
            <span key={i} className="char" style={{ display: 'inline-block', whiteSpace: char === " " ? 'pre' : 'normal' }}>
              {char}
            </span>
          ))}
        </h1>
        <p 
          ref={subtitleRef}
          style={{
            color: '#fff',
            fontFamily: 'Helvetica, sans-serif',
            fontSize: 14,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginTop: '2rem',
            opacity: 0,
            transform: 'translateY(20px)',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          Revolutionizing Urban Streetwear
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
          <button 
            ref={el => buttonRefs.current[0] = el}
            style={{
              background: '#fff', color: '#000', border: 'none',
              padding: '18px 45px', borderRadius: '50px',
              fontFamily: 'Helvetica, sans-serif', fontWeight: 700, fontSize: 13,
              letterSpacing: '0.1em', cursor: 'pointer', opacity: 0, transform: 'translateY(20px)'
            }}
          >SHOP NOW</button>
          <button 
            ref={el => buttonRefs.current[1] = el}
            style={{
              background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
              padding: '18px 45px', borderRadius: '50px',
              fontFamily: 'Helvetica, sans-serif', fontWeight: 700, fontSize: 13,
              letterSpacing: '0.1em', cursor: 'pointer', opacity: 0, transform: 'translateY(20px)',
              backdropFilter: 'blur(10px)'
            }}
          >VIEW LOOKBOOK</button>
        </div>
      </div>
    </section>
  )
}
