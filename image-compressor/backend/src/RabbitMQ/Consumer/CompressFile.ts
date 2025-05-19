import ZipeFiles from '../../ZipeFIles';
import sharp from 'sharp';
import * as fs from 'node:fs';
import { optimize } from 'svgo';
import path from 'node:path';
import { Image } from "../../configs/Interfaces";


async function CompressImagem(imageToJson: Image) {
  const zipeCompressFile = new ZipeFiles;

    //Converte a string para base64 encoded
      const inputFile = Buffer.from(imageToJson.buffer, 'base64');
      const userID = imageToJson.originalname.split('_')[0];
      const userFolder = path.join('src/temp_pictures', userID);

      if(!fs.existsSync(userFolder)){
          fs.mkdirSync(userFolder);
      }
      
      const outputFile = `src/temp_pictures/${userID}/${imageToJson.originalname}`;
      const compress_quality = 70;
  
      if(imageToJson.mimetype === 'image/jpeg'){
          // Compressão para JPEG
          await sharp(inputFile)
          .jpeg({ quality: compress_quality })
          .toFile(`${outputFile}`)
        
          // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
          await zipeCompressFile.zipFiles(userID);

          return true;
  
      }
      
      if(imageToJson.mimetype === 'image/png'){
          // Compressão para PNG
           await sharp(inputFile)
          .png({ quality: 10 }) 
          .toFile(`${outputFile}`)
        
          // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
          await zipeCompressFile.zipFiles(userID);
          return true;  
  
      }

      if(imageToJson.mimetype === 'image/svg+xml'){
        // Compressão para SVG
        const result = optimize(inputFile.toString(), {
          path: outputFile,
          multipass: true
        })

        if(result.data){
          fs.writeFileSync(outputFile, result.data);
          await zipeCompressFile.zipFiles(userID);
          return true
        }

       }

  


}   


export default CompressImagem;