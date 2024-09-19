let amqp = require('amqplib/callback_api');


class FileUploadMQ{

    public uploadFile(file: Array<string>): void {
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