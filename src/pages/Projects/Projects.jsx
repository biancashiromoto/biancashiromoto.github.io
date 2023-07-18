import { useEffect, useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { repos_URL } from "../../helpers/info";
import './Projects.css';
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ReturnButton from "../../components/ReturnButton/ReturnButton";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await fetchData(repos_URL);
      const filteredProjects = fetchedProjects
        .filter((project) => !project.name.includes('biancashiromoto'));
      const sortedProjects = filteredProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setProjects(sortedProjects);
    }
    fetchProjects();
  }, []);

  const fetchData = async (URL) =>{
    const data = await fetchAPI(URL);
    return data;
  }

  return (
    <div className="projects-page">
      <ReturnButton />
      <div className="projects--container">
        <h2>Projects</h2>
        {projects && projects.map((project) => (
            <ProjectCard
              props={ project }
              key={ project.id }
            />
        ))}
      </div>
    </div>
  )
}

export default Projects;
