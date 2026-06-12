import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Origin from './components/Origin'
import Problem from './components/Problem'
import CartViewer from './components/CartViewer'
import ROISection from './components/ROISection'
import PilotSection from './components/PilotSection'
import Competencia from './components/Competencia'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Navigation />
      <Hero />
      <Origin />
      <Problem />
      <CartViewer />
      <ROISection />
      <PilotSection />
      <Competencia />
      <Footer />
    </>
  )
}
