import apiClient from "./api.ts";
import {ReponseAPI} from "./ReponseAPI.ts";
import {CreerPublicationDTO} from "../entity/CreerPublicationDTO.ts";
import {IdPhotoDTO} from "../entity/IdPhotoDTO.ts";

export const posterPublication = async (creerPublication: CreerPublicationDTO, token?: string): Promise<boolean> => {
    try {
        const response = await apiClient(token).post<ReponseAPI<void>>("/publications", creerPublication);
        return !!response.data;
    } catch (e) {
        console.error("Erreur lors de la publication du post", e);
        throw e;
    }
}

export const savePhoto = async (photo: File, token?: string): Promise<bigint> => {
    try {
        const formData = new FormData();
        formData.append("file", photo);
        const response = await apiClient(token).post<ReponseAPI<IdPhotoDTO>>("/images/upload", formData, {
            params: {
                "type": "PUBLICATION"
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        const idPhoto = BigInt(response.data.contenu.idPhoto);
        return idPhoto;
    } catch (e) {
        console.error("Erreur lors de l'enregistrement de l'image'", e);
        throw e;
    }
}