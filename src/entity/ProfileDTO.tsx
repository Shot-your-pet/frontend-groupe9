export interface ProfileDTO {
    id: string
    pseudo: string
    prenom: string
    nom: string
    email: string
    derniereConnexion: Date | undefined
    avatar: string
    membreDepuis: Date | undefined
}