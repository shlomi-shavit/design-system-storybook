import React, { FC } from 'react';
import './Audio.scss';
import mediaIcons from '../../../assets/svgs/media-icons/media-icons-sprite.svg';
import audioAnimation from '../../../assets/media/images/player-default.gif';
import { t } from 'i18next';
import useService from './Audio.service';

type Props = {
  audioFile?: any;
};

export const Audio: FC<Props> = ( { audioFile } ) => {
  const [
    playing, audioTime, audioDuration, inputEl, playerHandler, resetHandler, convertSecondsToMinute,
    changeTimelinePosition ] = useService( audioFile );

  return (
    <div className='audio__container' data-testid='audio'>
      <button className='audio__player-button' onClick={ playerHandler }>
        <svg>
          <use href={ mediaIcons + ( playing ? '#pause' : '#play' ) } />
        </svg>
      </button>

      { !playing && audioTime === 0 &&
        <div className='audio__animation'>
          <img src={ audioAnimation } alt={ t( 'audio.audioContent' ) } />
        </div>
      }

      { playing || audioTime > 0 ?
        <input
          ref={ inputEl }
          type='range'
          onChange={ changeTimelinePosition }
          className='timeline'
          max={ audioDuration }
          value={ audioTime }
        />
        :
        <div className='audio__content'>
          { t( 'audio.audioContent' ) }
        </div>
      }

      <div className='audio__time-duration'>
        { audioDuration === audioTime ?
          <button className='audio__reset-button' onClick={ resetHandler }>
            <svg>
              <use href={ mediaIcons + '#restart' } />
            </svg>
          </button>
          :
          convertSecondsToMinute( audioDuration ) }
      </div>

    </div>
  );
};

export default Audio;
