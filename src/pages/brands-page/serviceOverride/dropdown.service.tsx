import { useState } from 'react';
import useOnClickOutside from '../../../general-services/useOnClickOutside';
import { useSearchBarStore } from '../../../stores/search-bar/search-bar-context';
import { useTranslation } from 'react-i18next';

const useService = ( dropdownEl: any ) => {
  const [ dropDownIsActive, setDropDownIsActive ] = useState<boolean>( false );
  const [ selected, setSelected ] = useState( '' );
  const dropDownId = dropdownEl.current ? dropdownEl.current.id : '';
  const { t } = useTranslation();
  const searchBarStore: any = useSearchBarStore();
  const hasSearchBarStore = searchBarStore && searchBarStore.searchBarValues;

  const storeFieldIndex = ( fieldId: any ) => {
    if ( hasSearchBarStore ) {
      return searchBarStore.searchBarValues.findIndex( ( fieldData: any ) => fieldData.fieldId === fieldId );
    }
  };

  const clickHandler = ( e: any, dropdownValue: any ) => {
    e.stopPropagation();

    if ( dropdownValue === 'clear' ) {
      if ( hasSearchBarStore ) {
        searchBarStore.removeSelectedField( dropDownId );
        setSelected( '' );
      }
      setSelected( '' );
    } else {
      if ( hasSearchBarStore ) {
        searchBarStore.setSelectedField( dropDownId, dropdownValue );
        setSelected( searchBarStore.searchBarValues[storeFieldIndex( dropDownId )].fieldValue );
      } else {
        setSelected( dropdownValue );
      }
    }
    setDropDownIsActive( false );
  };

  const selectedDropdown =
    hasSearchBarStore && storeFieldIndex( dropDownId ) !== -1
      ? searchBarStore.searchBarValues[storeFieldIndex( dropDownId )].fieldValue
      : `${ hasSearchBarStore ? '' : selected }`;

  const toggleDropdownHandler = () => setDropDownIsActive( !dropDownIsActive );

  const clickOutsideHandler = () => setDropDownIsActive( false );
  useOnClickOutside( dropdownEl, clickOutsideHandler );

  return {
    t,
    dropDownIsActive,
    selectedDropdown,
    storeFieldIndex,
    clickHandler,
    toggleDropdownHandler,
  };
};

export default useService;
