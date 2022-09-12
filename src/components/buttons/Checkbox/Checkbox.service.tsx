import { useEffect, useState } from 'react';
import { t } from 'i18next';

const useService = () => {
  const checkboxesLabels: any = t( 'checkBox.childrenLabels', { returnObjects: true } );
  const [ checkboxGroupStatus, setCheckboxGroupStatus ] = useState<boolean>( false );
  const [ checkedState, setCheckedState ] = useState( new Array( checkboxesLabels.length ).fill( false ) );

  const checkboxesStatus = ( checkboxesStatusArray: any ) => {
    return checkboxesStatusArray.every( ( checkboxStatus: Boolean ) => checkboxStatus );
  };

  const changeAll = () => {
    let updatedCheckedState: boolean[];
    if ( checkboxGroupStatus ) {
      updatedCheckedState = checkedState.map( () => false );
    } else {
      updatedCheckedState = checkedState.map( () => true );
    }
    setCheckedState( updatedCheckedState );
  };

  const onChangeHandle = ( position: any ) => {
    const updatedCheckedState = checkedState.map( ( item, index ) => ( index === position ? !item : item ) );
    setCheckedState( updatedCheckedState );
    checkboxesStatus( checkedState );
  };

  useEffect( () => {
    if ( checkboxesStatus( checkedState ) ) {
      setCheckboxGroupStatus( true );
    } else {
      setCheckboxGroupStatus( false );
    }
  }, [ checkedState ] );

  return {
    checkboxGroupStatus,
    checkboxesLabels,
    checkedState,
    changeAll,
    onChangeHandle,
  };
};

export default useService;
