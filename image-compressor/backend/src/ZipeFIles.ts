import JSZip from "jszip";
import FileSaver from 'file-saver';
import path from "node:path";
import * as fs from 'node:fs';
import * as amqp from 'amqplib/callback_api';
import RabbitMqConnection from "./RabbitMQ/RabbitMqConnection";



class ZipeFiles{
     async zipFiles(){
        const zip = JSZip();
        console.log("Zipando arquivos...");

        const directoryPath = path.resolve("src/temp_pictures");

        fs.readdir(directoryPath, function(err, files){
            if(err){
                return console.log('Directory not found: ' + err);
            }

            let userID: any;


            // Foreach percorrendo todos os files dentro da pasta temp_pictures
            files.forEach(function(file){
                const filePath = path.join(directoryPath, file); // pega o caminho real da imagem ../../temp_pictures/mickey.png por exemplo
                const fileData = fs.readFileSync(filePath); // Aqui faz a leitura do caminho da imagem
                userID = file.split('_')[0]; // Pega só o primeiro nome da imagem que é o id do user
                zip.file(file, fileData); // Adiciona a imagem ao zip hihi
            })

            zip
            .generateAsync({ type: "nodebuffer" })
            .then((content) =>{
                fs.writeFileSync(`src/temp_zip_files/${userID}.zip`, content);
                const connection = RabbitMqConnection.getInstance();
                connection.connect().finally(() => connection.closeConnection());
            })
            .catch((errorZip) => {
                console.log("Error to create zip file: " + errorZip);
            })


        })
        

        
    }
}

export default ZipeFiles;