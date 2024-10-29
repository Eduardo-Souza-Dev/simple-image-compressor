import * as amqp from 'amqplib/callback_api';
import { Buffer } from 'buffer';



class FileUploadMQ{

     async uploadFile(file:any,res:any): Promise<void> {
        //Pegar o valor de file e definir como um array de strings, que por sua vez seria as URLs das imagens
        amqp.connect('amqp://localhost', function(error0: Error | null, connection: amqp.Connection): void{
            if(error0){
                throw error0;
            }
        
            connection.createChannel(function (erro1: Error | null, channel: amqp.Channel): void{
                if(erro1){
                    throw erro1;
                }
        
                let queue = 'files';
        
                channel.assertQueue(queue, {
                    durable: true
                });

                // channe.prefetch para não pesar o envio de arquivo para um worker
                channel.prefetch(1);

                if(file.length > 0){// Verfica se recebeu um file

                    file.map((value:string) =>{// Manda eles para a queue como buffer de string
                        channel.sendToQueue(queue, Buffer.from(value), {
                            persistent: true
                        });
                        console.log(" [x] Sent '%s'", value);
                    })
                    
                }
        
              
              })
        });
        }


}

export default FileUploadMQ;