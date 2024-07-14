import { useEffect, useState } from "react";
import "./index.scss";
import Utils from "./helpers/classes/Utils";
import { Home } from "./pages/Home/Home";
import { Header } from "./components/Header/index";
import { Route, Routes } from "react-router-dom";
import { Projects } from "./pages/Projects/Projects";

function App() {
  const utils = new Utils();

  const [isLanguagePortuguese, setIsLanguagePortuguese] = useState<boolean>(utils.isLanguagePortuguese());
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    window.onload = () => {
      setFadeIn(true);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);      
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <div className={`body bg-[#040504] text-white h-screen text-center mx-10 ${fadeIn ? "fade-in" : ""}`}>
      <Header
        isLanguagePortuguese={isLanguagePortuguese}
        setIsLanguagePortuguese={setIsLanguagePortuguese}
      />
      <Routes>
        <Route path="/" element={
          <Home
            isLanguagePortuguese={isLanguagePortuguese}
            screenWidth={width}
          />}
        />
        <Route path="/projects" element={
          <Projects
            isLanguagePortuguese={isLanguagePortuguese}
            screenWidth={width}
          />}
        />
      </Routes>
    </div>
  )
}

export default App;
