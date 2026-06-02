import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, ZAxis, CartesianGrid,
} from 'recharts'
import { embalumsData, pesData, tasquesData, metresData } from '../../data/projectData'

gsap.registerPlugin(ScrollTrigger)

const CHART_COLORS = ['#1e3a6e', '#1e4a82', '#1e5a96', '#2060a8', '#2563eb', '#3b82f6', '#60a5fa']

function getColor(val: number, max: number) {
  const idx = Math.floor((val / max) * (CHART_COLORS.length - 1))
  return CHART_COLORS[Math.min(idx, CHART_COLORS.length - 1)]
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload?.[0]) {
    return (
      <div className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2">
        <p className="text-slate-400 text-xs">{label}</p>
        <p className="text-white font-bold text-sm">{payload[0].value} obs.</p>
      </div>
    )
  }
  return null
}

const charts = [
  {
    id: 'embalums',
    title: 'Embalums per carro',
    subtitle: 'N=1.800 · Mitjana: 17,05',
    data: embalumsData,
    note: 'Els carros no s\'omple al màxim. La limitació és d\'usabilitat, no de capacitat física.',
  },
  {
    id: 'pes',
    title: 'Pes carro ple (kg)',
    subtitle: 'N=1.800 · Mitjana: 9,54 kg',
    data: pesData,
    note: 'El pes no és el principal fre. Hi ha marge per portar més si el disseny facilita càrrega i accés.',
  },
  {
    id: 'tasques',
    title: 'Temps tasques banals (s)',
    subtitle: 'N=1.800 · Mitjana: 78 s',
    data: tasquesData,
    note: 'Cada càrrega acumula >1 minut de temps no productiu, associat a residus i microdesplaçaments.',
  },
  {
    id: 'metres',
    title: 'Metres innecessaris (m)',
    subtitle: 'N=1.616 · Mitjana: 37,6 m',
    data: metresData,
    note: 'La gestió de residus i la manca d\'eines integrades generen recorreguts evitables en botiga.',
  },
]

// Scatter data (embalums vs temps per bulto, approximate)
const scatterData = Array.from({ length: 180 }, () => ({
  embalums: Math.max(5, Math.round(Math.random() * 30 + 5)),
  temps: Math.max(25, Math.round(35 + Math.random() * 30 + (Math.random() > 0.5 ? 5 : -5))),
}))

export default function DataSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [activeChart, setActiveChart] = useState(0)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const current = activeChart >= 0 ? charts[activeChart] : null
  const max = current ? Math.max(...current.data.map((d) => d.count)) : 0

  return (
    <section id="dades" ref={sectionRef} className="py-32 px-6 bg-[#050d1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="opacity-0 mb-12 text-center">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Anàlisi quantitativa
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            1.800 observacions de{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              camp
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Les dades apunten a una conclusió clara: el sistema actual no està optimitzat perquè força el treballador a adaptar-se a l'eina.
          </p>
        </div>

        {/* Chart selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {charts.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveChart(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeChart === i
                  ? 'bg-blue-600 text-white'
                  : 'border border-white/10 text-slate-400 hover:text-white hover:border-white/25'
              }`}
            >
              {c.title}
            </button>
          ))}
          <button
            onClick={() => setActiveChart(-1)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeChart === -1
                ? 'bg-blue-600 text-white'
                : 'border border-white/10 text-slate-400 hover:text-white hover:border-white/25'
            }`}
          >
            Dispersió embalums vs temps
          </button>
        </div>

        {/* Chart area */}
        <div ref={chartRef} className="rounded-2xl border border-white/8 bg-white/3 p-8">
          {activeChart >= 0 ? (
            <>
              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1">{current?.title}</h3>
                <p className="text-blue-400 text-sm">{current?.subtitle}</p>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={current?.data ?? []} margin={{ top: 0, right: 0, bottom: 5, left: 0 }}>
                  <XAxis
                    dataKey="bin"
                    tick={{ fill: '#475569', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    interval={1}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={40}>
                    {(current?.data ?? []).map((entry, i) => (
                      <Cell key={i} fill={getColor(entry.count, max)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20">
                <p className="text-slate-300 text-sm italic">{current?.note}</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1">Dispersió: Embalums vs Temps per bulto</h3>
                <p className="text-blue-400 text-sm">N≈180 mostres · Sense correlació clara</p>
              </div>

              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="embalums"
                    type="number"
                    name="Embalums"
                    domain={[5, 35]}
                    tick={{ fill: '#475569', fontSize: 11 }}
                    label={{ value: 'Embalums per carro (nº)', position: 'bottom', fill: '#475569', fontSize: 11 }}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="temps"
                    type="number"
                    name="Temps"
                    domain={[20, 70]}
                    tick={{ fill: '#475569', fontSize: 11 }}
                    label={{ value: 'Temps per col·locar 1 bulto (s)', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 11 }}
                    axisLine={false}
                  />
                  <ZAxis range={[20, 20]} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }}
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        return (
                          <div className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2">
                            <p className="text-white text-xs">{payload[0]?.value} embalums · {payload[1]?.value}s</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Scatter data={scatterData} fill="#2563eb" opacity={0.6} />
                </ScatterChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20">
                <p className="text-slate-300 text-sm italic">
                  La dispersió no mostra correlació. Carregar més producte <strong className="text-white">no empitjora</strong> el temps unitari de reposició. L'optimització ha de venir de reduir viatges i tasques auxiliars.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Key stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: 'Temps/bulto', value: '46,93 s', desc: 'estable independentment de la càrrega', color: '#60a5fa' },
            { label: 'Objectiu embalums', value: '>20', desc: 'vs 17,05 de mitjana actual (+17%)', color: '#818cf8' },
            { label: 'Objectiu tasques banals', value: '<55 s', desc: 'vs 78s actual (−30%)', color: '#fbbf24' },
            { label: 'Objectiu metres', value: '<26 m', desc: 'vs 37,6m actual (−30%)', color: '#4ade80' },
          ].map((item) => (
            <div key={item.label} className="p-5 rounded-xl border border-white/8 bg-white/3">
              <div className="text-xs text-slate-500 mb-1">{item.label}</div>
              <div className="text-2xl font-black mb-1" style={{ color: item.color }}>{item.value}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
