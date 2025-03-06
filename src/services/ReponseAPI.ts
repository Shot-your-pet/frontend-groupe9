export interface ReponseAPI<T> {
    code: number,
    message: string,
    contenu: T
}