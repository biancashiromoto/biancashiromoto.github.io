import { Link as ReactLink } from "react-router-dom";
import { ariaLabel } from "../../helpers/ariaLabel";
import { FiArrowLeftCircle } from "react-icons/fi";
import Information from "../../helpers/classes/Information";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { Carousel } from "@material-tailwind/react";

interface ProjectsProps {
  isLanguagePortuguese: boolean;
  screenWidth: number;
}

export const Projects = ({ isLanguagePortuguese }: ProjectsProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");

  return (
    <div className="page__projects  mt-14 relative">
      <h1>{isLanguagePortuguese ? "Projetos" : "Projects"}</h1>
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
      <Carousel transition={{ duration: 2 }} className="rounded-xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjRieWtkcXU0dmkzeGJhd2xueW1vOTg2N2Y5M2k0NHVoemRjMmxucSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lJNoBCvQYp7nq/giphy.webp"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzN2NzJ4dXcwZmZxM3QxamJoODBjb3NtdWpib3J2dGQ5cDhwbWJ3dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.webp"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXk1MTRjZDk1bHlseTIyNnhwZzIyMmE0dGllYXUxM3N2b2xydGZwYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H1dxi6xdh4NGQCZSvz/giphy.webp"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
    </div>
  )
}