import { FC, useRef } from 'react';
import './SearchDropdown.scss';
import useService from './SearchDropdown.service';
import ActionIcon from '../../../../components/buttons/ActionIcon';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { t } from 'i18next';

type Props = {
  label: string;
  iconId: string;
  disabled: boolean;
  suggestions?: string[];
};

export const SearchDropdown: FC<Props> = ( { label, iconId, disabled, suggestions } ) => {
  const dropdownEl = useRef( null );
  const { dropDownIsActive, input, selected, clickHandler, showResultsHandler, renderAutocomplete } = useService(
    suggestions,
    label,
    dropdownEl,
  );

  return (
    <div
      className={ cn(
        'search-dropdown',
        dropDownIsActive && 'search-dropdown--is-active',
        selected && 'search-dropdown--selected',
        disabled && 'search-dropdown--disabled',
      ) }
      ref={ dropdownEl }
    >
      <label className='search-dropdown__label' htmlFor={ `${ label }-search-dropdown` }
        onClick={ ( e ) => clickHandler( e ) }>
        { selected ? selected : label }

        <div className='search-dropdown__label__icon'>
          <ActionIcon iconId={ iconId } />
        </div>
      </label>

      <CSSTransition
        in={ dropDownIsActive }
        timeout={ 100 }
        classNames={ {
          enterActive: 'search-dropdown__results--animation-active',
          enterDone: 'search-dropdown__results--animation-done',
        } }
        unmountOnExit
      >
        <div className='search-dropdown__results'>
          <input
            type='text'
            autoComplete='off'
            id={ `${ label }-search-dropdown` }
            onChange={ showResultsHandler }
            value={ input ? input : selected }
            placeholder={ selected ? selected : t( 'dropdown.search' ) }
          />

          { selected || input.length > 0 ? (
            <div className='search-dropdown__results__clear-icon' onClick={ ( e ) => clickHandler( e, 'clear' ) }>
              <ActionIcon iconId={ 'cancel' } clickable={ true } />
            </div>
          ) : (
            <div className='search-dropdown__results__icon'>
              <ActionIcon iconId={ 'search' } />
            </div>
          ) }

          { renderAutocomplete() }
        </div>
      </CSSTransition>
    </div>
  );
};

export default SearchDropdown;
