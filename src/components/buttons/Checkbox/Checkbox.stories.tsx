import { Checkbox } from './';
import Center from '../../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {},
    indeterminate: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof Checkbox> = ( args ) => (
  <Center>
    <Checkbox { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'checkBox.label' ),
  disabled: false,
};
componentProps.storyName = 'Checkbox';
