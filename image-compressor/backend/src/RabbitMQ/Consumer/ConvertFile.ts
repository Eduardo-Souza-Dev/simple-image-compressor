import ZipeFiles from '../../ZipeFIles';
import sharp from 'sharp';
import * as fs from 'node:fs';
import path from 'node:path';
import { Image } from "../../configs/Interfaces";


async function ConvertFile(imageToJson: Image, type: string){
    const zipeConvertFile = new ZipeFiles;
    const inputFile = Buffer.from(imageToJson.buffer, 'base64');
    const userID = imageToJson.originalname.split('_')[0];
    const userFolder = path.join('src/temp_pictures', userID);

    if(!fs.existsSync(userFolder)){
        fs.mkdirSync(userFolder);
    }

    const outputFile = `src/temp_pictures/${userID}/${path.parse(imageToJson.originalname).name}`;

    if(type == 'jpeg'){
        // Converte a imagem para JPEG
        await sharp(inputFile)
        .rotate()
        .toFile(`${outputFile}.jpeg`)
        .then(async () => {
            // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
            await zipeConvertFile.zipFiles(userID);
        })
       

    }
    
    if(type == 'png'){
        // Converte a imagem para PNG
        await sharp(inputFile)
        .rotate()
        .toFile(`${outputFile}.png`)
        .then(async () => {
            // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
            await zipeConvertFile.zipFiles(userID);
        })
       

    }

    if(type == 'svg'){
        // Não converte a imagem para SVG, apenas renomeia o arquivo
        await sharp(inputFile)
        .toFile(`${outputFile}.svg`)
        .then(async () => {
            // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
            await zipeConvertFile.zipFiles(userID);
        })
       

    }

}

export default ConvertFile;