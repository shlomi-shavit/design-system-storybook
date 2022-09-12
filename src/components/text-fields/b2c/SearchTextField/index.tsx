import { FC, useRef } from 'react';
import './SearchTextField.scss';
import useService from './SearchTextField.service';
import ActionIcon from '../../../../components/buttons/ActionIcon';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

type Props = {
  label?: string;
  id?: string;
  iconId?: string;
  disabled?: boolean;
  suggestions?: any;
  placeholder?: string;
  overrideClass?: string;
  useServiceOverride?: any;
};

export const SearchTextField: FC<Props> = ( {
  label,
  id,
  iconId,
  disabled,
  suggestions = [],
  placeholder,
  overrideClass,
  useServiceOverride,
} ) => {
  const searchTextFieldEl = useRef( null );

  let dropDownIsActive: boolean,
    input: string,
    selected: string,
    searchTermText: string,
    clickHandler: Function,
    showResultsHandler: any,
    renderAutocomplete: Function;
  if ( useServiceOverride ) {
    ( { dropDownIsActive, input, selected, searchTermText, clickHandler, showResultsHandler, renderAutocomplete } =
      useServiceOverride( suggestions, searchTextFieldEl ) );
  } else {
    ( { dropDownIsActive, input, selected, searchTermText, clickHandler, showResultsHandler, renderAutocomplete } =
      useService( suggestions, searchTextFieldEl ) );
  }

  return (
    <div
      data-testid='search-text-field'
      className={ cn(
        overrideClass,
        'search-text-field',
        input && 'search-text-field--is-filled',
        dropDownIsActive && 'search-text-field--is-active',
        selected && 'search-text-field--selected',
        disabled && 'search-text-field--disabled',
      ) }
      ref={ searchTextFieldEl }
      id={ id }
    >
      { label && (
        <label
          className='search-text-field__label'
          htmlFor={ `${ label }-search-textfield` }
          onClick={ ( e ) => clickHandler( e, 'open' ) }
        >
          { label }
        </label>
      ) }

      <div className='search-text-field__input'>
        <input
          type='text'
          autoComplete='off'
          id={ `${ label }-search-textfield` }
          onChange={ showResultsHandler }
          value={ searchTermText }
          placeholder={ placeholder }
        />

        { searchTermText ? (
          <div className='search-text-field__results--clear-icon' onClick={ ( e ) => clickHandler( e, 'clear' ) }>
            <ActionIcon iconId={ 'cancel' } />
          </div>
        ) : (
          <div className='search-text-field__results__icon'>
            <ActionIcon iconId={ iconId } />
          </div>
        ) }
      </div>

      <CSSTransition
        in={ dropDownIsActive }
        timeout={ 100 }
        classNames={ {
          enterActive: 'search-text-field__results--animation-active',
          enterDone: 'search-text-field__results--animation-done',
        } }
        unmountOnExit
      >
        <div className='search-text-field__results'>{ renderAutocomplete() }</div>
      </CSSTransition>
    </div>
  );
};

SearchTextField.defaultProps = {
  iconId: 'search',
};
export default SearchTextField;
