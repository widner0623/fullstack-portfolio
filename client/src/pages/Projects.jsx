import ProjectCard from "../components/ProjectCard"
import "../styles/projects.css";

function Projects() {
    const placeholder = "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg";

    return (
        <div className="projects">
            <h1>My Projects</h1>

            <div className="projects-grid">
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholder}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", ]}
                />
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholder}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "CORS"]}
                />
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholder}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "SQL", "JavaScript"]}
                />
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholder}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "SQL", "JavaScript"]}
                />
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholder}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "SQL", "JavaScript"]}
                />
                
            </div>
        </div>
    );
}

export default Projects;