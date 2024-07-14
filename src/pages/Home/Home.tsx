import { ReactNode } from "react";
import Information from "../../helpers/classes/Information";
import { LinksContainer } from "../../components/LinksContainer/LinksContainer";
import { HomeProps } from "./Home.types";
import "../../index.scss";
import ReactTypingEffect from 'react-typing-effect';
import { ScrollButton } from "../../components/ScrollButton/ScrollButton";

export const Home = ({ isLanguagePortuguese, screenWidth }: HomeProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  
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
                      {paragraph.split('').map((char, i) => {
                        const key = `${i}`;
                        return (
                          <span
                            className="bg-transparent text-lg ml-1 font-bold"
                            key={key}
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
        className="rounded-full w-36 mt-5"
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

  const renderScrollButton = (direction: string, screenWidth: number, href: string): ReactNode => {
    return <ScrollButton
      className={`button__scroll-${direction}`}
      direction={direction}
      href={href}
      screenWidth={screenWidth}
    />
  }
  
  return (
    <div className={`home flex justify-evenly ${screenWidth < 768 ? "flex-col" : ""}`} id="home-start">
      <main className="h-screen flex flex-col gap-10 items-center mt-14 relative">
        {renderGreetingMessage()}
        {renderProfilePicture()}
        {renderLinksContainer()}
        {renderScrollButton("down", screenWidth, "#about-me__container")}
      </main>
      <article className="about-me__container text-xs h-screen flex flex-col items-center justify-center gap-20 leading-10 relative" id="about-me__container">
        {renderScrollButton("up", screenWidth, "#home-start")}
        {renderAboutMe()}
      </article>
    </div>
  )
}