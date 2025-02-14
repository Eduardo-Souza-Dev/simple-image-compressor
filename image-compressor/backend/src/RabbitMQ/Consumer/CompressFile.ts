import * as amqp from 'amqplib/callback_api';
import ZipeFiles from '@/ZipeFIles';
import sharp from 'sharp';
import RabbitMqConnection from '../RabbitMqConnection';

// amqp.connect('amqp://localhost',function(error0: Error | null, connection: amqp.Connection):void{
//     if(error0) throw error0;

//     connection.createChannel(function(error1: Error | null, channel: amqp.Channel):void{
//         if(error1) throw error1;

//         let queue = 'compress';

//         channel.assertQueue(queue, {
//             durable: true
//         });


//         channel.consume(queue, async function(msg:any){
//             const imagemToString = msg.content.toString();
//             const imageToJson = JSON.parse(imagemToString)

//             await CompressImagem(imageToJson)
//         },
//         {
//             noAck: true
//         }  );
        

//     })


// })

// const connection = RabbitMqConnection.getInstance();
// connection.connect().then(() => {
//     connection.getConnection()?.createChannel((erro1: Error | null, channel: amqp.Channel): void =>{
//         if(erro1) throw erro1;
//         let queue = 'compress';

//         channel.assertQueue(queue, {
//             durable: true
//         });


//         channel.consume(queue, async function(msg:any){
//             const imagemToString = msg.content.toString();
//             const imageToJson = JSON.parse(imagemToString)

//             await CompressImagem(imageToJson)
//         },
//         {
//             noAck: true
//         }  );
//     })
// })


// async function CompressImagem(imageToJson:any){

//     //Converte a string para base64 encoded
//     const inputFile = Buffer.from(imageToJson.buffer, 'base64');
//     const zipeCompressFile = new ZipeFiles;
//     const outputFile = `../../temp_pictures/${imageToJson.originalname}`;
//     const compress_quality = 70;

//     if(imageToJson.mimetype === 'image/jpeg'){
//         // Compressão para JPEG
//         sharp(inputFile)
//         .jpeg({ quality: compress_quality })
//         .toFile(`${outputFile}`)
//         .then(() => console.log('Imagem JPEG comprimida com sucesso!'))
//         .catch(err => console.error(err));

//     }else if(imageToJson.mimetype === 'image/png'){
//         // Compressão para PNG
//         sharp(inputFile)
//         .png({ quality: 10 }) 
//         .toFile(`${outputFile}`)
//         .then(async () => {   
//           console.log('Imagem PNG comprimida com sucesso!');
//         // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
//           await zipeCompressFile.zipFiles();
          
//         })
//         .catch(err => console.error(err));

//     }


// }

async function CompressImagem(imageToJson:any){

    //Converte a string para base64 encoded
    const inputFile = Buffer.from(imageToJson.buffer, 'base64');
    const zipeCompressFile = new ZipeFiles;
    const outputFile = `../../temp_pictures/${imageToJson.originalname}`;
    const compress_quality = 70;

    if(imageToJson.mimetype === 'image/jpeg'){
        // Compressão para JPEG
        sharp(inputFile)
        .jpeg({ quality: compress_quality })
        .toFile(`${outputFile}`)
        .then(() => console.log('Imagem JPEG comprimida com sucesso!'))
        .catch(err => console.error(err));

    }else if(imageToJson.mimetype === 'image/png'){
        // Compressão para PNG
        sharp(inputFile)
        .png({ quality: 10 }) 
        .toFile(`${outputFile}`)
        .then(async () => {   
          console.log('Imagem PNG comprimida com sucesso!');
        // Aqui chamar a API que vai chamar a classe ZipeFiles que por si irá retornar os arquivos
          await zipeCompressFile.zipFiles();
          
        })
        .catch(err => console.error(err));

    }


}   


export default CompressImagem;