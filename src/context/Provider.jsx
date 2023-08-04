import PropTypes from "prop-types"
import { useState } from 'react';
import { context } from './context';

const Provider = ({ children }) => {
  const [isInEnglish, setIsInEnglish] = useState(false);

  const value = {
    isInEnglish,
    setIsInEnglish,
  };

  return (
    <context.Provider value={ value }>
      {children}
    </context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.element.isRequired
}

export default Provider;
