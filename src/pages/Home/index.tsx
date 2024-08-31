import { ReactNode } from "react";
import { LinksContainer } from "../../components/LinksContainer/index";
import ReactTypingEffect from 'react-typing-effect';
import { ScrollButton } from "../../components/ScrollButton";
import { useCounterStore } from "../../state/store";
import { altText, ariaLabel } from "../../helpers/acessibility";
import Timeline from "../../components/Timeline";
import { Button } from "../../components/Button";
import { dataTestIds } from "../../helpers/dataTestIds";
import Utils from "../../helpers/classes/Utils";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

export const Home = () => {
  const { 
    isLanguagePortuguese,
    screenWidth,
    enInformation,
    ptInformation
  } = useCounterStore();
  const { scrollToTop } = new Utils();
  
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
        {renderScrollButton("down", "#timeline")}
      </article>
      <Timeline />
      <Button.Root
      ariaLabel={ariaLabel(isLanguagePortuguese).button.scrollUp}
      // TODO remover estilização com tailwind
      className={`scroll timeline__scroll--button`}
      testId={dataTestIds.buttons.scrollUp}
      onClick={() => scrollToTop()}
    >
      <FaRegArrowAltCircleUp />
    </Button.Root>
    </div>
  )
}