import React, { FC } from 'react';
import './Video.scss';
import mediaIcons from '../../../assets/svgs/media-icons/media-icons-sprite.svg';
import InfoPopup from '../../popups/InfoPopup';
import { t } from 'i18next';
import useService from './Video.service';

type Props = {
  videoFile?: any;
};

export const Video: FC<Props> = ( { videoFile } ) => {
  const { openPopup, Video, popupActive } = useService( videoFile );

  return (
    <div className='media__container' data-testid='media'>
      <div className='media' onClick={ () => openPopup() }>
        <Video />
        <div className='media__overlay'>
          <div className='media__content'>
            { t( 'video.videoLabel' ) }
            <svg>
              <use href={ mediaIcons + '#play' } />
            </svg>
          </div>
        </div>
      </div>

      <InfoPopup
        popupTitle={ t( 'video.popupTitle' ) }
        size='popup-xs'
        overrideClass={ 'media__popup' }
        popupIsActive={ popupActive }
      >
        <Video activeControl={ true } />
      </InfoPopup>
    </div>
  );
};

export default Video;
