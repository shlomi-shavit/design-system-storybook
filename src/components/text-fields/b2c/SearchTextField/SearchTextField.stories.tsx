import { SearchTextField } from '.';
import Center from '../../../addons/Center/';
import systemIconsNamesArray from '../../../../assets/svgs/system-icons/system-icons-names-array.json';
import { ComponentStory } from '@storybook/react';
import i18n from 'i18next';

export default {
  title: 'Text fields/b2c/Search Text Field',
  component: SearchTextField,
  argTypes: {
    iconId: {
      options: systemIconsNamesArray,
      control: {
        type: 'select',
      },
    },
  },
};

const Template: ComponentStory<typeof SearchTextField> = ( args ) => (
  <Center>
    <SearchTextField { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: i18n.t( 'searchTextField.label' ),
  placeholder: i18n.t( 'searchTextField.placeholder' ),
  iconId: 'search',
  disabled: false,
  suggestions: [
    { id: 338799, title: 'golf', searchTerms: [] },
    { id: 213799, title: 'fox', searchTerms: [] },
    { id: 43799, title: 'fox home', searchTerms: [] },
    { id: 128799, title: 'castro', searchTerms: [] },
  ],
};
componentProps.storyName = 'Search Text Field';
