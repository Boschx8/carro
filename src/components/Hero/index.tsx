import { useEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import Scene3D from './Scene3D'

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (spotlightRef.current) {
      spotlightRef.current.style.background =
        `radial-gradient(175px circle at ${x}px ${y}px, rgba(155,35,53,0.10), rgba(255,255,255,0.02) 40%, transparent 70%)`
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(
          titleRef.current?.querySelectorAll('.word') ?? [],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

      gsap.to(scrollRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut',
        delay: 2,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* 3D Canvas behind */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 52 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          style={{ touchAction: 'none' }}
        >
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradients per llegibilitat */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent pointer-events-none md:block hidden" />
      <div className="absolute inset-0 bg-[#0a0a0a]/65 pointer-events-none md:hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
      {/* Spotlight mouse */}
      <div ref={spotlightRef} className="absolute inset-0 pointer-events-none transition-all duration-150" />

      {/* Text overlay */}
      <div className="relative z-10 flex items-center h-full">
        <div className="w-full px-5 md:px-6 md:max-w-7xl md:mx-auto">
          <div className="max-w-2xl">
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0 inline-flex items-center gap-2 mb-5 md:mb-6">
              <span className="px-3 py-1 text-xs font-semibold bg-[#9B2335]/15 border border-[#9B2335]/30 text-[#c84b5a] rounded-full tracking-widest uppercase">
                BPTalent 4.0 · Projecte 2
              </span>
            </div>

            {/* Title */}
            <div ref={titleRef} className="mb-5 md:mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight text-white uppercase">
                <span className="word inline-block opacity-0">Nou</span>{' '}
                <span className="word inline-block opacity-0 hero-carro">Carro</span>{' '}
                <span className="word inline-block opacity-0">de</span>
                <br />
                <span className="word inline-block opacity-0">Reposició</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p ref={subtitleRef} className="opacity-0 text-slate-300 text-base md:text-lg leading-relaxed max-w-lg">
              Validar una eina física i operativa per fer la reposició més eficient, ergonòmica i ordenada a les 232 botigues Bon Preu i Esclat.
            </p>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  )
}
