import { Grid, OrbitControls, RoundedBox, Sphere, Text } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import "./App.css"
import { FrostedGlassMaterial } from "./materials/FrostedGlassMaterial"

// ================================
// Custom Hooks
// ================================

/**
 * Hook to track window dimensions
 */
function useWindowSize() {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return dimensions
}

// ================================
// Scattered Spheres
// ================================

interface ScatteredSpheresProps {
    count?: number
    minRadius?: number
    maxRadius?: number
    minSize?: number
    maxSize?: number
    color?: string
    opacity?: number
}

const ScatteredSpheres = ({
    count = 50,
    minRadius = 8,
    maxRadius = 15,
    minSize = 0.1,
    maxSize = 0.5,
    color = "#ffffff",
    opacity = 0.6,
}: ScatteredSpheresProps) => {
    const spheres = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: [
                (Math.random() - 0.5) * 2 * maxRadius,
                (Math.random() - 0.5) * 10, // Vertical spread
                (Math.random() - 0.5) * 2 * maxRadius,
            ],
            size: minSize + Math.random() * (maxSize - minSize),
        }))
    }, [count, minRadius, maxRadius, minSize, maxSize])

    return (
        <group>
            {spheres.map((sphere: any, i: number) => (
                <Sphere key={i} args={[sphere.size, 16, 16]} position={sphere.position}>
                    <meshStandardMaterial
                        color={color}
                        transparent={true}
                        opacity={opacity}
                        roughness={0.7}
                        metalness={0.3}
                    />
                </Sphere>
            ))}
        </group>
    )
}

// ================================
// 3D Components
// ================================

interface CardProps {
    position: [number, number, number]
    rotation?: [number, number, number]
    color: string
    hoverColor: string
    title: string
    description: string
}

/**
 * A simple 2D card component
 */
function Card({
    position,
    rotation = [0, 0, 0],
    color,
    hoverColor,
    title,
    description,
}: CardProps) {
    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)

    const ref = useRef<THREE.Mesh>(null)

    return (
        <mesh
            ref={ref}
            position={position}
            rotation={rotation}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.05 : 1}>
            <RoundedBox args={[2.5, 3.5, 0.5]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
                <FrostedGlassMaterial />
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

// ================================
// Scene Setup
// ================================

/**
 * Main 3D scene component containing all 3D elements
 */
// Easing function for smooth animation
function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4)
}

