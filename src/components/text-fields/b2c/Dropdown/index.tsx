import { FC, useRef } from 'react';
import './Dropdown.scss';
import useService from './dropdown.service';
import ActionIcon from '../../../buttons/ActionIcon';
import cn from 'classnames';

type Props = {
  label?: string;
  id?: string;
  placeholder?: string;
  dropdownOptions: any[];
  clearSelectionOption?: true;
  disabled?: boolean;
  overrideClass?: string;
  useServiceOverride?: any;
};

export const Dropdown: FC<Props> = ( {
  label,
  id,
  placeholder,
  dropdownOptions,
  clearSelectionOption,
  disabled,
  overrideClass,
  useServiceOverride,
} ) => {
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
        className={ cn( selectedDropdown === option && 'dropdown__results--active' ) }
        onClick={ ( e ) => clickHandler( e, option ) }
      >
        { dropdownOptions[index] }
      </li>
    );
  } );

  return (
    <div
      data-testid='dropdown'
      className={ cn( overrideClass, 'dropdown__wrapper', disabled && 'dropdown__wrapper--disabled' ) }
      ref={ dropdownEl }
      onClick={ toggleDropdownHandler }
      id={ id }
    >
      { label && <label className='dropdown__label'>{ label }</label> }

      <div
        className={ cn(
          'dropdown',
          dropDownIsActive && 'dropdown--is-active',
          selectedDropdown && 'dropdown--is-selected',
          disabled && 'dropdown--disabled',
        ) }
      >
        { !selectedDropdown && <span className='dropdown__placeholder'>{ placeholder }</span> }
        <div className='dropdown--selected'>{ selectedDropdown }</div>

        <div className='dropdown__icon'>
          <ActionIcon iconId='dropdown-arrow-expand' />
        </div>

        <div className='dropdown__results'>
          <ul>
            { dropdownOptions.length !== 0 ? (
              <>
                { clearSelectionOption && (
                  <li onClick={ ( e ) => clickHandler( e, 'clear' ) }>{ t( 'dropdown.clearSelection' ) }</li>
                ) }
                { dropdownOptionEl }
              </>
            ) : (
              <div className='dropdown__results--loading' />
            ) }
          </ul>
        </div>
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  clearSelectionOption: true,
};

export default Dropdown;
