import ZipeFiles from '../../ZipeFIles';
import sharp from 'sharp';
import * as fs from 'node:fs';
import path from 'node:path';

async function ConvertFile(imageToJson: any, key: string, type: string){
    const zipeConvertFile = new ZipeFiles;
    const userID = imageToJson.originalname.split('_')[0];
    const userFolder = path.join('src/temp_pictures', userID);

    if(!fs.existsSync(userFolder)){
        fs.mkdirSync(userFolder);
    }

    const outputFile = `src/temp_pictures/${userID}/${imageToJson.originalname}`;

    // if(key == ''){

    // }

}

export default ConvertFile;