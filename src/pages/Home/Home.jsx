import { useContext, useEffect } from 'react';
import { info_en, info_pt } from "../../helpers/info";
import { Link } from 'react-router-dom';
import './Home.css';
import { context } from '../../context/context';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const { isInEnglish, isLoading, setIsLoading } = useContext(context);

  useEffect(() => setIsLoading(false), []);

  return (
    <div className='text-center'>
      <LanguageToggle props={isInEnglish ? info_pt.languageButton.content[0] : info_en.languageButton.content[0]}/>
      <div className='home-container d-lg-flex px-3 mx-auto'>
        {isLoading ? <Loading /> : (
          <>
            <main className='vh-100 w-100 w-lg-50 py-lg-5 d-lg-flex flex-column gap-2'>
              <article className='intro-container d-flex flex-column align-items-center h-100 gap-lg-3 pt-0 pt-lg-5'>
                <div className='col-md-6'>
                  <img
                    className='img-fluid w-50 w-md-50 my-5 rounded-circle profile-pic'
                    src={ info_pt.intro.imgSrc }
                    alt={ isInEnglish ? info_en.intro.imgAlt : info_pt.intro.imgAlt }
                  />
                </div>
                <h2>{ isInEnglish ? info_en.intro.title : info_pt.intro.title }</h2>
                <span>{ isInEnglish ? info_en.intro.content : info_pt.intro.content }</span>
                <div className='links-container d-flex gap-4 pt-4'>
                  <a
                    href='https://github.com/biancashiromoto'
                    target='_blank'
                    rel="noreferrer"
                    className='github-link'
                  >
                    <span className='visually-hidden'>GitHub</span>
                  </a>
                  <a
                    href='https://www.linkedin.com/in/bshiromoto/'
                    target='_blank'
                    rel="noreferrer"
                    className='linkedin-link'
                  >
                    <span className='visually-hidden'>Linkedin</span>
                  </a>
                  <Link
                    className='projects-link'
                    to='/projects'
                  />
                  <Link
                    className='certificates-link'
                    to='/certificates'
                  />
                </div>
                <div className='image-container d-lg-none'></div>
              </article>
            </main>
            <article className='aboutme-container d-flex flex-column justify-content-center vh-100 w-100 w-lg-50 px-lg-3'>
              <h2 className='pb-3'>{ isInEnglish ? info_en.aboutMe.title : info_pt.aboutMe.title }</h2>
              {isInEnglish ? (
                info_en.aboutMe.content.map((paragraph, index) => (
                  <p key={ index }>{ paragraph }</p>
                ))
              ) : (
                info_pt.aboutMe.content.map((paragraph, index) => (
                  <p key={ index }>{ paragraph }</p>
                ))
              )}
            </article>
          </>
        )}
      </div>
    </div>
  )
}

export default Home;
