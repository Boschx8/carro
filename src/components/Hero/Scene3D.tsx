import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 2500 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015
      pointsRef.current.rotation.x += delta * 0.005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#3b7dd8" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

function HeroCart() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
    }
  })

  const matFrame = { color: '#c0ccd8', metalness: 0.82, roughness: 0.18 }
  const matShelf = { color: '#7a9ab8', metalness: 0.35, roughness: 0.45 }
  const matWheel = { color: '#141424', metalness: 0.05, roughness: 0.88 }
  const matHandle = { color: '#dce8f4', metalness: 0.92, roughness: 0.08 }
  const matBin = { color: '#1a4030', metalness: 0.0, roughness: 0.82 }
  const matLock = { color: '#c07820', metalness: 0.65, roughness: 0.28 }

  const polePositions: [number, number, number][] = [
    [-0.36, 0.1, 0.26], [0.36, 0.1, 0.26], [-0.36, 0.1, -0.26], [0.36, 0.1, -0.26],
  ]

  const wheelPositions: [number, number, number][] = [
    [-0.31, -0.82, 0.21], [0.31, -0.82, 0.21], [-0.31, -0.82, -0.21], [0.31, -0.82, -0.21],
  ]

  return (
    <group ref={groupRef}>
      {/* Vertical poles */}
      {polePositions.map((pos, i) => (
        <mesh key={`pole-${i}`} position={pos}>
          <cylinderGeometry args={[0.022, 0.022, 1.5, 10]} />
          <meshStandardMaterial {...matFrame} />
        </mesh>
      ))}

      {/* Horizontal rails - top */}
      <mesh position={[0, 0.85, 0.26]}>
        <boxGeometry args={[0.72, 0.024, 0.024]} />
        <meshStandardMaterial {...matFrame} />
      </mesh>
      <mesh position={[0, 0.85, -0.26]}>
        <boxGeometry args={[0.72, 0.024, 0.024]} />
        <meshStandardMaterial {...matFrame} />
      </mesh>
      <mesh position={[-0.36, 0.85, 0]}>
        <boxGeometry args={[0.024, 0.024, 0.52]} />
        <meshStandardMaterial {...matFrame} />
      </mesh>
      <mesh position={[0.36, 0.85, 0]}>
        <boxGeometry args={[0.024, 0.024, 0.52]} />
        <meshStandardMaterial {...matFrame} />
      </mesh>

      {/* Horizontal rails - mid */}
      {[0.27, -0.23, -0.63].map((y, i) => (
        <group key={`midrail-${i}`}>
          <mesh position={[0, y, 0.26]}>
            <boxGeometry args={[0.72, 0.02, 0.02]} />
            <meshStandardMaterial {...matFrame} />
          </mesh>
          <mesh position={[0, y, -0.26]}>
            <boxGeometry args={[0.72, 0.02, 0.02]} />
            <meshStandardMaterial {...matFrame} />
          </mesh>
        </group>
      ))}

      {/* Shelves (3 platforms) */}
      {[0.28, -0.22, -0.62].map((y, i) => (
        <mesh key={`shelf-${i}`} position={[0, y, 0]}>
          <boxGeometry args={[0.68, 0.025, 0.48]} />
          <meshStandardMaterial {...matShelf} />
        </mesh>
      ))}

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <mesh key={`wheel-${i}`} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.088, 0.088, 0.055, 18]} />
          <meshStandardMaterial {...matWheel} />
        </mesh>
      ))}

      {/* Wheel hubs */}
      {wheelPositions.map((pos, i) => (
        <mesh key={`hub-${i}`} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 10]} />
          <meshStandardMaterial color="#aac0d0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Handles */}
      {([-0.38, 0.38] as number[]).map((x, i) => (
        <group key={`handle-${i}`}>
          <mesh position={[x, 0.82, -0.26]}>
            <cylinderGeometry args={[0.018, 0.018, 0.34, 10]} />
            <meshStandardMaterial {...matHandle} />
          </mesh>
          <mesh position={[x, 0.82, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.28, 10]} />
            <meshStandardMaterial {...matHandle} />
          </mesh>
        </group>
      ))}

      {/* Waste containers */}
      <mesh position={[-0.18, -0.71, 0]}>
        <boxGeometry args={[0.29, 0.22, 0.42]} />
        <meshStandardMaterial {...matBin} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0.18, -0.71, 0]}>
        <boxGeometry args={[0.29, 0.22, 0.42]} />
        <meshStandardMaterial {...matBin} transparent opacity={0.88} />
      </mesh>

      {/* Bin labels (small strips) */}
      <mesh position={[-0.18, -0.65, 0.215]}>
        <boxGeometry args={[0.18, 0.06, 0.004]} />
        <meshStandardMaterial color="#2a5a3a" metalness={0} roughness={0.9} />
      </mesh>
      <mesh position={[0.18, -0.65, 0.215]}>
        <boxGeometry args={[0.18, 0.06, 0.004]} />
        <meshStandardMaterial color="#3a5a2a" metalness={0} roughness={0.9} />
      </mesh>

      {/* Lock mechanisms */}
      {([-0.36, 0.36] as number[]).map((x, i) =>
        [0.27, -0.22].map((y, j) => (
          <mesh key={`lock-${i}-${j}`} position={[x, y, 0.26]}>
            <boxGeometry args={[0.045, 0.038, 0.038]} />
            <meshStandardMaterial {...matLock} />
          </mesh>
        ))
      )}
    </group>
  )
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.4) * 3
      ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 2
      ref.current.position.z = -3
    }
  })
  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color="#1e3a8a"
          distort={0.4}
          speed={2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <>
      <color attach="background" args={['#050d1a']} />
      <fog attach="fog" args={['#050d1a', 18, 35]} />

      <ambientLight intensity={0.4} color="#1e3a6e" />
      <pointLight position={[3, 4, 3]} intensity={60} color="#3b7dd8" />
      <pointLight position={[-3, -2, 2]} intensity={30} color="#1e40af" />
      <pointLight position={[0, 0, 4]} intensity={20} color="#60a5fa" />

      <Particles />
      <GlowOrb />

      <group position={[1.4, 0, 0]}>
        <HeroCart />
      </group>
    </>
  )
}
