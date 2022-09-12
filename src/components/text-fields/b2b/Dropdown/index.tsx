import { FC, useRef } from 'react';
import './Dropdown.scss';
import useService from './dropdown.service';
import ActionIcon from '../../../../components/buttons/ActionIcon';
import cn from 'classnames';

type Props = {
  label: string;
  dropdownUp: boolean;
  dropdownOptions: string[];
  disabled: boolean;
  useServiceOverride?: any;
};

export const Dropdown: FC<Props> = ( { label, dropdownUp, dropdownOptions, disabled, useServiceOverride } ) => {
  const dropdownEl = useRef( null );
  let clickHandler: any, selectedDropdown: any, toggleDropdownHandler: any, dropDownIsActive: any, t: any;
  if ( useServiceOverride ) {
    ( { clickHandler, selectedDropdown, toggleDropdownHandler, dropDownIsActive, t } = useServiceOverride(
      dropdownEl ) );
  } else {
    ( { clickHandler, selectedDropdown, toggleDropdownHandler, dropDownIsActive, t } = useService( dropdownEl ) );
  }

  const dropdownOptionEl = dropdownOptions.map( ( option, index ) => {
    return (
      <li
        key={ option }
        className={ cn( 'b2b-dropdown__option', selectedDropdown === option && 'b2b-dropdown__option--is-active' ) }
        onClick={ ( e ) => clickHandler( e, option ) }
      >
        { dropdownOptions[index] }
      </li>
    );
  } );

  return (
    <div
      className={ cn(
        'b2b-dropdown',
        dropDownIsActive && 'b2b-dropdown--is-active',
        selectedDropdown && 'b2b-dropdown--selected',
        disabled && 'b2b-dropdown--disabled',
        dropdownUp && 'b2b-dropdown--up-mode',
      ) }
      ref={ dropdownEl }
      onClick={ toggleDropdownHandler }
    >
      <label>{ label }</label>

      <div className='b2b-dropdown--selected-value'>{ selectedDropdown }</div>

      <div className='b2b-dropdown__icon'>
        <ActionIcon iconId={ 'dropdown-arrow-expand' } />
      </div>

      <ul>
        <li onClick={ ( e ) => clickHandler( e, 'clear' ) }>{ t( 'dropdown.clearSelection' ) }</li>
        { dropdownOptionEl }
      </ul>
    </div>
  );
};

export default Dropdown;
