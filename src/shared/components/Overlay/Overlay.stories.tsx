import { Meta, StoryObj } from '@storybook/react';
import { Overlay } from './Overlay';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  args: {
    opened: true,
    onClose: () => alert('오버레이 닫힘'),
    children: <div>오버레이 내용입니다.</div>,
  },
};

export const CloseOverlayClick: Story = {
  args: {
    opened: true,
    onClose: () => alert('오버레이 닫힘'),
    closeOverlayClick: true,
    children: <div>백그라운드 클릭으로 오버레이 닫기</div>,
  },
};
