import * as amqp from 'amqplib/callback_api';
import { Buffer } from 'buffer';
import { jsonc } from 'jsonc';



class FileUploadMQ{

     async uploadFile(file:any,res:any,key:string): Promise<void> {
        //Pegar o valor de file e definir como um array de strings, que por sua vez seria as URLs das imagens

        //Fazer verificação de cada file para saber se não esta corrompido, vazio ou inválido
        //if....
        
        if(file.length > 0){
        
                amqp.connect('amqp://localhost', function(error0: Error | null, connection: amqp.Connection): void{
                        if(error0){
                                throw error0;
                        }else{
                                res.send("Arquivos enviados com sucesso!");
                        }
                
                        connection.createChannel(function (erro1: Error | null, channel: amqp.Channel): void{
                                if(erro1){
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

                                                file.map((value:string) =>{// Manda eles para a queue como buffer de string
                                                channel.sendToQueue(resize_queue, Buffer.from(value), {
                                                        persistent: true
                                                });
                                                // console.log(" [x] Sent '%s'", value);
                                                })
                                                
                                        }
                                }
                                else if(key === 'compress'){
                                           
                                        file.forEach((file:any) => {
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
                                                            
                                } else if(key === 'convert'){
                                        if(file.length > 0){// Verfica se recebeu um file

                                                file.map((value:string) =>{// Manda eles para a queue como buffer de string
                                                channel.sendToQueue(convert_queue, Buffer.from(value), {
                                                        persistent: true
                                                });
                                                console.log(" [x] Sent '%s'", value);
                                                })
                                                
                                        }
                                }



        
                
                
                        })
                });
        }else{
                res.status(400).send('Erro no envio do arquivo!');
        }
  }


}

export default FileUploadMQ;