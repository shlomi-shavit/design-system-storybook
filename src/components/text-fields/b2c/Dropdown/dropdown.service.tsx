import { useState } from 'react';
import useOnClickOutside from '../../../../general-services/useOnClickOutside';
import { t } from 'i18next';

const useService = ( dropdownEl?: any ) => {
  const [ dropDownIsActive, setDropDownIsActive ] = useState<boolean>( false );
  const [ selected, setSelected ] = useState( '' );

  const clickHandler = ( e: any, dropdownValue: any ) => {
    e.stopPropagation();

    if ( dropdownValue === 'clear' ) {
      setSelected( '' );
    } else {
      setSelected( dropdownValue );
    }
    setDropDownIsActive( false );
  };

  const selectedDropdown = selected;

  const toggleDropdownHandler = () => {
    setDropDownIsActive( !dropDownIsActive );
  };
  const clickOutsideHandler = () => setDropDownIsActive( false );

  useOnClickOutside( dropdownEl, clickOutsideHandler );

  return {
    dropDownIsActive,
    selected,
    selectedDropdown,
    clickHandler,
    toggleDropdownHandler,
    t,
  };
};

export default useService;
