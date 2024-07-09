import { ReactNode, useState } from "react";
import "./index.css";
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
  
  const renderHeader = (): ReactNode => {
    return (<header>
      <Button.Root
        onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
        testId={dataTestIds.buttons.toggleModeButton}
      >
        {isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel}
      </Button.Root>
    </header>);
  }

  const renderGreetingMessage = (): ReactNode => {
    return ptInformation._greetingMessage.map((paragraph, index) => {
      if (paragraph === ptInformation._name) {
        return (<h1 key={index}>{paragraph}</h1>);
      }
      return (
        <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
      );
    })
  }

  const renderProfilePicture = (): ReactNode => {
    return (<img
      src={ptInformation._profilePictureURL}
      alt={isLanguagePortuguese ? ptInformation._profilePictureAltText : enInformation._profilePictureAltText}
    />);
  }

  const renderLinksContainer = (): ReactNode => {
    return (<div>
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
    </div>);
  }

  const renderAboutMe = (): ReactNode => {
    return (
      <article>
        {ptInformation._aboutMeText.map((paragraph, index) => (
          <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._aboutMeText[index]}</p>
        ))}
      </article>
    )
  }

  return (
    <>
      {renderHeader()}
      <main>
        {renderGreetingMessage()}
        {renderProfilePicture()}
      </main>
      {renderLinksContainer()}
      {renderAboutMe()}
    </>
  )
}

export default App;
