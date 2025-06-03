// Update src/3d/ProjectsScene.tsx
import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Project } from "../types"
import ProjectCard from "./ProjectCard"

interface ProjectsSceneProps {
    projects: Project[]
    onProjectSelect: (projectId: string) => void
}

const ProjectsScene: React.FC<ProjectsSceneProps> = ({ projects, onProjectSelect }) => {
    console.log("ProjectsScene rendering with projects:", projects.length)

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Canvas
                shadows
                camera={{ position: [0, 5, 15], fov: 50 }}
                style={{ background: "#f0f0f0" }}>
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />

                <group position={[0, 0, 0]}>
                    {projects.map((project, index) => {
                        // Position cards in a circle
                        const angle = (index / projects.length) * Math.PI * 2
                        const radius = 5 // Increased radius for better spacing
                        const x = Math.sin(angle) * radius
                        const z = Math.cos(angle) * radius

                        console.log(`Positioning project ${project.id} at (${x}, 0, ${z})`)

                        return (
                            <ProjectCard
                                key={project.id}
                                position={[x, 0, z]}
                                title={project.title}
                                description={project.description}
                                category={project.category}
                                onClick={() => onProjectSelect(project.id)}
                            />
                        )
                    })}
                </group>

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={5}
                    maxDistance={200}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.5}
                />

                <Environment preset="city" />

                {/* Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                    <planeGeometry args={[30, 30]} />
                    <meshStandardMaterial color="#e0e0e0" />
                </mesh>

                {/* Grid helper */}
                <gridHelper args={[30, 30, "#999", "#ccc"]} position={[0, -1.99, 0]} />
            </Canvas>
        </div>
    )
}

export default ProjectsScene
