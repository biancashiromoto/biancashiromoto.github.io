"use client";

import { CustomLink as Link } from "@/app/components/link/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import styles from "./links-container.module.scss";

export const LinksContainer = () => {
  const { information } = useLanguage();

  return (
    <div className={styles["links-container"]}>
      <Link
        path={information._githubLink}
        aria-label={information._gitHubTooltip}
      >
        <FaGithub />
      </Link>
      <Link
        path={information._linkedinLink}
        aria-label={information._linkedinTooltip}
      >
        <FaLinkedin />
      </Link>
      <Link
        path={information._resumeLink}
        aria-label={information._downloadMyCV}
      >
        <GrDocumentPdf />
      </Link>
    </div>
  );
};
