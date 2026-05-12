import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mx = useRef(0)
  const my = useRef(0)
  const rx = useRef(0)
  const ry = useRef(0)

  useEffect(() => {
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return

    const onMove = (e) => {
      mx.current = e.clientX
      my.current = e.clientY
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05 })
    }

    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.1
      ry.current += (my.current - ry.current) * 0.1
      gsap.set(ring, { x: rx.current, y: ry.current })
      requestAnimationFrame(tick)
    }
    tick()

    const onEnter = () => { dot.classList.add('hovered'); ring.classList.add('hovered') }
    const onLeave = () => { dot.classList.remove('hovered'); ring.classList.remove('hovered') }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => document.removeEventListener('mousemove', onMove)
  }, [])
}
