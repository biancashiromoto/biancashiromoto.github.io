import React from "react";
import "./App.css";
import Information from "./helpers/classes/Information";

function App() {
  const information = new Information();
  
  return (
    <>
      <header>
        <button
          data-testid="toggle-language-button"
          type="button"
          onClick={() => {}}
        >
          Traduzir para o Português
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
