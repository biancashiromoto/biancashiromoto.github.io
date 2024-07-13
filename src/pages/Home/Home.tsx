import { ReactNode } from "react";
import Information from "../../helpers/classes/Information";
import { Link } from "../../components/Link";
import { FaGithub, FaLaptopCode, FaLinkedin } from "react-icons/fa";
import { ariaLabel } from "../../helpers/ariaLabel";
import { HomeProps } from "./Home.types";
import { Link as ReactLink } from 'react-router-dom';
import "../../index.scss";
import { dataTestIds } from "../../helpers/dataTestIds";
import { MdOutlineAlternateEmail } from "react-icons/md";

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
              <h1 key={index} className="text-xl text-left ml-1">{paragraph}</h1>
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
      <div className="flex gap-10 text-4xl">
        <ReactLink
          aria-label={ariaLabel.pages.projects}
          className="hover:scale-150 transition-all"
          to="/projects"
          >
          <FaLaptopCode />
        </ReactLink>
        <Link.Root
          ariaLabel={ariaLabel.links.github}
          href={ptInformation._githubLink}
          testid={dataTestIds.links.github}
          >
          <FaGithub />
        </Link.Root>
        <Link.Root
          ariaLabel={ariaLabel.links.linkedin}
          href={ptInformation._linkedinLink}
          testid={dataTestIds.links.linkedin}
        >
          <FaLinkedin />
        </Link.Root>
        <Link.Root
          ariaLabel={ariaLabel.links.email}
          href={`mailto:${ptInformation._email}`}
          testid={dataTestIds.links.email}
        >
          <MdOutlineAlternateEmail />
        </Link.Root>
      </div>
    );
  }

  const renderAboutMe = (): ReactNode => {
    return (
      <article className="about-me__container text-sm h-screen flex flex-col items-center justify-center gap-5 leading-10">
        {ptInformation._aboutMeText.map((paragraph, index) => (
          <p key={index}>{isLanguagePortuguese ? paragraph : enInformation._aboutMeText[index]}</p>
        ))}
      </article>
    )
  }
  
  return (
    <div className={`home flex justify-evenly ${screenWidth < 768 ? "flex-col" : ""}`}>
      <main className="h-screen flex flex-col gap-10 items-center mt-14">
        {renderGreetingMessage()}
        {renderProfilePicture()}
        {renderLinksContainer()}
      </main>
      {renderAboutMe()}
    </div>
  )
}