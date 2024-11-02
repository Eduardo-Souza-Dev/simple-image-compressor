import * as amqp from 'amqplib/callback_api';
import { Buffer } from 'buffer';



class FileUploadMQ{

     async uploadFile(file:any,res:any,key:string): Promise<void> {
        //Pegar o valor de file e definir como um array de strings, que por sua vez seria as URLs das imagens

        //Fazer verificação de cada file para saber se não esta corrompido, vazio ou inválido
        console.log("Valor de file: " + file);
        // console.log(key);
        //if....
        
        amqp.connect('amqp://localhost', function(error0: Error | null, connection: amqp.Connection): void{
            if(error0){
                throw error0;
            }
        
            connection.createChannel(function (erro1: Error | null, channel: amqp.Channel): void{
                if(erro1){
                    throw erro1;
                }
        
                let resize_queue = 'resize';
                let compress_queue = 'compress';
        
                channel.assertQueue(resize_queue, {
                    durable: true
                });

                channel.assertQueue(compress_queue, {
                    durable: true
                });
                let routingKey = '';

                
                // channe.prefetch para não pesar o envio de arquivo para um worker
                channel.prefetch(1);
                
                if(key === 'resize'){
                    if(file.length > 0){// Verfica se recebeu um file

                        file.map((value:string) =>{// Manda eles para a queue como buffer de string
                            channel.sendToQueue(resize_queue, Buffer.from(value), {
                                persistent: true
                            });
                            console.log(" [x] Sent '%s'", value);
                        })
                        
                    }
                }
                else if(key === 'compress'){
                    if(file.length > 0){// Verfica se recebeu um file

                        file.map((value:string) =>{// Manda eles para a queue como buffer de string
                            channel.sendToQueue(compress_queue, Buffer.from(value), {
                                persistent: true
                            });
                            console.log(" [x] Sent '%s'", value);
                        })
                        
                    }
                }


    
        
              
              })
        });
        }


}

export default FileUploadMQ;