import {UtilisateurDTO} from "./UtilisateurDTO.ts";

export interface PublicationDTO {
    id: string
    author: UtilisateurDTO,
    challenge_id: string,
    published_at: Date | undefined
    content: string
    image_id: number
    likeUtilisateur: boolean
}
