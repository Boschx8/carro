import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconShield, IconZap, IconTrendingDown } from '../Icons'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    Icon: IconShield,
    title: 'Seguretat laboral',
    desc: 'Reduir el risc de lesions musculoesquelètiques i el desgastament físic dels reponedors en torns llargs.',
    color: '#c84b5a',
  },
  {
    Icon: IconZap,
    title: 'Eficiència operativa',
    desc: 'Optimitzar cada càrrega per reduir el temps destinat a tasques sense valor i els recorreguts innecessaris.',
    color: '#fbbf24',
  },
  {
    Icon: IconTrendingDown,
    title: 'Reducció de cost',
    desc: 'Baixar el cost per embalum reposat millorant la capacitat de cada viatge i eliminant ineficiències estructurals.',
    color: '#4ade80',
  },
]

export default function Origin() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 88%' } }
      )
      pillarsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="origen" ref={sectionRef} className="py-20 px-4 md:px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">

        {/* Títol */}
        <div ref={titleRef} className="mb-16 text-center">
          <div className="text-[#c84b5a] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-16">
            D'on sorgeix la idea
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            4 mesos reposant a botiga
          </h2>
          <div className="flex justify-center">
            <p className="text-slate-400 text-lg max-w-2xl text-center">
              Durant l'estada a botiga vam haver de reposar de forma intensiva. Vam viure de primera mà el procés real: la fatiga, les ineficiències i els riscos que pateix el reponedor cada dia.
            </p>
          </div>
        </div>

        {/* Cita central */}
        <div ref={quoteRef} className="mb-16">
          <div className="relative p-10 md:p-14 rounded-2xl border border-[#9B2335]/25 bg-[#9B2335]/6 text-center">
            <div className="text-6xl text-[#9B2335]/30 font-black leading-none mb-6">"</div>
            <div className="text-white text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-center">
              Si nosaltres mateixos ho hem de fer cada dia,{' '}
              <span className="text-[#c84b5a] font-bold">com el podem millorar?</span>{' '}
              No per a nosaltres, sinó per a les persones que ho fan de veritat.
            </div>
            <div className="mt-8 text-slate-500 text-sm tracking-widest uppercase">
              Projecte BPTalent 4.0 · Grup Bon Preu
            </div>
          </div>
        </div>

        {/* Els tres pilars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={i}
              ref={(el) => { pillarsRef.current[i] = el }}
              className="p-8 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors duration-300"
            >
              <div className="mb-5" style={{ color: p.color }}><p.Icon className="w-10 h-10" /></div>
              <h3 className="text-white font-bold text-xl mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-6 h-0.5 w-12 rounded-full" style={{ backgroundColor: p.color }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
