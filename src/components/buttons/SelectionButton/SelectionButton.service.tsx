import React, { useEffect, useRef, useState } from 'react';
import './SelectionButton.scss';
import ActionIcon from '../ActionIcon';
import { CSSTransition } from 'react-transition-group';
import { t } from 'i18next';

const useService = (
  acceptFiles: any,
  buttonType: string,
  iconId: undefined | string,
  clickHandler: any,
  content: any,
) => {
  const [ popoverIsActive, setPopoverIsActive ] = useState<boolean>( false );
  const [ selectedFile, setSelectedFile ] = useState<any>( '' );
  const inputEl: any = useRef( '' );
  const contentRef: any = useRef( '' );

  const onClickHandler = () => {
    if ( buttonType === 'sms' || buttonType === 'mail' || buttonType === 'printing' ) {
      setPopoverIsActive( true );
    } else if ( clickHandler ) {
      clickHandler();
    }
  };

  const closeHandler = ( e: any ) => {
    e.stopPropagation();
    setPopoverIsActive( false );
  };

  const selectFileHandler = ( action: string ) => ( event: any ) => {
    if ( action === 'select-img' && event.target.files[0] ) {
      const pickedFileData = event.target.files[0];
      setSelectedFile( pickedFileData );
    } else if ( action === 'delete-img' ) {
      inputEl.current.value = '';
      setSelectedFile( '' );
    }
  };

  const buttonSvgId: any = {
    [buttonType]: buttonType,
    'printing': 'printer',
    'custom': iconId,
  };

  const addMediaInputElement = buttonType === 'add-pic' && (
    <input
      ref={ inputEl }
      type='file'
      id={ `${ buttonType }-selection_button` }
      accept={ acceptFiles ? acceptFiles : 'image/png, image/jpeg, video/quicktime, video/mp4, .mov, .qt' }
      onChange={ selectFileHandler( 'select-img' ) }
    />
  );

  const selectedFileElement = selectedFile && (
    <div className='selection-button__button__selected-file--wrapper'>
      { selectedFile.type.includes( 'image' ) || selectedFile.type.includes( 'video' ) ? (
        <div className='selection-button__button__selected-file'>
          { selectedFile.type.includes( 'image' ) && (
            <img alt={ selectedFile.name } src={ URL.createObjectURL( selectedFile ) } />
          ) }

          { selectedFile.type.includes( 'video' ) && (
            <video>
              <source src={ URL.createObjectURL( selectedFile ) } type='video/mp4' />
            </video>
          ) }
        </div>
      ) : (
        <p>{ selectedFile.name }</p>
      ) }

      <div className='selection-button__close-icon' onClick={ selectFileHandler( 'delete-img' ) }>
        <ActionIcon iconId='cancel' />
      </div>
    </div>
  );

  const popoverElement = (
    <CSSTransition
      in={ popoverIsActive }
      timeout={ 300 }
      classNames={ {
        enterActive: 'selection-button__active_container--animation-active',
        enterDone: 'selection-button__active_container--animation-done',
      } }
      unmountOnExit
    >
      <div className='selection-button__active_container'>
        <div className='selection-button__close-icon' onClick={ closeHandler }>
          <ActionIcon iconId='cancel' />
        </div>

        { [ 'mail', 'sms' ].indexOf( buttonType ) > -1 ? (
          <div className='selection-button__content'>
            <div ref={ contentRef }>{ content }</div>
          </div>
        ) : (
          <div className='selection-button__content--message'>
            <div className='selection-button__info-icon'>
              <ActionIcon iconId='more-details' />
            </div>
            <span>{ t( 'selectionButton.info' ) }</span>
          </div>
        ) }
      </div>
    </CSSTransition>
  );

  useEffect( () => {
    if ( popoverIsActive && contentRef.current ) {
      contentRef.current.querySelector( '.text-field__input' ).focus();
    }
  }, [ buttonType, popoverIsActive ] );

  return {
    popoverIsActive,
    onClickHandler,
    buttonSvgId,
    selectedFileElement,
    addMediaInputElement,
    popoverElement,
  };
};

export default useService;
