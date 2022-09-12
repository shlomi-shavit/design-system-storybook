import { FC } from 'react';
import './Textarea.scss';
import formService from '../../../../general-services/form.service';
import cn from 'classnames';

type Props = {
  label: string;
  helpText: string;
  maxInputLength: number;
  required: boolean;
  disabled: boolean;
};

export const Textarea: FC<Props> = ( { label, helpText, maxInputLength, required, disabled } ) => {
  const { value, errorList, handleChange, formStore } = formService();

  return (
    <div
      className={ cn(
        'b2b-textarea__container',
        required && errorList( 'textarea' ) && formStore.hasError && 'b2b-textarea--error',
        disabled && 'b2b-textarea--disabled',
      ) }
    >
      <textarea
        id={ `${ label }-textarea` }
        name='textarea'
        className='b2b-textarea'
        onChange={ handleChange }
        maxLength={ maxInputLength }
      />

      <label
        htmlFor={ `${ label }-textarea` }
        className={ cn( 'b2b-textarea__label', Object.values( value )[0] && 'b2b-textarea__label-top' ) }
      >
        { label }
        { required && <span>●</span> }
      </label>

      <div className='b2b-textarea__notifications'>
        { required && errorList( 'textarea' ) && formStore.hasError && (
          <div className='b2b-textarea__error-message'>{ errorList( 'textarea' ) }</div>
        ) }

        { helpText && !formStore.hasError && <div className='b2b-textarea__help-text'>{ helpText }</div> }

        { maxInputLength && (
          <div className='b2b-textarea__input-length'>
            { Object.values( value )[0] ? Object.values( value )[0].length : '0' }/{ maxInputLength }
          </div>
        ) }
      </div>
    </div>
  );
};

export default Textarea;
