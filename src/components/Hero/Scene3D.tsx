import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import CartModel from '../CartViewer/CartModel'

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
      <pointsMaterial size={0.035} color="#9B2335" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

function AdaptiveCart() {
  const { size } = useThree()
  const isMobile = size.width < 640
  return (
    <group
      position={isMobile ? [0, -0.1, 0] : [1.4, 0, 0]}
      scale={isMobile ? 1.1 : 1.6}
    >
      <CartModel selectedId={null} onSelect={() => {}} autoRotate={true} />
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
          color="#9B2335"
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
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 18, 35]} />

      <ambientLight intensity={0.8} color="#ffffff" />
      <pointLight position={[3, 4, 3]} intensity={70} color="#fff5e8" />
      <pointLight position={[-3, -2, 2]} intensity={35} color="#e8f0ff" />
      <pointLight position={[0, 0, 4]} intensity={25} color="#ffffff" />

      <Particles />
      <GlowOrb />

      <AdaptiveCart />
    </>
  )
}
