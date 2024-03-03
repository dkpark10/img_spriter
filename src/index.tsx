import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import { OverlayProvider } from '@toss/use-overlay';
import App from './app';

// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <OverlayProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </OverlayProvider>
  </React.StrictMode>,
);
