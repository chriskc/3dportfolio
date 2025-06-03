// src/3d/ProjectCard.tsx
import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

interface ProjectCardProps {
    position: [number, number, number]
    title: string
    description: string
    category: string
    onClick: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    position,
    title,
    description,
    category,
    onClick,
}) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const aspectRatio = 2 / 3 // 2:3 aspect ratio (width:height)
    const height = 2 // Fixed height
    const width = height * aspectRatio // Calculate width based on aspect ratio

    // Glass material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.9, // Transparency
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        ior: 1.5,
        thickness: 0.1,
        envMapIntensity: 1,
        transparent: true,
        opacity: 0.9,
    })

    // Border material
    const borderMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
    })

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02
        }
    })

    return (
        <group position={position}>
            {/* Main card */}
            <group>
                {/* Glass panel */}
                <mesh
                    ref={meshRef}
                    onClick={onClick}
                    onPointerOver={(e) => {
                        document.body.style.cursor = "pointer"
                        e.stopPropagation()
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = "default"
                    }}
                    castShadow
                    receiveShadow>
                    {/* Main card surface */}
                    <boxGeometry args={[width, height, 0.1]} />
                    <primitive object={glassMaterial.clone()} attach="material" />

                    {/* Card border */}
                    <lineSegments>
                        <edgesGeometry args={[new THREE.BoxGeometry(width, height, 0.1)]} />
                        <lineBasicMaterial color="#ffffff" transparent opacity={0.8} />
                    </lineSegments>

                    {/* Card content */}
                    <group position={[0, 0, 0.06]}>
                        <Text
                            position={[0, height * 0.4, 0]}
                            fontSize={0.12}
                            color="#333"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={width * 0.9}
                            lineHeight={1.2}
                            letterSpacing={0.02}>
                            {title}
                        </Text>

                        <Text
                            position={[0, 0, 0]}
                            fontSize={0.06}
                            color="#666"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={width * 0.9}
                            lineHeight={1.2}
                            letterSpacing={0.01}>
                            {category}
                        </Text>

                        <mesh position={[0, -height * 0.4, 0]}>
                            <planeGeometry args={[width * 0.8, 0.4]} />
                            <meshBasicMaterial color="#0066cc" />
                            <Text
                                position={[0, 0, 0.1]}
                                fontSize={0.08}
                                color="white"
                                anchorX="center"
                                anchorY="middle">
                                View Project
                            </Text>
                        </mesh>
                    </group>
                </mesh>
            </group>

            {/* Reflective border */}
            <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[width + 0.1, height + 0.1, 0.02]} />
                <meshStandardMaterial
                    color="#ffffff"
                    metalness={0.9}
                    roughness={0.1}
                    envMapIntensity={1}
                />
            </mesh>
        </group>
    )
}

export default ProjectCard