function ThreeScene() {
    const [targetRotation, setTargetRotation] = useState(0)
    const [currentRotation, setCurrentRotation] = useState(0)
    const groupRef = useRef<THREE.Group>(null)
    const scrollTimeout = useRef<number | null>(null) // Using number | null type for setTimeout return value

    // Card data
    const cards = [
        {
            id: 1,
            color: "#3b82f6",
            hoverColor: "#60a5fa",
            title: "Front",
            description: "This is the front card",
        },
        {
            id: 2,
            color: "#10b981",
            hoverColor: "#34d399",
            title: "Right",
            description: "This is the right card",
        },
        {
            id: 3,
            color: "#8b5cf6",
            hoverColor: "#a78bfa",
            title: "Back",
            description: "This is the back card",
        },
        {
            id: 4,
            color: "#ec4899",
            hoverColor: "#f472b6",
            title: "Left",
            description: "This is the left card",
        },
        {
            id: 5,
            color: "#f59e0b",
            hoverColor: "#fbbf24",
            title: "Top",
            description: "This is the top card",
        },
        {
            id: 6,
            color: "#6366f1",
            hoverColor: "#818cf8",
            title: "Bottom",
            description: "This is the bottom card",
        },
    ]

    // Handle scroll for card rotation
    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault()

            // Clear any existing timeout to prevent multiple rapid scrolls
            if (scrollTimeout.current !== null) {
                clearTimeout(scrollTimeout.current)
                scrollTimeout.current = null
            }

            // Set a small timeout to debounce rapid scroll events
            scrollTimeout.current = setTimeout(() => {
                const direction = Math.sign(e.deltaY)
                setTargetRotation((prev) => {
                    // Calculate the angle for one card (2π / number of cards)
                    const angleStep = (2 * Math.PI) / cards.length
                    // Move to next/previous card based on scroll direction
                    return prev + angleStep * -direction
                })
            }, 50) as unknown as number
        }

        window.addEventListener("wheel", handleScroll, { passive: false })
        return () => {
            window.removeEventListener("wheel", handleScroll)
            if (scrollTimeout.current !== null) {
                clearTimeout(scrollTimeout.current)
                scrollTimeout.current = null
            }
        }
    }, [cards.length])

    // Smooth animation for rotation
    useFrame((_, delta) => {
        if (groupRef.current) {
            // Calculate the difference between current and target rotation
            const diff = targetRotation - currentRotation

            // If the difference is very small, snap to target
            if (Math.abs(diff) < 0.0001) {
                setCurrentRotation(targetRotation)
                return
            }

            // Apply easing to the rotation (slowed down by reducing the multiplier)
            const easingFactor = easeOutQuart(Math.min(1, delta * 2)) // Reduced from 5 to 2 to slow down
            const newRotation = currentRotation + diff * (easingFactor * 0.7) // Further reduced speed by 50%

            // Update the current rotation
            setCurrentRotation(newRotation)

            // Apply the rotation to the group
            groupRef.current.rotation.y = newRotation
        }
    })

    // Calculate positions in a circle with proper spacing
    const baseRadius = 5
    const radius = baseRadius
    const angleOffset = 0

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[0, 5, 5]} intensity={0.5} />

            {/* Grid Helper */}
            <Grid
                position={[0, 0, 0]}
                args={[20, 20]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#6f6f6f"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#9d4b4b"
                fadeDistance={30}
                fadeStrength={1}
            />

            {/* Background spheres */}
            <ScatteredSpheres
                count={100}
                minRadius={8}
                maxRadius={20}
                minSize={0.2}
                maxSize={0.8}
                color="#a5b4fc"
                opacity={0.4}
            />

            <group ref={groupRef} position={[0, 0, -5]}>
                {cards.map((card, i) => {
                    // Distribute cards in a circle
                    const angle = (i / cards.length) * Math.PI * 2
                    const x = Math.sin(angle) * radius
                    const z = Math.cos(angle) * radius

                    return (
                        <Card
                            key={card.id}
                            position={[x, 0, z]}
                            rotation={[0, Math.PI + angle, 0]} // Make cards face the center
                            color={card.color}
                            hoverColor={card.hoverColor}
                            title={card.title}
                            description={card.description}
                        />
                    )
                })}
            </group>

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                enableDamping={true}
            />
        </>
    )
}

// ================================
// Main App Component
// ================================

export default function App() {
    const { width, height } = useWindowSize()

    // Camera configuration - positioned to view the cards
    const cameraConfig = {
        position: [0, 0, 0] as [number, number, number],
        fov: 50,
        aspect: width / height,
        near: 0.1,
        far: 1000,
        up: [0, 1, 0] as [number, number, number],
        // lookAt: [0, 0, 0] as [number, number, number],
    }

    // Prevent default scroll behavior
    useEffect(() => {
        const preventDefault = (e: WheelEvent) => {
            if (e.ctrlKey) return // Allow zoom with ctrl+scroll
            e.preventDefault()
        }

        window.addEventListener("wheel", preventDefault, { passive: false })
        return () => window.removeEventListener("wheel", preventDefault)
    }, [])

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                cursor: "grab",
            }}>
            <Canvas
                gl={{ antialias: true }}
                style={{
                    width,
                    height,
                    display: "block",
                    backgroundColor: "white",
                }}
                camera={cameraConfig}>
                ,
                <ThreeScene />
            </Canvas>
        </div>
    )
}
