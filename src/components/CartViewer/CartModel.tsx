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

  // Alumini gris clar (estructura metàl·lica)
  const frameProps = (id: PartId) => ({
    color: '#b0b8c2',
    metalness: 0.88,
    roughness: 0.18,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: op(id) < 1,
    opacity: op(id),
  })

  // Fusta marró càlid (plataformes)
  const shelfProps = (id: PartId) => ({
    color: '#8B6020',
    metalness: 0.0,
    roughness: 0.78,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: op(id) < 1,
    opacity: op(id),
  })

  // Rodes negres de goma
  const wheelProps = {
    color: '#1a1a1a',
    metalness: 0.05,
    roughness: 0.92,
    emissive: em('rodes'),
    emissiveIntensity: emI('rodes'),
    transparent: op('rodes') < 1,
    opacity: op('rodes'),
  }

  // Mànecs negres de plàstic dur
  const handleProps = {
    color: '#1c1c1e',
    metalness: 0.08,
    roughness: 0.85,
    emissive: em('nanses'),
    emissiveIntensity: emI('nanses'),
    transparent: op('nanses') < 1,
    opacity: op('nanses'),
  }

  // Contenidors: groc olivaci (cartró) i blau (plàstic)
  const binProps = (id: PartId) => ({
    color: '#A89A18',
    metalness: 0.0,
    roughness: 0.75,
    emissive: em(id),
    emissiveIntensity: emI(id),
    transparent: true,
    opacity: op(id) * 0.95,
  })

  // Sistema de bloqueig: alumini fosc
  const lockProps = {
    color: '#888892',
    metalness: 0.72,
    roughness: 0.32,
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
              <meshStandardMaterial color="#c0c4c8" metalness={0.90} roughness={0.10} transparent opacity={op('rodes')} />
            </mesh>
          </group>
        ))}
      </PartGroup>

      {/* ── NANSES ── */}
      {/* Ambdues nanses a la cara curta dreta (x=+0.38), una per cada pal */}
      <PartGroup id="nanses" label="Nanses" labelPos={[0.75, 0.2, 0]} selectedId={selectedId} onSelect={onSelect}>
        {([0.28, -0.28] as number[]).map((z, i) => (
          <group key={`h${i}`}>
            {/* Barra de prensió vertical, sobresurt cap a fora en +X */}
            <mesh position={[0.47, 0.1, z]}>
              <cylinderGeometry args={[0.019, 0.019, 0.36, 10]} />
              <meshStandardMaterial {...handleProps} />
            </mesh>
            {/* Bracket superior (horitzontal en X) */}
            <mesh position={[0.425, 0.28, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.014, 0.014, 0.09, 8]} />
              <meshStandardMaterial {...handleProps} />
            </mesh>
            {/* Bracket inferior */}
            <mesh position={[0.425, -0.08, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.014, 0.014, 0.09, 8]} />
              <meshStandardMaterial {...handleProps} />
            </mesh>
          </group>
        ))}
      </PartGroup>

      {/* ── CONTENIDORS ── */}
      <PartGroup id="contenidors" label="Contenidors" labelPos={[0, -0.56, 0.45]} selectedId={selectedId} onSelect={onSelect}>
        {/* Groc - cartró */}
        <mesh position={[-0.19, -0.73, 0]}>
          <boxGeometry args={[0.3, 0.23, 0.44]} />
          <meshStandardMaterial {...binProps('contenidors')} color="#A89A18" />
        </mesh>
        {/* Blau - plàstic */}
        <mesh position={[0.19, -0.73, 0]}>
          <boxGeometry args={[0.3, 0.23, 0.44]} />
          <meshStandardMaterial {...binProps('contenidors')} color="#2448A8" />
        </mesh>
        {/* Frontal groc */}
        <mesh position={[-0.19, -0.67, 0.225]}>
          <boxGeometry args={[0.2, 0.07, 0.005]} />
          <meshStandardMaterial color="#C0B020" metalness={0} roughness={0.7} transparent opacity={op('contenidors')} />
        </mesh>
        {/* Frontal blau */}
        <mesh position={[0.19, -0.67, 0.225]}>
          <boxGeometry args={[0.2, 0.07, 0.005]} />
          <meshStandardMaterial color="#2A52C0" metalness={0} roughness={0.7} transparent opacity={op('contenidors')} />
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
