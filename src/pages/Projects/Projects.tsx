import { Link as ReactLink } from "react-router-dom";
import { ariaLabel } from "../../helpers/ariaLabel";
import { FiArrowLeftCircle } from "react-icons/fi";
import Information from "../../helpers/classes/Information";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { useEffect, useState } from "react";
import Utils from "../../helpers/classes/Utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@shadcn-ui/components/ui/carousel"

interface ProjectsProps {
  isLanguagePortuguese: boolean;
  screenWidth: number;
}

interface DataType {
  id: string;
  name: string;
  topics: string[],
  [key: string]: any; // Adjust based on your actual data structure
}

export const Projects = ({ isLanguagePortuguese }: ProjectsProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  const { fetchData } = new Utils();
  const [data, setData] = useState<DataType[]>([]);

  useEffect( () => {
    const fetchRepos = async () => {
      const data = await fetchData();
      setData(data);
      console.log(data);
      
    }
    fetchRepos();
  }, [fetchData])

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
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {data.filter((project) => project.topics.includes("display")).map((project) => {
            const screenshotUrl = `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.`;
            return (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <h4>{project.name}</h4>
                <img alt={`Project ${project.name}'s screenshot`} src={`${screenshotUrl}${"png" || "gif"}`} />
              </CarouselItem>
            )
          })}
          <CarouselPrevious />
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  )
}