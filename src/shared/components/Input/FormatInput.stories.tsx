import { Meta, StoryObj } from '@storybook/react';
import { styleToken } from '../../styles';
import { isValidateMonthString } from '../../utils';
import { AppDisplay } from '../AppDisplay';
import { Typography } from '../Typography';
import { FormatInput } from './FormatInput';

const meta: Meta<typeof FormatInput> = {
  title: 'Components/FormatInput',
  component: FormatInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <AppDisplay>
        <Story />
      </AppDisplay>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FormatInput>;

export const Primary: Story = {
  render: () => (
    <FormatInput.Root id="input-story" type="all" value={['']} padding="0">
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={30} placeholder="텍스트를 입력해주세요" padding="0" />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};

export const WithValueTypeNumeric: Story = {
  render: () => (
    <FormatInput.Root id="input-story" type="numeric" value={['']} padding="0">
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={30} placeholder="숫자를 입력해주세요" padding="0" />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};

export const WithValueTypeAlphabetic: Story = {
  render: () => (
    <FormatInput.Root id="input-story" type="alphabetic" value={['']} padding="0">
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={30} placeholder="영문를 입력해주세요" padding="0" />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <FormatInput.Root id="input-story" type="all" value={['']} padding="0">
      <FormatInput.Label>FomatInput Label</FormatInput.Label>
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={30} placeholder="텍스트를 입력해주세요" padding="0" />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};

export const WithTextCounter: Story = {
  render: () => (
    <FormatInput.Root id="input-story" type="all" value={['']} padding="0">
      <FormatInput.Control padding="0" backgroundColor="none">
        <FormatInput.Label>FomatInput Label</FormatInput.Label>
        <FormatInput.TextCounter index={0} />
      </FormatInput.Control>
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={30} placeholder="텍스트를 입력해주세요" padding="0" />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};

const isValidateMonthInput = (monthString: string) => {
  if (monthString.length >= 2 && !isValidateMonthString(monthString)) {
    console.warn('월 형식이 올바르지 않습니다. (01 ~ 12)');
    return false;
  }
  return true;
};

export const WithValidateInput: Story = {
  render: () => (
    <FormatInput.Root id="input-story" type="numeric" value={['']} padding="0">
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={2} placeholder="MM" padding="0" validateInput={isValidateMonthInput} />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <FormatInput.Root
      id="input-story"
      type="numeric"
      value={['', '', '', '']}
      separator={
        <Typography variant="headline" color={styleToken.color.black}>
          -
        </Typography>
      }
      padding="0"
    >
      <FormatInput.Label>sperator</FormatInput.Label>
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={4} padding="0" />
        <FormatInput.Input index={1} maxLength={4} padding="0" />
        <FormatInput.Input index={2} maxLength={4} padding="0" />
        <FormatInput.Input index={3} maxLength={4} padding="0" />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};

export const WithCompletedValueShowSeparator: Story = {
  render: () => (
    <FormatInput.Root
      id="input-story"
      type="numeric"
      value={['', '', '', '']}
      separator={
        <Typography variant="headline" color={styleToken.color.black}>
          -
        </Typography>
      }
      showCompletedSeparator
      padding="0"
    >
      <FormatInput.Label>showCompletedSeparator</FormatInput.Label>
      <FormatInput.Control padding="0 10px" gap="6px">
        <FormatInput.Input index={0} maxLength={4} padding="0" />
        <FormatInput.Input index={1} maxLength={4} padding="0" />
        <FormatInput.Input index={2} maxLength={4} padding="0" />
        <FormatInput.Input index={3} maxLength={4} padding="0" />
      </FormatInput.Control>
    </FormatInput.Root>
  ),
};
