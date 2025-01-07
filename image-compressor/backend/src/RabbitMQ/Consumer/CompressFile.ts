import * as amqp from 'amqplib/callback_api';
// import { Jimp } from 'jimp';
import ZipeFiles from '@/ZipeFIles';
import sharp from 'sharp';

amqp.connect('amqp://localhost',function(error0: Error | null, connection: amqp.Connection):void{
    if(error0) throw error0;

    connection.createChannel(function(error1: Error | null, channel: amqp.Channel):void{
        if(error1) throw error1;

        let queue = 'compress';

        channel.assertQueue(queue, {
            durable: true
        });


        channel.consume(queue, function(msg:any){
            const imagemToString = msg.content.toString();
            const imageToJson = JSON.parse(imagemToString)
            // console.log(imageToJson);

            CompressImagem(imageToJson)
        },
        {
            noAck: true
        }  );
    })


})


function CompressImagem(imageToJson:any){

    //Converte a string para base64 encoded
    const inputFile = Buffer.from(imageToJson.buffer, 'base64');
    const zipeCompressFile = new ZipeFiles;
    const outputFile = `${imageToJson.originalname}`;
    console.log(outputFile);
    const compress_quality = 70;

    if(imageToJson.mimetype === 'image/jpeg'){
        // Compressão para JPEG
        sharp(inputFile)
        .jpeg({ quality: compress_quality }) // Ajusta a qualidade
        .toFile(`${outputFile}`) // Salva o arquivo comprimido
        .then(() => console.log('Imagem comprimida com sucesso!'))
        .catch(err => console.error(err));

    }else if(imageToJson.mimetype === 'image/png'){
        // Compressão para PNG
        sharp(inputFile)
        .webp({ quality: 10 }) // Nível de compressão (0 a 100)
        .toFile(`${outputFile}`)
        .then(async () => {   
        // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
          console.log("Imagem comprimida com sucesso!");
          const response = await zipeCompressFile.zipFiles(inputFile,outputFile);
        //   console.log("Value from response: " + response);
          
        })
        .catch(err => console.error(err));

    }


}