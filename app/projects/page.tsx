"use client";

import { useEffect, useState } from "react";
import { Projects } from "../../src/pages/Projects/index";
import { useCounterStore } from "../../src/state/store";
import "../../src/styles/index.scss";
import Header from "../components/header/header";

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const { fadeIn, toggleFadeIn } = useCounterStore();

  useEffect(() => {
    setMounted(true);

    const handleLoad = () => {
      toggleFadeIn();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [toggleFadeIn]);

  if (!mounted) {
    return (
      <div>
        <Header />
        <Projects />
      </div>
    );
  }

  return (
    <div className={fadeIn ? "fade-in" : ""}>
      <Header />
      <Projects />
    </div>
  );
}
