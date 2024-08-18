import { useEffect, useState } from "react"
import {
  Carousel as ShadCnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@shadcn-ui/components/ui/carousel"
import { Card } from "../../../@shadcn-ui/components/ui/card";
import Utils from "../../helpers/classes/Utils";
import axios from "axios";
import Information from "../../helpers/classes/Information";
import { DataType } from "./index.types";
import { Link } from "../Link";
import { LucideTally1 } from "lucide-react";

const Carousel = () => {
  const { formatProjectTitle, getLocalStorage, setLocalStorage } = new Utils();
  const ptInformation = new Information("pt");
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    if (!getLocalStorage("repos")) {
      const fetchRepos = async () => {
        try {
          const response = await axios.get(ptInformation._githubApiLink, {
            headers: {
              Authorization: ""
            },
          });
          const filteredData = response.data.filter((project: DataType) => project.topics.includes("display"));
          setLocalStorage("repos", filteredData);
          setData(filteredData);
        } catch (error) {
          console.error("Error fetching repos:", error);
        }
      };
      fetchRepos();
    } else {
      setData(getLocalStorage("repos"));
    }
  }, [ptInformation._githubApiLink, getLocalStorage, setLocalStorage]);

  return (
    <div className="carousel" content="">
      <ShadCnCarousel
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <div>
          <CarouselContent>
            {data.map((project, index) => {
              const screenshotUrl = `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.png`;
              return (
                <CarouselItem key={index} className="carousel__item">
                  <main className="carousel__main">
                    <Card className="carousel__card">
                      <div className="carousel__card--content">
                        <h2 className="carousel__card--title">{formatProjectTitle(project.name)}</h2>
                        <span className="carousel__card--description">{project.description}</span>
                        <div className="carousel__card--links-container">
                          <Link.Root
                            ariaLabel={`Project ${project.name}'s GitHub repository link`}
                            link={`https://github.com/biancashiromoto/${project.name}`}
                            testid={`${project.name}-repo`}
                          >
                            <Link.Label label="GitHub repo" />
                          </Link.Root>
                          <LucideTally1 />
                          <Link.Root
                            ariaLabel={`Project ${project.name}'s deploy link`}
                            link={project.homepage}
                            testid={`${project.name}-deploy`}
                          >
                            <Link.Label label="Deploy" />
                          </Link.Root>
                        </div>
                        <ul className="carousel__card--topics">
                          {project.topics.map((topic, index) => {
                            return (topic !== "display") && (
                              <li key={index}>{topic}</li>
                            )
                          })}
                        </ul>
                      </div>
                      <img
                        className="carousel__card--image"
                        alt={`Project ${project.name}'s screenshot`}
                        src={screenshotUrl}
                      />
                    </Card>
                  </main>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </div>
      <div className="carousel__buttons-container">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </ShadCnCarousel>
    </div>
  )
}

export default Carousel