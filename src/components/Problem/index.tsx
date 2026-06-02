import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { problemStats } from '../../data/projectData'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    title: 'Carros infrautilitzats',
    desc: "Amb una mitjana de 17,05 embalums per carro, els carros no s'omplen al màxim. La limitació és d'usabilitat i accessibilitat, no de capacitat física.",
    icon: '📦',
    color: '#60a5fa',
  },
  {
    title: 'Residus no integrats',
    desc: 'Sense espai per a cartró i plàstic, el treballador fa desplaçaments addicionals o acumula residus al terra, amb el risc de seguretat associat.',
    icon: '♻️',
    color: '#4ade80',
  },
  {
    title: 'Tasques banals',
    desc: 'Fins a 78 s per càrrega es destinen a tasques sense valor directe: buscar espai per a residus, reajustar productes o recol·locar embalums.',
    icon: '⏱',
    color: '#fbbf24',
  },
  {
    title: 'Recorreguts evitables',
    desc: "La manca d'integració d'eines genera 37,6 m de recorregut innecessari per càrrega, saturant passadissos i generant pèrdua de productivitat.",
    icon: '↔️',
    color: '#f87171',
  },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )

      // Counter animations
      problemStats.forEach((stat, i) => {
        const el = countersRef.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate() {
            const v = obj.val
            el.textContent =
              stat.decimals > 0 ? v.toFixed(stat.decimals) : Math.round(v).toLocaleString('ca')
          },
        })
      })

      // Card slide-in
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="problema" ref={sectionRef} className="py-32 px-6 bg-[#060e1c]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="opacity-0 mb-16 text-center">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Diagnosi operativa · 1.800 observacions de camp
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            El sistema actual no està{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              optimitzat
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            L'eina actual força el treballador a adaptar-se a ella. El carro ideal ha de ser al revés: adaptar-se al procés real de reposició.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {problemStats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm text-center"
            >
              <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                <span ref={(el) => { countersRef.current[i] = el }}>0</span>
                {stat.suffix}
              </div>
              <div className="text-white text-sm font-semibold">{stat.label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="opacity-0 p-7 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors duration-300 group"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-blue-300 transition-colors">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-5 h-0.5 w-12 rounded-full" style={{ backgroundColor: p.color }} />
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="mt-12 p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5">
          <p className="text-blue-300 text-center text-lg italic">
            "La dispersió entre embalums i temps per col·locar un bulto pràcticament no mostra correlació.
            Carregar més producte <strong className="text-white not-italic">no empitjoraria</strong> el temps unitari
            si el carro és estable, accessible i ergonòmic."
          </p>
        </div>
      </div>
    </section>
  )
}
