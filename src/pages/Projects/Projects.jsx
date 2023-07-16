import { useEffect, useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { repos_URL } from "../../info";

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
    <div>
      <h2>Projects</h2>
      <ul>
      {projects && projects.map((project) => (
        <li key={ project.id }>
          <a
            href={ project.html_url }
            target="_blank"
            rel="noreferrer"
          >
            { project.name }
          </a>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Projects;
