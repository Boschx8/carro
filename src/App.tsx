import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Problem from './components/Problem'
import CartViewer from './components/CartViewer'
import DataSection from './components/DataSection'
import ROISection from './components/ROISection'
import PilotSection from './components/PilotSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  return (
    <div style={{ background: '#0a0a0a', color: '#f1f5f9', overflowX: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navigation />
      <Hero />
      <Problem />
      <CartViewer />
      <DataSection />
      <ROISection />
      <PilotSection />
    </div>
  )
}
