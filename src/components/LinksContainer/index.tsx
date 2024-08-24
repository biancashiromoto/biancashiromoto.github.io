import { ariaLabel } from "../../helpers/ariaLabel";
import { Link } from "../Link";
import { dataTestIds } from "../../helpers/dataTestIds";
import { FaGithub, FaLinkedin, FaProjectDiagram } from "react-icons/fa";
import { useCounterStore } from "../../state/store";

export const LinksContainer = () => {
  const {
    isLanguagePortuguese,
    enInformation,
    ptInformation
  } = useCounterStore();

  return (
    <div className="flex gap-10 text-3xl items-center justify-center flex-wrap">
      <Link.Root
          ariaLabel={ariaLabel.pages.projects}
          className="hover:scale-125 icon__projects"
          link="/projects"
          target="_self"
          testid={dataTestIds.links.projects}
          text={isLanguagePortuguese ? ptInformation._checkMyProjects : enInformation._checkMyProjects}
        >
          <FaProjectDiagram />
        </Link.Root>
        <Link.Root
          ariaLabel={ariaLabel.links.github}
          className="hover:scale-125 icon__github"
          link={ptInformation._githubLink}
          testid={dataTestIds.links.github}
          text={ptInformation._gitHubTooltip}
        >
          <FaGithub />
        </Link.Root>
        <Link.Root
          ariaLabel={ariaLabel.links.linkedin}
          className="hover:scale-125 icon__linkedin"
          link={ptInformation._linkedinLink}
          testid={dataTestIds.links.linkedin}
          text={ptInformation._linkedinTooltip}
        >
        <FaLinkedin />
      </Link.Root>
    </div>
  );
}