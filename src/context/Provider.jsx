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

export default Provider;
