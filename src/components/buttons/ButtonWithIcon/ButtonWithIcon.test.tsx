import * as React from 'react';
import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonWithIcon from './';

describe( 'ButtonWithIcon', () => {
  test( 'should render without crashing', () => {
    render( <ButtonWithIcon size='medium' label='button text' disabled={ false } /> );
    const buttonElement: any = screen.getByTestId( 'button-with-icon' );
    expect( buttonElement ).toBeInTheDocument();
  } );

  test( 'should be disabled', () => {
    render( <ButtonWithIcon size='medium' label='button text' disabled={ true } /> );
    const buttonElement: any = screen.getByTestId( 'button-with-icon' );
    expect( buttonElement ).toBeDisabled();
  } );

  test( 'should be able to click on button', () => {
    const clickFunction = () => ( buttonElement.style.display = 'none' );
    render( <ButtonWithIcon size='medium' label='button text' disabled={ false } clickHandler={ clickFunction } /> );
    const buttonElement: any = screen.getByTestId( 'button-with-icon' );
    fireEvent.click( buttonElement );
    expect( buttonElement ).not.toBeVisible();
  } );

  test( 'should not be able to click on button when disabled', () => {
    const clickFunction = () => ( buttonElement.style.display = 'none' );
    render( <ButtonWithIcon size='medium' label='button text' disabled={ true } clickHandler={ clickFunction } /> );
    const buttonElement: any = screen.getByTestId( 'button-with-icon' );
    fireEvent.click( buttonElement );
    expect( buttonElement ).toBeVisible();
  } );

  test( 'button icon should be displayed ', () => {
    render( <ButtonWithIcon size='medium' label='button text' iconId='add' /> );
    const buttonElement: any = screen.getByTestId( 'button-with-icon' );
    console.log( prettyDOM( buttonElement ) );
    expect( buttonElement.querySelector( '.button-with-icon__icon' ) ).toBeInTheDocument();
  } );
} );
