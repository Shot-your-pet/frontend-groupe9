import {ChallengeDTO} from "./ChallengeDTO.ts";

export interface ChallengeHistoriqueDTO {
    challenge?: ChallengeDTO,
    dateDebut?: Date,
    dateFin?: Date,
}