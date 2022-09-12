import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from './';
import { useTranslations } from '../../../../assets/translations/';

useTranslations();

describe( 'TextField', () => {
  test( 'should render without crashing', () => {
    render( <TextField inputType='text' /> );
    const inputElement: any = screen.getByRole( 'textbox' );
    expect( inputElement ).toBeInTheDocument();
  } );

  test( 'should be initially empty', () => {
    render( <TextField inputType='text' /> );
    const inputElement: any = screen.getByRole( 'textbox' );
    expect( inputElement.value ).toBe( '' );
  } );

  test( 'should be able to type in input', () => {
    render( <TextField inputType='text' /> );
    const inputElement: any = screen.getByRole( 'textbox' );
    fireEvent.change( inputElement, { target: { value: 'hello' } } );
    expect( inputElement.value ).toBe( 'hello' );
  } );

  test( 'should trigger password validation', async () => {
    render( <TextField inputType='password' required={ true } /> );
    const textFieldElement: any = screen.getByTestId( 'text-field' );
    const inputElement: any = await textFieldElement.querySelector( '.text-field__input' );
    fireEvent.change( inputElement, { target: { value: 'password123' } } );
    expect( textFieldElement.querySelector( '.text-field__error-message' ) ).toBeInTheDocument();
  } );

  test( 'should trigger text validation', async () => {
    render( <TextField inputType='text' required={ true } /> );
    const textFieldElement: any = screen.getByTestId( 'text-field' );
    const inputElement: any = screen.getByRole( 'textbox' );
    fireEvent.change( inputElement, { target: { value: 'a' } } );
    expect( textFieldElement.querySelector( '.text-field__error-message' ) ).toBeInTheDocument();
  } );

  test( 'should trigger email validation', async () => {
    render( <TextField inputType='email' required={ true } /> );
    const textFieldElement: any = screen.getByTestId( 'text-field' );
    const inputElement: any = screen.getByRole( 'textbox' );
    fireEvent.change( inputElement, { target: { value: 'person.gmail.com' } } );
    expect( textFieldElement.querySelector( '.text-field__error-message' ) ).toBeInTheDocument();
  } );

  test( 'should trigger tel (telephone num) validation', async () => {
    render( <TextField inputType='tel' required={ true } /> );
    const textFieldElement: any = screen.getByTestId( 'text-field' );
    const inputElement: any = screen.getByRole( 'textbox' );
    fireEvent.change( inputElement, { target: { value: '05466508' } } );
    expect( textFieldElement.querySelector( '.text-field__error-message' ) ).toBeInTheDocument();
  } );
} );
