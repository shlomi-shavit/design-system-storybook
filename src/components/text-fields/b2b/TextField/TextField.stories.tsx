import { TextField } from './';
import Center from '../../../addons/Center/';
import systemIconsNamesArray from '../../../../assets/svgs/system-icons/system-icons-names-array.json';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2b/TextField',
  component: TextField,
  argTypes: {
    inputType: {
      options: [ 'text', 'email', 'password', 'tel' ],
      control: {
        type: 'select',
      },
    },
    iconId: {
      options: systemIconsNamesArray,
      control: {
        type: 'select',
      },
    },
    size: {
      options: [ 'dense', 'spacious' ],
      control: {
        type: 'select',
      },
    },
  },
};

const Template: ComponentStory<typeof TextField> = ( args ) => (
  <Center>
    <TextField { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'textEditor.label' ),
  inputType: 'text',
  required: true,
  maxInputLength: 10,
  iconId: '',
  size: 'spacious',
  disabled: false,
  helpText: t( 'textEditor.helpText' ),
};
componentProps.storyName = 'TextField';
