import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './';

describe( 'Accordion', () => {
  test( 'should render without crashing', () => {
    render( <Accordion button='accordion button' content='accordion content' /> );
    const accordionElement: any = screen.getByTestId( 'accordion' );
    expect( accordionElement ).toBeInTheDocument();
  } );

  test( 'should be able to open accordion', () => {
    render( <Accordion button='accordion button' content='accordion content' /> );
    const accordionElement: any = screen.getByTestId( 'accordion' );
    const accordionTitle: any = accordionElement.querySelector( '.accordion__title' );
    fireEvent.click( accordionTitle );
    expect( accordionElement ).toHaveClass( 'accordion--is-open' );
  } );

  test( 'should be able to close accordion', () => {
    render( <Accordion button='accordion button' content='accordion content' /> );
    const accordionElement: any = screen.getByTestId( 'accordion' );
    const accordionTitle: any = accordionElement.querySelector( '.accordion__title' );
    fireEvent.click( accordionTitle );
    fireEvent.click( accordionTitle );
    expect( accordionElement ).toHaveClass( 'accordion--is-close' );
  } );
} );
