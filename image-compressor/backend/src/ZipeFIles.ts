import JSZip from "jszip";
import FileSaver from 'file-saver';
import path from "node:path";
import * as fs from 'node:fs';
import * as amqp from 'amqplib/callback_api';



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
                // amqp.connect('amqp://localhost',function(error0: Error | null, connection: amqp.Connection):void{
                //     if(error0) throw error0;

                //     connection.createChannel(function(error1: Error | null, channel: amqp.Channel):void{
                //         if(error1) throw error1;

                        
                //         let queue = 'compress';

                //         channel.assertQueue(queue, {
                //             durable: true
                //         });
                        
                //     });
                   
                // });
              
            })
            .catch((errorZip) => {
                console.log("Error to create zip file: " + errorZip);
            })


        })
        

        
    }
}

export default ZipeFiles;