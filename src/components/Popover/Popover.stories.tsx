import { Popover } from './';
import Center from '../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Popover',
  component: Popover,
  argTypes: {
    label: {},
    arrowDirection: {
      options: [ 'up', 'down', 'left', 'right', 'none' ],
      control: {
        type: 'select',
      },
    },
    dimensions: {},
    children: '',
  },
};

const Template: ComponentStory<typeof Popover> = ( args ) => (
  <Center>
    <Popover { ...args }>{ args.children }</Popover>
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  popoverIsActive: true,
  arrowDirection: 'down',
  padding: '14px',
  dimensions: { width: '200px', height: '' },
  positions: { x: '', y: '-120px' },
  arrowPositions: { x: '', y: '' },
  children: 'popover content',
};
componentProps.storyName = 'Popover';
