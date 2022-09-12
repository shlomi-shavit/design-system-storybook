import { Button } from './';
import Center from '../../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import i18n from 'i18next';

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    label: {},
    style: {
      options: [ 'solid', 'hollow' ],
      control: { type: 'select' },
    },
    size: {
      options: [ 'small', 'medium', 'large' ],
      control: { type: 'select' },
    },
    props: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof Button> = ( args ) => (
  <Center>
    <Button { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: i18n.t( 'button.label' ),
  style: 'solid',
  size: 'large',
  loader: false,
  disabled: false,
};
componentProps.storyName = 'Button';
