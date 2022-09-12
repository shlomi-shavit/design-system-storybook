import { useState } from 'react';

const useService = () => {
  const [ checked, setChecked ] = useState<boolean>( false );

  const handleClick = () => setChecked( !checked );

  return {
    checked,
    handleClick,
  };
};

export default useService;
