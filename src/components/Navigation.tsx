import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#problema', label: 'Problema' },
  { href: '#carro', label: 'Carro 3D' },
  { href: '#dades', label: 'Dades' },
  { href: '#roi', label: 'ROI' },
  { href: '#pilot', label: 'Pilot' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050d1a]/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">BP</span>
          </div>
          <span className="text-white/80 text-sm font-medium tracking-wide">BPTalent 4.0</span>
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
          className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-full transition-colors duration-200"
        >
          Veure pilot →
        </a>
      </div>
    </nav>
  )
}
