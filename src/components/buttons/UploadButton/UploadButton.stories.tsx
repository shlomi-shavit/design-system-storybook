import { UploadButton } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import { t } from 'i18next';

export default {
  title: 'Buttons/Upload button',
  component: UploadButton,
  argTypes: {},
};

const Template: ComponentStory<typeof UploadButton> = ( args ) => (
  <Center>
    <UploadButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  defaultLabels: t( 'uploadButton.labels', { returnObjects: true } ),
  acceptFiles: '',
  folderMBSize: 1.5,
};
componentProps.storyName = 'Upload button';
