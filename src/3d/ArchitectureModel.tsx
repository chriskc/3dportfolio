import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane } from '@react-three/drei'
import * as THREE from 'three'

const ArchitectureModel = () => {
  // In a real application, you would load a proper 3D model
  // This is a simplified placeholder to demonstrate the concept
  
  const groupRef = useRef<THREE.Group>(null)
  
  // Simple animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <Plane 
        args={[20, 20]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1, 0]}
      >
        <meshStandardMaterial color="#333333" />
      </Plane>
      
      {/* Base building structure */}
      <Box position={[0, 0, 0]} args={[3, 1, 2]}>
        <meshStandardMaterial color="#555555" />
      </Box>
      
      {/* Upper floors */}
      <Box position={[0, 1.5, 0]} args={[2.5, 2, 1.5]}>
        <meshStandardMaterial color="#777777" />
      </Box>
      
      {/* Roof structure */}
      <Box position={[0, 2.8, 0]} args={[3, 0.6, 2]}>
        <meshStandardMaterial color="#999999" />
      </Box>
      
      {/* Windows - front */}
      <Box position={[0, 0, 1.01]} args={[2, 0.5, 0.1]}>
        <meshStandardMaterial color="#aaddff" transparent opacity={0.7} />
      </Box>
      
      {/* Windows - back */}
      <Box position={[0, 0, -1.01]} args={[2, 0.5, 0.1]}>
        <meshStandardMaterial color="#aaddff" transparent opacity={0.7} />
      </Box>
      
      {/* Windows - upper front */}
      <Box position={[0, 1.5, 0.76]} args={[1.5, 1, 0.1]}>
        <meshStandardMaterial color="#aaddff" transparent opacity={0.7} />
      </Box>
      
      {/* Decorative elements */}
      <Box position={[-1.5, 0.5, 0]} args={[0.2, 2, 0.2]}>
        <meshStandardMaterial color="#666666" />
      </Box>
      <Box position={[1.5, 0.5, 0]} args={[0.2, 2, 0.2]}>
        <meshStandardMaterial color="#666666" />
      </Box>
    </group>
  )
}

export default ArchitectureModel
