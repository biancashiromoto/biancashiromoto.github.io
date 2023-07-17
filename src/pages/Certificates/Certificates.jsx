import { useEffect, useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { certificates_URL } from "../../helpers/info";


function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const fetchedCertificates = await fetchData(certificates_URL);
      console.log(fetchedCertificates)
      setCertificates(fetchedCertificates);
    }
    fetchCertificates();
  }, []);

  useEffect(() => {
    console.log(certificates);
  }, [certificates]);

  const fetchData = async (URL) =>{
    const data = await fetchAPI(URL);
    console.log(data);
    return data;
  }

  return (
    <div>
      <h2>Certificates</h2>
      {certificates.map((certificate) => (
        <>
          <li>{ certificate.url }</li>
        </>
      ))}
    </div>
  )
}

export default Certificates;
