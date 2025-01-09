import JSZip from "jszip";
import FileSaver from 'file-saver';
import path from "node:path";
import * as fs from 'node:fs';



class ZipeFiles{
     async zipFiles(){
        const zip = JSZip();

        const directoryPath = path.resolve("../../temp_pictures");

        fs.readdir(directoryPath, function(err, files){
            if(err){
                return console.log('Directory not found: ' + err);
            }


            // Foreach percorrendo todos os files dentro da pasta temp_pictures
            files.forEach(function(file){
                const filePath = path.join(directoryPath, file); // pega o caminho real da imagem ../../temp_pictures/mickey.png por exemplo
                const fileData = fs.readFileSync(filePath); // Aqui faz a leitura do caminho da imagem
                zip.file(file, fileData); // Adiciona a imagem ao zip hihi
            })

            zip
            .generateAsync({ type: "nodebuffer" })
            .then((content) =>{
                fs.writeFileSync("../../temp_zip_files/example.zip", content);
                console.log("Zip file created");
            })
            .catch((errorZip) => {
                console.log("Error to create zip file: " + errorZip);
            })


        })
        

        
    }
}

export default ZipeFiles;