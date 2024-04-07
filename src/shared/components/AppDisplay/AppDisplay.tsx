import { PropsWithChildren } from 'react';
import { styleToken } from '../../styles';
import { StyleProps } from '../../types';
import { Box } from '../Box';
import { VStack } from '../VStack';

export const AppDisplay = ({ children }: PropsWithChildren) => (
  <Box
    as="main"
    position="relative"
    backgroundColor={styleToken.color.white}
    width="375px"
    minWidth="375px"
    height="700px"
    border={`1px solid ${styleToken.color.body}`}
    zIndex={styleToken.zIndex.modal}
  >
    <AppDisplayLayout>{children}</AppDisplayLayout>
  </Box>
);

const AppDisplayLayout = ({ children }: PropsWithChildren) => (
  <VStack as="section" height="100%" padding="16px 24px">
    {children}
  </VStack>
);

const AppDisplayHeader = ({ children }: PropsWithChildren) => (
  <Box as="header" width={styleToken.width.w100} minHeight="30px">
    {children}
  </Box>
);

const AppDisplayBody = ({ children, ...props }: PropsWithChildren<StyleProps>) => (
  <VStack as="section" width={styleToken.width.w100} height="100%" flexGrow={1} {...props}>
    <VStack flex="1 0 auto">{children}</VStack>
  </VStack>
);

const AppDisplayFooter = ({ children, ...props }: PropsWithChildren<{ height?: string }>) => (
  <Box as="footer" width={styleToken.width.w100} minHeight="30px" {...props}>
    {children}
  </Box>
);

AppDisplay.Root = AppDisplay;
AppDisplay.Header = AppDisplayHeader;
AppDisplay.Body = AppDisplayBody;
AppDisplay.Footer = AppDisplayFooter;

AppDisplay.displayName = 'AppDisplay';
