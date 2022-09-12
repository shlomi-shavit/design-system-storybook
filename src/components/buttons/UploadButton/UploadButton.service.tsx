import { useEffect, useRef, useState } from 'react';
import ActionIcon from '../ActionIcon';
import './UploadButton.scss';
import { t } from 'i18next';

const useService = ( defaultLabels: string[], acceptFiles: string, folderMBSize: number ) => {
  const [ selectedFile, setSelectedFile ] = useState<any>( '' );
  const [ buttonIcon, setButtonIcon ] = useState<any>( '' );
  const [ fileType, setFileType ] = useState<string>( '' );
  const [ labels, setLabels ] = useState<string[]>( defaultLabels );
  const [ hasDeleteButton, setHasDeleteButton ] = useState<boolean>( false );
  const [ selectedFileError, setSelectedFileError ] = useState<boolean>( false );
  const inputEl: any = useRef( '' );
  const acceptedFiles =
    acceptFiles ??
    'image/svg+xml, image/png, image/jpeg, video/quicktime, ' +
    'video/mp4, .mov, .qt, .xlsx, .odt, .doc,.docx, .csv,' +
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, ' +
    'application/vnd.ms-excel' +
    'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const mbToBytes = ( folderMBSize * 1000000 ).toFixed( 0 );

  const setButtonIconHandler = () => {
    if ( selectedFileError ) {
      setButtonIcon( 'resend' );
    } else if ( selectedFile ) {
      setButtonIcon( 'approval-icon' );
    } else {
      setButtonIcon( 'arrow-up' );
    }
  };

  const onChangeHandler = ( event: any ) => {
    const selectedFileData = event.target.files[0];
    if ( selectedFileData?.size < mbToBytes ) {
      setSelectedFile( selectedFileData );
      setFileType( selectedFileData.type );
      setLabels( [ t( 'uploadButton.fileUploadedSuccessfully' ), selectedFileData.name ] );
      setSelectedFileError( false );
    } else {
      setSelectedFileError( true );
      setLabels( [ t( 'uploadButton.fileUploadedError' ) ] );
    }

    setButtonIconHandler();
    setHasDeleteButton( true );
  };

  const deleteFileHandler = () => {
    inputEl.current && ( inputEl.current.value = '' );
    setLabels( defaultLabels );
    setSelectedFile( '' );
    setFileType( '' );
    setHasDeleteButton( false );
    setSelectedFileError( false );
    setButtonIconHandler();
  };

  const mediaType = () => {
    if ( fileType.includes( 'image' ) ) {
      return <img alt={ selectedFile.name } src={ URL.createObjectURL( selectedFile ) } />;
    } else if ( fileType.includes( 'video' ) ) {
      return (
        <video>
          <source src={ URL.createObjectURL( selectedFile ) } type='video/mp4' />
        </video>
      );
    }
  };

  const selectedFileIsMedia = [ 'image', 'video' ].some(
    ( file ) => selectedFile && selectedFile?.type.includes( file ) );

  const uploadedImageElement = selectedFileIsMedia && <div className='upload-button__img'>{ mediaType() }</div>;

  const deleteButtonIconElement = hasDeleteButton && (
    <div className='upload-button__delete-icon' onClick={ deleteFileHandler }>
      <ActionIcon iconId='delete' />
    </div>
  );

  useEffect( () => {
    setButtonIconHandler();
  }, [ selectedFile, selectedFileError ] );

  return {
    labels,
    inputEl,
    acceptedFiles,
    uploadedImageElement,
    deleteButtonIconElement,
    selectedFile,
    selectedFileError,
    buttonIcon,
    setButtonIconHandler,
    onChangeHandler,
    deleteFileHandler,
  };
};

export default useService;
