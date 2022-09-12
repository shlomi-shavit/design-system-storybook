import { Dropdown } from './';
import Center from '../../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import i18n from 'i18next';

export default {
  title: 'Text fields/b2c/Dropdown',
  component: Dropdown,
  argTypes: {
    id: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof Dropdown> = ( args ) => (
  <Center>
    <Dropdown { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: i18n.t( 'dropdown.label' ),
  placeholder: i18n.t( 'dropdown.placeholder' ),
  dropdownOptions: i18n.t( 'dropdown.dropdownOptions', { returnObjects: true } ),
  disabled: false,
};
componentProps.storyName = 'Dropdown';
