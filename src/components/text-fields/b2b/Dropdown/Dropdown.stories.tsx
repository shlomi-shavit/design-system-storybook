import { Dropdown } from './';
import Center from '../../../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2b/Dropdown',
  component: Dropdown,
  argTypes: {},
};

const Template: ComponentStory<typeof Dropdown> = ( args ) => (
  <Center>
    <Dropdown { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'dropdown.label' ),
  dropdownUp: false,
  dropdownOptions: t( 'dropdown.dropdownOptions', { returnObjects: true } ),
  disabled: false,
};
componentProps.storyName = 'Dropdown';
