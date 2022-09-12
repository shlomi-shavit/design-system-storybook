import { useEffect, useState } from 'react';
import { useSearchBarStore } from '../../../stores/search-bar/search-bar-context';

const useService = () => {
  const searchBarStore: any = useSearchBarStore();
  const [ popupActive, setPopupActive ] = useState<boolean>( false );

  const closePopup = () => {
    if ( searchBarStore ) {
      searchBarStore.setPopupIsActive( false );
    } else {
      setPopupActive( false );
    }
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  useEffect( () => {
    if ( searchBarStore ) {
      setPopupActive( searchBarStore.popupIsActive );
    } else {
      setPopupActive( popupActive );
    }
  }, [ searchBarStore.popupIsActive ] );

  return {
    popupActive,
    closePopup,
  };
};

export default useService;
