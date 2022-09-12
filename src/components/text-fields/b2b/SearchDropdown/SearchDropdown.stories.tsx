import { SearchDropdown } from '.';
import Center from '../../../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2b/Search Dropdown',
  component: SearchDropdown,
  argTypes: {},
};

const Template: ComponentStory<typeof SearchDropdown> = ( args ) => (
  <Center>
    <SearchDropdown { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'dropdown.label' ),
  disabled: false,
  suggestions: t( 'dropdown.searchDropdownExamples', { returnObjects: true } ),
};
componentProps.storyName = 'Search Dropdown';
