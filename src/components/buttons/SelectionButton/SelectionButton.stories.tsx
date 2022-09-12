import { SelectionButton } from './';
import Center from '../../addons/Center/';
import { ComponentStory } from '@storybook/react';
import systemIconsNamesArray from '../../../assets/svgs/system-icons/system-icons-names-array.json';
import TextField from '../../text-fields/b2c/TextField';

export default {
  title: 'Buttons/Selection button',
  component: SelectionButton,
  argTypes: {
    buttonType: {
      options: [ 'sms', 'mail', 'printing', 'add-pic', 'custom' ],
      control: {
        type: 'select',
      },
    },
    iconId: {
      name: 'iconId (if buttonType is "custom")',
      options: systemIconsNamesArray,
      control: {
        type: 'select',
      },
    },
    content: { table: { disable: true } },
    overrideClass: { table: { disable: true } },
  },
};

const Template: ComponentStory<typeof SelectionButton> = ( args ) => (
  <Center>
    <SelectionButton { ...args } />
  </Center>
);

export const componentProps = Template.bind( {} );

const PopoverContent = () => {
  return (
    <div className='selection-button__content-wrapper'>
      <TextField inputType='text' required={ true } />
    </div>
  );
};

componentProps.args = {
  label: 'sms',
  buttonType: 'sms',
  iconId: '',
  acceptFiles: '',
  content: <PopoverContent />,
};
componentProps.storyName = 'Selection button';
