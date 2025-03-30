import ZipeFiles from '../../ZipeFIles';
import sharp from 'sharp';
import * as fs from 'node:fs';
import path from 'node:path';

async function ConvertFile(imageToJson: any, key: string, type: string){
    const zipeConvertFile = new ZipeFiles;
    const inputFile = Buffer.from(imageToJson.buffer, 'base64');
    const userID = imageToJson.originalname.split('_')[0];
    const userFolder = path.join('src/temp_pictures', userID);
    const imageName = imageToJson.originalname.split('.').slice(0, -1).join('.');
    const typeFile = imageToJson.originalname.split('.').pop();

    console.log("Tipo de arquivo: ", typeFile);

    if(!fs.existsSync(userFolder)){
        fs.mkdirSync(userFolder);
    }

    const outputFile = `src/temp_pictures/${userID}/${imageName}`;

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

}

export default ConvertFile;