import PropTypes from "prop-types"
import { useContext } from 'react'
import { context } from '../../context/context';
import './LanguageToggle.css';

const LanguageToggle = ({ props }) => {
  const { isInEnglish, setIsInEnglish } = useContext(context);

  return (
    <label className={`${isInEnglish ? 'pt' : 'en'} language-toggle pb-3 small rounded-pill`}>
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