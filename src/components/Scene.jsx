import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
const mobile = matchMedia('(max-width: 768px)').matches
function Particles() {
  const ref = useRef()
  const pos = useMemo(() => Float32Array.from({ length: (mobile ? 150 : 600) * 3 }, () => (Math.random() - .5) * 12), []) // capped count
  useFrame(({ pointer }) => { ref.current.rotation.y += .0008; ref.current.rotation.x += (pointer.y * .3 - ref.current.rotation.x) * .03 })
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={pos.length / 3} itemSize={3} /></bufferGeometry>
    <pointsMaterial size={.03} color="#22d3ee" /></points>
}
function Orb() {
  const ref = useRef()
  useFrame(({ pointer }) => { ref.current.rotation.y += (pointer.x * 1.2 - ref.current.rotation.y) * .05 })
  return <Float speed={2} floatIntensity={1.5}><mesh ref={ref} scale={mobile ? 1.1 : 1.6}>
    <icosahedronGeometry args={[1, mobile ? 8 : 24]} />
    <MeshDistortMaterial color="#8b5cf6" distort={.4} speed={2} roughness={.2} metalness={.6} /></mesh></Float>
}
export default function Scene() {
  return <Canvas dpr={mobile ? 1 : [1, 1.5]} camera={{ position: [0, 0, 5] }} gl={{ powerPreference: 'low-power' }}>
    <ambientLight intensity={.6} /><directionalLight position={[3, 3, 3]} color="#22d3ee" intensity={2} />
    <Orb /><Particles /></Canvas>
}
