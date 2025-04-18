import JSZip from "jszip";
import path from "node:path";
import * as fs from 'node:fs/promises';



class ZipeFiles{
     async zipFiles(ID : string){
  
        const directoryPath = path.resolve(`src/temp_pictures/${ID}`);
        const files = await fs.readdir(directoryPath);

        let zipUserID: { [key: string]: JSZip } = {}; // Cria um objeto vazio para armazenar os zips de cada user

        for(const file of files){
            const userID = file.split('_')[0]; // Pega só o primeiro nome da imagem que é o id do user
            const filePath = path.join(directoryPath, file); // pega o caminho real da imagem ../../temp_pictures/mickey.png por exemplo
            const fileData = await fs.readFile(filePath); // Aqui faz a leitura do caminho da imagem

            if(!zipUserID[userID]){
                zipUserID[userID] = new JSZip(); // Cria um zip para cada user diferente que achar
            }

            zipUserID[userID].file(file, fileData); // Adiciona a imagem ao zip do user correspondente
        }

        for(const userID in zipUserID){
            const content = await zipUserID[userID].generateAsync({ type: "nodebuffer" });

            try{
                await fs.writeFile(`src/temp_zip_files/${userID}.zip`, content); // Craiação do do ziper para cada user
            }catch(error){
                console.log("Error to create zip file: " + error);
            }
        }


        // fs.readdir(directoryPath, function(err, files){
        //     if(err){
        //         return console.log('Directory not found: ' + err);
        //     }
        //     let userID: string;
        //     let zipUserID: { [key: string]: JSZip } = {}; // Cria um objeto vazio para armazenar os zips de cada user
        
        //     // Foreach percorrendo todos os files dentro da pasta temp_pictures
        //     files.forEach(function(file){
        //         userID = file.split('_')[0]; // Pega só o primeiro nome da imagem que é o id do user
        //         const filePath = path.join(directoryPath, file); // pega o caminho real da imagem ../../temp_pictures/mickey.png por exemplo
        //         const fileData = fs.readFileSync(filePath); // Aqui faz a leitura do caminho da imagem
        //         if(!zipUserID[userID]){

        //             zipUserID[userID] = JSZip(); // Cria um zip para cada user diferente que achar

        //         }

        //         zipUserID[userID].file(file, fileData); // Adiciona a imagem ao zip do user correspondente
               
        //     }) 
            
        //     for(const userID in zipUserID){
        //         zipUserID[userID].generateAsync({ type: "nodebuffer" })
        //         .then((content) => {
        //             fs.writeFileSync(`src/temp_zip_files/${userID}.zip`, content); // Craiação do do ziper para cada user
        //         })
        //         .catch((errorZip) => {
        //                 console.log("Error to create zip file: " + errorZip);
        //         })
        //     }
            

        // })


       

        
    }
}

export default ZipeFiles;