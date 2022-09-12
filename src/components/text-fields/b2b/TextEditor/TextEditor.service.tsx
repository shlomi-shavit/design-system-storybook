import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const useService = ( maxInputLength: any ) => {
  const [ editorState, setEditorState ] = useState( () => EditorState.createEmpty() );
  const [ editorText, setEditorText ] = useState( '' );
  const [ editorHtml, setEditorHtml ] = useState( '' );
  const [ uploadedImages, setUploadedImages ] = useState<any>( [] );
  const [ editorIsFocus, setEditorIsFocus ] = useState<boolean>( false );

  const updateTextDescription = ( state: any ) => {
    const editorPlainText = state.getCurrentContent().getPlainText();
    const editorTextToHtml = draftToHtml( convertToRaw( state.getCurrentContent() ) );
    setEditorState( state );
    setEditorText( editorPlainText );
    setEditorHtml( editorTextToHtml );
  };

  const uploadImageCallBack = ( file: any ) => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL( file ),
    };

    setUploadedImages( imageObject );

    // must return promise in order to preview the uploaded image in the browser ('draft-js' package compliance).
    return new Promise( ( resolve ) => {
      resolve( { data: { link: imageObject.localSrc } } );
    } );
  };

  const handleBeforeInput = () => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText( '' ).length;

    return currentContentLength > maxInputLength - 1;
  };

  const handlePastedText = ( pastedText: any ) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText( '' ).length;

    return currentContentLength + pastedText.length > maxInputLength;
  };

  const editorFocus = ( isFocus: boolean ) => {
    setEditorIsFocus( isFocus );
  };

  return {
    editorState,
    editorText,
    editorHtml,
    uploadedImages,
    editorIsFocus,
    updateTextDescription,
    uploadImageCallBack,
    handleBeforeInput,
    handlePastedText,
    editorFocus,
  };
};

export default useService;
