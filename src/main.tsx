import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'login-required',
        checkLoginIframe: false,
        pkceMethod: 'S256'
      }}
    > */}
      <App />
    {/* </ReactKeycloakProvider> */}
  </StrictMode>
);