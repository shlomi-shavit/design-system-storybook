import { ButtonWithIcon } from './';
import Center from '../../../components/addons/Center/';
import { ComponentStory } from '@storybook/react';
import i18n from 'i18next';
import textualIconsNamesArray from '../../../assets/svgs/textual-icons/textual-icons-names-array.json';

export default {
  title: 'Buttons/Button with icon',
  component: ButtonWithIcon,
  argTypes: {
    label: {},
    size: {
      options: [ 'small', 'medium', 'large' ],
      control: { type: 'select' },
    },
    iconSide: {
      options: [ 'left', 'right' ],
      control: {
        type: 'radio',
      },
    },
    iconId: {
      options: textualIconsNamesArray,
      control: {
        type: 'select',
      },
    },
  },
};

const Template: ComponentStory<typeof ButtonWithIcon> = ( args ) => {
  return (
    <Center>
      <ButtonWithIcon { ...args } />
    </Center>
  );
};

export const componentProps = Template.bind( {} );
componentProps.args = {
  label: i18n.t( 'buttonWithIcon.label' ),
  iconSide: 'right',
  iconId: 'add',
  loader: false,
  disabled: false,
};
componentProps.storyName = 'Button with icon';
