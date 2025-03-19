import ZipeFiles from '../../ZipeFIles';
import sharp from 'sharp';
import RabbitMqConnection from '../RabbitMqConnection';
import * as fs from 'node:fs';

import path from 'node:path';

async function CompressImagem(imageToJson:any){
  const zipeCompressFile = new ZipeFiles;

    //Converte a string para base64 encoded
      const inputFile = Buffer.from(imageToJson.buffer, 'base64');
      const userID = imageToJson.originalname.split('_')[0];
      const userFolder = path.join('src/temp_pictures', userID);

      if(!fs.existsSync(userFolder)){
          fs.mkdirSync(userFolder, { recursive: true});
      }
      
      const outputFile = `src/temp_pictures/${userID}/${imageToJson.originalname}`;
      const compress_quality = 70;
  
      if(imageToJson.mimetype === 'image/jpeg'){
          // Compressão para JPEG
          await sharp(inputFile)
          .jpeg({ quality: compress_quality })
          .toFile(`${outputFile}`)
          .then(async () => {
              console.log('Imagem JPEG comprimida com sucesso!');
              // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
              await zipeCompressFile.zipFiles();
          })
          .catch(err => console.error(err));

          return true;
  
      }
      
      if(imageToJson.mimetype === 'image/png'){
          // Compressão para PNG
           await sharp(inputFile)
          .png({ quality: 10 }) 
          .toFile(`${outputFile}`)
          .then(async() => {   
            console.log('Imagem PNG comprimida com sucesso!');
            // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
            await zipeCompressFile.zipFiles();
            
          })
          .catch(err => console.error(err));
          return true;  
  
      }
  


}   


export default CompressImagem;