import { Global, css } from '@emotion/react';

export const GlobalStyles = () => <Global styles={css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`} />;