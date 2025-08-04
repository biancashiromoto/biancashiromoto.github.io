"use client";

import { CustomLink as Link } from "@/app/components/link/link";
import { useLanguage } from "@/app/context/LanguageProvider";
import {
	FaGithub, FaLinkedin, FaProjectDiagram
} from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import styles from "./links-container.module.scss";

export const LinksContainer = () => {
	const { information } = useLanguage();

	return (
		<div className={styles["links-container"]}>
			<Link path="/projects" aria-label={information._projects}>
				<FaProjectDiagram title={information._projects} />
			</Link>
			<Link path={information._githubLink} aria-label={information._gitHubTooltip}>
				<FaGithub title={information._gitHubTooltip} />
			</Link>
			<Link
				path={information._linkedinLink}
				aria-label={information._linkedinTooltip}
			>
				<FaLinkedin title={information._linkedinTooltip} />
			</Link>
			<Link path={information._resumeLink} aria-label={information._downloadMyCV}>
				<GrDocumentPdf title={information._downloadMyCV} />
			</Link>
		</div>
	);
};
