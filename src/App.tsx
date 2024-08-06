import { useEffect } from "react";
import "./styles/index.scss";
import { Home } from "./pages/Home/Home";
import { Header } from "./components/Header/index";
import { Route, Routes } from "react-router-dom";
import { Projects } from "./pages/Projects/Projects";
import { useCounterStore } from "./state/store";

function App() {
  const {
    isLanguagePortuguese,
    toggleLanguage,
    fadeIn,
    toggleFadeIn,
    width,
    setWitdth
  } = useCounterStore();

  useEffect(() => {
    window.onload = () => {
      toggleFadeIn();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWitdth(window.innerWidth);      
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
        setIsLanguagePortuguese={toggleLanguage}
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
