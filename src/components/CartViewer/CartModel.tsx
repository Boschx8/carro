import { useRef, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import * as THREE from 'three'

type PartId = 'estructura' | 'plataformes' | 'rodes' | 'nanses' | 'contenidors' | 'bloqueig'

interface PartGroupProps {
  id: PartId
  label: string
  labelPos: [number, number, number]
  selectedId: PartId | null
  onSelect: (id: PartId | null) => void
  children: React.ReactNode
}

function PartGroup({ id, label, labelPos, selectedId, onSelect, children }: PartGroupProps) {
  const [hovered, setHovered] = useState(false)
  const isSelected = selectedId === id
  const isDimmed = selectedId !== null && !isSelected

  useCursor(hovered && selectedId === null)

  return (
    <group
      onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : id) }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      <group>
        {/* Pass emissive state via context or clone trick - simpler: just render children with opacity hint */}
        <group userData={{ isSelected, isHovered: hovered, isDimmed }}>
          {children}
        </group>
      </group>

      {/* Floating label */}
      {(hovered || isSelected) && (
        <Html position={labelPos} center zIndexRange={[10, 0]} style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
          <div
            style={{
              background: isSelected ? 'rgba(155,35,53,0.9)' : 'rgba(10,10,10,0.85)',
              border: `1px solid ${isSelected ? 'rgba(200,75,90,0.6)' : 'rgba(255,255,255,0.15)'}`,
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: 'white',
              fontSize: '12px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: isSelected ? '0 0 12px rgba(155,35,53,0.3)' : 'none',
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

interface CartModelProps {
  selectedId: PartId | null
  onSelect: (id: PartId | null) => void
  autoRotate: boolean
}

export default function CartModel({ selectedId, onSelect, autoRotate }: CartModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate && !selectedId) {
      groupRef.current.rotation.y += delta * 0.22
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06
    }
  })

  const sel = selectedId
  const em = useCallback((partId: PartId) => {
    if (sel === partId) return '#c84b5a'
    return '#000000'
  }, [sel])
  const emI = useCallback((partId: PartId) => {
    if (sel === partId) return 0.45
    return 0
  }, [sel])
  const op = useCallback((partId: PartId) => {
    if (sel === null || sel === partId) return 1.0
    return 0.28
  }, [sel])

  // Acer gris setinat (muntants i base)
  const steelProps = (id: PartId) => ({
    color: '#9aa0a8',
    metalness: 0.82,
    roughness: 0.4,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: op(id) < 1,
    opacity: op(id),
  })

  // Bigues de suport de les plataformes (gris una mica més fosc)
  const beamProps = (id: PartId) => ({
    color: '#878d97',
    metalness: 0.8,
    roughness: 0.42,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: op(id) < 1,
    opacity: op(id),
  })

  // Fusta de faig clara (taulons de les plataformes)
  const woodProps = (id: PartId) => ({
    color: '#c2a069',
    metalness: 0.0,
    roughness: 0.72,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: op(id) < 1,
    opacity: op(id),
  })

  // Geometria base
  const POST_POS: [number, number, number][] = [
    [-0.38, 0.1, 0.28], [0.38, 0.1, 0.28], [-0.38, 0.1, -0.28], [0.38, 0.1, -0.28],
  ]
  const POST_H = 1.65
  const SHELF_YS = [0.74, 0.28, -0.18] // 3 plataformes regulables
  const HOLE_YS = Array.from({ length: 11 }, (_, i) => -0.45 + i * 0.13)

  const WR = 0.11 // radi de la roda
  const CASTER_POS: [number, number][] = [
    [-0.34, 0.22], [0.34, 0.22], [-0.34, -0.22], [0.34, -0.22],
  ]
  const PLATE_Y = -0.725
  const WHEEL_Y = -0.82

  return (
    <group ref={groupRef} onClick={(e) => { if (e.object === e.eventObject) onSelect(null) }}>
      {/* ── ESTRUCTURA ── */}
      <PartGroup id="estructura" label="Estructura" labelPos={[0, 1.05, 0.4]} selectedId={selectedId} onSelect={onSelect}>
        {/* Muntants verticals (perfil rectangular tipus prestatgeria) */}
        {POST_POS.map(([px, py, pz], i) => (
          <group key={`post${i}`}>
            <mesh position={[px, py, pz]}>
              <boxGeometry args={[0.05, POST_H, 0.07]} />
              <meshStandardMaterial {...steelProps('estructura')} />
            </mesh>
            {/* Files de forats (cara frontal/posterior) */}
            {HOLE_YS.map((hy, j) => (
              <mesh key={`hole${i}-${j}`} position={[px, hy, pz]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.013, 0.013, 0.09, 12]} />
                <meshStandardMaterial
                  color="#26282e"
                  metalness={0.3}
                  roughness={0.7}
                  transparent={op('estructura') < 1}
                  opacity={op('estructura')}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Base metàl·lica (safata on recolzen els contenidors) */}
        <mesh position={[0, -0.70, 0]}>
          <boxGeometry args={[0.84, 0.03, 0.62]} />
          <meshStandardMaterial {...steelProps('estructura')} />
        </mesh>
        {/* Tauló de fusta de la base */}
        <mesh position={[0, -0.665, 0]}>
          <boxGeometry args={[0.74, 0.025, 0.5]} />
          <meshStandardMaterial {...woodProps('estructura')} />
        </mesh>
      </PartGroup>

      {/* ── PLATAFORMES ── */}
      <PartGroup id="plataformes" label="Plataformes" labelPos={[0.55, 0.3, 0.35]} selectedId={selectedId} onSelect={onSelect}>
        {SHELF_YS.map((sy, i) => (
          <group key={`sh${i}`}>
            {/* Bigues de suport laterals (més altes: fan de paret de contenció) */}
            {[0.38, -0.38].map((bx, bi) => (
              <mesh key={`beam${i}-${bi}`} position={[bx, sy - 0.012, 0]}>
                <boxGeometry args={[0.045, 0.10, 0.60]} />
                <meshStandardMaterial {...beamProps('plataformes')} />
              </mesh>
            ))}
            {/* Tauló de fusta (panell central pla) */}
            <mesh position={[0, sy, 0]}>
              <boxGeometry args={[0.72, 0.028, 0.5]} />
              <meshStandardMaterial {...woodProps('plataformes')} />
            </mesh>
            {/* Cantells aixecats en rampa suau (perquè els productes no rodin) */}
            {[
              { z: 0.205, rot: -0.2 },
              { z: -0.205, rot: 0.2 },
            ].map((lip, li) => (
              <mesh key={`lip${i}-${li}`} position={[0, sy + 0.018, lip.z]} rotation={[lip.rot, 0, 0]}>
                <boxGeometry args={[0.72, 0.028, 0.11]} />
                <meshStandardMaterial {...woodProps('plataformes')} />
              </mesh>
            ))}
          </group>
        ))}
      </PartGroup>

      {/* ── RODES ── */}
      <PartGroup id="rodes" label="Rodes" labelPos={[0, -1.05, 0.4]} selectedId={selectedId} onSelect={onSelect}>
        {CASTER_POS.map(([wx, wz], i) => (
          <group key={`w${i}`}>
            {/* Placa de muntatge superior */}
            <mesh position={[wx, PLATE_Y, wz]}>
              <boxGeometry args={[0.10, 0.014, 0.10]} />
              <meshStandardMaterial color="#8e94a0" metalness={0.78} roughness={0.3} transparent opacity={op('rodes')} />
            </mesh>
            {/* Barret giratori */}
            <mesh position={[wx, PLATE_Y - 0.022, wz]}>
              <cylinderGeometry args={[0.028, 0.032, 0.03, 16]} />
              <meshStandardMaterial color="#7f8693" metalness={0.7} roughness={0.35} transparent opacity={op('rodes')} />
            </mesh>
            {/* Forquilla / carcassa */}
            <mesh position={[wx, WHEEL_Y + 0.05, wz]}>
              <boxGeometry args={[0.055, 0.13, 0.062]} />
              <meshStandardMaterial color="#868d9a" metalness={0.68} roughness={0.36} transparent opacity={op('rodes')} />
            </mesh>
            {/* Pneumàtic de goma (negre) */}
            <mesh position={[wx, WHEEL_Y, wz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[WR, WR, 0.052, 32]} />
              <meshStandardMaterial color="#1a1a1c" metalness={0.05} roughness={0.9} transparent opacity={op('rodes')} />
            </mesh>
            {/* Disc / llanta gris */}
            <mesh position={[wx, WHEEL_Y, wz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[WR * 0.62, WR * 0.62, 0.054, 24]} />
              <meshStandardMaterial color="#808897" metalness={0.7} roughness={0.28} transparent opacity={op('rodes')} />
            </mesh>
            {/* Femella central hexagonal */}
            <mesh position={[wx, WHEEL_Y, wz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.06, 6]} />
              <meshStandardMaterial color="#b8bcc4" metalness={0.85} roughness={0.2} transparent opacity={op('rodes')} />
            </mesh>
            {/* Pedal de fre */}
            <mesh position={[wx, WHEEL_Y + 0.02, wz + (wz > 0 ? 0.07 : -0.07)]}>
              <boxGeometry args={[0.05, 0.014, 0.045]} />
              <meshStandardMaterial color="#202022" metalness={0.1} roughness={0.85} transparent opacity={op('rodes')} />
            </mesh>
          </group>
        ))}
      </PartGroup>

      {/* ── NANSES ── */}
      {/* Nanses en forma de D, una per muntant, cap enfora (±X) */}
      <PartGroup id="nanses" label="Nanses" labelPos={[0.78, 0.2, 0]} selectedId={selectedId} onSelect={onSelect}>
        {POST_POS.map(([px, , pz], i) => {
          const dir = Math.sign(px) || 1
          const hy = 0.16
          return (
            <group key={`hand${i}`}>
              {/* Base de subjecció contra el muntant */}
              <mesh position={[px + dir * 0.03, hy, pz]}>
                <boxGeometry args={[0.02, 0.17, 0.052]} />
                <meshStandardMaterial color="#9398a2" metalness={0.35} roughness={0.5} transparent opacity={op('nanses')} />
              </mesh>
              {/* Barra de prensió vertical */}
              <mesh position={[px + dir * 0.10, hy, pz]}>
                <cylinderGeometry args={[0.018, 0.018, 0.20, 12]} />
                <meshStandardMaterial color="#9398a2" metalness={0.35} roughness={0.5} transparent opacity={op('nanses')} />
              </mesh>
              {/* Braç superior */}
              <mesh position={[px + dir * 0.065, hy + 0.092, pz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.016, 0.016, 0.085, 10]} />
                <meshStandardMaterial color="#9398a2" metalness={0.35} roughness={0.5} transparent opacity={op('nanses')} />
              </mesh>
              {/* Braç inferior */}
              <mesh position={[px + dir * 0.065, hy - 0.092, pz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.016, 0.016, 0.085, 10]} />
                <meshStandardMaterial color="#9398a2" metalness={0.35} roughness={0.5} transparent opacity={op('nanses')} />
              </mesh>
            </group>
          )
        })}
      </PartGroup>

      {/* ── CONTENIDORS ── */}
      <PartGroup id="contenidors" label="Contenidors" labelPos={[0, -0.5, 0.45]} selectedId={selectedId} onSelect={onSelect}>
        {/* Contenidor oliva (cartró) */}
        <mesh position={[-0.18, -0.50, 0]}>
          <boxGeometry args={[0.30, 0.30, 0.44]} />
          <meshStandardMaterial
            color="#8f8a1e"
            metalness={0}
            roughness={0.75}
            emissive={em('contenidors')}
            emissiveIntensity={emI('contenidors')}
            transparent
            opacity={op('contenidors')}
          />
        </mesh>
        {/* Contenidor blau (plàstic) */}
        <mesh position={[0.18, -0.50, 0]}>
          <boxGeometry args={[0.30, 0.30, 0.44]} />
          <meshStandardMaterial
            color="#22408c"
            metalness={0}
            roughness={0.6}
            emissive={em('contenidors')}
            emissiveIntensity={emI('contenidors')}
            transparent
            opacity={op('contenidors')}
          />
        </mesh>
      </PartGroup>

      {/* ── BLOQUEIG ── */}
      {/* Passadors que fixen les bigues als forats dels muntants */}
      <PartGroup id="bloqueig" label="Sistema de Bloqueig" labelPos={[0.55, 0.45, 0.42]} selectedId={selectedId} onSelect={onSelect}>
        {POST_POS.flatMap(([px, , pz], pi) =>
          SHELF_YS.map((sy, si) => {
            const xdir = Math.sign(px) || 1
            return (
              <group key={`lk${pi}-${si}`}>
                {/* Cos del passador (cara lateral del muntant) */}
                <mesh position={[px + xdir * 0.04, sy - 0.042, pz]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.016, 0.016, 0.03, 14]} />
                  <meshStandardMaterial color="#aeb3bb" metalness={0.75} roughness={0.3} transparent opacity={op('bloqueig')} />
                </mesh>
                {/* Cap arrodonit */}
                <mesh position={[px + xdir * 0.056, sy - 0.042, pz]}>
                  <sphereGeometry args={[0.018, 14, 12]} />
                  <meshStandardMaterial color="#bcc1c9" metalness={0.78} roughness={0.26} transparent opacity={op('bloqueig')} />
                </mesh>
              </group>
            )
          })
        )}
      </PartGroup>
    </group>
  )
}
