import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { embalumsData, tasquesData, metresData } from '../../data/projectData'
import { IconBox, IconClock, IconArrows, IconRecycle } from '../Icons'
import CataloniaMap from './CataloniaMap'

const residusExtra = {
  num: '04',
  Icon: IconRecycle,
  title: 'Residus no integrats',
  desc: 'Sense espai per a cartró i plàstic, el treballador acumula residus al terra o fa viatges addicionals al punt de reciclatge. Això genera risc de seguretat i pèrdua de temps en cada càrrega.',
  color: '#4ade80',
}

gsap.registerPlugin(ScrollTrigger)

const CHART_COLORS = ['#3d0a10', '#550e16', '#6e121c', '#871622', '#9b2335', '#b02c40', '#c5354c']
function getColor(val: number, max: number) {
  const idx = Math.floor((val / max) * (CHART_COLORS.length - 1))
  return CHART_COLORS[Math.min(idx, CHART_COLORS.length - 1)]
}
function MetricChart({ data }: { data: { bin: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count))
  return (
    <ResponsiveContainer width="100%" height={480}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
        <XAxis dataKey="bin" tick={{ fill: '#ffffff', fontSize: 18 }} axisLine={false} tickLine={false} interval={0} />
        <YAxis hide />
        <Tooltip
          content={({ active, payload, label }) =>
            active && payload?.[0] ? (
              <div className="bg-[#1a1a1a] border border-white/10 rounded px-3 py-2">
                <p className="text-slate-400 text-xs">{label}</p>
                <p className="text-white text-sm font-bold">{payload[0].value} obs.</p>
              </div>
            ) : null
          }
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((entry, i) => (
            <Cell key={i} fill={getColor(entry.count, max)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

const problems = [
  {
    num: '01',
    Icon: IconBox,
    title: 'Carros infrautilitzats',
    desc: "Els carros no s'omplen al màxim. La limitació és d'usabilitat i accessibilitat, no de capacitat física del carro.",
    stat: '17,05',
    unit: 'embalums/carro',
    target: 'Objectiu: >20,5 embalums (+20%)',
    color: '#c84b5a',
    data: embalumsData,
    chartLabel: 'Distribució embalums per carro',
  },
  {
    num: '02',
    Icon: IconClock,
    title: 'Tasques sense valor',
    desc: 'Per càrrega, el treballador dedica més d\'un minut a buscar espai per a residus, reajustar productes o recol·locar embalums.',
    stat: '78',
    unit: 's per càrrega',
    target: 'Objectiu: <62 s (−20%)',
    color: '#fbbf24',
    data: tasquesData,
    chartLabel: 'Distribució temps tasques banals',
  },
  {
    num: '03',
    Icon: IconArrows,
    title: 'Recorreguts evitables',
    desc: "La manca d'eines integrades genera desplaçaments addicionals per gestionar residus i buscar elements, saturant passadissos.",
    stat: '37,6',
    unit: 'm per càrrega',
    target: 'Objectiu: <30 m (−20%)',
    color: '#f87171',
    data: metresData,
    chartLabel: 'Distribució metres innecessaris',
  },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const blocksRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 85%' } }
      )
      blocksRef.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="problema" ref={sectionRef} className="py-20 px-4 md:px-6 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">

        {/* ── INTRO: 180 → 1.800 ── */}
        <div ref={introRef} className="text-center mb-24">
          <div className="text-[#c84b5a] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-16">
            Diagnosi operativa
          </div>
          {/* Les dues xifres grans */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black text-white leading-none">180</div>
              <div className="text-slate-400 text-sm mt-2">observacions manuals</div>
            </div>
            <div className="flex flex-col items-center gap-1 text-[#9B2335]">
              <div className="text-2xl font-black">→</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">extrapol.</div>
            </div>
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black bg-gradient-to-r from-[#9B2335] to-[#c84b5a] bg-clip-text text-transparent leading-none">
                1.800
              </div>
              <div className="text-slate-400 text-sm mt-2">observacions totals</div>
            </div>
          </div>

          <div className="flex justify-center">
            <p className="text-slate-400 text-lg max-w-2xl text-center">
              L'eina actual força el treballador a adaptar-se a ella. El carro ideal ha de ser al revés: adaptar-se al procés real de reposició.
            </p>
          </div>
        </div>

        {/* ── MAPA DE BOTIGUES ── */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Dades de camp</p>
            <h3 className="text-white font-black text-2xl mb-2">On hem observat</h3>
            <div className="flex justify-center">
              <p className="text-slate-400 text-sm max-w-xl text-center">
                Les 180 observacions manuals es van recollir en les botigues marcades al mapa
              </p>
            </div>
          </div>

          <CataloniaMap />

          {/* Store legend */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              { label: 'Esclat Mollet del Vallès' },
              { label: 'Esclat Santa Perpètua' },
              { label: 'Esclat Canovelles' },
              { label: 'Bon Preu Barcelona ×6' },
            ].map(s => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3"
              >
                <div className="w-2 h-2 rounded-full bg-[#c84b5a] shrink-0" style={{ boxShadow: '0 0 5px #9B2335' }} />
                <span className="text-slate-400 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROBLEMES + GRÀFIQUES ── */}
        <div className="flex flex-col gap-28">
          {problems.map((p, i) => (
            <div
              key={p.num}
              ref={(el) => { blocksRef.current[i] = el }}
              className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
            >
              {/* Capçalera */}
              <div className="p-10 md:p-16 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-b border-white/5">
                <div className="flex items-center gap-4 shrink-0">
                  <div style={{ color: p.color }}><p.Icon className="w-10 h-10" /></div>
                  <span className="text-slate-600 font-black text-xl">{p.num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-black text-2xl mb-4">{p.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{p.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-end gap-2 justify-end">
                    <span className="text-6xl font-black text-white leading-none">{p.stat}</span>
                    <span className="text-xl font-semibold mb-1" style={{ color: p.color }}>{p.unit}</span>
                  </div>
                </div>
              </div>

              {/* Gràfica gran */}
              <div className="px-10 md:px-16 pt-10 pb-8">
                <p className="text-slate-600 text-xs uppercase tracking-widest mb-4">{p.chartLabel}</p>
                <MetricChart data={p.data} />
              </div>
            </div>
          ))}
        </div>

        {/* Residus — targeta descriptiva sense gràfica */}
        <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
          <div className="p-10 md:p-16 flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="flex items-center gap-4 shrink-0">
              <div style={{ color: residusExtra.color }}><residusExtra.Icon className="w-10 h-10" /></div>
              <span className="text-slate-600 font-black text-xl">{residusExtra.num}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-black text-2xl mb-4">{residusExtra.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{residusExtra.desc}</p>
            </div>
            <div className="shrink-0 p-6 rounded-2xl border text-center" style={{ borderColor: `${residusExtra.color}30`, background: `${residusExtra.color}08` }}>
              <div className="text-slate-400 text-xs uppercase tracking-widest mb-2">Solució proposada</div>
              <div className="text-white font-bold text-sm">Contenidors integrats</div>
              <div className="text-slate-500 text-xs mt-1">cartró + plàstic</div>
            </div>
          </div>
        </div>

        {/* ── CONCLUSIONS ── */}
        <div className="mt-8 rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <p className="text-[#c84b5a] text-xs font-semibold tracking-widest uppercase">Objectius del nou carro</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {problems.map((p) => (
              <div key={p.num} className="p-5 text-center">
                <div className="text-xs text-slate-500 mb-2">{p.title}</div>
                <div className="text-2xl font-black mb-1" style={{ color: p.color }}>{p.stat}</div>
                <div className="text-xs font-medium" style={{ color: p.color }}>→ {p.target}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
