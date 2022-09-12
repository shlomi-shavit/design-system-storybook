import { FC } from 'react';
import './ButtonWithIcon.scss';
import TextualIcon from '../TextualIcon';
import cn from 'classnames';
import { t } from 'i18next';

type Props = {
  label?: string;
  size: string;
  iconSide?: string;
  iconId?: string;
  loader?: boolean;
  overrideClass?: string;
  disabled?: boolean;
  clickHandler?: any;
};

export const ButtonWithIcon: FC<Props> = ( {
  label,
  size,
  iconSide,
  iconId,
  loader,
  overrideClass,
  disabled,
  clickHandler,
} ) => {
  return (
    <button
      data-testid='button-with-icon'
      type='button'
      className={ cn(
        overrideClass,
        'button-with-icon',
        `button-with-icon--${ size }`,
        iconSide && `button-with-icon--${ iconSide }`,
        loader && 'button-with-icon--loading',
      ) }
      disabled={ disabled }
      onClick={ clickHandler }
    >
      { loader ? (
        <div className='button-with-icon__content'>
          { t( 'buttonWithIcon.loading' ) }
          <div className='button-with-icon--loader' />
        </div>
      ) : (
        <div className='button-with-icon__content'>
          <span>{ label }</span>
          { iconId && (
            <div className='button-with-icon__icon'>
              <TextualIcon iconId={ iconId } />
            </div>
          ) }
        </div>
      ) }
    </button>
  );
};

export default ButtonWithIcon;
