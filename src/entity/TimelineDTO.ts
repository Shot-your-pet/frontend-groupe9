import {PublicationDTO} from "./PublicationDTO.ts";

export interface TimelineDTO {
    size: number
    total_size: number
    next_cursor?: number
    content: PublicationDTO[]
}

