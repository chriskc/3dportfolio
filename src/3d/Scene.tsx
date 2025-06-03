import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'

type SceneProps = {
  children: React.ReactNode
  cameraPosition?: [number, number, number]
  background?: 'white' | 'black' | 'transparent'
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby'
  controls?: boolean
  autoRotate?: boolean
}

const Scene = ({
  children,
  cameraPosition = [5, 2, 5],
  background = 'transparent',
  environmentPreset = 'studio',
  controls = true,
  autoRotate = false
}: SceneProps) => {
  return (
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true }}
      style={{ background: background === 'transparent' ? 'transparent' : background === 'white' ? '#ffffff' : '#000000' }}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      
      <Suspense fallback={null}>
        {children}
        <Environment preset={environmentPreset} background={false} />
      </Suspense>
      
      {controls && (
        <OrbitControls 
          enableZoom 
          enablePan={false} 
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      )}
    </Canvas>
  )
}

export default Scene
