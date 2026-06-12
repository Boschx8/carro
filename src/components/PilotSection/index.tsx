import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pilotPhases } from '../../data/projectData'

gsap.registerPlugin(ScrollTrigger)

const kpis = [
  { kpi: 'Embalums per carro', actual: '17,05', obj: '>20', unit: 'embalums', color: '#c84b5a' },
  { kpi: 'Tasques banals/carro', actual: '78 s', obj: '<55 s', unit: 'per càrrega', color: '#fbbf24' },
  { kpi: 'Metres innecessaris', actual: '37,6 m', obj: '<26 m', unit: 'per càrrega', color: '#f87171' },
  { kpi: 'Satisfacció reponedors', actual: '—', obj: '↑ Augment', unit: 'enquesta post-pilot', color: '#818cf8' },
  { kpi: 'Capacitat contenidors', actual: '—', obj: '↑ Augment', unit: 'residus absorbits', color: '#34d399' },
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
              No s'escalarà fins que les dades del mini-pilot confirmin les hipòtesis de millora. El criteri d'escalat no és el temps transcorregut, sinó la validació dels KPIs.
            </p>
          </div>
        </div>

        {/* ── MINI-PILOT ── */}
        <div
          ref={(el) => { phasesRef.current[4] = el }}
          className="opacity-0 mb-8"
        >
          <div className="relative rounded-2xl border border-[#fbbf24]/25 bg-[#fbbf24]/4 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fbbf24]/40 to-transparent" />
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Left: label + title */}
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/10 mb-4">
                    <span className="text-[#fbbf24] text-xs font-black uppercase tracking-widest">Fase 0</span>
                  </div>
                  <h3 className="text-white font-black text-2xl md:text-3xl mb-2">Mini-pilot<br />previ</h3>
                  <div className="h-0.5 w-10 rounded-full bg-[#fbbf24] mt-3" />
                </div>

                {/* Right: description + stats */}
                <div className="flex-1">
                  <div className="text-slate-300 text-base leading-relaxed mb-8">
                    Abans de comprometre una inversió gran, cal provar el carro en <strong className="text-white">condicions reals</strong> amb un nombre molt reduït de botigues. L'objectiu és detectar problemes de disseny, ajustar amb el proveïdor si cal, i confirmar que les millores observades a la diagnosi es reprodueixen en entorn real.
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Botigues', value: '2–3', sub: 'seleccionades' },
                      { label: 'Carros', value: '5–8', sub: 'unitats' },
                      { label: 'Inversió', value: '~7.200 €', sub: '900 €/carro' },
                      { label: 'Durada', value: '2–3 mesos', sub: 'observació activa' },
                    ].map((s) => (
                      <div key={s.label} className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
                        <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">{s.label}</div>
                        <div className="text-white font-black text-xl mb-0.5">{s.value}</div>
                        <div className="text-slate-600 text-xs">{s.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── VERTICAL CONNECTOR ── */}
        <div className="flex justify-center my-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-[#fbbf24]/40 to-[#c84b5a]/40" />
            <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

        {/* ── OFICINA TÈCNICA + KPIs ── */}
        <div ref={kpisRef} className="opacity-0 mb-8">
          {/* OT block */}
          <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center">
                <div className="text-slate-500 text-xs uppercase tracking-widest mb-3">Responsable de mesura</div>
                <h3 className="text-white font-black text-3xl mb-2">Oficina<br />Tècnica</h3>
                <div className="h-0.5 w-10 rounded-full bg-[#9B2335] mt-2" />
              </div>
              <div className="md:col-span-3 p-8 md:p-10">
                <div className="text-slate-300 text-base leading-relaxed mb-12">
                  L'equip d'Oficina Tècnica seria l'encarregat de <strong className="text-white">mesurar l'impacte real del mini-pilot</strong>. Haurien de realitzar treball de camp a les botigues pilot per recollir dades comparables amb les observacions inicials i validar que la millora és efectiva.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      svg: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                      label: 'Treball de camp', desc: 'Observació directa a botiga',
                    },
                    {
                      svg: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
                      label: 'Mesura de KPIs', desc: 'Recollida de dades reals',
                    },
                    {
                      svg: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
                      label: 'Validació', desc: 'Confirmació de la millora',
                    },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl bg-white/3 border border-white/5">
                      <div className="text-[#c84b5a] mb-2">{item.svg}</div>
                      <div className="text-white text-sm font-semibold mb-1">{item.label}</div>
                      <div className="text-slate-500 text-xs">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* KPI grid */}
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">KPIs de validació</h3>
            <div className="flex justify-center">
              <p className="text-slate-400 text-sm text-center max-w-xl">
                El pilot definitiu s'inicia quan almenys els 4 primers indicadors mostren una millora ≥10%
              </p>
            </div>
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

        {/* ── GATE: validació → pilot definitiu ── */}
        <div className="flex flex-col items-center gap-3 my-10">
          <div className="w-px h-8 bg-gradient-to-b from-[#c84b5a]/30 to-[#9B2335]/60" />
          <div className="px-6 py-3 rounded-full border border-[#9B2335]/40 bg-[#9B2335]/10 flex items-center gap-3">
            <svg className="w-4 h-4 text-[#c84b5a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span className="text-[#c84b5a] text-sm font-semibold">KPIs validats → Pilot definitiu</span>
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-[#9B2335]/60 to-transparent" />
        </div>

        {/* ── PILOT DEFINITIU (4 fases) ── */}
        <div className="mb-6 text-center">
          <div className="text-[#c84b5a] text-xs uppercase tracking-widest mb-2">Escalat progressiu</div>
          <h3 className="text-white font-black text-2xl">Pilot definitiu</h3>
        </div>

        <div className="relative mb-16">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#9B2335]/50 via-[#c84b5a]/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-6">
            {pilotPhases.map((phase, i) => (
              <div
                key={phase.num}
                ref={(el) => { phasesRef.current[i] = el }}
                className="opacity-0 relative flex gap-6 md:ml-0"
              >
                <div
                  className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl border-2 border-white/10"
                  style={{ background: `${phase.color}22`, borderColor: `${phase.color}44` }}
                >
                  <span style={{ color: phase.color }}>{phase.num}</span>
                </div>

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

        {/* Departaments implicats */}
        <div className="mt-28">
          <div className="text-center mb-8">
            <div className="text-[#c84b5a] text-xs uppercase tracking-widest mb-2">Transversal</div>
            <h3 className="text-white font-black text-2xl">Departaments implicats</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                dept: 'Oficina Tècnica',
                rol: 'Mesura i validació',
                desc: 'Recollida de dades al camp, comparació amb les observacions inicials i validació de la millora real.',
                color: '#c84b5a',
                svg: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
              },
              {
                dept: 'PRL',
                rol: 'Prevenció de Riscos Laborals',
                desc: 'Avaluació ergonòmica del nou carro, validació de la reducció de riscos de lesió i certificació de seguretat.',
                color: '#fbbf24',
                svg: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              },
              {
                dept: 'Vendes',
                rol: 'Botigues · Caps de zona',
                desc: 'Gerents de botiga i caps de zona: coordinació del pilot, recollida de feedback dels reponedors i validació de la millora operativa en el dia a dia.',
                color: '#4ade80',
                svg: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
              },
            ].map((d) => (
              <div key={d.dept} className="p-7 rounded-2xl border border-white/8 bg-white/3">
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ color: d.color }}>{d.svg}</div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">{d.rol}</span>
                </div>
                <h4 className="text-white font-black text-xl mb-3">{d.dept}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                <div className="mt-5 h-0.5 w-10 rounded-full" style={{ backgroundColor: d.color }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── COMUNICACIÓ ── */}
        <div className="mt-28">
          <div className="text-center mb-8">
            <div className="text-[#c84b5a] text-xs uppercase tracking-widest mb-2">Difusió</div>
            <h3 className="text-white font-black text-2xl mb-4">Comunicació a les botigues</h3>
            <div className="flex justify-center">
              <p className="text-slate-400 text-sm max-w-2xl text-center">
                L'arribada dels carros a cada botiga es comunicarà per dues vies complementàries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                title: 'Caps de zona',
                rol: 'Reunions setmanals amb gerents',
                desc: "Els caps de zona informaran els gerents de botiga, a les reunions setmanals, sobre l'estat del pilot i la incorporació dels nous carros a la seva zona.",
                color: '#4ade80',
                svg: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
              },
              {
                title: 'Butlletí corporatiu',
                rol: "Comunicat a l'establiment",
                desc: "Es publicarà un comunicat al butlletí diari, amb el mateix format que la resta d'avisos, indicant el dia concret en què els carros arribaran a la botiga.",
                color: '#818cf8',
                svg: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l18-5v12L3 14v-3z"/>
                    <path d="M11.6 16.8a3 3 0 1 1-5.2-3"/>
                  </svg>
                ),
              },
            ].map((d) => (
              <div key={d.title} className="p-7 rounded-2xl border border-white/8 bg-white/3">
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ color: d.color }}>{d.svg}</div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">{d.rol}</span>
                </div>
                <h4 className="text-white font-black text-xl mb-3">{d.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                <div className="mt-5 h-0.5 w-10 rounded-full" style={{ backgroundColor: d.color }} />
              </div>
            ))}
          </div>

          {/* Mockup butlletí */}
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-3 text-center">Exemple de comunicat al butlletí corporatiu</p>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <div className="bg-[#595959] px-6 py-2.5">
                <span className="text-white text-sm font-medium">B: Corporativa</span>
              </div>
              <div className="bg-white px-6 py-5">
                <h4 className="text-[#c84b5a] text-lg font-semibold mb-3 pb-3 border-b border-gray-200">
                  Arribada del nou carro de reposició
                </h4>
                <p className="text-gray-900 text-sm font-bold mb-3">14/09/2026</p>
                <p className="text-gray-800 text-sm leading-relaxed mb-3">
                  Us informem que la setmana del 14 al 18 de setembre rebreu directament de proveïdor 2 unitats del nou carro de reposició dins del pilot que s'està duent a terme en una selecció d'establiments.
                </p>
                <p className="text-gray-800 text-sm leading-relaxed">
                  <strong>Important: cal que el personal de reposició comenci a utilitzar el carro a partir del dilluns 21 de setembre</strong>, seguint les indicacions d'ús que us farà arribar el vostre cap de zona.
                </p>
              </div>
              <div className="bg-white px-6 py-3 border-t border-gray-200">
                <span className="text-gray-600 text-sm">JOAN VILA - Dept Logística - Joan.Vila@bonpreu.cat</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
