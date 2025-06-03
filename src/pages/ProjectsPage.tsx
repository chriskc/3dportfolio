import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Placeholder for project data until Firebase integration
const PLACEHOLDER_PROJECTS = [
  {
    id: '1',
    title: 'Modern Residential Complex',
    category: 'Architecture',
    description: 'A contemporary residential development designed with sustainability in mind.',
    tags: ['Residential', 'Sustainable', 'Urban'],
    imageUrl: '',
    year: '2023',
  },
  {
    id: '2',
    title: 'Minimalist Interior Renovation',
    category: 'Interior Design',
    description: 'Complete interior renovation of a downtown apartment with minimalist aesthetics.',
    tags: ['Interior', 'Renovation', 'Minimalist'],
    imageUrl: '',
    year: '2022',
  },
  {
    id: '3',
    title: 'Corporate Office BIM Implementation',
    category: 'BIM Management',
    description: 'Implementation of BIM standards and workflows for a large corporate office project.',
    tags: ['BIM', 'Commercial', 'Standards'],
    imageUrl: '',
    year: '2022',
  },
  {
    id: '4',
    title: 'Interactive 3D Product Showcase',
    category: 'Web Development',
    description: 'Web-based 3D interactive showcase for architectural products.',
    tags: ['Web', '3D', 'Interactive'],
    imageUrl: '',
    year: '2023',
  },
  {
    id: '5',
    title: 'Public Library Design',
    category: 'Architecture',
    description: 'Design proposal for a community public library with focus on accessibility.',
    tags: ['Public', 'Community', 'Accessibility'],
    imageUrl: '',
    year: '2021',
  },
  {
    id: '6',
    title: 'Hospitality Interior Package',
    category: 'Interior Design',
    description: 'Complete interior design package for a boutique hotel.',
    tags: ['Hospitality', 'Luxury', 'Commercial'],
    imageUrl: '',
    year: '2023',
  },
]

type Project = typeof PLACEHOLDER_PROJECTS[0]

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(PLACEHOLDER_PROJECTS)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  const categories = ['All', 'Architecture', 'Interior Design', 'BIM Management', 'Web Development']
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)
    
  // In a real implementation, you would fetch projects from Firebase here
  useEffect(() => {
    // Future Firebase implementation would go here
    // For now, we're using placeholder data
  }, [])
  
  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Explore my portfolio of architecture, interior design, BIM management, and web development projects.
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${selectedCategory === category 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80 text-foreground'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group flex flex-col overflow-hidden rounded-md border border-border/40 bg-card hover:border-primary/20 transition-all">
            <div className="aspect-[16/9] bg-muted w-full" />
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{project.title}</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{project.year}</span>
              </div>
              <span className="text-sm text-primary mb-2">{project.category}</span>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-muted/50 px-2 py-1 rounded-full text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/projects/${project.id}`} className="text-sm font-medium text-primary hover:underline">
                View Project Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
