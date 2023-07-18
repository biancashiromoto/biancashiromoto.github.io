import './CertificateCard.css';

function CertificateCard({ props }) {
  const { url, title, school } = props;
  return (
    <div className='certificate-card'>
      <h4>{ title }</h4>
      <div className='certificate-info'>
        <a
          href={ url }
          target="_blank"
          rel="noreferrer"
        >
          Open certificate
        </a>
        <span
          className={ school === 'Trybe' ? 'trybe' : 'alura' }
        >
          { `School: ${school}` }
        </span>
      </div>
    </div>
  )
}

export default CertificateCard;
