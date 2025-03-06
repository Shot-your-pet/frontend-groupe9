import apiClient from "./api.ts";
import {PublicationDTO} from "../entity/PublicationDTO.ts";
import {ReponseAPI} from "./ReponseAPI.ts";
import {TimelineDTO} from "../entity/TimelineDTO.ts";
import {ChallengeDTO} from "../entity/Challenge.ts";

export const getTimeline = async (): Promise<PublicationDTO[]> => {
    try {
        const response = await apiClient.get<ReponseAPI<TimelineDTO>>("/timeline");
        return response.data.contenu.publications;
    } catch (e) {
        console.error("Erreur lors de la récupération de la timeline", e);
        throw e;
    }
}


export const getDernierChallenge = async (): Promise<ChallengeDTO> => {
    try {
        const response = await apiClient.get<ReponseAPI<ChallengeDTO>>("/challenge");
        return response.data.contenu;
    } catch (e) {
        console.error("Erreur lors de la récupération du dernier challenge", e);
        throw e;
    }
}