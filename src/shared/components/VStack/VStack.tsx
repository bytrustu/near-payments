import { PropsWithChildren } from 'react';
import { AsProps, StyleProps } from '../../types';
import { Stack } from '../Stack';

type VStackProps = PropsWithChildren<
  StyleProps &
    AsProps & {
      spacing?: string;
    }
>;
export const VStack = ({ children, spacing, ...props }: VStackProps) => (
  <Stack flexDirection="column" spacing={spacing} {...props}>
    {children}
  </Stack>
);

VStack.displayName = 'VStack';
