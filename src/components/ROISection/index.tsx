import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const roiNumbers = [
  { label: 'Payback estimat', value: '< 1 mes', desc: "Inclou amortització i manteniment. Validar amb dades reals del pilot.", color: '#4ade80', big: true },
  { label: 'Benefici net anual (botiga tipus)', value: '94.598 €', desc: '2 carros · 50 treballadors · SS inclosa', color: '#c84b5a', big: true },
  { label: 'Valor anual temps alliberat (xarxa)', value: '50 M€', desc: '232 botigues · Extrapolació proporcional', color: '#fbbf24', big: false },
]

const costTable = [
  { concepte: 'Cost unitari base (Loginetics)', valor: '900 €', note: 'Pendent de pressupost formal' },
  { concepte: 'Vida útil mínima', valor: '10 anys', note: 'Probablement superior' },
  { concepte: 'Amortització anual/carro', valor: '90 €/any', note: '' },
  { concepte: 'Manteniment orientatiu/carro', valor: '150 €/any', note: 'A negociar post-prototip' },
  { concepte: 'Cost anual total/carro', valor: '240 €/any', note: 'Amort. + mant.' },
  { concepte: 'Inversió total (1.052 carros)', valor: '946.800 €', note: '232 botigues' },
]

const sensitivityData = [
  { millora: '5%', valor: '~22.700 €', payback: '<1 mes' },
  { millora: '10%', valor: '~45.400 €', payback: '<1 mes' },
  { millora: '20,9% (base)', valor: '95.078 €', payback: '<1 mes' },
]

const storeTypes = [
  { type: 'Minimercat', botigues: 18, carros: 1, total: 18, inversio: '16.200 €' },
  { type: 'Bon Preu ràpid', botigues: 23, carros: 2, total: 46, inversio: '41.400 €' },
  { type: 'Bon Preu mitjà', botigues: 60, carros: 3, total: 180, inversio: '162.000 €' },
  { type: 'Bon Preu gran/molt gran', botigues: 60, carros: 4, total: 240, inversio: '216.000 €' },
  { type: 'Esclat', botigues: 71, carros: 8, total: 568, inversio: '511.200 €' },
]

