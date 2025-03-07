// Função para gerar ids para cada imagem e zips gerados por cada usuário
import { nanoid } from "nanoid";

export function GenerateUUID (){
    if (typeof window !== "undefined") {
        let userID = localStorage.getItem('userID');

        if(!userID){
            userID = nanoid(7);
            localStorage.setItem('userID', userID);
        }

        return userID;

    }
}
