import apiClient from "./api.ts";
import {ReponseAPI} from "./ReponseAPI.ts";
import {CreerPublicationDTO} from "../entity/CreerPublicationDTO.ts";

export const posterPublication = async (creerPublication: CreerPublicationDTO): Promise<boolean> => {
    try {
        const response = await apiClient.post<ReponseAPI<void>>("/publications", creerPublication);
        return !!response.data;
    } catch (e) {
        console.error("Erreur lors de la publication du post", e);
        throw e;
    }
}

export const savePhoto = async (photo: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", photo);
        const response = await apiClient.post<ReponseAPI<void>>("/upload", formData, {
            params: {
                "type": "PUBLICATION"
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data.contenu.idPhoto;
    } catch (e) {
        console.error("Erreur lors de la publication du post", e);
        throw e;
    }
}