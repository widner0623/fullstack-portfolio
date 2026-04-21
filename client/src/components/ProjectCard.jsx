function ProjectCard({ title, description, image, github, demo, tags }) {
    return (
        <div className="project-card">
            <div className="project-image">
                <img src={image} alt={title} />
                
                <div className="project-overlay">
                    <div className="project-buttons">
                        <a href={demo} target="_blank" rel="noreferrer">Live Demo</a>
                        <a href={github} target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                </div>
            </div>

            <div className="project-content">
                <h3>{title}</h3>
                <p>{description}</p>

                {/* Tech Tags */}
                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ProjectCard;