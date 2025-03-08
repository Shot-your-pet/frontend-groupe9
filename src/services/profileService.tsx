import apiClient from "./api.ts";
import {ReponseAPI} from "./ReponseAPI.ts";
import {ProfileDTO} from "../entity/ProfileDTO.tsx";
import {SimplePublicationDTO} from "../entity/SimplePublicationDTO.ts";
import {IdPhotoDTO} from "../entity/IdPhotoDTO.ts";

export const getProfileUtilisateur = async (token?: string): Promise<ProfileDTO> => {
    try {
        const response = await apiClient(token).get<ReponseAPI<ProfileDTO>>("/profile");
        return response.data.contenu;
    } catch (e) {
        console.error("Erreur lors de la récupération du profile", e);
        throw e;
    }
}

export const savePhoto = async (avatar: File, token?: string): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", avatar);
        const response = await apiClient(token).post<ReponseAPI<IdPhotoDTO>>("/images/upload", formData, {
            params: {
                "type": "AVATAR"
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data.contenu.idPhoto;
    } catch (e) {
        console.error("Erreur lors de l'enregistrement de la photo de profile", e);
        throw e;
    }
}

export const getHistoriqueParticipation = async (token?: string): Promise<SimplePublicationDTO[]> => {
    try {
        const response = await apiClient(token).get<ReponseAPI<SimplePublicationDTO[]>>("/profile/participations");
        return response.data.contenu;
    } catch (e) {
        console.error("Erreur lors de la récupération de l'historique de participation de l'utilisateur", e);
        throw e;
    }
}