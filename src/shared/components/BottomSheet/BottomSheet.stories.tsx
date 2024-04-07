import { Meta, StoryObj } from '@storybook/react';
import { AppDisplay } from '../AppDisplay';
import { BottomSheet } from './BottomSheet.tsx';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <AppDisplay>
        <Story />
      </AppDisplay>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Primary: Story = {
  render: (args) => <BottomSheet {...args} />,
};
