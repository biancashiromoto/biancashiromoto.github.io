"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import { LinksContainer } from "../../components/LinksContainer/index";
import { ScrollButtonWrapper } from "../../components/ScrollButton/ScrollButtonWrapper";
import Timeline from "../../components/Timeline";
import { altText } from "../../helpers/acessibility";

export const Home = () => {
  const { information, isLanguagePortuguese } = useLanguage();

  const renderGreetingMessage = () => {
    return (
      <div className="pages__home--greeting-message">
        {information._greetingMessage.map((_paragraph, index) => (
          <p className={`pages__home--paragraph`} key={index}>
            {information._greetingMessage[index]}
          </p>
        ))}
      </div>
    );
  };

  const renderProfilePicture = () => {
    return (
      <img
        alt={altText(isLanguagePortuguese).home.profilePicture}
        className="pages__home--profile-picture"
        src={information._profilePictureURL}
      />
    );
  };

  const renderLinksContainer = () => {
    return <LinksContainer />;
  };

  const renderAboutMe = () => {
    return (
      <div>
        {information._aboutMeText.map((paragraph, index) => (
          <p key={index}>{information._aboutMeText[index]}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="pages__home" id="home-start">
      <main>
        {renderGreetingMessage()}
        {renderProfilePicture()}
        {renderLinksContainer()}
        <ScrollButtonWrapper
          direction="down"
          href="#about-me__container"
          className="pages__home--scroll-button--down"
        />
      </main>
      <article className="pages__home--about-me" id="about-me__container">
        <ScrollButtonWrapper
          direction="up"
          href="#home-start"
          className="pages__home--scroll-button--up"
        />
        {renderAboutMe()}
        <ScrollButtonWrapper
          direction="down"
          href="#timeline"
          className="pages__home--scroll-button--timeline"
        />
      </article>
      <article className="pages__home--timeline" id="timeline__container">
        <Timeline />
      </article>
    </div>
  );
};
