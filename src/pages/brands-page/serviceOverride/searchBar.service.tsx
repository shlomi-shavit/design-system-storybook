import { useCallback, useEffect, useState } from 'react';
import { useSearchBarStore } from '../../../stores/search-bar/search-bar-context';
import { t } from 'i18next';

const useService = ( partnerId?: number ) => {
  const searchBarStore: any = useSearchBarStore();
  const [ allBrandsResults, setAllBrandsResults ] = useState( [] );
  const [ filteredBrandsResults, setFilteredBrandsResults ] = useState<any>( [] );
  const [ searchBarFieldsData, setSearchBarFieldsData ] = useState<any>( {
    regions: t( 'searchBar.dropdownOptions', { returnObjects: true } ),
    categories: t( 'searchBar.dropdownOptions', { returnObjects: true } ),
  } );
  const hasSearchBarStore = searchBarStore && searchBarStore.searchBarValues;

  const setSearchBarData = ( data: any ) => {
    const regions = data.regions.map( ( region: any ) => region.name );
    const categories = data.categories.map( ( category: any ) => category.name );
    const searchTerms = data.brands.map( ( brand: any ) => ( {
      title: brand.title,
      searchTerms: JSON.parse( brand.searchTerms ),
    } ) );

    setAllBrandsResults( data.brands );
    setSearchBarFieldsData( {
      regions,
      categories,
      searchTerms,
    } );
  };

  const data = useCallback( async ( url: string ) => {
    try {
      const response = await fetch( url );
      if ( !response.ok ) {
        const message = `An error has occurred: ${ response.status }`;
        console.log( 'Error message: ', message );
      }
      const results = await response.json();

      setSearchBarData( results );
      if ( searchBarStore && searchBarStore.partnerData.length === 0 ) {
        searchBarStore.setPartnerData( results.supplier );
        searchBarStore.setBrandsResults( results.brands );
      }
      return results;
    } catch ( error ) {
      console.log( 'Error: ', error );
    }
  }, [] );

  const searchClickHandler = () => {
    if ( searchBarStore ) {
      searchBarStore.setShowSearchBarResults();
    }
    filterResultsHandler();

    // fixing LazyLoad appearance after search bar filtering
    const windowScrollPosition = window.scrollY;
    window.scrollTo( 0, windowScrollPosition + 1 );
    window.scrollTo( 0, windowScrollPosition );
  };

  const clearSearchHandler = () => {
    if ( searchBarStore ) {
      searchBarStore.clearAllFields();
      searchBarStore.setShowSearchBarResults();
    }
  };

  const filterResultsHandler = () => {
    let filteredResults = allBrandsResults;
    const searchBarStoreValues: any = hasSearchBarStore ? Object.values( searchBarStore.searchBarValues ) : [];

    for ( let i = 0; i < searchBarStoreValues.length; i++ ) {
      const searchFieldInput =
        searchBarStoreValues[i].subPropertyKey === 'title' &&
        searchBarStore.searchBarValues[i].fieldValue.toLowerCase();

      filteredResults = filteredResults.filter( ( brand: any ) => {
        const convertSearchTermsToArray =
          typeof brand.searchTerms === 'string' ? JSON.parse( brand.searchTerms ) : brand.searchTerms;
        const brandTerms = convertSearchTermsToArray.find(
          ( element: string ) => element.includes( searchFieldInput ) );

        const removeWhiteSpace = ( str: string ) => str.replace( /\s/g, '' );
        const brandProperty: any = brand[searchBarStoreValues[i].subPropertyKey];
        const storeTitleValue = removeWhiteSpace( searchBarStoreValues[i].fieldValue ).toLowerCase();

        if ( brandProperty && brandProperty.length > 0 && Array.isArray( brandProperty ) ) {
          return brandProperty.find( ( element: any ) => element.name === searchBarStoreValues[i].fieldValue );
        } else if ( brandProperty && typeof brandProperty === 'string' ) {
          if ( removeWhiteSpace( brandProperty ).toLowerCase().includes( storeTitleValue ) || brandTerms ) {
            return brandProperty;
          }
        }
      } );
    }
    setFilteredBrandsResults( filteredResults );
    if ( searchBarStore && searchBarStore.showSearchBarResults ) {
      searchBarStore.setBrandsResults( filteredResults );
      searchBarStore.setShowSearchBarResults();
    }
    return filteredResults;
  };

  const disabledHandler = () => {
    if ( hasSearchBarStore ) {
      return !searchBarStore.searchBarValues.length;
    }
    return true;
  };

  const autocompleteAfterFiltering =
    hasSearchBarStore && filteredBrandsResults.length ? filteredBrandsResults : searchBarFieldsData.searchTerms;

  useEffect( () => {
    const hasResultsInStore = hasSearchBarStore && !searchBarStore.brandsResults.length;
    if ( partnerId && hasResultsInStore ) {
      const url = `${ process.env.REACT_APP_BASE_URL }brands/${ partnerId }/options`;
      data( url );
    }
    filterResultsHandler();
    if ( hasSearchBarStore && searchBarStore.searchBarValues.length === 0 ) {
      searchClickHandler();
    }
  }, [ hasSearchBarStore && searchBarStore.searchBarValues.length, partnerId ] );

  return {
    searchBarFieldsData,
    autocompleteAfterFiltering,
    searchClickHandler,
    clearSearchHandler,
    disabledHandler,
    t,
  };
};

export default useService;
