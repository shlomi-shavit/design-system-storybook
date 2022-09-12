import { Datepicker } from './';
import Center from '../../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Text fields/b2c/Date Picker',
  component: Datepicker,
};

const Template: ComponentStory<typeof Datepicker> = ( args ) => (
  <Center>
    <Datepicker { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'datePicker.date' ),
  placeholder: t( 'datePicker.date' ),
  show_year_dropdown: true,
  year_dropdown_years_number: 5,
  clear_button: true,
  date_format: 'MM.dd',
  required: true,
};
componentProps.storyName = 'Date Picker';
