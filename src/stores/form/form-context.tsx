import React from 'react';
import { createFormStore } from './form-store';
import { useLocalObservable } from 'mobx-react-lite';

const FormContext = React.createContext( {} );

export const FormProvider = ( { children }: any ) => {
  const formStore = useLocalObservable( createFormStore );

  return <FormContext.Provider value={ formStore }>{ children }</FormContext.Provider>;
};

export const useFormStore = () => React.useContext( FormContext );
