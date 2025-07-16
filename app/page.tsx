'use client'

import { useEffect, useState } from "react";
import { Header } from "../src/components/Header/index";
import { Home } from "../src/pages/Home/index";
import { useCounterStore } from "../src/state/store";
import "../src/styles/index.scss";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const {
    fadeIn,
    toggleFadeIn,
    initializeLanguage,
  } = useCounterStore();

  useEffect(() => {
    setMounted(true);
    initializeLanguage();
    
    const handleLoad = () => {
      toggleFadeIn();
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [toggleFadeIn, initializeLanguage]);

  if (!mounted) {
    return (
      <div>
        <Header />
        <Home />
      </div>
    );
  }

  return (
    <div className={fadeIn ? "fade-in" : ""}>
      <Header />
      <Home />
    </div>
  );
}
