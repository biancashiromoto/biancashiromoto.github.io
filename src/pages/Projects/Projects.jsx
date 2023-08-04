import './Projects.css';
import { info_en, info_pt } from '../../helpers/info';
import ProjectsCarousel from '../../components/ProjectsCarousel/ProjectsCarousel';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { useContext } from 'react';
import { context } from '../../context/context';

const Projects = () => {
  const { isInEnglish } = useContext(context);
  return (
    <div className='projects-container text-center p-3 mx-auto vh-100'>
      <ReturnButton />
      <h2>{isInEnglish ? 'Projects' : 'Projetos'}</h2>
      {isInEnglish ? (
        info_en.projects.content.map((paragraph, index) => (
          <p key={ index }>{paragraph}</p>
        ))
      ) : (
        info_pt.projects.content.map((paragraph, index) => (
          <p key={ index }>{paragraph}</p>
        ))
      )}
      <ProjectsCarousel />
    </div>
  )
}

export default Projects;
