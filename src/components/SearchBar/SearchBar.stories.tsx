import { SearchBar } from './';
import Center from '../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Search Bar',
  component: SearchBar,
};

const Template: ComponentStory<typeof SearchBar> = ( args ) => (
  <Center>
    <SearchBar { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  partnerId: 20620,
};
componentProps.storyName = 'Search Bar';
