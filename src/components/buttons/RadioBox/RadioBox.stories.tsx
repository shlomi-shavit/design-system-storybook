import { RadioBox } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Radio Box',
  component: RadioBox,
  argTypes: {
    size: {
      options: [ 'small', 'medium', 'large' ],
      control: { type: 'select' },
    },
  },
};

const Template: ComponentStory<typeof RadioBox> = ( args ) => (
  <Center>
    <RadioBox { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  labels: t( 'radioBox.labels', { returnObjects: true } ),
  size: 'large',
};
componentProps.storyName = 'Radio Box';
