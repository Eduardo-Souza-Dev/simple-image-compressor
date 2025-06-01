// Função para gerar ids para cada imagem e zips gerados por cada usuário
import { customAlphabet } from "nanoid";

export function GenerateUUID (){
    if (typeof window !== "undefined") {
        let userID = localStorage.getItem('userID');
        let nanoidValue = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 5);
        let id = nanoidValue();

        if(!userID){
            userID = id;
            localStorage.setItem('userID', userID);
        }

        return userID;

    }
}
