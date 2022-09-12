import React, { FC } from 'react';
import Dropdown from '../../components/text-fields/b2c/Dropdown';
import SearchTextField from '../../components/text-fields/b2c/SearchTextField';
import Button from '../../components/buttons/Button';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon';
import './SearchBar.scss';
import useService from './SearchBar.service';
import { observer } from 'mobx-react-lite';

type Props = {
  partnerId?: any;
  searchBarServiceOverride?: any;
  dropdownServiceOverride?: any;
  SearchTextFieldServiceOverride?: any;
};

export const SearchBar: FC<Props> = observer(
  ( { partnerId, searchBarServiceOverride, dropdownServiceOverride, SearchTextFieldServiceOverride } ) => {
    let searchBarFieldsData: any,
      autocompleteAfterFiltering: any,
      searchClickHandler: any,
      disabledHandler: any,
      clearSearchHandler: any,
      t: any;

    if ( searchBarServiceOverride ) {
      ( {
        searchBarFieldsData,
        autocompleteAfterFiltering,
        searchClickHandler,
        disabledHandler,
        clearSearchHandler,
        t
      } =
        searchBarServiceOverride( partnerId ) );
    } else {
      ( { searchBarFieldsData, t } = useService() );
    }

    return (
      <div className='search-bar'>
        <Dropdown
          dropdownOptions={ searchBarFieldsData.categories }
          id={ 'category' }
          overrideClass='search-bar__dropdown'
          placeholder={ t( 'searchBar.dropdownCategory' ) }
          useServiceOverride={ dropdownServiceOverride }
        />

        <Dropdown
          dropdownOptions={ searchBarFieldsData.regions }
          id={ 'region' }
          overrideClass='search-bar__dropdown'
          placeholder={ t( 'searchBar.dropdownRegion' ) }
          useServiceOverride={ dropdownServiceOverride }
        />

        <SearchTextField
          suggestions={ autocompleteAfterFiltering }
          id={ 'searchTerm' }
          overrideClass='search-bar__search-text-field'
          placeholder={ t( 'searchBar.searchTextFieldPlaceholder' ) }
          useServiceOverride={ SearchTextFieldServiceOverride }
        />

        <Button
          overrideClass='search-bar__button'
          clickHandler={ searchClickHandler }
          size='medium'
          label={ t( 'searchBar.buttonLabel' ) }
        />

        <ButtonWithIcon
          overrideClass='search-bar__button-with-icon'
          label={ t( 'searchBar.buttonWithIconLabel' ) }
          iconSide='right'
          iconId='clear'
          size='medium'
          disabled={ disabledHandler ? disabledHandler() : true }
          clickHandler={ clearSearchHandler }
        />
      </div>
    );
  },
);

export default SearchBar;
