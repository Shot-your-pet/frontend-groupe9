export interface PublicationDTO {
    id: string
    datePublication: Date | undefined
    description: string
    auteur: string
    photo: number
    nombreLikes: number
    likeUtilisateur: boolean
}
