import React, { FC } from 'react';
import { Accordion, ButtonWithIcon, SearchBar, SearchBarResults } from '../../components';
import './BrandsPage.scss';
import { Observer, observer } from 'mobx-react-lite';
import useService from './BrandsPage.service';
import searchBarServiceOverride from './serviceOverride/searchBar.service';
import dropdownServiceOverride from './serviceOverride/dropdown.service';
import SearchTextFieldServiceOverride from './serviceOverride/searchTextField.service';
import searchBarResultsServiceOverride from './serviceOverride/searchBarResults.service';
import infoPopupServiceOverride from './serviceOverride/infoPopupServiceOverride.service';

export const BrandsPage: FC = () => {
  const { partnerId, searchBarStore, t } = useService();

  return (
    <Observer>
      { () => (
        <div className='brands-page'>
          <div className='brands-page__header'>
            <div className='brands-page__logo'>
              { searchBarStore.partnerData.logo && (
                <img
                  alt={ searchBarStore.partnerData.name }
                  src={ `${ process.env.REACT_APP_BASE_URL }files/${ searchBarStore.partnerData.logo }` }
                />
              ) }
            </div>
            <h1 className='brands-page__title'>בתי עסק מכבדים</h1>
          </div>

          <div className='brands-page__wrapper'>
            { searchBarStore.partnerData.description && (
              <div className='brands-page__description'>{ searchBarStore.partnerData.description }</div>
            ) }
            { searchBarStore.partnerData.terms && (
              <Accordion
                button={
                  <ButtonWithIcon
                    label={ t( 'brandsPage.accordionTitle' ) }
                    iconId='collapse'
                    size='medium'
                    overrideClass='accordion__button-with-icon'
                  />
                }
                content={ searchBarStore.partnerData.terms }
                overrideClass='brands-page__accordion'
              />
            ) }
            <SearchBar
              partnerId={ partnerId }
              searchBarServiceOverride={ searchBarServiceOverride }
              dropdownServiceOverride={ dropdownServiceOverride }
              SearchTextFieldServiceOverride={ SearchTextFieldServiceOverride }
            />
            <SearchBarResults
              results={ searchBarStore.brandsResults }
              showResults={ searchBarStore.showSearchBarResults }
              useServiceOverride={ searchBarResultsServiceOverride }
              infoPopupServiceOverride={ infoPopupServiceOverride }
            />
          </div>
        </div>
      ) }
    </Observer>
  );
};

export default observer( BrandsPage );
