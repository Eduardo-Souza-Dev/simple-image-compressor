import * as amqp from 'amqplib/callback_api';
import { Buffer } from 'buffer';



class FileUploadMQ{

     async uploadFile(req:any,res:any): Promise<void> {
        //Pegar o valor de file e definir como um array de strings, que por sua vez seria as URLs das imagens
        const file = req.body;
        amqp.connect('amqp://localhost', function(error0: Error | null, connection: amqp.Connection): void{
            if(error0){
                throw error0;
            }
        
            connection.createChannel(function (erro1: Error | null, channel: amqp.Channel): void{
                if(erro1){
                    throw erro1;
                }
        
                let queue = 'files';
                let msg = file;
        
                channel.assertQueue(queue, {
                    durable: true
                });

                // channe.prefetch para não pesar o envio de arquivo para um worker
                channel.prefetch(1);

                if(msg.length > 0){

                    msg.map((value:string) =>{
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