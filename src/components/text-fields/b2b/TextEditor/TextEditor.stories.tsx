import { TextEditor } from './';
import Center from '../../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2b/Text editor',
  component: TextEditor,
};

const Template: ComponentStory<typeof TextEditor> = ( args ) => (
  <Center>
    <TextEditor { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'textEditor.label' ),
  maxInputLength: 30,
  helpText: t( 'textEditor.helpText' ),
  disabled: false,
};
componentProps.storyName = 'Text editor';
