import { FC } from 'react';
import './InfoPopup.scss';
import { CSSTransition } from 'react-transition-group';
import useService from './InfoPopup.service';
import ActionIcon from '../../../components/buttons/ActionIcon';
import { observer } from 'mobx-react-lite';
import Spinner from '../../addons/Spinner';
import cn from 'classnames';

type Props = {
  popupIsActive?: boolean;
  popupTitle: string;
  popupContent?: string;
  size?: string;
  children?: any;
  useServiceOverride?: any;
  overrideClass?: string;
};

export const InfoPopup: FC<Props> = ( {
  popupIsActive,
  popupTitle,
  popupContent,
  size,
  children,
  useServiceOverride,
  overrideClass,
} ) => {
  let popupActive: boolean | undefined, closePopup: any;
  if ( useServiceOverride ) {
    ( { popupActive, closePopup } = useServiceOverride() );
  } else {
    ( { popupActive, closePopup } = useService( popupIsActive ) );
  }

  return (
    <div data-testid='info-popup'>
      <CSSTransition
        in={ popupActive }
        timeout={ 200 }
        classNames={ {
          enterActive: 'popup--animation-active',
          enterDone: 'popup--animation-done',
        } }
        unmountOnExit
      >
        <div className='popup__container'>
          <div className={ cn( 'popup', size, overrideClass ) }>
            <div className='popup__header'>
              { popupTitle }
              <div className='popup__header__close-button' onClick={ closePopup }>
                <ActionIcon iconId='exit' />
              </div>
            </div>

            <div className='popup__content'>{ popupContent ? popupContent : children ? children : <Spinner /> }</div>
          </div>

          <div className='popup--onblur-bg' onClick={ closePopup } />
        </div>
      </CSSTransition>
    </div>
  );
};

export default observer( InfoPopup );
