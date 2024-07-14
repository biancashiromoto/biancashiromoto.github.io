import { Link as ReactLink } from "react-router-dom";
import { ariaLabel } from "../../helpers/ariaLabel";
import { FiArrowLeftCircle } from "react-icons/fi";
import Information from "../../helpers/classes/Information";
import { Tooltip } from "../../components/Tooltip/Tooltip";

interface ProjectsProps {
  isLanguagePortuguese: boolean;
  screenWidth: number;
}

export const Projects = ({ isLanguagePortuguese }: ProjectsProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");

  return (
    <div className="page__projects top-16">
      <Tooltip
        className="text-left"
        text={isLanguagePortuguese ? ptInformation._returnToPreviousPageTooltip : enInformation._returnToPreviousPageTooltip}
      >
        <ReactLink
          aria-label={ariaLabel.pages.return}
          to="/"
          >
          <FiArrowLeftCircle />
        </ReactLink>
      </Tooltip>
      <div className="pt-5">
        <h2 className="mb-5">{isLanguagePortuguese ? ptInformation._inProgress : enInformation._inProgress }</h2>
        <img 
          alt={isLanguagePortuguese ? ptInformation._catGifAltText : enInformation._catGifAltText}
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjRieWtkcXU0dmkzeGJhd2xueW1vOTg2N2Y5M2k0NHVoemRjMmxucSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lJNoBCvQYp7nq/giphy.webp" />
      </div>
    </div>
  )
}