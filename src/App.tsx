import { useEffect } from "react";
import "./styles/index.scss";
import { Home } from "./pages/Home/index";
import { Header } from "./components/Header/index";
import { Route, Routes } from "react-router-dom";
import { Projects } from "./pages/Projects/index";
import { useCounterStore } from "./state/store";

function App() {
  const {
    fadeIn,
    toggleFadeIn,
  } = useCounterStore();

  useEffect(() => {
    window.onload = () => {
      toggleFadeIn();
    };
  }, []);

  return (
    <div className={fadeIn ? "fade-in" : ""}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}
        />
        <Route path="/projects" element={<Projects />}
        />
      </Routes>
    </div>
  )
}

export default App;
