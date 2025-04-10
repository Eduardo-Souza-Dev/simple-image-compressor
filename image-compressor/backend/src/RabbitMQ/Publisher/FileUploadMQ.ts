import * as amqp from 'amqplib/callback_api';
import { Buffer } from 'buffer';
import CompressImagem from '../Consumer/CompressFile';
import ResizeFile from '../Consumer/ResizeFile';
import ConvertFile from '../Consumer/ConvertFile';
import RabbitMqConnection from '../RabbitMqConnection';
import { FileUploadMQInterface } from '@/configs/Interfaces';

const connection = RabbitMqConnection.getInstance();

class FileUploadMQ{

     async uploadFile(params: FileUploadMQInterface): Promise<string>{
                let { file, key, type, width, height } = params;

                if(width !== 0 || height !== 0){
                        key = 'resize';
                }


                if(file?.length === 0){
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

                                      channel.assertQueue(convert_queue, {
                                        durable: true
                                       });
        
                                      
                                      // channe.prefetch para não pesar o envio de arquivo para um worker
                                      channel.prefetch(1);
                                      
                                      if(key === 'resize'){
                                        let count = 0;

                                        if(Array.isArray(file)){
            
                                                file?.forEach((file:Express.Multer.File) => {
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
                                        }
                                     
                                        
  
                                        if(count == file?.length){ // Verifica se todos os arquivos foram percorridos                                                      
                                              channel.consume(compress_queue, async function(msg:any){
                                                  const imagemToString = msg.content.toString();
                                                  const imageToJson = JSON.parse(imagemToString);
                                                  let widthString = width.toString();
                                                  let heightString = height.toString();
                                      
                                                  await ResizeFile(imageToJson,widthString,heightString)
                                                  resolve('All files have been compressed'); 
                                              },
                                              {
                                                  noAck: true
                                              }  );
                                        }
                                      }
                                       if(key === 'compress'){
                                              let count = 0;
                                              let processed = 0;

                                              if(Array.isArray(file)){
                                                
                                                file?.forEach((file:Express.Multer.File) => {
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

                                              }
                                                 
                                             
                                              
                                              if(count == file?.length){ // Verifica se todos os arquivos foram percorridos                                                      
                                                    channel.consume(compress_queue, async function(msg:any){
                                                        const imagemToString = msg.content.toString();
                                                        const imageToJson = JSON.parse(imagemToString);
                                                        processed++;
                                                        await CompressImagem(imageToJson);

                                                        if(processed == file.length){
                                                                resolve('All files have been compressed'); 
                                                                connection.closeConnection();
                                                        }


                                                    },
                                                    {
                                                        noAck: true
                                                    }  );



                                              }
                                                        
                                      }if(key === 'convert'){
                                        let count = 0;

                                        if(Array.isArray(file)){
                                                file.forEach((file:Express.Multer.File ) => {
                                                        count++;
                                                        // Serializa o objeto em JSON
                                                        const fileData = JSON.stringify({
                                                                originalname: file?.originalname,
                                                                mimetype: file?.mimetype,
                                                                size: file?.size,
                                                                buffer: file?.buffer.toString('base64') // Buffer em Base64 para compatibilidade
                                                        });
                                                
                                                        // Enviar o JSON para a fila
                                                        channel.sendToQueue(convert_queue, Buffer.from(fileData), {
                                                                persistent: true
                                                        });
        
                                                });
                                                
                                        }
                                                 
                                      
  
                                        if(count == file?.length){ // Verifica se todos os arquivos foram percorridos                                                      
                                              channel.consume(convert_queue, async function(msg:any){
                                                  const imagemToString = msg.content.toString();
                                                  const imageToJson = JSON.parse(imagemToString);
                                      
                                                  await ConvertFile(imageToJson, type)
                                                  resolve('All files have been compressed'); 
                                              },
                                              {
                                                  noAck: true
                                              }  );
                                        }
                                      }
        
                                
                         })
                 );
                       
           })

        
              
        }
  }

export default FileUploadMQ;