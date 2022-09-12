import { LinkButton } from './';
import Center from '../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Link button',
  component: LinkButton,
};

const Template: ComponentStory<typeof LinkButton> = ( args ) => (
  <Center>
    <LinkButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: t( 'linkButton.label' ),
  link: `${ process.env.REACT_APP_BASE_URL }`,
};
componentProps.storyName = 'Link button';
