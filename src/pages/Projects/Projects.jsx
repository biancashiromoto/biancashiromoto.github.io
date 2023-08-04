import { useState, useEffect } from 'react';
import { repos_URL } from '../../helpers/info';
import { fetchAPI } from '../../helpers/fetchAPI';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetchAPI(repos_URL);
      const filteredProjects = response.filter((project) => !project.name.includes('biancashiromoto'));
      const sortedProjects = filteredProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setProjects(sortedProjects);
    }
    fetchProjects();
  }, []);

  return (
    <article className='projects-container text-center p-3 vh-100'>
      <Link
        className='home-link'
        to='/'
      />
      <h2>Projects</h2>
      {projects.map((project) => (
        <Card key={project.id} props={ project } />
      ))}
    </article>
  )
}

export default Projects;
