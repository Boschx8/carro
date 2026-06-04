import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pilotPhases } from '../../data/projectData'

gsap.registerPlugin(ScrollTrigger)

const kpis = [
  { kpi: 'Embalums per carro', actual: '17,05', obj: '>20', unit: 'embalums', color: '#c84b5a' },
  { kpi: 'Tasques banals/carro', actual: '78 s', obj: '<55 s', unit: 'per càrrega', color: '#fbbf24' },
  { kpi: 'Metres innecessaris', actual: '37,6 m', obj: '<26 m', unit: 'per càrrega', color: '#f87171' },
  { kpi: 'Fatiga percebuda', actual: '—', obj: '≥7/10', unit: 'enquesta post-pilot', color: '#4ade80' },
  { kpi: 'Satisfacció reponedors', actual: '—', obj: '≥80%', unit: 'ús regular', color: '#818cf8' },
  { kpi: 'Capacitat contenidors', actual: '0%', obj: '100%', unit: 'residus absorbits', color: '#34d399' },
]

export default function PilotSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const phasesRef = useRef<(HTMLDivElement | null)[]>([])
  const kpisRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      )
      phasesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
        )
      })
      gsap.fromTo(kpisRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: kpisRef.current, start: 'top 88%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pilot" ref={sectionRef} className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="opacity-0 mb-16 text-center">
          <div className="text-[#c84b5a] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-8">
            Pla d'implantació
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Primer validem,{' '}
            <span className="bg-gradient-to-r from-[#9B2335] to-[#c84b5a] bg-clip-text text-transparent">
              després escalem
            </span>
          </h2>
          <div className="flex justify-center">
            <p className="text-slate-400 text-lg max-w-2xl text-center">
              No s'escalarà fins que les dades del pilot confirmin les hipòtesis de millora. El criteri d'escalat no és el temps transcorregut, sinó la validació dels KPIs.
            </p>
          </div>
        </div>

        {/* Phase timeline */}
        <div className="relative mb-16">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#9B2335]/50 via-[#c84b5a]/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-6">
            {pilotPhases.map((phase, i) => (
              <div
                key={phase.num}
                ref={(el) => { phasesRef.current[i] = el }}
                className="opacity-0 relative flex gap-6 md:ml-0"
              >
                {/* Phase number circle */}
                <div
                  className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl border-2 border-white/10"
                  style={{ background: `${phase.color}22`, borderColor: `${phase.color}44` }}
                >
                  <span style={{ color: phase.color }}>{phase.num}</span>
                </div>

                {/* Content card */}
                <div className="flex-1 p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Fase {phase.num}: {phase.title}
                      </h3>
                      <span
                        className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: `${phase.color}18`, color: phase.color }}
                      >
                        {phase.duration}
                      </span>
                    </div>

                    <div className="flex gap-4 text-right">
                      {phase.carros !== '—' && (
                        <div>
                          <div className="text-lg font-black text-white">{phase.carros}</div>
                          <div className="text-xs text-slate-500">carros</div>
                        </div>
                      )}
                      <div>
                        <div className="text-lg font-black" style={{ color: phase.color }}>{phase.cost}</div>
                        <div className="text-xs text-slate-500">inversió</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{phase.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {phase.kpis.map((kpi) => (
                      <span
                        key={kpi}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{ borderColor: `${phase.color}30`, color: phase.color, background: `${phase.color}0c` }}
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI table */}
        <div ref={kpisRef} className="opacity-0">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">KPIs de validació del pilot</h3>
            <p className="text-slate-400 text-sm text-center">
              Decisió d'escalat quan almenys els 4 primers indicadors mostren una millora ≥10%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((item) => (
              <div
                key={item.kpi}
                className="p-5 rounded-xl border border-white/8 bg-white/3 flex items-center gap-4"
              >
                <div
                  className="w-2 h-12 rounded-full flex-shrink-0"
                  style={{ background: item.color }}
                />
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold mb-1">{item.kpi}</div>
                  <div className="flex items-center gap-2 text-xs">
                    {item.actual !== '—' && (
                      <>
                        <span className="text-slate-500">ara: {item.actual}</span>
                        <span className="text-slate-600">→</span>
                      </>
                    )}
                    <span className="font-bold" style={{ color: item.color }}>
                      obj: {item.obj}
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs mt-0.5">{item.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final recommendation box */}
        <div className="mt-16 p-8 rounded-2xl border border-[#9B2335]/25 bg-[#9B2335]/6 text-center">
          <div className="flex justify-center mb-4 text-[#c84b5a]"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg></div>
          <h3 className="text-2xl font-bold text-white mb-3">Recomanació final</h3>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mb-6 text-center" style={{ margin: '0 auto 1.5rem' }}>
            Iniciar el pilot amb <strong className="text-white">Loginetics</strong> com a proveïdor de referència, mesurar els KPIs durant 3 mesos i prendre la decisió d'escalat <strong className="text-white">únicament en base a les dades reals</strong>.
            El cost del pilot (272.700 €) és baix en relació al retorn potencial i al risc que es mitiga en no escalar sense validar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Proveïdor', value: 'Loginetics' },
              { label: 'Cost referència', value: '900 €/carro' },
              { label: 'Fase 1', value: '303 carros pilot' },
              { label: 'Escalat', value: '3 anys' },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-3 rounded-xl bg-[#9B2335]/10 border border-[#9B2335]/20 text-center">
                <div className="text-[#c84b5a] text-xs font-medium mb-0.5">{label}</div>
                <div className="text-white font-bold text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <img src="/BP TALENT_granat.png" alt="BPTalent 4.0" className="h-30 w-auto mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Projecte 2 BPTalent 4.0 · Carro de Reposició</p>
          <p className="text-slate-600 text-xs mt-1">· Marc Pere Pascual - Pau Bosch - Irinel Timofte ·</p>
        </div>
      </div>
    </section>
  )
}
