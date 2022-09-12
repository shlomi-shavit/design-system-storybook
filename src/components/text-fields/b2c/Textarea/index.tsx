import { FC } from 'react';
import './Textarea.scss';
import { ActionIcon } from '../../../buttons/ActionIcon';
import formService from '../../../../general-services/form.service';
import useService from './Textarea.service';
import cn from 'classnames';
import { t } from 'i18next';

type Props = {
  label: string;
  helpText: string;
  maxInputLength: number;
  isCarousel: boolean;
  greetingArray: string[];
  required: boolean;
  disabled: boolean;
};

export const Textarea: FC<Props> = ( {
  label,
  helpText,
  maxInputLength,
  isCarousel,
  greetingArray,
  required,
  disabled,
} ) => {
  const { value, errorList, handleChange, deleteFieldContent, formStore } = formService();
  const { greetingIndex, textareaValue, greetingCarousel } = useService( isCarousel, greetingArray, value,
    handleChange );

  return (
    <div
      className={ cn(
        'textarea__container',
        required && errorList( 'textarea' ) && formStore.hasError && 'textarea--error',
        disabled && 'textarea--disabled',
      ) }
    >
      <label htmlFor={ `${ label }-textarea` }>
        { label }
        { required && <span>●</span> }
      </label>

      <textarea
        id={ `${ label }-textarea` }
        name='textarea'
        className='textarea'
        onChange={ ( e ) => handleChange( e, 'textarea', '' ) }
        value={ textareaValue() }
        placeholder={ t( 'textarea.placeholder' ) }
        maxLength={ maxInputLength }
      />

      <div className='textarea__notifications'>
        { required && errorList( 'textarea' ) && formStore.hasError && (
          <div className='textarea--error-message'>{ errorList( 'textarea' ) }</div>
        ) }

        { isCarousel && (
          <div className='textarea__carousel'>
            <div className='textarea__carousel__btn' onClick={ () => greetingCarousel( 1 ) }>
              <ActionIcon iconId='pagination-arrow-next' />
            </div>
            <div className='textarea__carousel__pagination'>{ `${ greetingIndex + 1 }/${ greetingArray.length }` }</div>
            <div className='textarea__carousel__btn' onClick={ () => greetingCarousel( -1 ) }>
              <ActionIcon iconId='pagination-arrow-prev' />
            </div>
          </div>
        ) }

        { helpText && !formStore.hasError && <div className='textarea__help-text'>{ helpText }</div> }
        <div onClick={ deleteFieldContent } className='textarea__delete-button'>
          { t( 'textarea.cleanAll' ) }
        </div>
        { maxInputLength && (
          <div className='textarea__input-length'>
            { Object.values( value )[0] ? Object.values( value )[0].length : '0' }/{ maxInputLength }
          </div>
        ) }
      </div>
    </div>
  );
};

export default Textarea;
