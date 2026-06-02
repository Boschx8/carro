import { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, ContactShadows } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { cartParts } from '../../data/projectData'
import CartModel from './CartModel'

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

  const flyTo = useCallback(
    (partId: PartId | null) => {
      if (!controlsRef.current) return
      if (partId === null) {
        controlsRef.current.setLookAt(
          ...DEFAULT_CAM_POS,
          ...DEFAULT_CAM_TARGET,
          true
        )
        return
      }
      const part = cartParts.find((p) => p.id === partId)
      if (!part) return
      controlsRef.current.setLookAt(
        ...part.cameraPos,
        ...part.cameraTarget,
        true
      )
    },
    []
  )

  const handleSelect = useCallback(
    (id: PartId | null) => {
      onSelect(id)
      flyTo(id)
    },
    [onSelect, flyTo]
  )

  return (
    <>
      <color attach="background" args={['#060e1c']} />
      <fog attach="fog" args={['#060e1c', 12, 25]} />

      <ambientLight intensity={0.5} color="#1a3060" />
      <pointLight position={[4, 5, 4]} intensity={80} color="#4488dd" />
      <pointLight position={[-4, -2, 3]} intensity={40} color="#1e3a8a" />
      <pointLight position={[0, 3, -3]} intensity={25} color="#60a5fa" />

      <ContactShadows
        position={[0, -1.0, 0]}
        opacity={0.5}
        scale={4}
        blur={2}
        far={2}
        color="#1a3060"
      />

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

export default function CartViewer() {
  const [selectedId, setSelectedId] = useState<PartId | null>(null)
  const selectedPart = cartParts.find((p) => p.id === selectedId)

  return (
    <section id="carro" className="relative h-screen bg-[#060e1c] overflow-hidden">
      {/* Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: DEFAULT_CAM_POS, fov: 48 }}
          gl={{ antialias: true }}
          dpr={[1, 1.5]}
        >
          <CartScene selectedId={selectedId} onSelect={setSelectedId} />
        </Canvas>
      </div>

      {/* Top overlay */}
      <div className="absolute inset-x-0 top-0 z-10 pt-10 text-center pointer-events-none">
        <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">
          Disseny conceptual · SolidWorks
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-white">
          Explora el{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Carro Intel·ligent
          </span>
        </h2>
      </div>

      {/* Part buttons (bottom) */}
      <div className="absolute bottom-8 inset-x-0 z-10 flex justify-center">
        <AnimatePresence>
          {!selectedId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-wrap gap-2 justify-center px-4"
            >
              {cartParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedId(part.id as PartId)}
                  className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-black/40 backdrop-blur-sm text-slate-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-200"
                >
                  {part.name}
                </button>
              ))}
              <p className="w-full text-center text-slate-600 text-xs mt-1">
                Clica una peça per descobrir els detalls · arrossega per rotar · scroll per fer zoom
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            key={selectedPart.id}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="absolute right-0 top-0 h-full w-full max-w-sm z-20 flex flex-col justify-center"
          >
            <div className="h-full flex flex-col justify-center p-8 bg-gradient-to-l from-[#060e1c] via-[#060e1c]/95 to-transparent border-l border-white/5">
              {/* Icon + name */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-white/10"
                style={{ background: `${selectedPart.color}15`, borderColor: `${selectedPart.color}30` }}
              >
                {selectedPart.icon}
              </div>

              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: selectedPart.color }}>
                Component
              </p>
              <h3 className="text-2xl font-bold text-white mb-5">{selectedPart.name}</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">{selectedPart.description}</p>

              <div className="p-4 rounded-xl border mb-8" style={{ background: `${selectedPart.color}0f`, borderColor: `${selectedPart.color}25` }}>
                <p className="text-sm font-medium mb-1" style={{ color: selectedPart.color }}>
                  Dada clau
                </p>
                <p className="text-white text-sm">{selectedPart.detail}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedId(null)}
                  className="flex-1 py-3 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:border-white/30 transition-all text-sm font-medium"
                >
                  ← Torna al carro
                </button>
                {cartParts.findIndex((p) => p.id === selectedPart.id) < cartParts.length - 1 && (
                  <button
                    onClick={() => {
                      const idx = cartParts.findIndex((p) => p.id === selectedPart.id)
                      setSelectedId(cartParts[idx + 1].id as PartId)
                    }}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-white transition-all"
                    style={{ background: `${selectedPart.color}25`, border: `1px solid ${selectedPart.color}40` }}
                  >
                    Següent →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
