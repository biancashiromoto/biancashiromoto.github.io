import PropTypes from "prop-types"
import { useContext } from 'react'
import { context } from '../../context/context';
import './LanguageToggle.css';
import { useLocation } from "react-router-dom";

const LanguageToggle = ({ props }) => {
  const { isInEnglish, setIsInEnglish } = useContext(context);
  const location = useLocation();

  return (
    <label className={`${isInEnglish ? 'pt' : 'en'} ${location.pathname !== '/' && 'position-absolute'} language-toggle pb-3 small mt-2 rounded-pill`} style={{ right: location.pathname !== '/' ? '25px' : 'auto' }}>
        {props}
        <input
          className='d-none'
          type='checkbox'
          onChange={ () => setIsInEnglish((prevState) => !prevState) }
        />
      </label>
  )
}

LanguageToggle.propTypes = {
  props: PropTypes.string,
}

export default LanguageToggle;