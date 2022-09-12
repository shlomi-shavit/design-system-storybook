import React from 'react';
import { createSearchBarStore } from './search-bar-store';
import { useLocalObservable } from 'mobx-react-lite';

const SearchBarContext = React.createContext( {} );

export const SearchBarProvider = ( { children }: any ) => {
  const searchBarStore = useLocalObservable( createSearchBarStore );

  return <SearchBarContext.Provider value={ searchBarStore }>{ children }</SearchBarContext.Provider>;
};

export const useSearchBarStore = () => React.useContext( SearchBarContext );
