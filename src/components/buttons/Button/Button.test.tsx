import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './';

describe( 'Button', () => {
  test( 'should render without crashing', () => {
    render( <Button size='medium' label='button text' style='solid' disabled={ false } /> );
    const buttonElement: any = screen.getByTestId( 'button' );
    expect( buttonElement ).toBeInTheDocument();
  } );

  test( 'should be disabled', () => {
    render( <Button size='medium' label='button text' disabled={ true } /> );
    const buttonElement: any = screen.getByTestId( 'button' );
    expect( buttonElement ).toBeDisabled();
  } );

  test( 'should be able to click on button', () => {
    const clickFunction = () => ( buttonElement.style.display = 'none' );
    render( <Button size='medium' label='button text' disabled={ false } clickHandler={ clickFunction } /> );
    const buttonElement: any = screen.getByTestId( 'button' );
    fireEvent.click( buttonElement );
    expect( buttonElement ).not.toBeVisible();
  } );

  test( 'should not be able to click on button when disabled', () => {
    const clickFunction = () => ( buttonElement.style.display = 'none' );
    render( <Button size='medium' label='button text' disabled={ true } clickHandler={ clickFunction } /> );
    const buttonElement: any = screen.getByTestId( 'button' );
    fireEvent.click( buttonElement );
    expect( buttonElement ).toBeVisible();
  } );
} );
