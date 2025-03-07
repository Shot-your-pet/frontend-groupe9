import axios from 'axios';
import {API_URL} from "../constantes.ts";

const apiClient = axios.create({
    baseURL: API_URL, // Remplacez par l'URL de votre API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient
