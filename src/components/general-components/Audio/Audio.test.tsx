import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Audio from './';
import audioExample from '../../../assets/media/audios/audio-sample.m4a';

describe( 'Audio', () => {
  test( 'should render without crashing', () => {
    render( <Audio /> );
    const audioElement: any = screen.getByTestId( 'audio' );
    expect( audioElement ).toBeInTheDocument();
  } );

  test( 'should playing', async () => {
    render( <Audio audioFile={ audioExample } /> );
    const audioElement: any = screen.getByTestId( 'audio' );
    const playButton: any = audioElement.querySelector( '.audio__player-button' );
    const audioSvg: any = audioElement.querySelector( '.audio__player-button svg use' );
    fireEvent.click( playButton );
    expect( audioSvg ).toHaveAttribute( 'href', 'media-icons-sprite.svg#pause' );
  } );

  test( 'should stop', async () => {
    render( <Audio audioFile={ audioExample } /> );
    const audioElement: any = screen.getByTestId( 'audio' );
    const playButton: any = audioElement.querySelector( '.audio__player-button' );
    const audioSvg: any = audioElement.querySelector( '.audio__player-button svg use' );
    fireEvent.click( playButton );
    fireEvent.click( playButton );
    expect( audioSvg ).toHaveAttribute( 'href', 'media-icons-sprite.svg#play' );
  } );

} );
