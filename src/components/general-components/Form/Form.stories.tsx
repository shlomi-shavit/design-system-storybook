import { Form } from './';
import Center from '../../addons/Center';
import { ComponentStory } from '@storybook/react';
import { FormProvider } from '../../../stores/form/form-context';
import React from 'react';

export default {
  title: 'Form',
  component: Form,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template: ComponentStory<typeof Form> = ( args ) => (
  <Center>
    <FormProvider>
      <Form { ...args } />
    </FormProvider>
  </Center>
);

export const componentProps = Template.bind( {} );
componentProps.args = {};
componentProps.storyName = 'Form';
