import { ReactNode } from "react";
import Information from "../../helpers/classes/Information";
import { Link } from "../../components/Link";
import { FaGithub, FaLaptopCode, FaLinkedin, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import { ariaLabel } from "../../helpers/ariaLabel";
import { HomeProps } from "./Home.types";
import { Link as ReactLink } from 'react-router-dom';
import "../../index.scss";
import { dataTestIds } from "../../helpers/dataTestIds";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import ReactTypingEffect from 'react-typing-effect';

export const Home = ({ isLanguagePortuguese, screenWidth }: HomeProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  
  const renderGreetingMessage = (): ReactNode => {
    return (
      <div className="text-sm grid gap-1 mt-2 grid-cols-2 grid-rows-3 items-center">
        {ptInformation._greetingMessage.map((paragraph, index) => {
          if (index === 0) {
            return (
                <div className="flex justify-center col-span-2">
                  <p key={index} className="">{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
                </div>
            );
          }
          if (paragraph === ptInformation._name) {
            return (
              <ReactTypingEffect
                className=" text-xl text-left ml-1"
                eraseSpeed={50}
                speed={100}
                text={[paragraph]}
                typingDelay={100}
              />
            );
          }
          return (
            <p className={index === 3 ? "col-span-2" : ""} key={index}>{isLanguagePortuguese ? paragraph : enInformation._greetingMessage[index]}</p>
          );
        })}
      </div>
    )
  }

  const renderProfilePicture = (): ReactNode => {
    return (
      <img
        alt={isLanguagePortuguese ? ptInformation._profilePictureAltText : enInformation._profilePictureAltText}
        className="rounded-full w-36 mt-5"
        src={ptInformation._profilePictureURL}
      />
    );
  }

  const renderLinksContainer = (): ReactNode => {
    return (
      <div className="flex gap-10 text-4xl items-center">
        
        <Tooltip
          text={isLanguagePortuguese ? ptInformation._projectsTooltip : enInformation._projectsTooltip}
        >
          <ReactLink
            aria-label={ariaLabel.pages.projects}
            className="hover:scale-125"
            to="/projects"
          >
            <FaLaptopCode />
          </ReactLink>
        </Tooltip>
        <Tooltip
          text={ptInformation._gitHubTooltip}
        >
          <Link.Root
            ariaLabel={ariaLabel.links.github}
            className="hover:scale-125"
            href={ptInformation._githubLink}
            testid={dataTestIds.links.github}
          >
            <FaGithub />
          </Link.Root>
        </Tooltip>
        <Tooltip
          text={ptInformation._linkedinTooltip}
        >
          <Link.Root
            ariaLabel={ariaLabel.links.linkedin}
            className="hover:scale-125"
            href={ptInformation._linkedinLink}
            testid={dataTestIds.links.linkedin}
          >
            <FaLinkedin />
          </Link.Root>
        </Tooltip>
        <Tooltip
          text={isLanguagePortuguese ? ptInformation._emailTooltip : enInformation._emailTooltip}
        >
          <Link.Root
            ariaLabel={ariaLabel.links.email}
            className="hover:scale-125"
            href={ptInformation._email}
            testid={dataTestIds.links.email}
          >
            <MdOutlineAlternateEmail />
          </Link.Root>
        </Tooltip>
      </div>
    );
  }

  const renderAboutMe = (): ReactNode => {
    return (
      <div>
        {ptInformation._aboutMeText.map((paragraph, index) => (
          <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._aboutMeText[index]}</p>
        ))}
      </div>
    )
  }

  const renderScrollButton = (direction: string): ReactNode => {
    if (screenWidth > 768) {
      return;
    }
    if (direction === "down") {
      return(
        <Link.Root
          ariaLabel={ariaLabel.links.pageDown}
          href="#about-me__container"
          className="absolute bottom-48 text-3xl"
          target="_self"
          testid={dataTestIds.links.pageDown}
        >
          <FaRegArrowAltCircleDown />
        </Link.Root>
      );
    }
    return(
      <Link.Root
        ariaLabel={ariaLabel.links.pageUp}
        href="#home-start"
        className="absolute text-3xl top-36"
        target="_self"
        testid={dataTestIds.links.pageUp}
      >
        <FaRegArrowAltCircleUp />
      </Link.Root>
    );
  }
  
  return (
    <div className={`home flex justify-evenly ${screenWidth < 768 ? "flex-col" : ""}`} id="home-start">
      <main className="h-screen flex flex-col gap-10 items-center mt-14 relative">
        {renderGreetingMessage()}
        {renderProfilePicture()}
        {renderLinksContainer()}
        {renderScrollButton("down")}
      </main>
      <article className="about-me__container text-xs h-screen flex flex-col items-center justify-center gap-20 leading-10 relative" id="about-me__container">
        {renderScrollButton("up")}
        {renderAboutMe()}
      </article>
    </div>
  )
}