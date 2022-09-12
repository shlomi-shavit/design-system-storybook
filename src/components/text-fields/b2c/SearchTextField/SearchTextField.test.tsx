import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchTextField from './';

describe( 'SearchTextField', () => {
  test( 'should render without crashing', () => {
    render( <SearchTextField suggestions={ [] } id={ 'searchTerm' } placeholder={ 'placeholder' } /> );
    const searchTextFieldElement: any = screen.getByTestId( 'search-text-field' );
    expect( searchTextFieldElement ).toBeInTheDocument();
  } );

  test( 'should be initially empty', () => {
    render( <SearchTextField suggestions={ [] } id={ 'searchTerm' } placeholder={ 'placeholder' } /> );
    const searchTextFieldElement: any = screen.getByRole( 'textbox' );
    expect( searchTextFieldElement.value ).toBe( '' );
  } );

  test( 'should be able to type in input and return autocomplete results', async () => {
    const suggestions: any = [
      { id: 338799, title: 'golf', searchTerms: [] },
      { id: 213799, title: 'fox', searchTerms: [] },
      { id: 43799, title: 'fox home', searchTerms: [] },
      { id: 128799, title: 'castro', searchTerms: [] },
    ];
    render( <SearchTextField suggestions={ suggestions } /> );
    const inputElement: any = screen.getByRole( 'textbox' );
    const searchTextFieldElement: any = screen.getByTestId( 'search-text-field' );
    fireEvent.change( inputElement, { target: { value: 'fox' } } );
    expect( searchTextFieldElement.querySelector( '.search-text-field__results' ) ).toBeInTheDocument();
    expect( searchTextFieldElement ).toHaveClass( 'search-text-field--is-active' );
    expect( searchTextFieldElement.querySelector( '.search-text-field__results--no-results' ) ).not.toBeInTheDocument();
  } );
} );
