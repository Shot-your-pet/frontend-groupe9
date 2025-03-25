import apiClient from "./api.ts";
import {ReponseAPI} from "./ReponseAPI.ts";
import {TimelineDTO} from "../entity/TimelineDTO.ts";
import {ChallengeHistoriqueDTO} from "../entity/ChallengeHistoriqueDTO.ts";

export const getTimeline = async (token?: string): Promise<TimelineDTO> => {
    try {
        const response = await apiClient(token).get<TimelineDTO>("/timeline");
        return response.data;
    } catch (e) {
        console.error("Erreur lors de la récupération de la timeline", e);
        throw e;
    }
}


export const getDernierChallenge = async (token?: string): Promise<ChallengeHistoriqueDTO> => {
    try {
        const response = await apiClient(token).get<ReponseAPI<ChallengeHistoriqueDTO>>("/challenges/today");
        return response.data.contenu;
    } catch (e) {
        console.error("Erreur lors de la récupération du dernier challenge", e);
        throw e;
    }
}