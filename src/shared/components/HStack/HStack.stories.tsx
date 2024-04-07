import type { Meta, StoryObj } from '@storybook/react';
import { storybookControls, styleToken } from '../../styles';
import { HStack } from './HStack';

const meta: Meta = {
  title: 'Primitive/HStack',
  component: HStack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: storybookControls.argTypes,
  args: {
    as: 'div',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    height: '100px',
    backgroundColor: styleToken.color.gray100,
    children: 'Hello HStack',
  },
} satisfies Meta<typeof HStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithPadding: Story = {
  args: {
    padding: '20px',
  },
};

export const WithBorder: Story = {
  args: {
    border: `2px solid ${styleToken.color.gray600}`,
  },
};

export const WithChildren: Story = {
  args: {
    padding: '40px',
    width: 'auto',
    height: 'auto',
    children: (
      <>
        <HStack
          alignItems="center"
          justifyContent="center"
          backgroundColor={styleToken.color.mustard}
          width="100px"
          height="100px"
        >
          HStack 1
        </HStack>
        <HStack
          alignItems="center"
          justifyContent="center"
          backgroundColor={styleToken.color.teal100}
          width="100px"
          height="100px"
        >
          HStack 2
        </HStack>
      </>
    ),
  },
};

export const WithSpacing: Story = {
  args: {
    padding: '40px',
    spacing: '20px',
    width: 'auto',
    height: 'auto',
    children: (
      <>
        <HStack
          alignItems="center"
          justifyContent="center"
          backgroundColor={styleToken.color.mustard}
          width="100px"
          height="100px"
        >
          HStack 1
        </HStack>
        <HStack
          alignItems="center"
          justifyContent="center"
          backgroundColor={styleToken.color.teal100}
          width="100px"
          height="100px"
        >
          HStack 2
        </HStack>
      </>
    ),
  },
};
