import { useState } from 'react';
import './SearchDropdown.scss';
import useOnClickOutside from '../../../../general-services/useOnClickOutside';
import cn from 'classnames';
import { t } from 'i18next';

const useService = ( suggestions: any, label: string, dropdownEl: any ) => {
  const [ dropDownIsActive, setDropDownIsActive ] = useState<boolean>( false );
  const [ selected, setSelected ] = useState<string>( '' );
  const [ filtered, setFiltered ] = useState<string[]>( [] );
  const [ input, setInput ] = useState<string>( '' );

  const clickHandler = ( e: any, action?: any ) => {
    e.stopPropagation();

    if ( action === 'clear' ) {
      setInput( '' );
      setSelected( '' );
      setDropDownIsActive( false );
    } else {
      setDropDownIsActive( !dropDownIsActive );
      getResults( input );
    }
  };

  const getResults = ( input: string ) => {
    const newFilteredSuggestions: any = suggestions.filter(
      ( suggestion: any ) => suggestion.toLowerCase().indexOf( input.toLowerCase() ) > -1,
    );
    setFiltered( newFilteredSuggestions );
  };

  const showResultsHandler = ( e: any ) => {
    const input = e.currentTarget.value;
    setInput( e.currentTarget.value );
    if ( input.length > 1 ) {
      getResults( input );
    } else {
      getResults( '' );
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
            <li onClick={ suggestionClick } className={ cn( !selected && 'search-dropdown__results--selected' ) }>
              { label }
            </li>
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
                  className={ cn( suggestion === selected && 'search-dropdown__results--selected' ) }
                  key={ suggestion }
                  onClick={ suggestionClick }
                >
                  { highlightText }
                </li>
              );
            } ) }
          </ul>
        );
      } else {
        return <div className='search-dropdown__results--no-results'>{ t( 'searchDropdown.noResults' ) }</div>;
      }
    }
    return <></>;
  };

  const clickOutsideHandler = () => setDropDownIsActive( false );
  useOnClickOutside( dropdownEl, clickOutsideHandler );

  return {
    dropDownIsActive,
    input,
    selected,
    clickHandler,
    showResultsHandler,
    renderAutocomplete,
  };
};

export default useService;
