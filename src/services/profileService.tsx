import apiClient from "./api.ts";
import {ReponseAPI} from "./ReponseAPI.ts";
import {ProfileDTO} from "../entity/ProfileDTO.tsx";
import {SimplePublicationDTO} from "../entity/SimplePublicationDTO.ts";

export const getProfileUtilisateur = async (): Promise<ProfileDTO> => {
    try {
        const response = await apiClient.get<ReponseAPI<ProfileDTO>>("/profile");
        return response.data.contenu;
    } catch (e) {
        console.error("Erreur lors de la récupération du profile", e);
        throw e;
    }
}

interface IdPhotoDTO {
    idPhoto: string
}

export const savePhoto = async (avatar: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", avatar);
        const response = await apiClient.post<ReponseAPI<IdPhotoDTO>>("/upload", formData, {
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

export const getHistoriqueParticipation = async (): Promise<SimplePublicationDTO[]> => {
    try {
        const response = await apiClient.get<ReponseAPI<SimplePublicationDTO[]>>("/profile/participations");
        return response.data.contenu;
    } catch (e) {
        console.error("Erreur lors de la récupération de l'historique de participation de l'utilisateur", e);
        throw e;
    }
}