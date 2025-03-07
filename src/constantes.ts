export const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || window.RUNTIME_CONFIG?.KEYCLOAK_URL || 'http://localhost:9001/'
export const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM || window.RUNTIME_CONFIG?.KEYCLOAK_REALM || 'ShotYourPet'
export const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || window.RUNTIME_CONFIG?.KEYCLOAK_CLIENT_ID || 'shotyourpet'
export const API_URL = import.meta.env.VITE_API_URL || window.RUNTIME_CONFIG?.API_URL || 'http://localhost:8080/'
