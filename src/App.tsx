import { ReactNode, useEffect, useState } from "react";
import "./index.scss";
import Information from "./helpers/classes/Information";
import Utils from "./helpers/classes/Utils";
import { dataTestIds } from "./helpers/dataTestIds";

import { Button } from "./components/Button";
import { Home } from "./pages/Home";

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
      <header className="mt-2 fixed top-0 right-1/2 translate-x-2/4">
        <Button.Root
          className="text-xs hover:bg-slate-800 p-3 rounded-full"
          onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel}
        </Button.Root>
      </header>
    );
  }

  return (
    <div className={`body bg-[#040504] text-white h-screen text-center mx-10 ${fadeIn ? "fade-in" : ""}`}>
      {renderHeader()}
      <Home isLanguagePortuguese={isLanguagePortuguese} />
    </div>
  )
}

export default App;
