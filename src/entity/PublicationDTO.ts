export interface PublicationDTO {
    id: string
    datePublication: Date | undefined
    description: string
    auteur: string
    photo: string
    nombreLikes: number
    likeUtilisateur: boolean
}
