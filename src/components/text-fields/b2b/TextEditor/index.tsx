import { FC } from 'react';
import useService from './TextEditor.service';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.scss';
import { t } from 'i18next';

type Props = {
  label: string;
  maxInputLength: number;
  helpText: string;
  disabled: boolean;
};

export const TextEditor: FC<Props> = ( { label, maxInputLength, helpText, disabled } ) => {
  const {
    editorState,
    editorText,
    editorIsFocus,
    updateTextDescription,
    uploadImageCallBack,
    handleBeforeInput,
    handlePastedText,
    editorFocus,
  } = useService( maxInputLength );

  const editorLabels = {
    'components.controls.image.dropFileText': t( 'dragOrSelectImage' ),
    'components.controls.image.add': t( 'dragOrSelectImage' ),
  };

  return (
    <div
      className={ `text-editor_container
      ${ disabled && 'disabled' }
      ${ editorIsFocus && 'editorIsFocus' }` }
    >
      <Editor
        // handleBeforeInput={handleBeforeInput}
        handlePastedText={ handlePastedText }
        editorState={ editorState }
        onEditorStateChange={ updateTextDescription }
        toolbarClassName='toolbar-class'
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        onFocus={ () => editorFocus( true ) }
        onBlur={ () => editorFocus( false ) }
        localization={ { locale: 'en', translations: editorLabels } }
        toolbar={ {
          options: [ 'inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'image', 'remove' ],
          inline: {
            inDropdown: false,
            options: [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript' ],
          },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            className: undefined,
            component: undefined,
            popupClassName: 'text-editor_image_popup',
            urlEnabled: false,
            uploadEnabled: true,
            alignmentEnabled: false,
            previewImage: true,
            inputAccept: 'image/gif, image/jpeg, image/jpg, image/png, image/svg',
            defaultSize: {
              height: '100px',
              width: '100px',
            },
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: false },
          },
        } }
      />

      <label className='text-editor_label'>{ label }</label>

      <div className='text-editor_notifications'>
        { helpText && <div className='text-editor_help_text'>{ helpText }</div> }

        { maxInputLength > 0 && (
          <div className='text-editor_input_length'>
            { editorText ? editorText.length : '0' }/{ maxInputLength }
          </div>
        ) }
      </div>
    </div>
  );
};

export default TextEditor;
