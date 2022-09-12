import { SMSButton } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Buttons/SMS button',
  component: SMSButton,
  argTypes: {
    label: {},
    props: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof SMSButton> = ( args ) => (
  <Center>
    <SMSButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: 'SMS',
  disabled: false,
};
componentProps.storyName = 'SMS button';
