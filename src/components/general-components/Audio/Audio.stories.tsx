import AudioPlayer from './';
import Center from '../../addons/Center';
import { ComponentStory } from '@storybook/react';
import audioExample from '../../../assets/media/audios/audio-sample.m4a';

export default {
  title: 'Audio',
  component: Audio,
  argTypes: {
    audioFile: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof AudioPlayer> = ( args ) => (
  <Center>
    <AudioPlayer { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  audioFile: audioExample
};
componentProps.storyName = 'Audio';
