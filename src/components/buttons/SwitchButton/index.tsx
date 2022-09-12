import { FC } from 'react';
import './SwitchButton.scss';
import cn from 'classnames';

type Props = {
  disabled: boolean;
};

export const SwitchButton: FC<Props> = ( { disabled } ) => {
  return (
    <label className={ cn( 'switch-button', disabled && 'switch-button--disabled' ) }>
      <input disabled={ disabled } type='checkbox' />
      <span className='switch-button__slider' />
    </label>
  );
};

export default SwitchButton;
