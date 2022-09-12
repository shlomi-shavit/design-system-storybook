import { Map } from './';
import Center from '../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import React from 'react';

export default {
  title: 'Map',
  component: Map,
};

const Template: ComponentStory<typeof Map> = ( args ) => (
  <Center>
    <Map { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  marker: { lat: 32.06576726980026, lng: 34.775909998047055 },
  zoom: 15,
};
componentProps.storyName = 'Map';
