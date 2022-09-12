import React, { useState } from 'react';
import { useSearchBarStore } from '../../../stores/search-bar/search-bar-context';
import Accordion from '../../../components/Accordion';
import { ActionIcon } from '../../../components/buttons/ActionIcon';
import Spinner from '../../../components/addons/Spinner';
import Loader from '../../../components/addons/Loader';
import ButtonWithIcon from '../../../components/buttons/ButtonWithIcon';
import noResultsSvg from '../../../assets/svgs/large-icons/b2c/no-results.svg';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';

const useService = ( results: any ) => {
  const [ popupData, setPopupData ] = useState<any>();
  const [ popupsIds ] = useState<number[]>( [] );
  const [ popupsData ] = useState<any>( [] );
  const searchBarStore: any = useSearchBarStore();
  const isClickable = searchBarStore.partnerData.clickable;
  const { t } = useTranslation();

  const hideScrollBar = () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollBarWidth + 'px';
  };

  const clickBrandHandler = ( id: number ) => {
    const popupId = popupsData.findIndex( ( popupData: any ) => popupData.id === id );
    setPopupData( popupsData[popupId] );

    if ( popupsData[popupId] === undefined ) {
      const noPopupData = true;
      fetchPopupData( id, noPopupData );
      setPopupData( popupsData[popupId] );
    }

    if ( searchBarStore ) {
      searchBarStore.setPopupIsActive( true );
    }

    hideScrollBar();
  };

  const popupsHandler = ( id: number ) => {
    if ( !popupsIds.includes( id ) ) {
      popupsIds.push( id );
      fetchPopupData( id );
    }
  };

  const fetchPopupData = async ( id: number, noPopupData?: any ) => {
    const url = `${ process.env.REACT_APP_BASE_URL }brands/${ searchBarStore.partnerId }/options/${ id }`;
    try {
      const response = await fetch( url );
      const result = await response.json();
      popupsData.push( result );
      if ( noPopupData ) {
        setPopupData( result );
      }
      return results;
    } catch ( error ) {
      console.log( 'message', error );
    }
  };

  const ConditionalDomWrapper = ( props: any ) => {
    if ( isClickable ) {
      return (
        <a
          className='search-bar-results__brand-item'
          href={ `${ process.env.REACT_APP_BASE_URL }supplier/${ props.id }` }
          target='_blank'
        >
          { props.children }
        </a>
      );
    } else {
      popupsHandler( props.id );
      return (
        <div className='search-bar-results__brand-item' onClick={ () => clickBrandHandler( props.id ) }>
          { props.children }
        </div>
      );
    }
  };

  const isUpperCase = ( string: string ) => /^[A-Z\s/]*$/.test( string );

  const itemsTemplate = results.map( ( brand: any ) => {
    return (
      <LazyLoad height={ 140 } offset={ [ 280, 0 ] } placeholder={ <Loader /> } key={ brand.id }>
        <ConditionalDomWrapper id={ brand.id } name={ brand.name }>
          <div className='search-bar-results__brand-item__content'>
            <img alt={ brand.name } src={ `${ process.env.REACT_APP_BASE_URL }files/${ brand.logo }` } />
            <span className={ cn( isUpperCase( brand.title ) && 'search-bar-results__brand-item__content--is-upper' ) }>
              { brand.title }
            </span>
          </div>
        </ConditionalDomWrapper>
      </LazyLoad>
    );
  } );

  const popupContentTemplate = popupData ? (
    <div className='search-bar-results__popup-content'>
      { popupData.logo &&
        <img alt={ popupData.name } src={ `${ process.env.REACT_APP_BASE_URL }files/${ popupData.logo }` } /> }

      <div className='search-bar-results__popup-content__title'>{ popupData.title }</div>

      <ul>
        { popupData.googleMapAddr && (
          <li>
            <ActionIcon overrideClass='search-bar-results__popup-content__icon' iconId='location' />
            { popupData.googleMapAddr }
          </li>
        ) }
        { popupData.siteAddress && (
          <li>
            <ActionIcon overrideClass='search-bar-results__popup-content__icon' iconId='location' />
            <a href={ popupData.siteAddress } target='_blank'>
              { t( 'searchBarResults.siteAddress' ) }
            </a>
          </li>
        ) }
        { popupData.phone && (
          <li>
            <ActionIcon overrideClass='search-bar-results__popup-content__icon' iconId='phone' />
            <a href={ `tel:${ popupData.phone }` }>{ popupData.phone }</a>
          </li>
        ) }
        { popupData.siteLink && (
          <li>
            <ActionIcon overrideClass='search-bar-results__popup-content__icon' iconId='website' />
            <a href={ popupData.siteLink } target='_blank'>
              { t( 'searchBarResults.siteLink' ) }
            </a>
          </li>
        ) }
      </ul>

      { popupData.smallPrint && (
        <Accordion
          button={
            <ButtonWithIcon
              label={ t( 'searchBarResults.accordionLabel' ) }
              iconId='collapse'
              size='small'
              overrideClass='accordion__button-with-icon'
            />
          }
          content={ <div dangerouslySetInnerHTML={ { __html: popupData.smallPrint } } /> }
          overrideClass='search-bar-results__popup-content__accordion'
        />
      ) }
    </div>
  ) : (
    ''
  );

  const noResultsTemplate = (
    <div className='search-bar-results__no-results'>
      <span>{ t( 'searchBarResults.noResultsTemplate' ) }</span>
      <img src={ noResultsSvg } alt={ t( 'searchBarResults.noResultsTemplate' ) } />
    </div>
  );

  const loading =
    searchBarStore.searchBarValues.length > 0 && itemsTemplate.length === 0 ? noResultsTemplate : <Spinner />;

  return {
    itemsTemplate,
    popupContentTemplate,
    loading,
    t,
  };
};

export default useService;
