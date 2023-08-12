import { info_en, info_pt } from '../../helpers/info';
import ProjectsCarousel from '../../components/ProjectsCarousel/ProjectsCarousel';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { useContext, useEffect } from 'react';
import { context } from '../../context/context';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Loading from '../../components/Loading/Loading';

const Projects = () => {
  const { isInEnglish, isLoading, setIsLoading } = useContext(context);
  const [content, obs1, obs2] = info_pt.projects.content;

  useEffect(() => setIsLoading(false), []);

  return (
    <div className='projects-container text-center p-3 mx-auto'>
      {isLoading ? <Loading /> : (
        <>
          <ReturnButton />
          <LanguageToggle />
          <h2>{isInEnglish ? 'Projects' : 'Projetos'}</h2>
          {isInEnglish ? (
            info_en.projects.content.map((paragraph, index) => (
              <p className='fs-6' key={ index }>{paragraph}</p>
            ))
          ) : (
            <>
              <p className='fs-6'>{content}</p>
              <span className='observation small'>{obs1}</span>
              <br/>
              <span className='observation small'>{obs2}</span>
            </>
          )}
          <ProjectsCarousel />
        </>
      )}
    </div>
  )
}

export default Projects;
