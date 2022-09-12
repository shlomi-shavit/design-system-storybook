import { SearchDropdown } from './';
import Center from '../../../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2c/Search Dropdown',
  component: SearchDropdown,
  argTypes: {
    iconId: {
      options: [
        '',
        'approval-icon',
        'cancel-icon',
        'delete-icon',
        'mail-icon',
        'send-option-sms',
        'show-password',
        'hide-password',
        'dropdown-arrow-expand',
      ],
      control: {
        type: 'select',
      },
    },
  },
};

const Template: ComponentStory<typeof SearchDropdown> = ( args ) => (
  <Center>
    <SearchDropdown { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'dropdown.label' ),
  iconId: 'dropdown-arrow-expand',
  disabled: false,
  suggestions: t( 'dropdown.searchDropdownExamples', { returnObjects: true } ),
};
componentProps.storyName = 'Search Dropdown';
