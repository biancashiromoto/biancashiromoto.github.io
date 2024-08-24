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
import { DataType } from "./index.types";
import { Link } from "../Link";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useCounterStore } from "../../state/store";

const Carousel = () => {
  const { formatProjectTitle, getLocalStorage, setLocalStorage } = new Utils();
  const { ptInformation } = useCounterStore();
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
        <CarouselContent>
          {data.map((project, index) => {
            const screenshotUrl = `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.png`;
            return (
              <CarouselItem key={index} className="carousel__item">
                <main className="carousel__main">
                  <Card className="carousel__card">
                    <div className="carousel__card--content">
                      <div className="carousel__card--top">
                        <h2 className="carousel__card--title">{formatProjectTitle(project.name)}</h2>
                        <div className="carousel__card--links-container">
                          <Link.Root
                            ariaLabel={`Project ${project.name}'s GitHub repository link`}
                            className="github-repo"
                            link={`https://github.com/biancashiromoto/${project.name}`}
                            testid={`${project.name}-repo`}
                            text="GitHub repository"
                            >
                            <FaGithub />
                          </Link.Root>
                          <Link.Root
                            ariaLabel={`Project ${project.name}'s deploy link`}
                            className="deploy"
                            link={project.homepage}
                            testid={`${project.name}-deploy`}
                            text="Deploy"
                          >
                            <FaGlobe />
                          </Link.Root>
                      </div>
                      </div>
                      <span className="carousel__card--description">{project.description}</span>
                      <ul className="carousel__card--topics">
                        {project.topics.map((topic, index) => {
                          return (topic !== "display") && (
                            <li key={index}>{topic}</li>
                          )
                        })}
                      </ul>
                      <img
                        className="carousel__card--image"
                        alt={`Project ${project.name}'s screenshot`}
                        src={screenshotUrl}
                      />
                    </div>
                  </Card>
                </main>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className="carousel__buttons-container">
          <CarouselPrevious />
          <CarouselNext />
        </div>
    </ShadCnCarousel>
    </div>
  )
}

export default Carousel