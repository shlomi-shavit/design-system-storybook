import { FC, useRef } from 'react';
import formService from '../../../general-services/form.service';
import TextField from '../../text-fields/b2c/TextField';
import './Form.scss';
import Button from '../../buttons/Button';
import { observer } from 'mobx-react-lite';
import { t } from 'i18next';

type Props = {};

export const Form: FC<Props> = observer( ( {} ) => {
  const formRef = useRef( null );
  const { handleSubmit } = formService( formRef );

  return (
    <div>
      <form ref={ formRef } onSubmit={ handleSubmit } noValidate>
        <TextField label={ t( 'form.textField' ) } inputType='text' required={ true } />
        <TextField label={ t( 'form.emailField' ) } inputType='email' required={ true } />
        <TextField label={ t( 'form.passwordField' ) } inputType='password' required={ true } />
        <Button size='medium' label={ 'click' } />
      </form>
    </div>
  );
} );

export default Form;
