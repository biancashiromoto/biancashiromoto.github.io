import { useEffect, useState } from 'react';

const Card = ({ props }) => {
  // const [images, setImages] = useState('');
  const { html_url, name, description, homepage } = props;
  // const imgPath = `https://api.github.com/repos/biancashiromoto/${name}/contents/screenshots/screenshot-01.png?ref=main`;


  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const response = await fetchAPI(imgPath);
  //     console.log(response); // ver o que retorna
  //   }
  //   fetchImages();
  // }, []);
  
  return (
    <div className='card'>
        {/* <img
          className='card-img-top'
          src={ images }
          alt={ `Imagem do projeto ${name}` }
        /> */}
      <div className='card-body'>
        <h5 className='card-title'>{ name }</h5>
        <p>{ description }</p>
        {homepage && (
          <a
          href={ homepage }
          target='_blank'
          rel="noreferrer"
        >
          Deploy
        </a>
        )}
      </div>
    </div>
  )
}

export default Card;
