import { useEffect, useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { repos_URL } from "../../info";
import './Projects.css';
import ProjectCard from "../../components/ProjectCard/ProjectCard";

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
        <ProjectCard
          props={ project }
          key={ project.id }
        />
      ))}
    </div>
  )
}

export default Projects;
