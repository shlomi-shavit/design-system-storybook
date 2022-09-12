import { CreateNewCard } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Create new card',
  component: CreateNewCard,
  argTypes: {
    label: {},
  },
};

const Template: ComponentStory<typeof CreateNewCard> = ( args ) => (
  <Center>
    <CreateNewCard { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'createNewCard.label' ),
};
componentProps.storyName = 'Create new card';
