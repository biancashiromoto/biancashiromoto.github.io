import { Link } from 'react-router-dom';
import './ReturnButton.css';

const ReturnButton = () => {
  return (
    <div className='button-container position-absolute'>
      <Link
        className='return-button'
        to='/'
      />
    </div>
  )
}

export default ReturnButton;
