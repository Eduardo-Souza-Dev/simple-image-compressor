import ZipeFiles from "@/ZipeFIles";
import sharp from "sharp";
import * as fs from "node:fs";
import path from "node:path";

async function ResizeFile(imageToJson: any, height: string, width: string) {
  const zipeResizeFile = new ZipeFiles();
  const inputFile = Buffer.from(imageToJson.buffer, "base64");
  const userID = imageToJson.originalname.split("_")[0];
  const userFolder = path.join("src/temp_pictures", userID);

  console.log("Valor de width: ",width);
  console.log("Valor de height: ",height);

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