import ZipeFiles from '../../ZipeFIles';
import sharp from 'sharp';
import * as fs from 'node:fs';
import path from 'node:path';

async function ConvertFile(imageToJson: any, key: string, type: string){
    const zipeConvertFile = new ZipeFiles;
    const inputFile = Buffer.from(imageToJson.buffer, 'base64');
    const userID = imageToJson.originalname.split('_')[0];
    const userFolder = path.join('src/temp_pictures', userID);

    if(!fs.existsSync(userFolder)){
        fs.mkdirSync(userFolder);
    }

    const outputFile = `src/temp_pictures/${userID}/${imageToJson.originalname}`;

    if(type == 'png'){

        const data = await sharp(inputFile).toFormat('png').toBuffer()
        .then(value => console.log(value))
        .catch(err => console.error(err));

        // console.log("Valor de data: ", data);
        // fs.writeFileSync(outputFile, data);

        // if(fs.existsSync(outputFile)){
        //     await zipeConvertFile.zipFiles(userID);
        //     return true;

        // }
       

    }

}

export default ConvertFile;