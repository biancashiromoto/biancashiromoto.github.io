import { useEffect, useState } from 'react';
import { fetchAPI } from '../../helpers/fetchAPI';
import { repos_URL } from '../../helpers/info';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarouselItem } from 'react-bootstrap';
import './ProjectsCarousel.css';

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetchAPI(repos_URL);
      const projectsWithScreenshots = [];

      for (const project of response) {
        try {
          const screenshotResponse = await fetch(`https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.png`);

          if (screenshotResponse.status === 200) {
            projectsWithScreenshots.push(project);
          }
        } catch (error) {
          console.error(`${project.name} does not provide screenshot images`);
        }
      }
      const sortedProjects = projectsWithScreenshots.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setProjects(sortedProjects);
    }
    fetchProjects();
  }, []);

  return (
    <Carousel>
      {projects.map((project) => (
        <CarouselItem key={project.id} className='text-center vh-60'>
          <h4>{project.name}</h4>
          <img
            className='d-block mx-auto project-image'
            src={ `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.png` }
            alt={ `Imagem do projeto ${project.name}` }
          />
          <p>{project.description}</p>
          {project.homepage && (
            <a href={project.homepage} target='_blank' rel="noreferrer">Deploy</a>
          )}
        </CarouselItem>
      ))}
    </Carousel>
  )
};

export default ProjectsCarousel;
