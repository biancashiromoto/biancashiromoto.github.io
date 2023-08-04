import './Projects.css';
import ProjectsCarousel from '../../components/ProjectsCarousel/ProjectsCarousel';
import ReturnButton from '../../components/ReturnButton/ReturnButton';

const Projects = () => {
  return (
    <div className='projects-container text-center p-3 mx-auto vh-sm-100'>
      <ReturnButton />
      <ProjectsCarousel />
    </div>
  )
}

export default Projects;
