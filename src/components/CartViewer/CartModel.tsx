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
        <Html position={labelPos} center distanceFactor={9} zIndexRange={[10, 0]}>
          <div
            style={{
              background: isSelected ? 'rgba(37,99,235,0.9)' : 'rgba(8,15,30,0.82)',
              border: `1px solid ${isSelected ? 'rgba(96,165,250,0.6)' : 'rgba(255,255,255,0.15)'}`,
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: 'white',
              fontSize: '12px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: isSelected ? '0 0 20px rgba(37,99,235,0.4)' : 'none',
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
    if (sel === partId) return '#2563eb'
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

  const frameProps = (id: PartId) => ({
    color: '#b8c4d2',
    metalness: 0.85,
    roughness: 0.15,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: op(id) < 1,
    opacity: op(id),
  })

  const shelfProps = (id: PartId) => ({
    color: '#6e8aa8',
    metalness: 0.3,
    roughness: 0.5,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: op(id) < 1,
    opacity: op(id),
  })

  const wheelProps = {
    color: '#141422',
    metalness: 0.05,
    roughness: 0.9,
    emissive: em('rodes'),
    emissiveIntensity: emI('rodes'),
    transparent: op('rodes') < 1,
    opacity: op('rodes'),
  }

  const handleProps = {
    color: '#dde8f4',
    metalness: 0.92,
    roughness: 0.08,
    emissive: em('nanses'),
    emissiveIntensity: emI('nanses'),
    transparent: op('nanses') < 1,
    opacity: op('nanses'),
  }

  const binProps = (id: PartId) => ({
    color: '#1a4030',
    metalness: 0.0,
    roughness: 0.82,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: true,
    opacity: op(id) * 0.9,
  })

  const lockProps = {
    color: '#c07820',
    metalness: 0.65,
    roughness: 0.28,
    emissive: em('bloqueig'),
    emissiveIntensity: emI('bloqueig'),
    transparent: op('bloqueig') < 1,
    opacity: op('bloqueig'),
  }

  const polePositions: [number, number, number][] = [
    [-0.38, 0.1, 0.28], [0.38, 0.1, 0.28], [-0.38, 0.1, -0.28], [0.38, 0.1, -0.28],
  ]
  const wheelPositions: [number, number, number][] = [
    [-0.32, -0.84, 0.23], [0.32, -0.84, 0.23], [-0.32, -0.84, -0.23], [0.32, -0.84, -0.23],
  ]

  return (
    <group ref={groupRef} onClick={(e) => { if (e.object === e.eventObject) onSelect(null) }}>
      {/* ── ESTRUCTURA ── */}
      <PartGroup id="estructura" label="Estructura" labelPos={[0, 1.1, 0.4]} selectedId={selectedId} onSelect={onSelect}>
        {/* Vertical poles */}
        {polePositions.map((pos, i) => (
          <mesh key={`p${i}`} position={pos}>
            <cylinderGeometry args={[0.023, 0.023, 1.6, 10]} />
            <meshStandardMaterial {...frameProps('estructura')} />
          </mesh>
        ))}
        {/* Top frame */}
        {[0.28, -0.28].map((z, i) => (
          <mesh key={`tf${i}`} position={[0, 0.89, z]}>
            <boxGeometry args={[0.76, 0.024, 0.024]} />
            <meshStandardMaterial {...frameProps('estructura')} />
          </mesh>
        ))}
        <mesh position={[-0.38, 0.89, 0]}><boxGeometry args={[0.024, 0.024, 0.56]} /><meshStandardMaterial {...frameProps('estructura')} /></mesh>
        <mesh position={[0.38, 0.89, 0]}><boxGeometry args={[0.024, 0.024, 0.56]} /><meshStandardMaterial {...frameProps('estructura')} /></mesh>
        {/* Mid/bottom rails */}
        {[0.28, -0.22, -0.64].flatMap((y, ri) =>
          [0.28, -0.28].map((z, zi) => (
            <mesh key={`mr${ri}${zi}`} position={[0, y, z]}>
              <boxGeometry args={[0.76, 0.020, 0.020]} />
              <meshStandardMaterial {...frameProps('estructura')} />
            </mesh>
          ))
        )}
      </PartGroup>

      {/* ── PLATAFORMES ── */}
      <PartGroup id="plataformes" label="Plataformes" labelPos={[0.5, 0.3, 0.35]} selectedId={selectedId} onSelect={onSelect}>
        {[0.29, -0.21, -0.63].map((y, i) => (
          <mesh key={`sh${i}`} position={[0, y, 0]}>
            <boxGeometry args={[0.7, 0.026, 0.5]} />
            <meshStandardMaterial {...shelfProps('plataformes')} />
          </mesh>
        ))}
      </PartGroup>

      {/* ── RODES ── */}
      <PartGroup id="rodes" label="Rodes" labelPos={[0, -1.1, 0.4]} selectedId={selectedId} onSelect={onSelect}>
        {wheelPositions.map((pos, i) => (
          <group key={`w${i}`}>
            <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.058, 20]} />
              <meshStandardMaterial {...wheelProps} />
            </mesh>
            <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.026, 0.026, 0.065, 10]} />
              <meshStandardMaterial color="#a8bcc8" metalness={0.88} roughness={0.12} transparent opacity={op('rodes')} />
            </mesh>
          </group>
        ))}
      </PartGroup>

      {/* ── NANSES ── */}
      <PartGroup id="nanses" label="Nanses" labelPos={[0, 0.88, -0.6]} selectedId={selectedId} onSelect={onSelect}>
        {([-0.38, 0.38] as number[]).map((x, i) => (
          <group key={`h${i}`}>
            <mesh position={[x, 0.84, -0.28]}>
              <cylinderGeometry args={[0.019, 0.019, 0.38, 10]} />
              <meshStandardMaterial {...handleProps} />
            </mesh>
            <mesh position={[x, 0.84, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.019, 0.019, 0.32, 10]} />
              <meshStandardMaterial {...handleProps} />
            </mesh>
          </group>
        ))}
      </PartGroup>

      {/* ── CONTENIDORS ── */}
      <PartGroup id="contenidors" label="Contenidors" labelPos={[0, -0.56, 0.45]} selectedId={selectedId} onSelect={onSelect}>
        <mesh position={[-0.19, -0.73, 0]}>
          <boxGeometry args={[0.3, 0.23, 0.44]} />
          <meshStandardMaterial {...binProps('contenidors')} />
        </mesh>
        <mesh position={[0.19, -0.73, 0]}>
          <boxGeometry args={[0.3, 0.23, 0.44]} />
          <meshStandardMaterial {...binProps('contenidors')} color="#224a34" />
        </mesh>
        {/* Bin fronts */}
        <mesh position={[-0.19, -0.67, 0.225]}>
          <boxGeometry args={[0.2, 0.07, 0.005]} />
          <meshStandardMaterial color="#2a5a3c" metalness={0} roughness={0.9} transparent opacity={op('contenidors')} />
        </mesh>
        <mesh position={[0.19, -0.67, 0.225]}>
          <boxGeometry args={[0.2, 0.07, 0.005]} />
          <meshStandardMaterial color="#3a5a28" metalness={0} roughness={0.9} transparent opacity={op('contenidors')} />
        </mesh>
      </PartGroup>

      {/* ── BLOQUEIG ── */}
      <PartGroup id="bloqueig" label="Sistema de Bloqueig" labelPos={[0.55, 0.35, 0.42]} selectedId={selectedId} onSelect={onSelect}>
        {([-0.38, 0.38] as number[]).flatMap((x, xi) =>
          [0.28, -0.22].map((y, yi) => (
            <group key={`lk${xi}${yi}`}>
              <mesh position={[x, y, 0.28]}>
                <boxGeometry args={[0.048, 0.04, 0.04]} />
                <meshStandardMaterial {...lockProps} />
              </mesh>
              <mesh position={[x, y - 0.06, 0.28]}>
                <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
                <meshStandardMaterial {...lockProps} />
              </mesh>
            </group>
          ))
        )}
      </PartGroup>
    </group>
  )
}
