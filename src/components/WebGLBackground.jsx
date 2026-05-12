import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

export default function WebGLBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Particles
    const count = 2000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      sizes[i] = Math.random() * 2 + 0.5
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xb8975a) },
        uOpacity: { value: 0.0 },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.3 + position.x * 0.5) * 0.2;
          pos.x += cos(uTime * 0.2 + position.z * 0.3) * 0.15;
          vAlpha = (sin(uTime * 0.5 + position.z * 2.0) + 1.0) * 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.1, d);
          gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Floating lines (luxury grid)
    const lineMat = new THREE.LineBasicMaterial({ color: 0xb8975a, transparent: true, opacity: 0.08 })
    for (let i = -5; i <= 5; i++) {
      const pts = [new THREE.Vector3(-15, i * 2, 0), new THREE.Vector3(15, i * 2, 0)]
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
      scene.add(new THREE.Line(lineGeo, lineMat))
    }
    for (let i = -7; i <= 7; i++) {
      const pts = [new THREE.Vector3(i * 2, -15, 0), new THREE.Vector3(i * 2, 15, 0)]
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
      scene.add(new THREE.Line(lineGeo, lineMat))
    }

    // Mouse interaction
    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // Fade in
    gsap.to(mat.uniforms.uOpacity, { value: 0.6, duration: 3, ease: 'power2.inOut' })

    let animId
    let startTime = performance.now()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = (performance.now() - startTime) / 1000
      mat.uniforms.uTime.value = t
      particles.rotation.y = t * 0.02 + mouseX * 0.05
      particles.rotation.x = mouseY * 0.03
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02
      camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.02
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
