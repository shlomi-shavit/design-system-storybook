import { RadioButton } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Radio button',
  component: RadioButton,
  argTypes: {
    label: {},
  },
};

const Template: ComponentStory<typeof RadioButton> = ( args ) => (
  <Center>
    <RadioButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'radioButton.label' ),
  disabled: false,
};
componentProps.storyName = 'Radio button';
