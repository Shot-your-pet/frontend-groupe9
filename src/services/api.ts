import axios from 'axios';
import {API_URL} from "../constantes.ts";

const apiClient = (token?: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.create({
        baseURL: API_URL,
        headers: headers,
    });

};

export default apiClient
