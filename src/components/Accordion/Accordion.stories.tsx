import { Accordion } from './';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import Center from '../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import i18n from 'i18next';

export default {
  title: 'Accordion',
  component: Accordion,
};

const Template: ComponentStory<typeof Accordion> = ( args ) => (
  <Center>
    <Accordion { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  button: <ButtonWithIcon label={ i18n.t( 'accordion.buttonLabel' ) } iconId='collapse' size='medium' />,
  content: i18n.t( 'accordion.buttonContent' ),
};
componentProps.storyName = 'Accordion';
