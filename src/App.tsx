import { useState } from "react";
import "./index.css";
import Information from "./helpers/classes/Information";
import Utils from "./helpers/classes/Utils";
import { dataTestIds } from "./helpers/dataTestIds";
import { Link } from "./components/Link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ariaLabel } from "./helpers/ariaLabel";

function App() {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  const utils = new Utils();

  const [isLanguagePortuguese, setIsLanguagePortuguese] = useState<boolean>(utils.isLanguagePortuguese());
  
  return (
    <>
      <header>
        <button
          data-testid={dataTestIds.buttons.toggleModeButton}
          type="button"
          onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
        >
          {isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel}
        </button>
      </header>
      <main>
        {ptInformation._greetingMessage.map((paragraph, index) => {
          if (paragraph === ptInformation._name) {
            return (<h1 key={index}>{paragraph}</h1>);
          }
          return (
            <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
          );
        })}
        <img
          src={ptInformation._profilePictureURL}
          alt={isLanguagePortuguese ? ptInformation._profilePictureAltText : enInformation._profilePictureAltText}
        />
        <div>
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
      </main>
      <article>
        {ptInformation._aboutMeText.map((paragraph, index) => (
          <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._aboutMeText[index]}</p>
        ))}
      </article>
    </>
  )
}

export default App;
