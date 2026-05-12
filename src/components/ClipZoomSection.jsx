import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ClipZoomSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("#clip img", { clearProps: "all" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "#clip img",
        { scale: 1, y: 0 },
        {
          scale: 1.25, // zoom amount
          y: -30,      // optional parallax
          ease: "none",
          scrollTrigger: {
            trigger: "#clip",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      minHeight: '100vh',
      background: '#e8eaf6', // Light purple/blue tint matching the image
      padding: '6rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <h2 style={{
        fontFamily: '"Impact", "Arial Black", sans-serif',
        fontWeight: 900,
        fontSize: 'clamp(40px, 8vw, 120px)',
        color: '#000',
        textTransform: 'uppercase',
        lineHeight: 0.9,
        textAlign: 'center',
        margin: '0 0 4rem 0',
        letterSpacing: '-2px'
      }}>
        EMPOWER BUSINESSES<br />THROUGH INTELLIGENT TECH
      </h2>
      
      <div id="clip" style={{
        width: 'clamp(300px, 60vw, 800px)',
        height: 'clamp(400px, 60vh, 800px)',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div className="mask-clip-path about-image" style={{ width: '100%', height: '100%' }}>
          <img
            src="img/futuristic-computer-graphic-glowing-human-face-generative-ai_188544-9003.avif"
            alt="Background"
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
            className="about-zoom-img"
          />
        </div>
      </div>
    </section>
  )
}
