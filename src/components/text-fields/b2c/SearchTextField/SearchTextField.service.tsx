import { useState } from 'react';
import useOnClickOutside from '../../../../general-services/useOnClickOutside';
import cn from 'classnames';
import { t } from 'i18next';

const useService = ( suggestions: any, searchTextFieldEl: any ) => {
  const [ dropDownIsActive, setDropDownIsActive ] = useState<boolean>( false );
  const [ selected, setSelected ] = useState<string>( '' );
  const [ filtered, setFiltered ] = useState<string[]>( [] );
  const [ input, setInput ] = useState<any>( '' );

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

    if ( input.length > 1 ) {
      getResults( input.toLowerCase() );
      setDropDownIsActive( true );
    } else {
      setDropDownIsActive( false );
      setFiltered( [] );
    }
  };

  const suggestionClick = ( e: any ) => {
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

  const inputValue = input ? input : selected;
  const searchTermText = inputValue;

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
