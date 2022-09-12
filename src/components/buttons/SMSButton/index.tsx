import { FC } from 'react';
import './SMSButton.scss';
import useService from './SMSButton-service';
import Popover from '../../Popover';
import ActionIcon from '../ActionIcon';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

type Props = {
  label: string;
  inputLabel: string;
  disabled: boolean;
  props: any;
};

export const SMSButton: FC<Props> = ( { label, inputLabel, disabled } ) => {
  const { input, popoverIsActive, selected, onClickHandler, deleteSmsHandler, inputHandler } = useService();

  return (
    <div
      className={ cn(
        'sms-button',
        disabled && 'sms-button--disabled',
        popoverIsActive && 'sms-button--popover-is-active',
        selected && 'sms-button--selected',
      ) }
    >
      <CSSTransition
        in={ popoverIsActive }
        timeout={ 300 }
        unmountOnExit
        classNames={ {
          enterActive: 'sms-button__popover--animation-active',
          enterDone: 'sms-button__popover--animation-done',
        } }
      >
        <Popover
          dimensions={ { width: '363px', height: '100px' } }
          positions={ { x: '-160px', y: '-120px' } }
          arrowDirection={ 'down' }
          arrowPositions={ { x: '10px', y: '' } }
        >
          <div className='sms-button__popover-content'>
            <div className='sms-button__popover-input-wrapper'>
              <input type='tel' id='input' onChange={ ( value ) => inputHandler( value ) } value={ input }
                placeholder=' ' />
              <label>{ inputLabel }</label>
            </div>

            <div className='sms-button__popover__icon' onClick={ () => onClickHandler( 'approve' ) }>
              <ActionIcon iconId='approval-icon' />
            </div>

            <div className='sms-button__popover__icon' onClick={ () => onClickHandler( 'cancel' ) }>
              <ActionIcon iconId='exit' />
            </div>
          </div>
        </Popover>
      </CSSTransition>

      <button type='button' className='sms-button__button' id='sms-button' onClick={ () => onClickHandler() }>
        <div className='sms-button__button__phone-icon'>
          <ActionIcon iconId='sms' />
        </div>

        { selected && (
          <div className='sms-button__button__delete-icon' onClick={ deleteSmsHandler }>
            <ActionIcon iconId='delete' />
          </div>
        ) }
      </button>

      <label className='sms-button__label' htmlFor='sms-button'>
        { label }
      </label>
    </div>
  );
};
