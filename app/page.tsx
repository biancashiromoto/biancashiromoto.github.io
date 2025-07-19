"use client";

import styles from "@/app/styles/pages/home.module.scss";
import { useLanguage } from "@/src/context/LanguageContext";
import Intro from "./components/intro/intro";

function HomePage() {
  const { information } = useLanguage();

  const renderAboutMe = () => {
    return (
      <div>
        {information._aboutMeText.map((_paragraph, index) => (
          <p key={index}>{information._aboutMeText[index]}</p>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.home} id="home-start">
      <Intro />
      <article className="pages__home--about-me" id="about-me__container">
        {renderAboutMe()}
      </article>
    </div>
  );
}

export default HomePage;
