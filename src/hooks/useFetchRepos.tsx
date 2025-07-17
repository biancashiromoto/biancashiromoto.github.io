import { useEffect, useState } from "react";
import axios from "axios";
import Utils from "../helpers/classes/Utils";
import { DataType } from "../components/Carousel/index.types";
import { useLanguage } from "../context/LanguageContext";

/**
 * Custom hook to fetch repositories from GitHub and store them in local storage.
 * This hook handles the fetching of data, caching it locally, and managing any errors that occur during the fetch.
 *
 * @returns {Object} An object containing the fetched data and any error that occurred.
 */
const useFetchRepos = () => {
  const { getLocalStorage, setLocalStorage } = new Utils();
  const { information } = useLanguage();
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        if (!getLocalStorage("repos")) {
          const response = await axios.get(information._githubApiLink, {
            headers: {
              Authorization: "",
            },
          });
          const filteredData = response.data.filter((project: DataType) =>
            project.topics.includes("display")
          );
          setLocalStorage("repos", filteredData);
          setData(filteredData);
        } else {
          setData(getLocalStorage("repos"));
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
        setError("Error fetching repos");
      }
    };
    fetchRepos();
  }, [information._githubApiLink, getLocalStorage, setLocalStorage]);

  return { data, error };
};

export default useFetchRepos;
