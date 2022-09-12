import { useState } from 'react';
import useOnClickOutside from '../../../general-services/useOnClickOutside';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useSearchBarStore } from '../../../stores/search-bar/search-bar-context';

const useService = ( suggestions: any, searchTextFieldEl: any ) => {
  const [ dropDownIsActive, setDropDownIsActive ] = useState<boolean>( false );
  const [ selected, setSelected ] = useState<string>( '' );
  const [ filtered, setFiltered ] = useState<string[]>( [] );
  const [ input, setInput ] = useState<any>( '' );
  const searchTextFieldId = searchTextFieldEl.current ? searchTextFieldEl.current.id : '';
  const searchBarStore: any = useSearchBarStore();
  const hasSearchBarStore = searchBarStore && searchBarStore.searchBarValues;
  const { t } = useTranslation();

  const clickHandler = ( e: any, selectedArg: any ) => {
    e.stopPropagation();

    if ( selectedArg === 'close' ) {
      setDropDownIsActive( false );
      setFiltered( [] );
    } else if ( selectedArg === 'clear' ) {
      setInput( '' );
      setSelected( '' );
      setDropDownIsActive( false );
      setFiltered( [] );
      if ( hasSearchBarStore ) {
        searchBarStore.removeSelectedField( searchTextFieldId );
      }
    } else if ( selectedArg === 'open' ) {
      setDropDownIsActive( true );
      getResults( '' );
    } else {
      setDropDownIsActive( false );
      setSelected( selectedArg );
    }
  };

  const getResults = ( input: string ) => {
    const filteredSuggestions = suggestions
      .filter( ( suggestion: any ) => {
        const searchTerms =
          typeof suggestion.searchTerms === 'string' ? JSON.parse( suggestion.searchTerms ) : suggestion.searchTerms;
        const hasTitle = suggestion.title.toLowerCase().includes( input );
        const hasTerms = searchTerms.find( ( element: string ) => element.includes( input ) );

        if ( hasTitle || hasTerms ) {
          return suggestion;
        }
      } )
      .map( ( suggestion: any ) => suggestion.title );

    setFiltered( filteredSuggestions );
  };

  const showResultsHandler = ( e: any ) => {
    const input = e.currentTarget.value;
    setInput( e.currentTarget.value );
    if ( hasSearchBarStore ) {
      searchBarStore.setSelectedField( searchTextFieldId, input );
    }
    if ( input.length > 1 ) {
      getResults( input.toLowerCase() );
      setDropDownIsActive( true );
    } else if ( input.length === 0 ) {
      if ( hasSearchBarStore ) {
        searchBarStore.removeSelectedField( searchTextFieldId );
      }
    } else {
      setDropDownIsActive( false );
      setFiltered( [] );
    }
  };

  const suggestionClick = ( e: any ) => {
    if ( hasSearchBarStore ) {
      searchBarStore.setSelectedField( searchTextFieldId, e.currentTarget.innerText );
    }
    setFiltered( [] );
    setSelected( e.currentTarget.innerText );
    setInput( '' );
    setDropDownIsActive( false );
  };

  const renderAutocomplete = () => {
    if ( dropDownIsActive ) {
      if ( filtered.length ) {
        return (
          <ul>
            { filtered.map( ( suggestion: any ) => {
              const inputIndex = suggestion.toLowerCase().indexOf( input );

              const highlightText = (
                <div>
                  { suggestion.substring( 0, inputIndex ) }
                  <span>{ suggestion.substring( inputIndex, inputIndex + input.length ) }</span>
                  { suggestion.substring( inputIndex + input.length ) }
                </div>
              );

              return (
                <li
                  className={ cn( suggestion === selected && 'search-text-field_results__selected' ) }
                  key={ suggestion }
                  onClick={ suggestionClick }
                >
                  { suggestion }
                </li>
              );
            } ) }
          </ul>
        );
      } else {
        return <div className='search-text-field__results--no-results'>{ t( 'searchTextField.noResults' ) }</div>;
      }
    }
    return <></>;
  };

  const clickOutsideHandler = () => setDropDownIsActive( false );
  useOnClickOutside( searchTextFieldEl, clickOutsideHandler );

  const storeFieldIndex = ( fieldId: any ) => {
    if ( hasSearchBarStore ) {
      return searchBarStore.searchBarValues.findIndex( ( fieldData: any ) => fieldData.fieldId === fieldId );
    }
  };

  const inputValue = input ? input : selected;
  const searchTermText =
    hasSearchBarStore && storeFieldIndex( searchTextFieldId ) !== -1
      ? searchBarStore.searchBarValues[storeFieldIndex( searchTextFieldId )].fieldValue
      : `${ hasSearchBarStore ? '' : inputValue }`;

  return {
    dropDownIsActive,
    input,
    selected,
    searchTermText,
    clickHandler,
    showResultsHandler,
    renderAutocomplete,
  };
};

export default useService;
