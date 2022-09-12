import { useState } from 'react';
import { t } from 'i18next';
import { useFormStore } from '../stores/form/form-context';
import { findIndexByKey, startsWithSpace } from './helpers';
import { toJS } from 'mobx';

const formService = ( formRef?: any ) => {
  const [ value, setValue ] = useState<object>( [] );
  const [ errors, setErrors ] = useState<any>( {} );
  const [ formValues, setformValues ] = useState<object>( [] );
  const [ passwordRules, setPasswordRules ] = useState<object>( {} );
  const [ isPasswordVisible, setIsPasswordVisible ] = useState<boolean>( false );
  const [ activePopover, setActivePopover ] = useState<boolean>( false );
  const formStore: any = useFormStore();

  const validate = ( inputType: string, value: any ) => {

    const setErrorMsg = ( fieldType: any, errorMsg: string ) => {
      setErrors( {
        ...errors,
        [fieldType]: errorMsg,
      } );
      if ( Object.keys( formStore ).length !== 0 ) {
        formStore.setFormErrors( {
          ...errors,
          [fieldType]: errorMsg,
        } );
      }
    };

    const removeErrorMsg = ( errorObj: any, fieldName: any ) => {
      const newErrorObj = Object.assign( {}, errorObj );
      delete newErrorObj[fieldName];
      setErrors( newErrorObj );
      if ( Object.keys( formStore ).length !== 0 ) {
        formStore.removeFieldError( inputType );
      }
    };

    const valueContainsSpecialChars = ( inputValue: string ) => {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test( inputValue );
    };

    const valueHasNumber = ( inputValue: string ) => {
      return /\d/.test( inputValue );
    };

    switch ( inputType ) {
    case 'text':
      if (value?.trim().length <= 2 ||
        valueContainsSpecialChars( value ) ||
        valueHasNumber( value ) ||
        startsWithSpace( value ) ) {
        setErrorMsg( 'text', t( 'form.invalidText' ) );
      } else {
        removeErrorMsg( errors, inputType );
      }
      break;

    case 'tel':
      if ( !new RegExp( /^[+*]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im ).test( value ) ) {
        setErrorMsg( 'tel', t( 'form.invalidNumber' ) );
      } else {
        removeErrorMsg( errors, inputType );
      }
      break;

    case 'textarea':
      if ( value?.length <= 4 ) {
        setErrorMsg( 'textarea', t( 'form.invalidText' ) );
      } else {
        removeErrorMsg( errors, inputType );
      }
      break;

    case 'email':
      if ( !new RegExp( /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/ ).test( value ) ) {
        setErrorMsg( 'email', t( 'form.invalidEmail' ) );
      } else {
        removeErrorMsg( errors, inputType );
      }
      break;

    case 'password':
      const charLength = ( str: string ) => str?.length >= 8;
      const lowerCase = ( str: string ) => /[a-z]/g.test( str );
      const upperCase = ( str: string ) => /[A-Z]/g.test( str );
      const isNumber = ( str: string ) => /\d+/g.test( str );
      const passwordRules = {
        lowerCase: {
          status: lowerCase( value ),
          errorMessage: t( 'form.1smallEngLetter' ),
        },
        upperCase: {
          status: upperCase( value ),
          errorMessage: t( 'form.1capitalEngLetter' ),
        },
        isNumber: { status: isNumber( value ), errorMessage: t( 'form.1digit' ) },
        charLength: {
          status: charLength( value ),
          errorMessage: t( 'form.min8Chars' ),
        },
      };
      let errorMessage = '';

      setPasswordRules( passwordRules );

      const allPassStatusValid = Object.values( passwordRules ).every( ( item ) => {
        if ( !item.status ) {
          errorMessage = item.errorMessage;
        }
        removeErrorMsg( errors, inputType );
        setErrorMsg( 'password', errorMessage );
        return item.status;
      } );

      if ( !allPassStatusValid ) {
        setErrorMsg( 'password', errorMessage );
      } else {
        removeErrorMsg( errors, inputType );
      }
      break;

    case 'date':
      if ( value === null || value === '' ) {
        setErrorMsg( 'date', t( 'form.required' ) );
      } else {
        removeErrorMsg( errors, inputType );
      }
      break;
    default:
      break;
    }
  };

  const handleChange = ( event?: any, fieldType?: any, fieldValue?: any ) => {
    event && event.persist();

    const inputType = ( event && event.target.name ) || fieldType;
    const inputValue = ( event && event.target.value ) || fieldValue;

    validate( inputType, inputValue );

    setValue( {
      ...value,
      [inputType]: inputValue,
    } );
    if ( Object.keys( formStore ).length !== 0 ) {
      formStore.setFormValues( {
        ...value,
        [inputType]: inputValue,
      } );
    }
  };

  const deleteFieldContent = () => {
    const inputType = Object.keys( value )[0];
    setValue( {
      [inputType]: '',
    } );
  };

  const handleSubmit = ( event: any ) => {
    if ( event ) event.preventDefault();

    for ( const element of formRef.current ) {
      if ( element.type !== 'submit' ) {
        validate( element.type, element.value );
        formStore.setHasError( true );
      }
    }

    if ( formStore.formErrors.length === 0 ) {
      setformValues( toJS( formStore.formValues ) );
      formStore.setHasError( false );
    }
  };

  const showPasswordRules = () => {
    const inputValue = Object.values( value )[0] ? Object.values( value )[0] : '';
    if ( inputValue && Object.keys( errors ).length !== 0 ) {
      setActivePopover( true );
    } else {
      setActivePopover( false );
    }
    setIsPasswordVisible( !isPasswordVisible );
  };

  const errorList = ( inputType: any ) => {
    const errorIndex = findIndexByKey( formStore?.formErrors, inputType );
    if ( errorIndex !== undefined && formStore?.formErrors[errorIndex] ) {
      return formStore?.formErrors?.length ? formStore.formErrors[errorIndex][inputType] : errors[inputType];
    } else {
      return errors[inputType];
    }
  };

  return {
    value,
    formValues,
    isPasswordVisible,
    activePopover,
    passwordRules,
    errors,
    formStore,
    errorList,
    handleChange,
    handleSubmit,
    showPasswordRules,
    deleteFieldContent,
  };
};

export default formService;
