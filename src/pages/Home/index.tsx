import { ReactNode } from "react";
import Information from "../../helpers/classes/Information";
import { LinksContainer } from "../../components/LinksContainer/index";
import ReactTypingEffect from 'react-typing-effect';
import { ScrollButton } from "../../components/ScrollButton";
import { useCounterStore } from "../../state/store";

export const Home = () => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");

  const { 
    isLanguagePortuguese,
    screenWidth,
  } = useCounterStore();
  
  const renderGreetingMessage = (): ReactNode => {
    return (
      <div className="text-sm grid gap-1 mt-2 grid-cols-2 grid-rows-3 items-center">
        {ptInformation._greetingMessage.map((paragraph, index) => {
          if (index === 0) {
            return (
                <div className="flex justify-center items-center col-span-2">
                  <p key={index} className="">{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
                </div>
            );
          }
          if (paragraph === ptInformation._name) {
            return (
              <ReactTypingEffect
                className="typer flex items-center text-xl h-8 text-nowrap w-8 leading-6 ml-1"
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
            <p className={`${index === 3 ? "col-span-2" : ""} flex justify-end`} key={index}>{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
          );
        })}
      </div>
    )
  }

  const renderProfilePicture = (): ReactNode => {
    return (
      <img
        alt={isLanguagePortuguese ? ptInformation._profilePictureAltText : enInformation._profilePictureAltText}
        className="pages__home--profile-picture"
        src={ptInformation._profilePictureURL}
      />
    );
  }

  const renderLinksContainer = (): ReactNode => {
    return <LinksContainer isLanguagePortuguese={isLanguagePortuguese} />
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

  const renderScrollButton = (direction: string, href: string): ReactNode => {
    return (
      <ScrollButton
        direction={direction}
        href={href}
        screenWidth={screenWidth}
      />
    )
  }
  
  return (
    <div className="pages__home" id="home-start">
      <main>
        {renderGreetingMessage()}
        {renderProfilePicture()}
        {renderLinksContainer()}
        {renderScrollButton("down", "#about-me__container")}
      </main>
      <article className="pages__home--about-me" id="about-me__container">
        {renderScrollButton("up", "#home-start")}
        {renderAboutMe()}
      </article>
    </div>
  )
}