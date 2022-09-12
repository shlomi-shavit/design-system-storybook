import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './';

describe( 'Dropdown', () => {
  test( 'should render without crashing', () => {
    render( <Dropdown dropdownOptions={ [ 'option-1', 'option-2', 'option-3' ] } /> );
    const dropdownElement: any = screen.getByTestId( 'dropdown' );
    expect( dropdownElement ).toBeInTheDocument();
  } );

  test( 'should be initially empty', () => {
    render( <Dropdown dropdownOptions={ [ 'option-1', 'option-2', 'option-3' ] } /> );
    const dropdownElement: any = screen.getByTestId( 'dropdown' );
    expect( dropdownElement.querySelector( '.dropdown__placeholder' ) ).toBeInTheDocument();
  } );

  test( 'should be disabled', () => {
    render( <Dropdown dropdownOptions={ [ 'option-1', 'option-2', 'option-3' ] } disabled={ true } /> );
    const dropdownElement: any = screen.getByTestId( 'dropdown' );
    expect( dropdownElement ).toHaveClass( 'dropdown__wrapper--disabled' );
  } );

  test( 'should be able to open on click', () => {
    render( <Dropdown dropdownOptions={ [ 'option-1', 'option-2', 'option-3' ] } /> );
    const dropdownElement: any = screen.getByTestId( 'dropdown' );
    fireEvent.click( dropdownElement );
    expect( dropdownElement.querySelector( '.dropdown' ) ).toHaveClass( 'dropdown--is-active' );
  } );

  test( 'should be able to select dropdown options (option-3 selected)', () => {
    render( <Dropdown dropdownOptions={ [ 'option-1', 'option-2', 'option-3' ] } /> );
    const dropdownElement: any = screen.getByTestId( 'dropdown' );
    const dropdownOptionsList: any = screen.getByRole( 'list' ).children[3];
    fireEvent.click( dropdownOptionsList );
    expect( dropdownElement.querySelector( '.dropdown--selected' ) ).toHaveTextContent( 'option-3' );
    expect( dropdownElement.querySelector( '.dropdown__placeholder' ) ).not.toBeInTheDocument();
  } );
} );
