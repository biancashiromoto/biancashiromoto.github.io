import { useEffect, useState } from 'react';

const Card = ({ props }) => {
  const { name, description, homepage } = props;
  const imgPath = `https://raw.githubusercontent.com/biancashiromoto/${name}/main/screenshots/screenshot-01.png`;
  
  return (
    <div className='card'>
      {imgPath && (
        <img
          src={ imgPath }
          alt={ `Imagem do projeto ${name}` }
        />
      )}
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
