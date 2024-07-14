import { Tooltip } from "../Tooltip/Tooltip";
import { ariaLabel } from "../../helpers/ariaLabel";
import { Link as ReactLink } from 'react-router-dom';
import { Link } from "../Link";
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
          className="hover:scale-125 icon__projects"
          to="/projects"
        />
      </Tooltip>
      <Tooltip
        text={ptInformation._gitHubTooltip}
      >
        <Link.Root
          ariaLabel={ariaLabel.links.github}
          className="hover:scale-125 icon__github"
          href={ptInformation._githubLink}
          testid={dataTestIds.links.github}
        />
      </Tooltip>
      <Tooltip
        text={ptInformation._linkedinTooltip}
      >
        <Link.Root
          ariaLabel={ariaLabel.links.linkedin}
          className="hover:scale-125 icon__linkedin"
          href={ptInformation._linkedinLink}
          testid={dataTestIds.links.linkedin}
        />
      </Tooltip>
    </div>
  );
}