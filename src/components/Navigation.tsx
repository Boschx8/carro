import { useRef } from 'react'

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
      </div>
    </nav>
  )
}
