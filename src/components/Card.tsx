import { useControls } from "leva"
import { useState, useRef } from "react"
import * as THREE from "three"
import { RoundedBox, Text } from "@react-three/drei"
import { MeshTransmissionMaterial } from "@react-three/drei"

interface CardProps {
    position: [number, number, number]
    rotation?: [number, number, number]
    color: string
    hoverColor: string
    title: string
    description: string
    width: number
    height: number
    depth: number
}

/**
 * A 3D card component with glass-like material and hover effects
 */
export function Card({
    position,
    rotation = [0, 0, 0],
    color,
    hoverColor,
    title,
    description,
    width,
    height,
    depth,
}: CardProps) {
    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)

    const ref = useRef<THREE.Mesh>(null)

    const materialProps = useControls("Material", {
        thickness: { value: 0.5, min: 0, max: 10, step: 0.1 },
        roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
        transmission: { value: 0.8, min: 0, max: 1, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 2.33, step: 0.01 },
        chromaticAberration: { value: 0.1, min: 0, max: 1, step: 0.01 },
        anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.1, min: 0, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
        color: { value: color },
    })

    return (
        <mesh
            ref={ref}
            position={position}
            rotation={rotation}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.05 : 1}>
            <RoundedBox
                args={[width, height, depth]}
                radius={0.1}
                smoothness={4}
                position={[0, 0, 0]}>
                <MeshTransmissionMaterial {...materialProps} />
            </RoundedBox>

            {/* Card content */}
            <group position={[0, 0, 0.01]}>
                <Text
                    position={[0, 1, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle">
                    {title}
                </Text>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.15}
                    color="#e0e7ff"
                    maxWidth={2}
                    lineHeight={1.2}
                    letterSpacing={0.02}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle">
                    {description}
                </Text>
            </group>
        </mesh>
    )
}
