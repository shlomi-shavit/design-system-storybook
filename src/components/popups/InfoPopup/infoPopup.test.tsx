import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoPopup from './';
import { config } from 'react-transition-group';

config.disabled = true;

describe( 'InfoPopup', () => {
  test( 'should render without crashing', () => {
    render( <InfoPopup popupTitle='popup header' popupIsActive={ true } /> );
    const popupElement: any = screen.getByTestId( 'info-popup' );
    const popupContainer: any = popupElement.querySelector( '.popup__container' );
    expect( popupContainer ).toBeInTheDocument();
  } );

  test( 'should not be display if popupIsActive is false', () => {
    render( <InfoPopup popupTitle='popup header' popupIsActive={ false } /> );
    const popupElement: any = screen.queryByTestId( 'info-popup' );
    const popupContainer: any = popupElement.querySelector( '.popup__container' );
    expect( popupContainer ).toBeNull();
  } );

  test( 'should be close when clicking on close button', () => {
    render( <InfoPopup popupTitle='popup header' popupIsActive={ true } /> );
    const popupElement: any = screen.queryByTestId( 'info-popup' );
    const popupContainer: any = popupElement.querySelector( '.popup__container' );
    const popupCloseButton: any = popupElement.querySelector( '.popup__header__close-button' );
    fireEvent.click( popupCloseButton );
    expect( popupContainer ).not.toBeInTheDocument();
  } );
} );
