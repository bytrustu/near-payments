import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { DefaultStyled } from '../../styles';
import { AsProps, StyleProps } from '../../types';

type FlexProps = PropsWithChildren<StyleProps & AsProps>;

const Root = styled(DefaultStyled)<FlexProps>`
  display: flex;
`;

export const Flex = ({ children, ...props }: FlexProps) => <Root {...props}>{children}</Root>;

Flex.displayName = 'Flex';
