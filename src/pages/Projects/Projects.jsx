import { useEffect, useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { repos_URL } from "../../info";
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () =>{
      const newProjects = await fetchAPI(repos_URL);
      setProjects(newProjects);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
   console.log(projects);
  }, [projects]);

  return (
    <div className="projects--container">
      <h2>Projects</h2>
      {projects && projects.map((project) => (
        <div
          key={ project.id }
          className={ `project-card ${project.id}-card`}
        >
          <a
            href={ project.html_url }
            target="_blank"
            rel="noreferrer"
          >
            { project.name }
          </a>
          {project.homepage &&
            <a
              href={ project.homepage }
              target="_blank"
              rel="noreferrer"
            >
              Deploy
            </a>}
        </div>
      ))}
    </div>
  )
}

export default Projects;
