import { useRef } from 'react'

const links = [
  { href: '#problema', label: 'Problema' },
  { href: '#carro', label: 'Carro 3D' },
  { href: '#dades', label: 'Dades' },
  { href: '#roi', label: 'ROI' },
  { href: '#pilot', label: 'Pilot' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)

  return (
    <nav
      ref={navRef}
      className="absolute top-0 inset-x-0 z-50 bg-transparent py-2"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/BP TALENT_granat.png" alt="BPTalent 4.0" className="h-30 w-auto" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#pilot"
          className="hidden md:flex items-center gap-2 bg-[#9B2335] hover:bg-[#b02c40] text-white text-sm px-4 py-2 rounded-full transition-colors duration-200"
        >
          Veure pilot →
        </a>
      </div>
    </nav>
  )
}
