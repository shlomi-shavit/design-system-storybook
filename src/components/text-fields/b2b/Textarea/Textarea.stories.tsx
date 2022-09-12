import { Textarea } from './';
import Center from '../../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2b/Textarea',
  component: Textarea,
  argTypes: {
    inputType: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof Textarea> = ( args ) => (
  <Center>
    <Textarea { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'textEditor.label' ),
  required: true,
  maxInputLength: 100,
  disabled: false,
  helpText: t( 'textEditor.helpText' ),
};
componentProps.storyName = 'Textarea';
