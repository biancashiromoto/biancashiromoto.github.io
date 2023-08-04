import { useEffect, useState } from 'react';
import { fetchAPI } from '../../helpers/fetchAPI';
import { repos_URL } from '../../helpers/info';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarouselItem } from 'react-bootstrap';

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetchAPI(repos_URL);
      const filteredProjects = response.filter((project) => !project.name.includes('biancashiromoto'));
      const sortedProjects = filteredProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setProjects(sortedProjects);
      console.log(sortedProjects);
    }
    fetchProjects();
  }, []);

  return (
    <Carousel>
      {projects.map((project) => (
        <CarouselItem key={project.id} className='text-center'>
          <h4>{project.name}</h4>
          <img
            className='d-block w-50 mx-auto'
            src={ `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.png` }
            alt={ `Imagem do projeto ${project.name}` }
          />
        </CarouselItem>
      ))}
    </Carousel>
  )
};

export default ProjectsCarousel;
