import { Tooltip } from "../Tooltip/Tooltip";
import { ariaLabel } from "../../helpers/ariaLabel";
import { Link as ReactLink } from 'react-router-dom';
import { Link } from "../Link";
import { FaGithub, FaLaptopCode, FaLinkedin } from 'react-icons/fa';
import { MdOutlineContactPage } from 'react-icons/md';
import { dataTestIds } from "../../helpers/dataTestIds";
import { LinksContainerProps } from './LinksContainer.types';
import Information from '../../helpers/classes/Information';

export const LinksContainer = ({ isLanguagePortuguese }: LinksContainerProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  return (
    <div className="flex gap-10 text-3xl items-center justify-center flex-wrap">
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
        text={isLanguagePortuguese ? ptInformation._resumeTooltip : enInformation._resumeTooltip}
      >
        <Link.Root
          ariaLabel={ariaLabel.links.email}
          className="hover:scale-125"
          href={ptInformation._resumeLink}
          testid={dataTestIds.links.email}
        >
          <MdOutlineContactPage />
        </Link.Root>
      </Tooltip>
    </div>
  );
}