import { useContext, useEffect, useState } from 'react';
import { fetchAPI } from '../../helpers/fetchAPI';
import { certificates_URL, info_en, info_pt } from '../../helpers/info';
import './Certificates.css';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { context } from '../../context/context';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';

const Certificates = () => {
  const { isInEnglish } = useContext(context);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const response = await fetchAPI(certificates_URL);
      const sortedCertificates = response.sort((a, b) => a.title.localeCompare(b.title));
      setCertificates(sortedCertificates);
    }
    fetchCertificates();
  }, []);

  return (
    <div className='certificates-container text-center p-3 h-100 mx-auto'>
      <ReturnButton />
      <LanguageToggle />
      <h2>{isInEnglish ? 'Certificates' : 'Certificados'}</h2>
      {isInEnglish ? (
        info_en.certificates.content.map((paragraph, index) => (
          <p className='fs-6' key={index}>{paragraph}</p>
        ))
      ) : (
        info_pt.certificates.content.map((paragraph, index) => (
          <p className='fs-6' key={index}>{paragraph}</p>
        ))
      )}
      <section className='d-sm-flex flex-column d-md-grid'>
        <div className='certificates-container row g-md-1 justify-content-center' style={{ gap: '1rem' }}>
          {certificates.map((certificate) => (
            <div
              key={ certificate.id }
              className={ `certificate-card flex-column align-items-center justify-content-center col-md-4 col-lg-3 d-flex bg-light`}
            >
              <a
                href={certificate.url}
                target='_blank'
                rel="noreferrer"
                className='certificate-title text-decoration-none'
              >
                {certificate.title}
              </a>
              <p className={ `certificate-school small text-muted d-flex align-items-center ${certificate.school}` }>
                {certificate.school}
              </p>
            </div>
        ))}
        </div>
      </section>
    </div>
  )
}

export default Certificates;
