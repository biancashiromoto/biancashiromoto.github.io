import { useEffect, useState } from 'react'
import {
  Carousel as ShadCnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@shadcn-ui/components/ui/carousel"
import { Card, CardContent } from '../../../@shadcn-ui/components/ui/card';
import Utils from '../../helpers/classes/Utils';
import axios from 'axios';
import Information from '../../helpers/classes/Information';

interface DataType {
  id: string;
  name: string;
  topics: string[],
  [key: string]: any;
}

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
          console.error('Error fetching repos:', error);
        }
      };
      fetchRepos();
    } else {
      setData(getLocalStorage("repos"));
    }
  }, [ptInformation._githubApiLink, getLocalStorage, setLocalStorage]);

  return (
    <div className="projects__carousel overflow-hidden">
      <ShadCnCarousel
        className="w-full max-w-xs"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {data.map((project, index) => {
            const screenshotUrl = `https://raw.githubusercontent.com/biancashiromoto/${project.name}/main/screenshots/screenshot-01.png`;
            return (
              <CarouselItem key={index} className="w-max">
                <main className="mx-12">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-10">
                      <span className="text-lg font-semibold">{formatProjectTitle(project.name)}</span>
                    </CardContent>
                      <img
                        alt={`Project ${project.name}'s screenshot`}
                        src={screenshotUrl}
                      />
                  </Card>
                </main>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </ShadCnCarousel>
    </div>
  )
}

export default Carousel