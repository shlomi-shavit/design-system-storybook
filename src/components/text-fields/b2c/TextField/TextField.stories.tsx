import { TextField } from './';
import Center from '../../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2c/TextField',
  component: TextField,
  argTypes: {
    onClick: { action: 'clicked' },
    inputType: {
      options: [ 'text', 'email', 'password', 'tel' ],
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
  disabled: false,
};
componentProps.storyName = 'TextField';
