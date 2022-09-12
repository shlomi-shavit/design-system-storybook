import Typography from './index';
import Center from '../../addons/Center';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'System preview/Typography',
  component: Typography,
};

const Template: ComponentStory<typeof Typography> = () => (
  <Center>
    <Typography />
  </Center>
);

export const componentProps = Template.bind({});
componentProps.args = {};
componentProps.storyName = 'Typography';
