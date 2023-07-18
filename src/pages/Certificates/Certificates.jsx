import { useEffect, useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { certificates_URL } from "../../helpers/info";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import CertificateCard from "../../components/CertificateCard/CertificateCard";
import './Certificates.css';


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
      <ReturnButton />
      <h2>Certificates</h2>
      <div className="certificates-container">
        {certificates.map((certificate) => (
          <CertificateCard
            key={ certificate.id }
            props={ certificate }
          />
        ))}
      </div>
    </div>
  )
}

export default Certificates;
