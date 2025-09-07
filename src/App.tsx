import { Environment, Grid, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { button, folder, useControls } from "leva"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import "./App.css"
import { cards } from "./cardData"
// import { RisographEffect } from "./effects/RisographEffect"
import { RisographEffect } from "./effects/RisographEffect"

// ================================
// Settings Management Functions
// ================================

// Function to download settings as JSON
const downloadSettings = (settings: Controls) => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `portfolio-settings-${
        new Date().toISOString().split("T")[0]
    }.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
}

// Function to upload and apply settings from JSON
const uploadSettings = (onSettingsLoad: (settings: Partial<Controls>) => void) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"

    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                try {
                    const settings = JSON.parse(event.target?.result as string)
                    onSettingsLoad(settings)
                    console.log("Settings loaded successfully")
                } catch (error) {
                    console.error("Error loading settings:", error)
                    alert("Error loading settings file. Please check the file format.")
                }
            }
            reader.readAsText(file)
        }
    }

    input.click()
}

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

import { ScatteredSpheres, sphereControls } from "./components/BackgroundElements"

// ================================
// 3D Components
// ================================
import { Card } from "./components/Card"

// ================================
// Scene Setup
// ================================

function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4)
}

// Interface for our controls
interface Controls {
    bgColor: string
    sphereColor: string
    sphereOpacity: number
    sphereCount: number
    sphereMinSize: number
    sphereMaxSize: number
    cardWidth: number
    cardHeight: number
    cardDepth: number
    devMode: boolean
    lockCamera: boolean
    enableEffect: boolean
    grainIntensity: number
    grainScale: number
}

function Scene({ controls }: { controls: Controls }) {
    // Destructure only the controls we need
    const { cardWidth, cardHeight, cardDepth, devMode, lockCamera } = controls
    const [targetRotation, setTargetRotation] = useState(0)
    const [currentRotation, setCurrentRotation] = useState(0)
    const groupRef = useRef<THREE.Group>(null)
    const scrollTimeout = useRef<number | null>(null) // Using number | null type for setTimeout return value

    // Card data with new color scheme    // Handle scroll for card rotation
    useEffect(() => {
        // Only handle scroll for card rotation if not in dev mode
        if (devMode) return

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
    }, [devMode])

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
    }) // Calculate positions in a circle with proper spacing

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[0, 5, 5]} intensity={1} />
            <hemisphereLight
                args={["#ffffff", "#0000ff", 0.3]} // Sky color, ground color, intensity
                position={[0, 20, 0]}
            />
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
                count={controls.sphereCount}
                minRadius={8}
                maxRadius={20}
                minSize={controls.sphereMinSize}
                maxSize={controls.sphereMaxSize}
                color={controls.sphereColor}
                opacity={controls.sphereOpacity}
            />
            <group ref={groupRef} position={[0, 0, -5]}>
                {cards.map((card, index) => {
                    // Distribute cards in a circle
                    const angle = (index / cards.length) * Math.PI * 2
                    const radius = 8 // Fixed radius for the circle
                    const x = Math.sin(angle) * radius
                    const z = Math.cos(angle) * radius

                    return (
                        <Card
                            key={card.id}
                            index={index}
                            position={[x, 0, z]}
                            rotation={[0, Math.PI + angle, 0]} // Face the center
                            color={card.color}
                            hoverColor={card.hoverColor}
                            title={card.title}
                            description={card.description}
                            width={cardWidth}
                            height={cardHeight}
                            depth={cardDepth}
                        />
                    )
                })}
            </group>{" "}
            <OrbitControls
                enablePan={devMode}
                enableZoom={devMode}
                enableRotate={devMode}
                enableDamping={true}
                enabled={!lockCamera}
                target={devMode ? undefined : [0, 0, -5]}
            />
        </>
    )
}

// ================================
// Main App Component
// ================================

export default function App() {
    // State to manage control values for download/upload
    const [, setControlValues] = useState<Partial<Controls>>({})

    const controls = useControls({
        // Dev Mode section
        "Dev Mode": folder(
            {
                devMode: { value: false, label: "Enable Dev Mode" },
                lockCamera: { value: false, label: "Lock Camera" },
            },
            { collapsed: false }
        ),

        // Background section
        Background: folder(
            {
                bgColor: { value: "#ffffff", label: "Color" },
            },
            { collapsed: true }
        ),

        // Spheres section
        Spheres: folder(sphereControls, { collapsed: true }), // Cards section
        Cards: folder(
            {
                cardWidth: { value: 5, min: 1, max: 5, step: 0.1, label: "Width" },
                cardHeight: { value: 5, min: 1, max: 5, step: 0.1, label: "Height" },
                cardDepth: { value: 0.1, min: 0.1, max: 1, step: 0.1, label: "Depth" },
            },
            { collapsed: true }
        ), // Grain Effect section
        "Grain Effect": folder(
            {
                enableEffect: { value: false, label: "Enable Effect" },
                grainIntensity: {
                    value: 0.15,
                    min: 0,
                    max: 0.5,
                    step: 0.01,
                    label: "Grain Intensity",
                },
                grainScale: { value: 300, min: 50, max: 1000, step: 10, label: "Grain Scale" },
            },
            { collapsed: false }
        ),

        // Settings Management section
        Settings: folder(
            {
                "Download Settings": button(() => {
                    downloadSettings(controls)
                }),
                "Upload Settings": button(() => {
                    uploadSettings((newSettings) => {
                        setControlValues(newSettings)
                        // Force refresh by updating each control value
                        window.location.reload()
                    })
                }),
            },
            { collapsed: true }
        ),
    }) as unknown as Controls
    const { width, height } = useWindowSize()
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)

    // Update camera aspect ratio on window resize
    useEffect(() => {
        if (!cameraRef.current) return
        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()
    }, [width, height])

    console.log(cameraRef) // Camera configuration - positioned to view the cards
    const cameraConfig = {
        position: controls.devMode
            ? ([0, 5, 10] as [number, number, number])
            : ([0, 0, 0] as [number, number, number]),
        fov: 55,
        aspect: width / height,
        near: 0.1,
        far: 1000,
        up: [0, 1, 0] as [number, number, number],
    } // Prevent default scroll behavior when not in dev mode
    useEffect(() => {
        if (controls.devMode) return // Allow normal scroll behavior in dev mode

        const preventDefault = (e: WheelEvent) => {
            if (e.ctrlKey) return // Allow zoom with ctrl+scroll
            e.preventDefault()
        }

        window.addEventListener("wheel", preventDefault, { passive: false })
        return () => window.removeEventListener("wheel", preventDefault)
    }, [controls.devMode])

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}>
            <Canvas
                gl={{ antialias: true }}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    backgroundColor: controls.bgColor,
                }}
                camera={cameraConfig}
                onCreated={({ camera }) => {
                    cameraRef.current = camera as THREE.PerspectiveCamera
                }}>
                <Environment preset="city" />
                <Scene controls={controls} /> {/* Test the post-processing effect */}
                {controls.enableEffect && (
                    <EffectComposer>
                        <RisographEffect
                            grainIntensity={controls.grainIntensity}
                            grainScale={controls.grainScale}
                        />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    )
}
