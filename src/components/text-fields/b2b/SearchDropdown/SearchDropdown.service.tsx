import { useState } from 'react';
import useOnClickOutside from '../../../../general-services/useOnClickOutside';
import './SearchDropdown.scss';
import cn from 'classnames';
import { t } from 'i18next';

const useService = ( suggestions: any, dropdownEl: any ) => {
  const [ filtered, setFiltered ] = useState<Array<string>>( [] );
  const [ dropDownIsActive, setDropDownIsActive ] = useState<boolean>( false );
  const [ input, setInput ] = useState<string>( '' );

  const getResults = ( input: string ) => {
    const newFilteredSuggestions: any = suggestions.filter(
      ( suggestion: any ) => suggestion.toLowerCase().indexOf( input.toLowerCase() ) > -1,
    );
    setFiltered( newFilteredSuggestions );
  };

  const clickHandler = ( e: any, selectedArg: any ) => {
    e.stopPropagation();
    if ( selectedArg === 'clear' ) {
      setInput( '' );
      setFiltered( [] );
      setDropDownIsActive( false );
    } else if ( selectedArg === 'toggle' ) {
      setDropDownIsActive( !dropDownIsActive );
      getResults( input );
    } else {
      setFiltered( [] );
      setDropDownIsActive( !dropDownIsActive );
      setInput( e.currentTarget.innerText );
    }
  };

  const showResultsHandler = ( e: any ) => {
    const input = e.currentTarget.value;
    setInput( e.currentTarget.value );
    if ( input.length > 1 ) {
      getResults( input );
      setDropDownIsActive( true );
    }
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
                  className={ cn( suggestion === input && 'b2b-search-dropdown__results--selected' ) }
                  key={ suggestion }
                  onClick={ ( e ) => clickHandler( e, '' ) }
                >
                  { highlightText }
                </li>
              );
            } ) }
          </ul>
        );
      } else {
        return <div className='b2b-search-dropdown--no-results'>{ t( 'searchTextField.noResults' ) }</div>;
      }
    }
    return <></>;
  };

  const clickOutsideHandler = () => setDropDownIsActive( false );
  useOnClickOutside( dropdownEl, clickOutsideHandler );

  return {
    input,
    dropDownIsActive,
    clickHandler,
    showResultsHandler,
    renderAutocomplete,
  };
};

export default useService;
