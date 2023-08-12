import { Link } from 'react-router-dom';
import './ReturnButton.css';
import { useContext } from 'react';
import { context } from '../../context/context';
import { info_en, info_pt } from '../../helpers/info';

const ReturnButton = () => {
  const {isInEnglish} = useContext(context);
  return (
    <div className='button-container position-absolute'>
      <Link
        className='button-text return-button text-decoration-none'
        to='/'
      >
        <span
          className='hidden'
        >
          {isInEnglish
            ? info_en.returnButton.content[0]
            : info_pt.returnButton.content[0]
          }
        </span>
      </Link>
    </div>
  )
}

export default ReturnButton;
