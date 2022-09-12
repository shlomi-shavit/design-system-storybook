import { useEffect, useState } from 'react';
import { useSearchBarStore } from '../../stores/search-bar/search-bar-context';
import { useTranslation } from 'react-i18next';

const useService = () => {
  const searchBarStore: any = useSearchBarStore();
  const [ partnerId, setPartnerId ] = useState<number>( 0 );
  const { t } = useTranslation();

  const getPartnerId = () => {
    const url = window.location.href;
    return parseInt( url.substring( url.lastIndexOf( '/' ) + 1 ) );
  };

  const setSearchBarData = () => {
    if ( searchBarStore ) {
      searchBarStore.setPartnerId( getPartnerId() );
    }
    setPartnerId( getPartnerId() );
  };

  useEffect( () => {
    setSearchBarData();
  }, [ searchBarStore && searchBarStore.partnerData ] );

  return {
    partnerId,
    searchBarStore,
    t,
  };
};

export default useService;
