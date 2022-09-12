import { findIndexByKey } from '../../general-services/helpers';

export function createFormStore() {
  return {
    formValues: [] as any,
    formErrors: [] as any,
    hasError: false,

    setHasError(status: boolean) {
      this.hasError = status;
    },

    setFormValues( fieldObject: any ) {
      if ( findIndexByKey( this.formValues, fieldObject ) === -1 ) {
        this.formValues.push( fieldObject );
      } else if ( Object.values( fieldObject )[0] === undefined ) {
        this.removeFieldValue( Object.keys( fieldObject )[0] );
      }
      this.formValues[findIndexByKey( this.formValues, fieldObject )] = fieldObject;
    },

    removeFieldValue( inputType: any ) {
      if ( findIndexByKey( this.formValues, inputType ) !== -1 ) {
        this.formValues.splice( findIndexByKey( this.formValues, inputType ), 1 );
      }
    },

    setFormErrors( fieldObject: any ) {
      if ( findIndexByKey( this.formErrors, fieldObject ) === -1 ) {
        this.formErrors.push( fieldObject );
      }
    },

    removeFieldError( inputType: any ) {
      if ( findIndexByKey( this.formErrors, inputType ) !== -1 ) {
        this.formErrors.splice( findIndexByKey( this.formErrors, inputType ), 1 );
      }
    },
  };
}
