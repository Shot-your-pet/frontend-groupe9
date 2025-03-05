import Keycloak from 'keycloak-js';

// Create a singleton instance
const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'bereal-clone',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'bereal-web'
});

export default keycloak;