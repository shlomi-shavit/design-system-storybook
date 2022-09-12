import { Video } from '.';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import videoExample from '../../../assets/media/videos/video-example.mp4';
import { GeneralProvider } from '../../../stores/general-store/general-context';

export default {
  title: 'Video',
  component: Video,
  argTypes: {
    videoFile: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof Video> = ( args ) => (
  <GeneralProvider>
    <Center>
      <Video { ...args } />
    </Center>
  </GeneralProvider>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  videoFile: videoExample,
};
componentProps.storyName = 'Video';
