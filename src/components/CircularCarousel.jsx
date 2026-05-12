import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const styleImages = [
  { src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800", size: [300, 400], start: {x: -20, y: -10, r: -5} }, // Top Left
  { src: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800", size: [200, 250], start: {x: 10, y: 20, r: 8} },   // Top Left Small
  { src: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800", size: [250, 250], start: {x: -30, y: 40, r: -12} }, // Top Center
  { src: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=800", size: [350, 450], start: {x: 40, y: -30, r: 5} },  // Top Right
  { src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800", size: [320, 400], start: {x: 0, y: 0, r: 0} },     // Bottom Left
  { src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800", size: [220, 280], start: {x: -10, y: -20, r: 10} }, // Bottom Left Offset
  { src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800", size: [350, 450], start: {x: 20, y: 15, r: -5} },  // Bottom Right
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800", size: [250, 320], start: {x: -5, y: 5, r: 3} },    // Bottom Right Offset
];

export default function CircularCarousel() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    // Precise scatter coordinates based on reference
    tl.to('.img-1', { x: -600, y: -350, rotation: -10, duration: 1 }, 0)
      .to('.img-2', { x: -750, y: -150, rotation: 5, duration: 1 }, 0)
      .to('.img-3', { x: 150, y: -380, rotation: -5, duration: 1 }, 0)
      .to('.img-4', { x: 650, y: -250, rotation: 10, duration: 1 }, 0)
      .to('.img-5', { x: -650, y: 350, rotation: 5, duration: 1 }, 0)
      .to('.img-6', { x: -400, y: 300, rotation: -10, duration: 1 }, 0)
      .to('.img-7', { x: 600, y: 350, rotation: -5, duration: 1 }, 0)
      .to('.img-8', { x: 400, y: 400, rotation: 12, duration: 1 }, 0)
      
      .from(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.2)
  }, { scope: containerRef })

  return (
    <section ref={containerRef} style={{ height: '200vh', background: '#f7f3e9', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Main Content */}
        <div ref={contentRef} style={{ textAlign: 'center', zIndex: 5, maxWidth: 800, padding: '0 20px' }}>
          <h2 style={{ 
            fontFamily: 'Helvetica, Arial, sans-serif', 
            fontSize: 'clamp(60px, 15vw, 180px)', 
            fontWeight: 900, 
            textTransform: 'lowercase',
            lineHeight: 0.85,
            margin: '0 0 2rem 0',
            color: '#1a1a1a'
          }}>
            new to<br/>palm?
          </h2>
          <p style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.5,
            color: '#444',
            maxWidth: 600,
            margin: '0 auto 3rem auto'
          }}>
            we'll walk you through mood-based design and how palm can enhance your lifestyle — with well-balanced boosts, no overwhelming highs, and all good vibes.
          </p>
          <button style={{
            background: '#1a1a1a',
            color: '#fff',
            border: 'none',
            padding: '18px 45px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            learn more
          </button>
        </div>
        
        {/* Scattered Images */}
        {styleImages.map((img, i) => (
          <div 
            key={i}
            className={`image-wrapper img-${i + 1}`}
            style={{
              position: 'absolute',
              width: img.size[0],
              height: img.size[1],
              zIndex: 10,
              borderRadius: 25,
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
              background: `url(${img.src}) center/cover no-repeat`,
              // Initial piled positions with specific transforms from the reference
              transform: `translate(${img.start.x}%, ${img.start.y}%) rotate(${img.start.r}deg)`
            }}
          />
        ))}
      </div>
    </section>
  )
}
