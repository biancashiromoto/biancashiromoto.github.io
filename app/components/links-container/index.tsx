"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { FaGithub, FaLinkedin, FaProjectDiagram } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { getAriaLabel } from "../../helpers/acessibility";
import { dataTestIds } from "../../helpers/dataTestIds";
import { Link } from "../Link";
import styles from "./links-container.module.scss";

export const LinksContainer = () => {
  const { isLanguagePortuguese, information } = useLanguage();

  return (
    <div className={styles["links-container"]}>
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).pages.projects}
        className="hover:scale-125"
        link="/projects"
        target="_self"
        testid={dataTestIds.links.projects}
        text={information._checkMyProjects}
      >
        <FaProjectDiagram />
      </Link.Root>
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).links.github}
        className="hover:scale-125"
        link={information._githubLink}
        testid={dataTestIds.links.github}
        text={information._gitHubTooltip}
      >
        <FaGithub />
      </Link.Root>
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).links.linkedin}
        className="hover:scale-125"
        link={information._linkedinLink}
        testid={dataTestIds.links.linkedin}
        text={information._linkedinTooltip}
      >
        <FaLinkedin />
      </Link.Root>
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).links.resume}
        className="hover:scale-125"
        link={information._resumeLink}
        testid={dataTestIds.links.downloadMyCV}
        text={information._downloadMyCV}
      >
        <GrDocumentPdf />
      </Link.Root>
    </div>
  );
};
