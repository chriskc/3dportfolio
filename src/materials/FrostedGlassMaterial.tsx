import * as THREE from "three"

interface FrostedGlassMaterialProps {
    color?: string | THREE.Color
    transmission?: number
    roughness?: number
    metalness?: number
    clearcoat?: number
    clearcoatRoughness?: number
    ior?: number
    thickness?: number
    specularIntensity?: number
    opacity?: number
}

export const FrostedGlassMaterial = ({
    color = "#ffffff",
    transmission = 0.8,
    roughness = 0.2,
    metalness = 0.1,
    clearcoat = 0.5,
    clearcoatRoughness = 0.2,
    ior = 1.33,
    thickness = 0.5,
    specularIntensity = 0.5,
    opacity = 0.9,
}: FrostedGlassMaterialProps) => {
    return (
        <meshPhysicalMaterial
            color={color}
            transmission={transmission}
            roughness={roughness}
            metalness={metalness}
            clearcoat={clearcoat}
            clearcoatRoughness={clearcoatRoughness}
            transparent={true}
            opacity={opacity}
            envMapIntensity={1}
            ior={ior}
            thickness={thickness}
            specularIntensity={specularIntensity}
        />
    )
}
