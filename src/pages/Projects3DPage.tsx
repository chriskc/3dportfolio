// Update src/pages/Projects3DPage.tsx
import { Suspense, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProjectsScene from "../3d/ProjectsScene"
import Loader from "../components/Loader"
import { Project } from "../types"

const Projects3DPage = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                console.log("Fetching projects from Firebase...")
                // Temporarily disable Firebase to test with sample data
                // const querySnapshot = await getDocs(collection(db, 'projects'));
                // const projectsData = querySnapshot.docs.map(doc => ({
                //   id: doc.id,
                //   ...doc.data()
                // })) as Project[];

                // Use sample data directly for now
                const sampleProjects = getSampleProjects()
                console.log("Using sample projects:", sampleProjects)
                setProjects(sampleProjects)
            } catch (err) {
                console.error("Error fetching projects:", err)
                setError("Failed to load projects. Using sample data instead.")
                setProjects(getSampleProjects())
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    const handleProjectSelect = (projectId: string) => {
        console.log("Project selected:", projectId)
        navigate(`/projects/${projectId}`)
    }

    if (loading) {
        console.log("Loading...")
        return <Loader />
    }

    if (error) {
        console.log("Error state:", error)
    }

    console.log("Rendering ProjectsScene with projects:", projects)
    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Suspense fallback={<div>Loading 3D scene...</div>}>
                <ProjectsScene projects={projects} onProjectSelect={handleProjectSelect} />
            </Suspense>
        </div>
    )
}

// Fallback sample projects
const getSampleProjects = (): Project[] => [
    {
        id: "1",
        title: "Modern Residence",
        category: "Architecture",
        description: "A contemporary single-family home with sustainable design elements.",
    },
    {
        id: "2",
        title: "Urban Office",
        category: "Interior Design",
        description: "Modern workspace with open floor plan and natural lighting.",
    },
    {
        id: "3",
        title: "Retail Space",
        category: "BIM Project",
        description: "Commercial retail space with parametric design elements.",
    },
    {
        id: "4",
        title: "Luxury Villa",
        category: "Architecture",
        description: "High-end residential property with modern amenities.",
    },
    {
        id: "5",
        title: "Co-working Space",
        category: "Interior Design",
        description: "Flexible workspace with collaborative areas.",
    },
]

export default Projects3DPage
