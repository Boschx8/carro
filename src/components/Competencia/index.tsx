import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  '/competencia/comp-01-floristeria-carros.jpg',
  '/competencia/comp-02-supermercat-caixes.jpg',
  '/competencia/comp-03-muntant-forats.jpg',
  '/competencia/comp-05-caixes-apilades.jpg',
]

export default function Competencia() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      )
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="competencia" ref={sectionRef} className="py-20 px-4 md:px-6 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-12">
          <div className="text-[#c84b5a] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-6">
            Competència
          </div>
          <div className="flex justify-center">
            <p className="text-slate-400 text-lg max-w-2xl text-center">
              Solucions de transport i exposició que ja es fan servir avui en altres sectors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {photos.map((src, i) => (
            <div
              key={src}
              ref={(el) => { cardsRef.current[i] = el }}
              className="rounded-2xl overflow-hidden border border-white/8 bg-white/3"
            >
              <img src={src} alt="" loading="lazy" className="w-full h-[420px] md:h-[520px] object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
