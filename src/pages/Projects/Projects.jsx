import './Projects.css';
import { info_en, info_pt } from '../../helpers/info';
import ProjectsCarousel from '../../components/ProjectsCarousel/ProjectsCarousel';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { useContext } from 'react';
import { context } from '../../context/context';

const Projects = () => {
  const { isInEnglish } = useContext(context);
  const [content, obs] = info_pt.projects.content;
  return (
    <div className='projects-container text-center p-3 mx-auto vh-100'>
      <ReturnButton />
      <h2>{isInEnglish ? 'Projects' : 'Projetos'}</h2>
      {isInEnglish ? (
        info_en.projects.content.map((paragraph, index) => (
          <p className='fs-6' key={ index }>{paragraph}</p>
        ))
      ) : (
        <>
          <p className='fs-6'>{content}</p>
          <span className='observation small'>{obs}</span>
        </>
      )}
      <ProjectsCarousel />
    </div>
  )
}

export default Projects;
