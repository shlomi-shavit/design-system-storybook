import { ToggleButton } from '.';
import Center from '../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Toggle button',
  component: ToggleButton,
  argTypes: {},
};

const Template: ComponentStory<typeof ToggleButton> = ( args ) => (
  <Center style={ { maxWidth: '300px' } }>
    <ToggleButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  labels: t( 'toggleButton.labels', { returnObjects: true } ),
};
componentProps.storyName = 'Toggle button';
