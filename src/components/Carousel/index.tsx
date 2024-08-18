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
                        <span className="carousel__card--title">
                          {formatProjectTitle(project.name)}
                        </span>
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