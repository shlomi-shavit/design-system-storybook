import { useState } from 'react';

const useService = () => {
  const [ isOpen, setOpen ] = useState<boolean>( false );

  const accordionClickHandler = () => setOpen( !isOpen );

  return {
    isOpen,
    accordionClickHandler,
  };
};

export default useService;
