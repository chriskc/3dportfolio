import { Sphere } from "@react-three/drei"
import { useMemo } from "react"

export const sphereControls = {
    sphereColor: { value: "#a5b4fc", label: "Color" },
    sphereOpacity: { value: 0.4, min: 0.1, max: 1, step: 0.05, label: "Opacity" },
    sphereCount: { value: 100, min: 10, max: 500, step: 1, label: "Count" },
    sphereMinSize: { value: 0.2, min: 0.1, max: 1, step: 0.1, label: "Min Size" },
    sphereMaxSize: { value: 0.8, min: 0.2, max: 2, step: 0.1, label: "Max Size" },
}

interface ScatteredSpheresProps {
    count?: number
    minRadius?: number
    maxRadius?: number
    minSize?: number
    maxSize?: number
    color?: string
    opacity?: number
}

export const ScatteredSpheres = ({
    count = sphereControls.sphereCount.value,
    minRadius = 8,
    maxRadius = 15,
    minSize = sphereControls.sphereMinSize.value,
    maxSize = sphereControls.sphereMaxSize.value,
    color = sphereControls.sphereColor.value,
    opacity = sphereControls.sphereOpacity.value,
}: ScatteredSpheresProps) => {
    const spheres = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: [
                (Math.random() - 0.5) * 2 * maxRadius,
                (Math.random() - 0.5) * 10, // Vertical spread
                (Math.random() - 0.5) * 2 * maxRadius,
            ] as [number, number, number],
            size: minSize + Math.random() * (maxSize - minSize),
        }))
    }, [count, minRadius, maxRadius, minSize, maxSize])

    return (
        <group>
            {spheres.map((sphere, i) => (
                <Sphere key={i} args={[sphere.size, 16, 16]} position={sphere.position}>
                    <meshStandardMaterial
                        color={color}
                        transparent={true}
                        opacity={opacity}
                        roughness={0.7}
                        metalness={0.1}
                    />
                </Sphere>
            ))}
        </group>
    )
}

export default ScatteredSpheres
