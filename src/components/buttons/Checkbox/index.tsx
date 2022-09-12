import React, { FC } from 'react';
import './Checkbox.scss';
import useService from './Checkbox.service';
import cn from 'classnames';

type Props = {
  label: string;
  disabled: boolean;
};

export const Checkbox: FC<Props> = ( { label, disabled } ) => {
  const { checkboxGroupStatus, checkboxesLabels, checkedState, changeAll, onChangeHandle } = useService();

  const htmlTemplate = checkboxesLabels.map( ( checkbox: string, index: number ) => {
    return (
      <label key={ checkbox } className={ cn( 'checkbox__label', disabled && 'checkbox__label--disabled' ) }>
        <input onChange={ () => onChangeHandle( index ) } checked={ checkedState[index] } type='checkbox' />
        { checkboxesLabels[index] }
        <span className='checkbox__checkmark' />
      </label>
    );
  } );

  return (
    <div className='checkbox__container'>
      <label
        className={ cn(
          'checkbox__label',
          disabled && 'checkbox__label--disabled',
          !checkboxGroupStatus && 'checkbox__label--indeterminate',
        ) }
      >
        <input checked={ checkboxGroupStatus } type='checkbox' onChange={ () => changeAll() } />
        { label }
        <span className='checkbox__checkmark' />
      </label>

      <div className='checkbox__group'>{ htmlTemplate }</div>
    </div>
  );
};

export default React.memo( Checkbox );
