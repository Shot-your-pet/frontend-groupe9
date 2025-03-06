import {PublicationDTO} from "./PublicationDTO.ts";

export interface TimelineDTO {
    actualiseLe: Date | undefined
    publications: PublicationDTO[]
}