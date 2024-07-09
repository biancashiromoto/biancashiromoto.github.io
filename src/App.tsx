import { useState } from "react";
import "./index.css";
import Information from "./helpers/classes/Information";
import Utils from "./helpers/classes/Utils";

function App() {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  const utils = new Utils();

  const [isLanguagePortuguese, setIsLanguagePortuguese] = useState<boolean>(utils.isLanguagePortuguese());
  
  return (
    <>
      <header>
        <button
          data-testid="toggle-language-button"
          type="button"
          onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
        >
          {isLanguagePortuguese ? "Translate to English" : "Translate to Portuguese"}
        </button>
      </header>
      <main>
        {ptInformation._greetingMessage.map((paragraph, index) => {
          if (paragraph === "Bianca") {
            return (<h1>{paragraph}</h1>);
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
            data-testid="linkedin-link"
            href="https://www.linkedin.com/in/bshiromoto/"
            rel="noopener"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            data-testid="github-link"
            href="https://github.com/biancashiromoto"
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
