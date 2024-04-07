import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyles, OverlayProvider } from './shared';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </React.StrictMode>,
);
