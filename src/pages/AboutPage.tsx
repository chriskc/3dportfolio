import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">About Me</h1>
          <p className="text-muted-foreground mb-4">
            I'm a passionate professional with expertise spanning architecture, interior design, BIM management, and web development. My interdisciplinary approach allows me to bridge the gap between traditional design disciplines and digital technologies.
          </p>
          <p className="text-muted-foreground mb-4">
            With a background in architecture and a growing expertise in web development, I bring a unique perspective to projects that combines spatial thinking with digital innovation. I believe in creating thoughtful, user-centered experiences whether in physical or digital spaces.
          </p>
          <p className="text-muted-foreground mb-6">
            My goal is to deliver polished, memorable solutions that showcase attention to detail and technical skill while solving real-world problems for clients and users.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">Education & Qualifications</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex flex-col">
              <span className="font-medium">Master of Architecture</span>
              <span className="text-sm text-muted-foreground">University Name, 2018-2020</span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">Bachelor of Science in Architectural Studies</span>
              <span className="text-sm text-muted-foreground">University Name, 2014-2018</span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">BIM Professional Certification</span>
              <span className="text-sm text-muted-foreground">Certification Body, 2021</span>
            </li>
          </ul>
          
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get In Touch
          </Link>
        </div>
        
        <div className="space-y-8">
          <div className="aspect-square bg-muted rounded-md">
            {/* Placeholder for profile image */}
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Profile Image
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Skills & Expertise</h2>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Architecture & Design</span>
                  <span>90%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Interior Design</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>BIM Management</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Web Development</span>
                  <span>70%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>3D Visualization</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Professional Experience</h2>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <h3 className="font-medium">Senior Architectural Designer</h3>
              <p className="text-sm text-muted-foreground">Architecture Firm Name</p>
              <p className="text-sm text-muted-foreground">2020 - Present</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-muted-foreground mb-2">
                Lead designer for commercial and residential projects, responsible for client communication, design development, and project coordination.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Successfully delivered over 15 projects ranging from residential renovations to mid-sized commercial developments</li>
                <li>Implemented BIM standards and workflows, improving team efficiency by 30%</li>
                <li>Collaborated with engineers and contractors to ensure design integrity throughout construction</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <h3 className="font-medium">Architectural Designer</h3>
              <p className="text-sm text-muted-foreground">Previous Firm Name</p>
              <p className="text-sm text-muted-foreground">2018 - 2020</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-muted-foreground mb-2">
                Contributed to design development and documentation for various residential and small commercial projects.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Assisted in the design of award-winning residential project</li>
                <li>Developed construction documentation sets for multiple projects</li>
                <li>Created photorealistic renderings and visualization materials for client presentations</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <h3 className="font-medium">Freelance Web Developer</h3>
              <p className="text-sm text-muted-foreground">Self-employed</p>
              <p className="text-sm text-muted-foreground">2019 - Present</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-muted-foreground mb-2">
                Develop custom websites and interactive experiences for clients in the architecture and design industry.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Created portfolio websites for architects and designers</li>
                <li>Developed interactive 3D showcases for architectural products</li>
                <li>Implemented responsive, accessible, and performance-optimized web experiences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
