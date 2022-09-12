import { InfoPopup } from './';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Popups/Informative popup',
  component: InfoPopup,
  argTypes: {
    size: {
      options: [ 'popup-xxs', 'popup-xs', 'popup-s', 'popup-m', 'popup-l', 'popup-xl' ],
      control: { type: 'select' },
    },
  },
};

const contentExample = () => <p>t('popup.example')</p>;

const Template: ComponentStory<typeof InfoPopup> = ( args ) => <InfoPopup { ...args }>{ contentExample() }</InfoPopup>;

export const componentProps = Template.bind( {} );
componentProps.args = {
  popupIsActive: false,
  popupTitle: t( 'popup.header' ),
  popupContent: t( 'popup.content' ),
  size: 'popup-s',
};
componentProps.storyName = 'Informative popup';
