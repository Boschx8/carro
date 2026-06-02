import { useEffect } from 'react'
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
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Navigation />
      <Hero />
      <Problem />
      <CartViewer />
      <DataSection />
      <ROISection />
      <PilotSection />
    </>
  )
}
