import React, { useState } from "react";
import "./App.css";
import Information from "./helpers/classes/Information";
import Utils from "./helpers/classes/Utils";

function App() {
  const information = new Information();
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
        {information._greetingMessage.map((paragraph, index) => {
          if (paragraph === "Bianca") {
            return (<h1 key={index}>{paragraph}</h1>);
          }
          return (
            <p key={index}>{paragraph}</p>
          );
        })}
        <img
          src={information._profilePictureURL}
          alt={information._profilePictureAltText}
        />
      </main>
    </>
  )
}

export default App;
