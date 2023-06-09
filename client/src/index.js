import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/App';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './UserContext';
import { BirdProvider } from './BirdContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  // <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <UserProvider>
      <BirdProvider>
        <App />
      </BirdProvider>
      </UserProvider>
    </Auth0Provider>
  // </React.StrictMode>
);