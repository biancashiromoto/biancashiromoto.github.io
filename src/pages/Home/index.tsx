import { ReactNode } from "react";
import { LinksContainer } from "../../components/LinksContainer/index";
import ReactTypingEffect from 'react-typing-effect';
import { useCounterStore } from "../../state/store";
import { altText } from "../../helpers/acessibility";
import Timeline from "../../components/Timeline";
import { ScrollButtonWrapper } from "../../components/ScrollButton/ScrollButtonWrapper";

export const Home = () => {
  const { 
    isLanguagePortuguese,
    enInformation,
    ptInformation
  } = useCounterStore();
  
  const renderGreetingMessage = (): ReactNode => {
    return (
      <div className="pages__home--greeting-message">
        {ptInformation._greetingMessage.map((paragraph, index) => {
          if (index === 0) {
            return (
                <div className="paragraph">
                  <p key={index} className="">{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
                </div>
            );
          }
          if (paragraph === ptInformation._name) {
            return (
              <ReactTypingEffect
                className="typer"
                data-testid="typer"
                displayTextRenderer={(paragraph) => {
                  return (
                    <h1>
                      {paragraph.split('').map((char, index) => {
                        return (
                          <span
                            className="bg-transparent text-lg ml-1 font-bold"
                            key={index}
                          >{char}</span>
                        );
                      })}
                    </h1>
                  )
                }}
                eraseSpeed={50}
                speed={100}
                text={[ptInformation._name]}
                typingDelay={100}
              />
            );
          }
          return (
            <p className={`pages__home--paragraph ${index === 3 ? "col-span-2" : ""} flex justify-end`} key={index}>{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
          );
        })}
      </div>
    )
  }

  const renderProfilePicture = (): ReactNode => {
    return (
      <img
        alt={altText(isLanguagePortuguese).home.profilePicture}
        className="pages__home--profile-picture"
        src={ptInformation._profilePictureURL}
      />
    );
  }

  const renderLinksContainer = (): ReactNode => {
    return <LinksContainer />
  }

  const renderAboutMe = (): ReactNode => {
    return (
      <div>
        {ptInformation._aboutMeText.map((paragraph, index) => (
          <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._aboutMeText[index]}</p>
        ))}
      </div>
    )
  }
  
  return (
    <div className="pages__home" id="home-start">
      <main>
        {renderGreetingMessage()}
        {renderProfilePicture()}
        {renderLinksContainer()}
        <ScrollButtonWrapper direction="down" href="#about-me__container" className="pages__home--scroll-button--down" />
      </main>
      <article className="pages__home--about-me" id="about-me__container">
        <ScrollButtonWrapper direction="up" href="#home-start" className="pages__home--scroll-button--up" />
        {renderAboutMe()}
        <ScrollButtonWrapper direction="down" href="#timeline" className="pages__home--scroll-button--timeline" />
      </article>
      <article className="pages__home--timeline" id="timeline__container">
        <Timeline />
      </article>
    </div>
  )
}