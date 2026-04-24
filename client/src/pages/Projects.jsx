import ProjectCard from "../components/ProjectCard"
import "../styles/projects.css";

function Projects() {
    const placeholders = ["https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg",];

    return (
        <div className="projects">
            <h1>My Projects</h1>

            <div className="projects-grid">
                <ProjectCard
                    title="Stevies Buffet"
                    description="Stevies Buffet serves up all-you-can-eat pizza, comfort food, and a fresh sald bar at a price that works for families, teams, and big appetites."
                    image={placeholders[0]}
                    demo="http://stevies-buffet-9gxt.vercel.app/menu"
                    github="https://github.com/widner0623/stevies-buffet.git"
                    tags={["React", "Node.js", "Express", "MongoDB", "Render"]}
                />
                {/* <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholders}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "CORS"]}
                />
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholders}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "SQL", "JavaScript"]}
                />
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholders}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "SQL", "JavaScript"]}
                />
                <ProjectCard
                    title="Sample Project"
                    description="Full Stack website sample description"
                    image={placeholders}
                    demo="https://google.com"
                    github="https://github.com"
                    tags={["React", "Node", "Express", "SQL", "JavaScript"]}
                /> */}
                
            </div>
        </div>
    );
}

export default Projects;