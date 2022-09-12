import React from 'react';
import { createGeneralStore } from './general-store';
import { useLocalObservable } from 'mobx-react-lite';

const GeneralContext = React.createContext({});

export const GeneralProvider = ({ children }: any) => {
  const generalStore = useLocalObservable(createGeneralStore);

  return <GeneralContext.Provider value={generalStore}>{children}</GeneralContext.Provider>;
};

export const useGeneralBarStore = () => React.useContext(GeneralContext);
