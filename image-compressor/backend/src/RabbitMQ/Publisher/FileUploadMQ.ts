import * as amqp from 'amqplib/callback_api';
import { Buffer } from 'buffer';
import { jsonc } from 'jsonc';
import CompressImagem from '../Consumer/CompressFile';
import RabbitMqConnection from '../RabbitMqConnection';

const connection = RabbitMqConnection.getInstance();

class FileUploadMQ{

     async uploadFile(file:any,key:string) {
        //Pegar o valor de file e definir como um array de strings, que por sua vez seria as URLs das imagens

        //Fazer verificação de cada file para saber se não esta corrompido, vazio ou inválido
        //if....
        // let teste = Object.values(file);
        console.log(file);
        
                if(file.length === 0){
                        throw new Error("Any file uploaded");
                }

                return new Promise<string>(async (resolve, reject) => {

                        connection.connect().then(() =>
                                connection.getConnection()?.createChannel(function (erro1: Error | null, channel: amqp.Channel): void{
                                if(erro1){
                                        reject();
                                        throw erro1;
                                      }
                              
                                      let resize_queue = 'resize';
                                      let compress_queue = 'compress';
                                      let convert_queue = 'convert';
                              
                                      channel.assertQueue(resize_queue, {
                                       durable: true
                                      });
        
                                      channel.assertQueue(compress_queue, {
                                       durable: true
                                      });
        
                                      
                                      // channe.prefetch para não pesar o envio de arquivo para um worker
                                      channel.prefetch(1);
                                      
                                      if(key === 'resize'){
                                              if(file.length > 0){// Verfica se recebeu um file
                                                      let sendAllqueues;
        
                                                      file.map((value:string) =>{// Manda eles para a queue como buffer de string
                                                             sendAllqueues = channel.sendToQueue(resize_queue, Buffer.from(value), {
                                                                      persistent: true
                                                              });
                                                      })
        
                                              
                                                      
                                              }
                                      }
                                       if(key === 'compress'){
                                              let count = 0;
                                                 
                                              file.forEach((file:any) => {
                                                      count++;
                                                      // Serializa o objeto em JSON
                                                      const fileData = JSON.stringify({
                                                              originalname: file.originalname,
                                                              mimetype: file.mimetype,
                                                              size: file.size,
                                                              buffer: file.buffer.toString('base64') // Buffer em Base64 para compatibilidade
                                                      });
                                              
                                                      // Enviar o JSON para a fila
                                                      channel.sendToQueue(compress_queue, Buffer.from(fileData), {
                                                              persistent: true
                                                      });

        
                                              });
                                              
        
                                              if(count == file.length){ // Verifica se todos os arquivos foram percorridos                                                      
                                                    channel.consume(compress_queue, async function(msg:any){
                                                        const imagemToString = msg.content.toString();
                                                        const imageToJson = JSON.parse(imagemToString);
                                            
                                                        await CompressImagem(imageToJson)
                                                        resolve('All files have been compressed'); 
                                                    },
                                                    {
                                                        noAck: true
                                                    }  );
                                              }
                                                        
                                      }if(key === 'convert'){
                                              if(file.length > 0){// Verfica se recebeu um file
        
                                                      file.forEach((file:any) => {
                                                              // Serializa o objeto em JSON
                                                              const fileData = JSON.stringify({
                                                                      originalname: file.originalname,
                                                                      mimetype: file.mimetype,
                                                                      size: file.size,
                                                                      buffer: file.buffer.toString('base64') // Buffer em Base64 para compatibilidade
                                                              });
                                                      
                                                              // Enviar o JSON para a fila
                                                              channel.sendToQueue(convert_queue, Buffer.from(fileData), {
                                                                      persistent: true
                                                              });
                                                      });
                                                      
                                              }
                                      }
        
                                
                         })
        );
                       
                })
                 
                 

                // return new Promise<string>((resolve, reject) =>{

                //         connection.connect();


                //         amqp.connect('amqp://localhost', function(error10: Error | null, connection: amqp.Connection): void{
                //                 if(error10){
                //                         reject();
                //                         throw error10;
                //                 }
                        
        
                //                 connection.createChannel(function (erro1: Error | null, channel: amqp.Channel): void{
                //                         if(erro1){
                //                           reject();
                //                           throw erro1;
                //                         }
                                
                //                         let resize_queue = 'resize';
                //                         let compress_queue = 'compress';
                //                         let convert_queue = 'convert';
                                
                //                         channel.assertQueue(resize_queue, {
                //                          durable: true
                //                         });
        
                //                         channel.assertQueue(compress_queue, {
                //                          durable: true
                //                         });
        
                                        
                //                         // channe.prefetch para não pesar o envio de arquivo para um worker
                //                         channel.prefetch(1);
                                        
                //                         if(key === 'resize'){
                //                                 if(file.length > 0){// Verfica se recebeu um file
                //                                         let sendAllqueues;
        
                //                                         file.map((value:string) =>{// Manda eles para a queue como buffer de string
                //                                                sendAllqueues = channel.sendToQueue(resize_queue, Buffer.from(value), {
                //                                                         persistent: true
                //                                                 });
                //                                         })
        
                                                
                                                        
                //                                 }
                //                         }
                //                          if(key === 'compress'){
                //                                 let count = 0;
                                                   
                //                                 file.forEach((file:any) => {
                //                                         count++;
                //                                         // Serializa o objeto em JSON
                //                                         const fileData = JSON.stringify({
                //                                                 originalname: file.originalname,
                //                                                 mimetype: file.mimetype,
                //                                                 size: file.size,
                //                                                 buffer: file.buffer.toString('base64') // Buffer em Base64 para compatibilidade
                //                                         });
                                                
                //                                         // Enviar o JSON para a fila
                //                                         channel.sendToQueue(compress_queue, Buffer.from(fileData), {
                //                                                 persistent: true
                //                                         });
        
                //                                 });

                //                                 if(count == file.length){ // Verifica se todos os arquivos foram percorridos                                                      
                //                                         resolve('All files have been compressed'); 
                //                                 }
                                                          
                //                         }if(key === 'convert'){
                //                                 if(file.length > 0){// Verfica se recebeu um file
        
                //                                         file.forEach((file:any) => {
                //                                                 // Serializa o objeto em JSON
                //                                                 const fileData = JSON.stringify({
                //                                                         originalname: file.originalname,
                //                                                         mimetype: file.mimetype,
                //                                                         size: file.size,
                //                                                         buffer: file.buffer.toString('base64') // Buffer em Base64 para compatibilidade
                //                                                 });
                                                        
                //                                                 // Enviar o JSON para a fila
                //                                                 channel.sendToQueue(convert_queue, Buffer.from(fileData), {
                //                                                         persistent: true
                //                                                 });
                //                                         });
                                                        
                //                                 }
                //                         }
        
        
        
                
                        
                        
                //                 })
        
                //                 return;
        
                               
                //         });
                // })
        
              
        }
  }

export default FileUploadMQ;