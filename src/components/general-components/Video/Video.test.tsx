import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Video from './';
import videoExample from '../../../assets/media/videos/video-example.mp4';

describe( 'Video', () => {
  test( 'should render without crashing', () => {
    render( <Video videoFile={ videoExample } /> );
    const mediaElement: any = screen.getByTestId( 'media' );
    expect( mediaElement ).toBeInTheDocument();
  } );

  test( 'should open popup with the video', async () => {
    render( <Video videoFile={ videoExample } /> );
    const mediaContainerElement: any = await screen.findByTestId( 'media' );
    const mediaElement: any = await mediaContainerElement.querySelector( '.media' );
    fireEvent.click( mediaElement );
    const popupElement: any = await mediaContainerElement.querySelector( '.popup__container' );
    const videoElement: any = await mediaContainerElement.querySelector( 'video' );
    expect( popupElement ).toBeInTheDocument();
    expect( videoElement ).toHaveAttribute( 'src', 'video-example.mp4' );
  } );
} );
