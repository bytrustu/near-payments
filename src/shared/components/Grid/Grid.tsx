import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { DefaultStyled } from '../../styles';
import { AsProps, StyleProps } from '../../types';

type GridProps = PropsWithChildren<StyleProps & AsProps>;

const Root = styled(DefaultStyled)<GridProps>`
  display: grid;
`;

export const Grid = ({ children, ...props }: GridProps) => <Root {...props}>{children}</Root>;

Grid.displayName = 'Grid';
