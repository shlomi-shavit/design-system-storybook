import { SwitchButton } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Buttons/Switch button',
  component: SwitchButton,
  argTypes: {
    iconId: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof SwitchButton> = ( args ) => (
  <Center>
    <SwitchButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  disabled: false,
};
componentProps.storyName = 'Switch button';
