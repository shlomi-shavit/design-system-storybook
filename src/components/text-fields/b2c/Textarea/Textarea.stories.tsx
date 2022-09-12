import { Textarea } from './';
import Center from '../../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2c/Textarea',
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
  isCarousel: true,
  helpText: t( 'textarea.helpText' ),
  greetingArray: t( 'textarea.greetingArray', { returnObjects: true } ),
};
componentProps.storyName = 'Textarea';
