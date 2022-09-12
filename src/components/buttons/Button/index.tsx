import { FC } from 'react';
import './Button.scss';
import cn from 'classnames';

type Props = {
  size: string;
  style?: any;
  label?: string;
  loader?: boolean;
  disabled?: boolean;
  overrideClass?: string;
  clickHandler?: any;
};

export const Button: FC<Props> = ( { label, style, size, loader, disabled, overrideClass, clickHandler } ) => {
  return (
    <button
      data-testid='button'
      className={ cn( overrideClass, 'button', `button--${ size }`, `button--${ style }`,
        loader && 'button--loading' ) }
      disabled={ disabled }
      onClick={ clickHandler }
    >
      { loader ? <div className='button__loader' /> : label }
    </button>
  );
};

export default Button;
