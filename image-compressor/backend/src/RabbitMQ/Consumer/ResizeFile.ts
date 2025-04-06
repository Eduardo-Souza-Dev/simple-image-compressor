import ZipeFiles from "@/ZipeFIles";
import sharp from "sharp";
import * as fs from "node:fs";
import path from "node:path";

async function ResizeFile(imageToJson: any, height: string, width: string) {
  const zipeResizeFile = new ZipeFiles();
  const inputFile = Buffer.from(imageToJson.buffer, "base64");
  const userID = imageToJson.originalname.split("_")[0];
  let widthFile: number | undefined;
  let heightFile: number | undefined;
  const userFolder = path.join("src/temp_pictures", userID);

  await sharp(inputFile)
  .metadata()
  .then((data) =>{
    widthFile = data.width;
    heightFile = data.height; 
  })

  if(width == '0'){ // Se o valor de width for vazio, pega o valor original da imagem
    width = String(widthFile);
  }

  if(height == '0'){// Se o valor de height for vazio, pega o valor original da imagem
    console.log('Height vazio')
    height = String(heightFile);
  }

  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder);
  }

  const outputFile = `src/temp_pictures/${userID}/${imageToJson.originalname}`;

  // Verifica se o width e height são válidos
  if (width && height) {
    await sharp(inputFile)
      .resize(parseInt(width), parseInt(height))
      .toFile(`${outputFile}`)
      .then(async () => {
        // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
        await zipeResizeFile.zipFiles(userID);
      });
  } else {
    throw new Error("Width and height are required");
  }
    
}

export default ResizeFile;