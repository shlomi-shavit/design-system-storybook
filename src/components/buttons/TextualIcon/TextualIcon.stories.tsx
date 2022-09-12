import { TextualIcon } from './';
import Center from '../../../components/addons/Center/';
import textualIconsNamesArray from '../../../assets/svgs/textual-icons/textual-icons-names-array.json';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Buttons/Textual icon',
  component: TextualIcon,
  argTypes: {
    iconId: {
      options: textualIconsNamesArray,
      control: {
        type: 'select',
      },
    },
  },
};

const Template: ComponentStory<typeof TextualIcon> = ( args ) => (
  <Center>
    <TextualIcon { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  iconId: 'add',
};
componentProps.storyName = 'Textual icon';
