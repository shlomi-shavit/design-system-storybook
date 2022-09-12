import { FC } from 'react';
import './TextField.scss';
import formService from '../../../../general-services/form.service';
import cn from 'classnames';

type Props = {
  label?: string;
  inputName?: string;
  placeholder?: string;
  inputType: any;
  required?: boolean;
  disabled?: boolean;
  overrideClass?: string;
};

export const TextField: FC<Props> = ( { label, placeholder, inputType, required, disabled, overrideClass } ) => {
  const { value, isPasswordVisible, handleChange, errorList, formStore } = formService();

  return (
    <div
      data-testid='text-field'
      className={ cn(
        'text-field',
        Object.values( value )[0]?.length && 'text-field--is-filled',
        required && errorList( inputType ) && formStore.hasError && 'text-field--error',
        disabled && 'text-field--disabled',
        overrideClass,
      ) }
    >
      <div className='text-field__input-container'>
        { label && (
          <label htmlFor={ `${ label }-${ inputType }` }>
            { label }
            { required && <span>●</span> }
          </label>
        ) }
        <input
          className='text-field__input'
          id={ `${ label }-${ inputType }` }
          type={ isPasswordVisible ? 'text' : inputType }
          name={ inputType }
          autoComplete='off'
          onChange={ handleChange }
          placeholder={ placeholder }
        />
      </div>

      <div className='text-field__notifications'>
        { required && errorList( inputType ) && formStore.hasError && (
          <div className='text-field__error-message'>{ errorList( inputType ) }</div>
        ) }
      </div>
    </div>
  );
};

export default TextField;
