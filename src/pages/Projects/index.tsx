import { Link as ReactLink } from "react-router-dom";
import { ariaLabel } from "../../helpers/ariaLabel";
import { FiArrowLeftCircle } from "react-icons/fi";
import Information from "../../helpers/classes/Information";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { memo, useEffect, useMemo, useState } from "react";
import Utils from "../../helpers/classes/Utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@shadcn-ui/components/ui/carousel"
import {
  Card,
  CardContent,
} from "../../../@shadcn-ui/components/ui/card"
import { Header } from "../../components/Header";
import { useCounterStore } from "../../state/store";

interface ProjectsProps {
  isLanguagePortuguese: boolean;
  screenWidth: number;
}

interface DataType {
  id: string;
  name: string;
  topics: string[],
  [key: string]: any;
}

export const Projects = memo(({ isLanguagePortuguese }: ProjectsProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  const { fetchData } = new Utils();
  const [data, setData] = useState<DataType[]>([]);

  const { toggleLanguage } = useCounterStore();

  useEffect( () => {
    const fetchRepos = async () => {
      const data = await fetchData();
      setData(data);
      console.log(data);
      
    }
    fetchRepos();
  }, []);

  const renderReturnButton = () => {
    return(
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
    )
  }

  const filteredData = useMemo(() => data.filter((project) => project.topics.includes("display")), [data]);

  return (
    <div className="page__projects">
      <Header
        isLanguagePortuguese={isLanguagePortuguese}
        setIsLanguagePortuguese={toggleLanguage}
      />
      <main className="relative">
        {renderReturnButton()}
        <h1>{isLanguagePortuguese ? ptInformation._projectsPageTitle : enInformation._projectsPageTitle}</h1>
        
        <h2 className="mb-5">{isLanguagePortuguese ? ptInformation._inProgress : enInformation._inProgress }</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent className="-ml-1">
            {filteredData.filter((project) => project.topics.includes("display")).map((project) => {
              const screenshotUrl = `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.`;
              return (
                <CarouselItem key={project.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                        <h4>{project.name}</h4>
                        <img
                          alt={`Project ${project.name}'s screenshot`}
                          className="w-100"
                          src={`${screenshotUrl}${"png" || "gif"}`}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
            <CarouselPrevious />
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </main>
    </div>
  )
})