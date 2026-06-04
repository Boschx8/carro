import { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, ContactShadows } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { cartParts } from '../../data/projectData'
import CartModel from './CartModel'
import { IconStructure, IconLayers, IconWheel, IconGrip, IconContainer, IconLock } from '../Icons'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  structure: IconStructure, layers: IconLayers, wheel: IconWheel,
  grip: IconGrip, container: IconContainer, lock: IconLock,
}
function PartIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const Comp = iconMap[name]
  return Comp ? <Comp className={className} /> : null
}

type PartId = 'estructura' | 'plataformes' | 'rodes' | 'nanses' | 'contenidors' | 'bloqueig'

const DEFAULT_CAM_POS: [number, number, number] = [0, 0.3, 4.5]
const DEFAULT_CAM_TARGET: [number, number, number] = [0, 0, 0]

function CartScene({
  selectedId,
  onSelect,
}: {
  selectedId: PartId | null
  onSelect: (id: PartId | null) => void
}) {
  const controlsRef = useRef<CameraControls>(null)

  const flyTo = useCallback((partId: PartId | null) => {
    if (!controlsRef.current) return
    if (partId === null) {
      controlsRef.current.setLookAt(...DEFAULT_CAM_POS, ...DEFAULT_CAM_TARGET, true)
      return
    }
    const part = cartParts.find((p) => p.id === partId)
    if (!part) return
    controlsRef.current.setLookAt(...part.cameraPos, ...part.cameraTarget, true)
  }, [])

  const handleSelect = useCallback(
    (id: PartId | null) => { onSelect(id); flyTo(id) },
    [onSelect, flyTo]
  )

  return (
    <>
      <color attach="background" args={['#111111']} />
      <fog attach="fog" args={['#111111', 12, 25]} />
      <ambientLight intensity={0.9} color="#ffffff" />
      <pointLight position={[4, 5, 4]} intensity={90} color="#fff5e8" />
      <pointLight position={[-4, -2, 3]} intensity={50} color="#e8f0ff" />
      <pointLight position={[0, 3, -3]} intensity={30} color="#ffffff" />
      <ContactShadows position={[0, -1.0, 0]} opacity={0.4} scale={4} blur={2} far={2} color="#000000" />
      <CartModel selectedId={selectedId} onSelect={handleSelect} autoRotate={!selectedId} />
      <CameraControls
        ref={controlsRef}
        minDistance={2}
        maxDistance={8}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI * 0.72}
        smoothTime={0.35}
      />
    </>
  )
}

function InfoPanelContent({
  selectedPart,
  onClose,
  onNext,
}: {
  selectedPart: NonNullable<ReturnType<typeof cartParts.find>>
  onClose: () => void
  onNext?: () => void
}) {
  return (
    <>
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white/10"
        style={{ background: `${selectedPart.color}15`, borderColor: `${selectedPart.color}30`, color: selectedPart.color }}
      >
        <PartIcon name={selectedPart.icon} className="w-6 h-6" />
      </div>
      <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: selectedPart.color }}>
        Component
      </p>
      <h3 className="text-xl font-bold text-white mb-3">{selectedPart.name}</h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-4">{selectedPart.description}</p>
      <div className="p-3 rounded-xl border mb-5" style={{ background: `${selectedPart.color}0f`, borderColor: `${selectedPart.color}25` }}>
        <p className="text-xs font-medium mb-1" style={{ color: selectedPart.color }}>Dada clau</p>
        <p className="text-white text-xs">{selectedPart.detail}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 py-2 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:border-white/30 transition-all text-sm font-medium"
        >
          ← Torna
        </button>
        {onNext && (
          <button
            onClick={onNext}
            className="px-3 py-2 rounded-xl text-sm font-medium text-white transition-all"
            style={{ background: `${selectedPart.color}25`, border: `1px solid ${selectedPart.color}40` }}
          >
            Següent →
          </button>
        )}
      </div>
    </>
  )
}

export default function CartViewer() {
  const [selectedId, setSelectedId] = useState<PartId | null>(null)
  const selectedPart = cartParts.find((p) => p.id === selectedId)
  const selectedIdx = cartParts.findIndex((p) => p.id === selectedId)
  const hasNext = selectedIdx >= 0 && selectedIdx < cartParts.length - 1
  const handleNext = hasNext
    ? () => setSelectedId(cartParts[selectedIdx + 1].id as PartId)
    : undefined

  return (
    <section id="carro" className="bg-[#111111] py-16 px-4 md:py-20 md:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Títol */}
        <div className="text-center mb-6 md:mb-8">
          <div className="text-[#c84b5a] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-4">
            Disseny conceptual
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white">
            Explora el{' '}
            <span className="bg-gradient-to-r from-[#9B2335] to-[#c84b5a] bg-clip-text text-transparent">
              Carro Intel·ligent
            </span>
          </h2>
        </div>

        {/* Canvas */}
        <div className="relative h-[340px] md:h-[680px] rounded-2xl overflow-hidden border border-white/5">
          <Canvas camera={{ position: DEFAULT_CAM_POS, fov: 48 }} gl={{ antialias: true }} dpr={[1, 1.5]}>
            <CartScene selectedId={selectedId} onSelect={setSelectedId} />
          </Canvas>

          {/* Info panel — DESKTOP: overlay lateral */}
          <AnimatePresence>
            {selectedPart && (
              <motion.div
                key={selectedPart.id}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                className="hidden md:flex absolute right-0 top-0 h-full w-full max-w-xs z-20 flex-col justify-center"
              >
                <div className="h-full flex flex-col justify-center p-6 bg-gradient-to-l from-[#111111] via-[#111111]/95 to-transparent border-l border-white/5">
                  <InfoPanelContent
                    selectedPart={selectedPart}
                    onClose={() => setSelectedId(null)}
                    onNext={handleNext}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info panel — MOBILE: sota el canvas */}
        <AnimatePresence>
          {selectedPart && (
            <motion.div
              key={`mobile-${selectedPart.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 p-5 rounded-2xl border border-white/8 bg-white/3"
            >
              <InfoPanelContent
                selectedPart={selectedPart}
                onClose={() => setSelectedId(null)}
                onNext={handleNext}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botons de parts */}
        <AnimatePresence>
          {!selectedId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-wrap gap-2 justify-center mt-5"
            >
              {cartParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedId(part.id as PartId)}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-white/10 bg-black/40 backdrop-blur-sm text-slate-300 hover:text-white hover:border-[#c84b5a]/50 hover:bg-[#9B2335]/10 transition-all duration-200"
                >
                  {part.name}
                </button>
              ))}
              <p className="w-full text-center text-slate-600 text-xs mt-1">
                Clica una peça · arrossega per rotar · scroll per fer zoom
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
