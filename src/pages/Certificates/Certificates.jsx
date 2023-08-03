import { useEffect, useState } from 'react';
import { fetchAPI } from '../../helpers/fetchAPI';
import { certificates_URL } from '../../helpers/info';
import './Certificates.css';
import { Link } from 'react-router-dom';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const response = await fetchAPI(certificates_URL);
      setCertificates(response);
    }
    fetchCertificates();
  }, []);

  return (
    <article className='certificates-container text-center p-3 h-100 mx-auto'>
      <Link
        className='home-link'
        to='/'
      />
      <h2>Certificates</h2>
      <section className='d-sm-flex flex-column d-md-grid'>
        <div className='certificates-container row g-md-1 justify-content-center' style={{ gap: '1rem' }}>
          {certificates.map((certificate) => (
            <div
              key={ certificate.id }
              className={ `card col-md-4 col-lg-3 d-flex bg-light`}
            >
              <a
                href={certificate.url}
                target='_blank'
                rel="noreferrer"
                className='text-decoration-none fs-5'
              >
                {certificate.title}
              </a>
              <p>{certificate.school}</p>
            </div>
        ))}
        </div>
      </section>
    </article>
  )
}

export default Certificates;
