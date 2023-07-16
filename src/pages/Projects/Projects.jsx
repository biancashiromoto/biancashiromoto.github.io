import { useEffect, useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { repos_URL } from "../../info";
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetchData(repos_URL);
      setProjects(data);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
   console.log(projects);

  }, [projects]);

  const fetchData = async (URL) =>{
    const newProjects = await fetchAPI(URL);
    return newProjects;
  }

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
            {project.description && (
              <p>{ project.description }</p>
            )}
            <ul>
              {project.topics && project.topics.map((topic, index) => (
                <li key={ index }>{ topic }</li>
              ))}
            </ul>
        </div>
      ))}
    </div>
  )
}

export default Projects;
