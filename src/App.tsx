import { useState } from "react";
import "./index.css";
import Information from "./helpers/classes/Information";
import Utils from "./helpers/classes/Utils";
import { dataTestIds } from "./tests/dataTestIds";

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
          <a
            data-testid={dataTestIds.links.linkedin}
            href={ptInformation._linkedinLink}
            rel="noopener"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            data-testid={dataTestIds.links.github}
            href={ptInformation._githubLink}
            rel="noopener"
            target="_blank"
          >
            GitHub
          </a>
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
