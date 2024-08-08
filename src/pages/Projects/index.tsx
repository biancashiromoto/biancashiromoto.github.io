import { Link as ReactLink } from "react-router-dom";
import { ariaLabel } from "../../helpers/ariaLabel";
import { FiArrowLeftCircle } from "react-icons/fi";
import Information from "../../helpers/classes/Information";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { memo } from "react";
import Carousel from "../../components/Carousel";

interface ProjectsProps {
  isLanguagePortuguese: boolean;
  screenWidth: number;
}

export const Projects = memo(({ isLanguagePortuguese }: ProjectsProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");

  return (
    <main className="page__projects">
      {/*  TODO criar componente PageTitle */}
      <h1>{isLanguagePortuguese ? "Projetos" : "Projects"}</h1>
      {/*  TODO criar componente LinkButton */}
      <Tooltip
        className="text-left text-3xl"
        text={isLanguagePortuguese ? ptInformation._returnToPreviousPageTooltip : enInformation._returnToPreviousPageTooltip}
      >
        <ReactLink
          aria-label={ariaLabel.pages.return}
          to="/"
        >
          <FiArrowLeftCircle />
        </ReactLink>
      </Tooltip>
      <h2 className="mb-5">{isLanguagePortuguese ? ptInformation._inProgress : enInformation._inProgress }</h2>
      <Carousel />
    </main>
  );
});
