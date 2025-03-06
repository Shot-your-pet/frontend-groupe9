import Keycloak from 'keycloak-js';

// Create a singleton instance


const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:9001/',
    realm: import.meta.env.VITE_KEYCLOAK_REALM || 'ShotYourPet',
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'shotyourpet',
});

export default keycloak;