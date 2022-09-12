import { FC } from 'react';
import './RadioButton.scss';
import useService from './RadioButton.service';
import cn from 'classnames';

type Props = {
  label: string;
  disabled: boolean;
};

export const RadioButton: FC<Props> = ( { label, disabled } ) => {
  const { checked, handleClick } = useService();

  return (
    <label className={ cn( 'radio-button__container', disabled && 'radio-button__container--disabled' ) }>
      <input onClick={ handleClick } defaultChecked={ checked } type='checkbox' />
      { label }
      <span className='radio-button__checkmark' />
    </label>
  );
};

export default RadioButton;
