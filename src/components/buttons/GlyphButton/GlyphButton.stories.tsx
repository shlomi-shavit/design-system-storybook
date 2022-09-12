import { GlyphButton } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Glyph button',
  component: GlyphButton,
  argTypes: {},
};

const Template: ComponentStory<typeof GlyphButton> = ( args ) => (
  <Center>
    <GlyphButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  labels: t( 'glyphButton.labels', { returnObjects: true } ),
  iconId: 'holidays',
};
componentProps.storyName = 'Glyph button';
