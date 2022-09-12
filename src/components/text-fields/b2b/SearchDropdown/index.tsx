import { FC, useRef } from 'react';
import './SearchDropdown.scss';
import useService from './SearchDropdown.service';
import ActionIcon from '../../../../components/buttons/ActionIcon';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

type Props = {
  label: string;
  disabled: boolean;
  suggestions?: string[];
};

export const SearchDropdown: FC<Props> = ( { label, disabled, suggestions } ) => {
  const dropdownEl = useRef( null );
  const { input, dropDownIsActive, clickHandler, showResultsHandler, renderAutocomplete } = useService(
    suggestions,
    dropdownEl,
  );

  return (
    <div
      className={ cn(
        'b2b-search-dropdown',
        disabled && 'b2b-search-dropdown--disabled',
        dropDownIsActive && 'b2b-search-dropdown--is-active',
      ) }
      ref={ dropdownEl }
    >
      <input
        type='text'
        autoComplete='off'
        id={ `${ label }-search-dropdown` }
        // onClick={(e) => clickHandler(e, 'open')}
        onChange={ showResultsHandler }
        value={ input }
        placeholder=' '
      />
      <div className='b2b-search-dropdown__icon' onClick={ ( e ) => clickHandler( e, 'toggle' ) }>
        <ActionIcon iconId={ 'dropdown-arrow-expand' } clickable={ true } />
      </div>

      <label htmlFor={ `${ label }-search-dropdown` }>{ label }</label>

      { input && (
        <div className='b2b-search-dropdown__clear-btn' onClick={ ( e ) => clickHandler( e, 'clear' ) }>
          <ActionIcon iconId={ 'cancel' } />
        </div>
      ) }
      <CSSTransition
        in={ dropDownIsActive }
        timeout={ 100 }
        classNames={ {
          enterActive: 'b2b-search-dropdown__results--animation-active',
          enterDone: 'b2b-search-dropdown__results--animation-done',
        } }
        unmountOnExit
      >
        <div className='b2b-search-dropdown__results'>{ renderAutocomplete() }</div>
      </CSSTransition>
    </div>
  );
};

export default SearchDropdown;
