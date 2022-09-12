import React, { FC } from 'react';
import './UploadButton.scss';
import useService from './UploadButton.service';
import ActionIcon from '../ActionIcon';
import cn from 'classnames';

type Props = {
  defaultLabels: string[];
  acceptFiles: string;
  folderMBSize: number;
};

export const UploadButton: FC<Props> = ( {
  defaultLabels,
  acceptFiles,
  folderMBSize
} ) => {
  const {
    labels,
    inputEl,
    acceptedFiles,
    uploadedImageElement,
    deleteButtonIconElement,
    selectedFile,
    selectedFileError,
    buttonIcon,
    onChangeHandler,
    deleteFileHandler,
  } = useService( defaultLabels, acceptFiles, folderMBSize );

  return (
    <div className='upload-button__container'>
      <label htmlFor='upload-button' aria-disabled={ !!selectedFile }
        className={ cn( !!selectedFile && 'disabled' ) }>
        { uploadedImageElement ? (
          uploadedImageElement
        ) : (
          <>
            <div className='upload-button__input'>
              <input
                ref={ inputEl }
                type='file'
                id='upload-button'
                name={ selectedFile.name }
                accept={ acceptedFiles }
                onChange={ onChangeHandler }
              />
              <div className='upload-button__input__icon'
                onClick={ deleteFileHandler }>
                <ActionIcon iconId={ buttonIcon } />
              </div>
            </div>
            <div className={ cn( 'upload-button__content',
              selectedFileError && 'upload-button__content--error' ) }>
              <span>{ labels[0] }</span>
              <span>{ labels[1] }</span>
            </div>
          </>
        ) }
      </label>

      { deleteButtonIconElement }
    </div>
  );
};

export default UploadButton;