export default function ROISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      )
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="roi" ref={sectionRef} className="py-32 px-6 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="opacity-0 mb-16 text-center">
          <div className="text-[#c84b5a] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-8">
            Anàlisi econòmica
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Retorn operatiu{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              molt elevat
            </span>
          </h2>
          <div className="flex justify-center">
            <p className="text-slate-400 text-lg max-w-2xl text-center">
              El ROI no suposa acomiadar ningú. Quantifica el temps que els treballadors podran destinar a reposició productiva en lloc de tasques ineficients. La verificació real requereix mesurar els KPIs al pilot.
            </p>
          </div>
        </div>

        {/* Proveïdors */}
        <div ref={(el) => { cardsRef.current[6] = el }} className="opacity-0 my-28">
          <div className="text-center mb-10">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">3 proveïdors contactats</p>
            <h3 className="text-white font-black text-2xl">Selecció de proveïdor</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nom: 'I+',
                cost: '875 €',
                sub: '+ importació',
                tag: 'Opció econòmica',
                desc: 'Muntat a la Xina. Aranzels variables.',
                note: 'Risc de qualitat i incidències',
              },
              {
                nom: 'Loginetics',
                cost: '900 €',
                sub: '+ importació',
                tag: 'Opció estàndard',
                desc: 'Peces importades, muntatge a Espanya.',
                note: 'Qualitat · Recanvis · Flexibilitat',
              },
              {
                nom: 'moving.BCN',
                cost: '1.800 €',
                sub: '/unitat',
                tag: 'Opció premium',
                desc: 'Sense detall tècnic disponible.',
                note: 'Cost molt superior',
              },
            ].map((p) => (
              <div
                key={p.nom}
                className="p-10 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors duration-300"
              >
                <div className="mb-6">
                  <div className="text-slate-500 text-xs uppercase tracking-widest mb-2">{p.tag}</div>
                  <div className="text-white font-black text-3xl">{p.nom}</div>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black text-white">{p.cost}</span>
                  <span className="text-slate-500 text-base ml-2">{p.sub}</span>
                </div>
                <div className="text-slate-400 text-sm mb-3 leading-relaxed">{p.desc}</div>
                <div className="text-xs text-slate-600 font-medium">{p.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Cost table */}
          <div
            ref={(el) => { cardsRef.current[3] = el }}
            className="opacity-0 rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/8">
              <h3 className="text-white font-bold text-lg">Costos estimats</h3>
              <p className="text-slate-500 text-sm">Base de càlcul · Loginetics</p>
            </div>
            <table className="w-full">
              <tbody>
                {costTable.map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                    <td className="px-6 py-3 text-slate-300 text-sm">{row.concepte}</td>
                    <td className="px-6 py-3 text-white font-semibold text-sm text-right">{row.valor}</td>
                    {row.note && (
                      <td className="px-4 py-3 text-slate-600 text-xs hidden lg:table-cell">{row.note}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sensitivity */}
          <div
            ref={(el) => { cardsRef.current[4] = el }}
            className="opacity-0 flex flex-col gap-5"
          >
            <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/8">
                <h3 className="text-white font-bold text-lg">Anàlisi de sensibilitat</h3>
                <p className="text-slate-500 text-sm">Botiga tipus · 2 carros · Payback</p>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-3 text-slate-500 text-xs text-left font-medium">Millora de temps</th>
                    <th className="px-6 py-3 text-slate-500 text-xs text-right font-medium">Valor anual (SS)</th>
                    <th className="px-6 py-3 text-slate-500 text-xs text-right font-medium">Payback</th>
                  </tr>
                </thead>
                <tbody>
                  {sensitivityData.map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 ${i === sensitivityData.length - 1 ? 'bg-[#9B2335]/8' : ''}`}>
                      <td className="px-6 py-3 text-slate-300 text-sm">{row.millora}</td>
                      <td className="px-6 py-3 text-white font-semibold text-sm text-right">{row.valor}</td>
                      <td className="px-6 py-3 text-green-400 font-bold text-sm text-right">{row.payback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note */}
            <div className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
              <p className="text-green-300 text-sm leading-relaxed">
                <strong className="text-green-200">Lectura executiva:</strong> El cost anual per carro (240 €) continua sent molt inferior al valor del temps alliberat fins i tot aplicant l'escenari més prudent de manteniment.
              </p>
            </div>
          </div>
        </div>

        {/* Store types table */}
        <div
          ref={(el) => { cardsRef.current[5] = el }}
          className="opacity-0 rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-white/8">
            <h3 className="text-white font-bold text-xl">Dimensionament per tipologia de botiga</h3>
            <p className="text-slate-500 text-sm">Inversió total estimada: <span className="text-white font-semibold">946.800 €</span> · 1.052 carros · 232 botigues</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Tipologia', 'Botigues', 'Carros/botiga', 'Total carros', 'Inversió'].map((h) => (
                    <th key={h} className="px-6 py-3 text-slate-500 text-xs font-medium text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {storeTypes.map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? 'bg-white/1' : ''}`}>
                    <td className="px-6 py-3 text-white font-medium text-sm">{row.type}</td>
                    <td className="px-6 py-3 text-slate-300 text-sm">{row.botigues}</td>
                    <td className="px-6 py-3 text-slate-300 text-sm">{row.carros}</td>
                    <td className="px-6 py-3 text-white font-semibold text-sm">{row.total}</td>
                    <td className="px-6 py-3 text-[#c84b5a] font-semibold text-sm">{row.inversio}</td>
                  </tr>
                ))}
                <tr className="bg-[#9B2335]/8 border-t border-[#9B2335]/20">
                  <td className="px-6 py-3 text-white font-bold text-sm">Total</td>
                  <td className="px-6 py-3 text-white font-bold text-sm">232</td>
                  <td className="px-6 py-3 text-slate-300 text-sm">—</td>
                  <td className="px-6 py-3 text-white font-bold text-sm">1.052</td>
                  <td className="px-6 py-3 text-green-400 font-bold text-sm">946.800 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Salary breakdown table */}
        <div
          ref={(el) => { cardsRef.current[7] = el }}
          className="opacity-0 mt-10 rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-white/8">
            <h3 className="text-white font-bold text-xl mb-1">D'on surten els 95.078 €?</h3>
            <p className="text-slate-500 text-sm">
              Valor anual del temps alliberat · Botiga tipus · 50 treballadors · Millora estimada del <span className="text-white font-semibold">20,9%</span> del temps de reposició · SS empresa +32%
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-slate-500 text-xs font-medium text-left">Perfil</th>
                  <th className="px-6 py-3 text-slate-500 text-xs font-medium text-right">Cost empresa (SS)</th>
                  <th className="px-6 py-3 text-slate-500 text-xs font-medium text-right">% reposició</th>
                  <th className="px-6 py-3 text-slate-500 text-xs font-medium text-right">Persones</th>
                  <th className="px-6 py-3 text-slate-500 text-xs font-medium text-right">Estalvi anual</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { perfil: 'Gerent',                  cost: '47.520 €', pct: '1%',  n: 1,  estalvi: '99 €',     dim: false },
                  { perfil: 'Cap de torn reposició',   cost: '32.340 €', pct: '40%', n: 1,  estalvi: '2.702 €',  dim: false },
                  { perfil: 'Cap de torn frescos',     cost: '34.980 €', pct: '10%', n: 1,  estalvi: '731 €',    dim: false },
                  { perfil: 'Responsable torn de nit', cost: '27.060 €', pct: '80%', n: 1,  estalvi: '4.522 €',  dim: false },
                  { perfil: 'Reponedors torn de nit',  cost: '22.551 €', pct: '95%', n: 5,  estalvi: '22.375 €', dim: false },
                  { perfil: 'Reponedors torn de dia',  cost: '22.551 €', pct: '90%', n: 10, estalvi: '42.394 €', dim: true  },
                  { perfil: 'Caixers',                 cost: '22.551 €', pct: '15%', n: 15, estalvi: '10.599 €', dim: false },
                  { perfil: 'Treballadors de frescos', cost: '23.252 €', pct: '15%', n: 16, estalvi: '11.657 €', dim: false },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 transition-colors ${row.dim ? 'bg-[#9B2335]/6' : i % 2 === 0 ? 'bg-white/1' : ''}`}>
                    <td className="px-6 py-3 text-slate-300 text-sm">{row.perfil}</td>
                    <td className="px-6 py-3 text-slate-400 text-sm text-right">{row.cost}</td>
                    <td className="px-6 py-3 text-slate-400 text-sm text-right">{row.pct}</td>
                    <td className="px-6 py-3 text-slate-400 text-sm text-right">{row.n}</td>
                    <td className="px-6 py-3 text-white font-semibold text-sm text-right">{row.estalvi}</td>
                  </tr>
                ))}
                <tr className="bg-[#9B2335]/8 border-t border-[#9B2335]/20">
                  <td className="px-6 py-3 text-white font-bold text-sm">Total botiga tipus</td>
                  <td className="px-6 py-3 text-slate-500 text-sm text-right">—</td>
                  <td className="px-6 py-3 text-slate-500 text-sm text-right">—</td>
                  <td className="px-6 py-3 text-white font-bold text-sm text-right">50</td>
                  <td className="px-6 py-3 text-[#c84b5a] font-black text-sm text-right">95.078 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-slate-600 text-xs">
              Fórmula: cost empresa (brut + 32% SS) × % jornada en reposició × nº persones × 20,9% millora estimada
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">95.078 €</span>
                <span className="text-slate-600 text-xs">brut alliberat</span>
              </div>
              <span className="text-slate-600">−</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">480 €</span>
                <span className="text-slate-600 text-xs">cost 2 carros/any</span>
              </div>
              <span className="text-slate-600">=</span>
              <div className="px-3 py-1 rounded-lg bg-[#c84b5a]/15 border border-[#c84b5a]/30">
                <span className="text-[#c84b5a] font-black text-sm">94.598 € net</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big ROI numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {roiNumbers.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="opacity-0 p-8 rounded-2xl border border-white/8 bg-white/3 text-center"
            >
              <div
                className={`font-black mb-3 ${item.big ? 'text-5xl lg:text-6xl' : 'text-4xl'}`}
                style={{ color: item.color }}
              >
                {item.value}
              </div>
              <div className="text-white font-semibold text-lg mb-2">{item.label}</div>
              <div className="text-slate-500 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
