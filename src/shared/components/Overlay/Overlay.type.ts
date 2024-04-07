import { ReactNode } from 'react';

export type OverlaySubmitResult = unknown;

type OverlayChildrenRenderer<T = any> = (props: {
  onClose: () => void;
  onSubmit: (submitResult: T) => void;
}) => ReactNode;

export type OverlayContent<T = any> = ReactNode | OverlayChildrenRenderer<T>;

export type OverlayOption = {
  closeOverlayClick?: boolean;
  placement?: 'bottom' | 'center';
};

export type OverlayOpenFn = (children: OverlayContent, option?: OverlayOption) => Promise<OverlaySubmitResult> | null;
