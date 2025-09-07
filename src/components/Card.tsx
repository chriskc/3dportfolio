import { MeshTransmissionMaterial, RoundedBox, Text } from "@react-three/drei"
import { useControls } from "leva"
import { useRef, useState } from "react"
import * as THREE from "three"

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
    index: number
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
        thickness: { value: 0.3, min: 0, max: 10, step: 0.01 },
        roughness: { value: 0.28, min: 0, max: 1, step: 0.01 },
        transmission: { value: 0.95, min: 0, max: 1, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 2.33, step: 0.01 },
        chromaticAberration: { value: 0.02, min: 0, max: 1, step: 0.01 },
        anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.2, min: 0, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.05, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 0.3, min: 0, max: 1, step: 0.01 },
        attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
        attenuationColor: { value: "#a9c5db" },
        opacity: { value: 0.9, min: 0, max: 1, step: 0.01 },
        transparent: { value: true },
        color: { value: hovered ? hoverColor : color },
        backside: { value: true },
        backsideThickness: { value: 0.2, min: 0, max: 1, step: 0.01 },
        backsideColor: { value: hovered ? hoverColor : color },
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
            <group position={[0, 0, depth / 2 + 0.01]}>
                <Text
                    position={[0, 0.8, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.01}
                    outlineColor="rgba(0,0,0,0.5)"
                    outlineOpacity={0.5}
                    fontWeight="bold"
                    letterSpacing={0.03}>
                    {title}
                </Text>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.15}
                    color="rgba(255,255,255,0.9)"
                    maxWidth={width * 0.9}
                    lineHeight={1.4}
                    letterSpacing={0.02}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.005}
                    outlineColor="rgba(0,0,0,0.3)"
                    outlineOpacity={0.5}>
                    {description}
                </Text>
            </group>
        </mesh>
    )
}
