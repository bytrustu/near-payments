import React, { CSSProperties } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { styleToken } from '../../styles';
import { Backdrop } from '../Backdrop';
import { OverlayContent, OverlayOption, OverlaySubmitResult } from './Overlay.type';

const getOverlayContainerStyle = (placement: OverlayOption['placement']) => {
  switch (placement) {
    case 'bottom':
      return css`
        width: 100%;
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        transform: translateX(0);
      `;
    default:
      return css`
        width: auto;
        position: absolute;
        top: 50%;
        bottom: auto;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
  }
};

export const OverlayContainer = styled.div<Pick<OverlayOption, 'placement'>>`
  max-width: 2000px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${styleToken.zIndex.modal};
  ${({ placement }) => getOverlayContainerStyle(placement || 'center')}
`;

type OverlayProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (submitResult: OverlaySubmitResult) => void;
  style?: CSSProperties;
  children: OverlayContent;
} & OverlayOption;

export const Overlay = ({ opened, onClose, onSubmit, closeOverlayClick, placement, style, children }: OverlayProps) => {
  const handleBackdropClick = () => {
    if (closeOverlayClick) {
      onClose();
    }
  };

  const handleOverlayContainerStopPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return opened ? (
    <>
      <Backdrop onClick={handleBackdropClick} />
      <OverlayContainer placement={placement} onClick={handleOverlayContainerStopPropagation} style={style}>
        {typeof children === 'function' ? children({ onClose, onSubmit }) : children}
      </OverlayContainer>
    </>
  ) : null;
};
