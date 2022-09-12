import React, { useRef, useState } from 'react';
import { useGeneralBarStore } from '../../../stores/general-store/general-context';

const useService = ( videoFile: string ) => {
  const generalStore: any = useGeneralBarStore();
  const [ popupActive, setPopupActive ] = useState<boolean>( generalStore.popupIsActive );

  const videoEl: any = useRef( null );

  const openPopup = () => {
    if ( Object.keys( generalStore ).length !== 0 ) {
      generalStore.setPopupIsActive( true );
    }
    setPopupActive( true );
  };

  const Video = ( { activeControl = false }: any ) => (
    <video src={ videoFile } ref={ videoEl } controls={ activeControl } autoPlay={ activeControl }>
      <source src={ videoFile } type='video/mp4' />
      Your browser does not support HTML5 video.
    </video>
  );

  return {
    Video,
    openPopup,
    popupActive,
    generalStore,
  };
};

export default useService;
