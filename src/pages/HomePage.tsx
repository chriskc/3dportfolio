import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import ArchitectureModel from '../3d/ArchitectureModel'

const HomePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div className="flex flex-col">
      {/* Hero Section with 3D Model */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Canvas ref={canvasRef} className="absolute inset-0">
          <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ArchitectureModel />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-background/60 via-background/20 to-background/60">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Architecture & Design Portfolio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
              Showcasing a passion for architecture, interior design, BIM management, and web development
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl">
            A selection of my best work across architecture, interior design, and digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project cards will be dynamically loaded from Firebase */}
          {/* Placeholder for now */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="group relative overflow-hidden rounded-md border border-border/40 bg-card hover:border-primary/20 transition-all">
              <div className="aspect-[16/9] bg-muted" />
              <div className="p-4">
                <h3 className="font-medium mb-1">Project {index}</h3>
                <p className="text-sm text-muted-foreground mb-2">Architecture / Interior Design</p>
                <Link to={`/projects`} className="text-sm font-medium text-primary hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            View All Projects
          </Link>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground max-w-2xl">
              A diverse set of skills across architecture, design, and technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Architecture', description: 'Concept development, space planning, and architectural documentation' },
              { title: 'Interior Design', description: 'Material selection, furniture specification, and visualization' },
              { title: 'BIM Management', description: 'Building Information Modeling, coordination, and standards implementation' },
              { title: 'Web Development', description: 'Frontend development with React, Three.js, and modern frameworks' },
            ].map((skill, index) => (
              <div key={index} className="p-6 bg-card rounded-md border border-border/40 hover:border-primary/20 transition-all">
                <h3 className="font-medium mb-2">{skill.title}</h3>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-lg border border-border/40 bg-muted/10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Let's work together
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Looking for a skilled professional for your next project? Get in touch to discuss how we can collaborate.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
