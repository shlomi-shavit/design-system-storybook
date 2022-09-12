import { FC } from 'react';
import './SearchBarResults.scss';
import useService from './SearchBarResults.service';
import InfoPopup from '../../popups/InfoPopup';

type Props = {
  results: object;
  showResults: boolean;
  useServiceOverride?: any;
  infoPopupServiceOverride?: any;
};

export const SearchBarResults: FC<Props> = ( { results, useServiceOverride, infoPopupServiceOverride } ) => {
  let itemsTemplate: any, popupContentTemplate: any, loading: any, t: any;
  if ( useServiceOverride ) {
    ( { itemsTemplate, popupContentTemplate, loading, t } = useServiceOverride( results ) );
  } else {
    ( { itemsTemplate, t } = useService() );
  }
  return (
    <div className='search-bar-results'>
      { itemsTemplate.length === 0 ? loading : itemsTemplate }
      <InfoPopup
        popupTitle={ t( 'searchBarResults.popupTitle' ) }
        size='popup-xs'
        useServiceOverride={ infoPopupServiceOverride }
      >
        { popupContentTemplate }
      </InfoPopup>
    </div>
  );
};

export default SearchBarResults;
