import { useEffect, useState } from 'react';
import { useGeneralBarStore } from '../../../stores/general-store/general-context';

const useService = ( popupIsActive?: any ) => {
  const generalStore: any = useGeneralBarStore();
  const [ popupActive, setPopupActive ] = useState<boolean>( popupIsActive ?? false );

  const openPopup = () => {
    if ( Object.keys( generalStore ).length !== 0 ) {
      generalStore.setPopupIsActive( true );
    }
    setPopupActive( true );
  };

  const closePopup = () => {
    if ( Object.keys( generalStore ).length === 0 ) {
      setPopupActive( false );
    } else {
      generalStore.setPopupIsActive( false );
    }
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  useEffect( () => {
    if ( Object.keys( generalStore ).length !== 0 ) {
      setPopupActive( generalStore.popupIsActive );
    } else {
      setPopupActive( popupIsActive );
    }
  }, [ popupIsActive, popupActive, generalStore.popupIsActive ] );

  return {
    popupActive,
    openPopup,
    closePopup,
  };
};

export default useService;
