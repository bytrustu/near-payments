import { PropsWithChildren } from 'react';
import { AsProps, StyleProps } from '../../types';
import { Stack } from '../Stack';

type HStackProps = PropsWithChildren<
  StyleProps &
    AsProps & {
      spacing?: string;
    }
>;

export const HStack = ({ children, spacing, ...props }: HStackProps) => (
  <Stack flexDirection="row" spacing={spacing} {...props}>
    {children}
  </Stack>
);

HStack.displayName = 'HStack';
