import { useState } from 'react';

const useService = () => {
  const [ popoverIsActive, setPopoverIsActive ] = useState<boolean>( false );
  const [ input, setInput ] = useState<string>( '' );
  const [ selected, setSelected ] = useState<boolean>( false );

  const inputHandler = ( value: any ) => {
    setInput( value.target.value );
  };

  const onClickHandler = ( value?: string ) => {
    if ( value === 'approve' && input !== '' ) {
      setInput( input );
      setSelected( true );
    } else {
      setInput( '' );
      setSelected( false );
    }
    setPopoverIsActive( !popoverIsActive );
  };

  const deleteSmsHandler = ( e: any ) => {
    e.stopPropagation();
    setSelected( false );
    setInput( '' );
  };

  return {
    input,
    popoverIsActive,
    selected,
    onClickHandler,
    deleteSmsHandler,
    inputHandler,
  };
};

export default useService;
