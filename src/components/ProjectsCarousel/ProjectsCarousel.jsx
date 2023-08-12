import { useEffect, useState } from 'react';
import { fetchAPI } from '../../helpers/fetchAPI';
import { repos_URL } from '../../helpers/info';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarouselItem } from 'react-bootstrap';
import './ProjectsCarousel.css';
import { formatTitle } from '../../helpers/formatTitle';

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
    <Carousel className='carousel'>
      {projects.map((project) => (
        <CarouselItem key={project.id} className='text-center vh-auto py-4'>
          <div className='project-title'>
            <a
              className='repo-link'
              href={project.html_url}
              target='_blank' rel="noreferrer"
            >
            </a>
            <h4>
            <a
              href={project.homepage}
              target='_blank'
              rel="noreferrer"
              className='text-decoration-none text-light'
            >
              {formatTitle(project.name)}
            </a>
            </h4>
          </div>
          <img
            className='d-block mx-auto project-image'
            src={ `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.png` }
            alt={ `Imagem do projeto ${project.name}` }
          />
          <p className='project-description small'>{project.description}</p>
        </CarouselItem>
      ))}
    </Carousel>
  )
};

export default ProjectsCarousel;
