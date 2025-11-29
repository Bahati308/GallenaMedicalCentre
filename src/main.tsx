import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Theme } from '@carbon/react';
import App from './App';
import '@carbon/styles/css/styles.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Theme theme="g10">
          <App />
        </Theme>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
