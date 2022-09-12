import { FC } from 'react';
import Popover from '../../../../components/Popover';
import './TextField.scss';
import formService from '../../../../general-services/form.service';
import ActionIcon from '../../../../components/buttons/ActionIcon';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

type Props = {
  label: string;
  inputType: string;
  iconId: string;
  size: any;
  maxInputLength: number;
  helpText: string;
  required: boolean;
  disabled: boolean;
};

export const TextField: FC<Props> = ( {
  label,
  inputType,
  iconId,
  size,
  maxInputLength,
  helpText,
  required,
  disabled,
} ) => {
  const { value, isPasswordVisible, activePopover, passwordRules, errors, handleChange, showPasswordRules } =
    formService();

  return (
    <div
      className={ cn(
        'b2b-text-field',
        `b2b-text-field--${ size }`,
        required && errors[inputType] && 'b2b-text-field--error',
        disabled && 'b2b-text-field--disabled',
      ) }
    >
      <div className='b2b-text-field__input-container'>
        <input
          className='b2b-text-field__input'
          type={ isPasswordVisible ? 'text' : inputType }
          id={ `${ label }-${ inputType }` }
          name={ inputType }
          onChange={ handleChange }
          placeholder=' '
          maxLength={ maxInputLength }
        />

        <label htmlFor={ `${ label }-${ inputType }` }>
          { label }
          { required && <span>●</span> }
        </label>

        { inputType && (
          <div className='b2b-text-field__icon'>
            { inputType === 'password' ? (
              <div onClick={ showPasswordRules }>
                { isPasswordVisible ? (
                  <ActionIcon iconId={ 'show-password' } clickable={ true } />
                ) : (
                  <ActionIcon iconId={ 'hide-password' } clickable={ true } />
                ) }
              </div>
            ) : (
              <ActionIcon iconId={ iconId } />
            ) }
          </div>
        ) }
      </div>

      <div className='b2b-text-field__notifications'>
        { required && errors[inputType] && <div className='b2b-text-field--error-message'>{ errors[inputType] }</div> }

        { helpText && !errors[inputType] && <div className='b2b-text-field__help-text'>{ helpText }</div> }

        { maxInputLength > 0 && (
          <div className='b2b-text-field__input-length'>
            { Object.values( value )[0] ? Object.values( value )[0].length : '0' }/{ maxInputLength }
          </div>
        ) }
      </div>

      <CSSTransition
        in={ activePopover }
        timeout={ 300 }
        classNames={ {
          enterActive: 'b2b-text-field__popover--animation-active',
          enterDone: 'b2b-text-field__popover--animation-done',
        } }
        unmountOnExit
      >
        <Popover
          dimensions={ { width: 'auto', height: 'auto' } }
          positions={ { x: '-20px', y: '-150px' } }
          arrowDirection={ 'down' }
          arrowPositions={ { x: '-100px', y: '' } }
        >
          <div className='b2b-text-field__popover'>
            { Object.values( passwordRules ).map( ( value: any, index: any ) => {
              return (
                <li
                  className={ cn( 'b2b-text-field__popover--error',
                    value.status && 'b2b-text-field__popover--validate' ) }
                  key={ index }
                >
                  <div className='b2b-text-field__popover__icon'>
                    <ActionIcon iconId='approval-icon' />
                  </div>
                  { value.errorMessage }
                </li>
              );
            } ) }
          </div>
        </Popover>
      </CSSTransition>
    </div>
  );
};

export default TextField;
