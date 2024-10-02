import { getAriaLabel } from "../../helpers/acessibility";
import { Link } from "../Link";
import { dataTestIds } from "../../helpers/dataTestIds";
import { FaGithub, FaLinkedin, FaProjectDiagram } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr"
import { useCounterStore } from "../../state/store";

export const LinksContainer = () => {
  const {
    isLanguagePortuguese,
    enInformation,
    ptInformation
  } = useCounterStore();

  return (
    <div className="links-container">
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).pages.projects}
        className="hover:scale-125"
        link="/projects"
        target="_self"
        testid={dataTestIds.links.projects}
        text={isLanguagePortuguese ? ptInformation._checkMyProjects : enInformation._checkMyProjects}
      >
        <FaProjectDiagram />
      </Link.Root>
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).links.github}
        className="hover:scale-125"
        link={ptInformation._githubLink}
        testid={dataTestIds.links.github}
        text={ptInformation._gitHubTooltip}
      >
        <FaGithub />
      </Link.Root>
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).links.linkedin}
        className="hover:scale-125"
        link={ptInformation._linkedinLink}
        testid={dataTestIds.links.linkedin}
        text={ptInformation._linkedinTooltip}
      >
        <FaLinkedin />
      </Link.Root>
      <Link.Root
        ariaLabel={getAriaLabel(isLanguagePortuguese).links.resume}
        className="hover:scale-125"
        link={ptInformation._resumeLink}
        testid={dataTestIds.links.downloadMyCV}
        text={ptInformation._downloadMyCV}
      >
        <GrDocumentPdf />
      </Link.Root>
    </div>
  );
}