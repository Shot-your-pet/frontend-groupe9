import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', // Remplacez par l'URL de votre API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient
