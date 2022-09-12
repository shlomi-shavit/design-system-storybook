import { ActionIcon } from './';
import Center from '../../../components/addons/Center/';
import systemIconsNamesArray from '../../../assets/svgs/system-icons/system-icons-names-array.json';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Buttons/Action Icon',
  component: ActionIcon,
  argTypes: {
    iconId: {
      options: systemIconsNamesArray,
      control: {
        type: 'select',
      },
    },
  },
};

const Template: ComponentStory<typeof ActionIcon> = ( args ) => (
  <Center>
    <ActionIcon { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {
  iconId: 'add',
  clickable: true,
};
componentProps.storyName = 'Action Icon';
