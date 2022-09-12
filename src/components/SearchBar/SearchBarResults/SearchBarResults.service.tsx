import React from 'react';
import noResultsSvg from '../../../assets/svgs/large-icons/b2c/no-results.svg';
import { t } from 'i18next';

const useService = () => {
  const itemsTemplate = (
    <div className='search-bar-results__no-results'>
      <span>{ t( 'searchBarResults.noResultsTemplate' ) }</span>
      <img src={ noResultsSvg } alt={ t( 'searchBarResults.noResultsTemplate' ) } />
    </div>
  );

  return {
    itemsTemplate,
    t,
  };
};

export default useService;
