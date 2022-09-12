import { useEffect, useRef, useState } from 'react';

const useService = ( audioFile: any ) => {
  const [ audio ] = useState( new Audio( audioFile ) );
  const [ playing, setPlaying ] = useState( false );
  const [ audioDuration, setAudioDuration ] = useState( 0 );
  const [ audioTime, setAudioTime ] = useState( 0 );

  const inputEl: any = useRef( null );

  const convertSecondsToMinute = ( audioSeconds: number ) => {
    const date = new Date( audioSeconds * 1000 );
    const minutes = date.getMinutes().toString().padStart( 2, '0' );
    const seconds = date.getSeconds().toString().padStart( 2, '0' );

    return `${ minutes }:${ seconds }`;
  };

  const playerHandler = () => setPlaying( !playing );

  const progressBarHandler = ( currentTime: number, duration: number ) => {
    const roundedTime = Math.round( currentTime );
    const roundedDuration = Math.round( duration );
    setAudioTime( roundedTime );
    inputEl.current.style.backgroundSize = roundedTime * 100 / roundedDuration + '%';
  };

  const resetHandler = () => {
    progressBarHandler( 0, audio.duration );
    setPlaying( true );
  };

  const changeTimelinePosition = ( e: any ) => {
    progressBarHandler( e.target.value, e.target.max );
    audio.currentTime = e.target.value;
  };

  useEffect( () => {
    audio.onloadedmetadata = () => {
      setAudioDuration( Math.round( audio.duration ) );
    };

    if ( playing && audioDuration !== audioTime ) {
      audio.play();
      const audioTimeInterval = setInterval( () => {
        progressBarHandler( audio.currentTime, audio.duration );
      }, 1000 );

      return () => clearInterval( audioTimeInterval );
    } else {
      audio.pause();
    }

  }, [ playing, audioTime ] );

  return [
    playing,
    audioTime,
    audioDuration,
    inputEl,
    playerHandler,
    resetHandler,
    convertSecondsToMinute,
    changeTimelinePosition ];
};

export default useService;
