import { ReactNode, useEffect, useState } from "react";
import "./index.scss";
import Information from "./helpers/classes/Information";
import Utils from "./helpers/classes/Utils";
import { dataTestIds } from "./helpers/dataTestIds";
import { Link } from "./components/Link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ariaLabel } from "./helpers/ariaLabel";
import { Button } from "./components/Button";

function App() {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  const utils = new Utils();

  const [isLanguagePortuguese, setIsLanguagePortuguese] = useState<boolean>(utils.isLanguagePortuguese());
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    window.onload = () => {
      setFadeIn(true);
    };
  }, []);
  
  const renderHeader = (): ReactNode => {
    return (
      <header className="mt-2">
        <Button.Root
          className="text-sm hover:bg-slate-800 p-3 rounded-full"
          onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel}
        </Button.Root>
      </header>
    );
  }

  const renderGreetingMessage = (): ReactNode => {
    return (
      <div className="grid gap-1 mt-2 grid-cols-2 grid-rows-3 items-center">
        {ptInformation._greetingMessage.map((paragraph, index) => {
          if (index === 0) {
            return (
                <div className="flex justify-center col-span-2">
                  <p key={index} className="">{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
                </div>
            );
          }
          if (paragraph === ptInformation._name) {
            return (
              <h1 key={index} className="text-3xl text-left ml-1">{paragraph}</h1>
            );
          }
          return (
            <p className={index === 3 ? "col-span-2" : ""} key={index}>{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
          );
        })}
      </div>
    )
  }

  const renderProfilePicture = (): ReactNode => {
    return (
      <img
        alt={isLanguagePortuguese ? ptInformation._profilePictureAltText : enInformation._profilePictureAltText}
        className="rounded-full w-48 mt-5"
        src={ptInformation._profilePictureURL}
      />
    );
  }

  const renderLinksContainer = (): ReactNode => {
    return (
      <div className="flex gap-10 text-5xl">
        <Link.Root
          ariaLabel={ariaLabel.links.github}
          href={ptInformation._githubLink}
          testid={dataTestIds.links.github}
        >
          <FaGithub />
        </Link.Root>
        <Link.Root
          ariaLabel={ariaLabel.links.linkedin}
          href={ptInformation._linkedinLink}
          testid={dataTestIds.links.linkedin}
        >
          <FaLinkedin />
        </Link.Root>
      </div>
    );
  }

  const renderAboutMe = (): ReactNode => {
    return (
      <article className="about-me__container h-screen flex flex-col items-center justify-center gap-5 leading-10">
        {ptInformation._aboutMeText.map((paragraph, index) => (
          <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._aboutMeText[index]}</p>
        ))}
      </article>
    )
  }

  return (
    <div className={`body bg-[#040504] text-white h-screen text-center mx-10 ${fadeIn ? "fade-in" : ""}`}>
      {renderHeader()}
      <main className="h-screen flex flex-col gap-10 items-center">
        {renderGreetingMessage()}
        {renderProfilePicture()}
        {renderLinksContainer()}
      </main>
      {renderAboutMe()}
    </div>
  )
}

export default App;
