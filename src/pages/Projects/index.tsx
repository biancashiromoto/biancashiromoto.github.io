import { Link as ReactLink } from "react-router-dom";
import { ariaLabel } from "../../helpers/ariaLabel";
import { FiArrowLeftCircle } from "react-icons/fi";
import Information from "../../helpers/classes/Information";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { memo, useEffect, useState } from "react";
import Utils from "../../helpers/classes/Utils";
import axios from "axios";
import Carousel from "../../components/Carousel";

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
  const { setLocalStorage, getLocalStorage } = new Utils();
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
