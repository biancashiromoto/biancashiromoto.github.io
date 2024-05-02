import React from "react";
import "./App.css";
import Information from "./helpers/classes/Information";

function App() {
  const information = new Information();
  
  return (
    <>
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
