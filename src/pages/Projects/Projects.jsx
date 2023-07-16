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

  return (
    <div>
      <h2>Projects</h2>
    </div>
  )
}

export default Projects;
