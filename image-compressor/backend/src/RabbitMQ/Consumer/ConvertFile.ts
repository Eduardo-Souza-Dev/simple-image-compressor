import * as amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost',function(error0: Error | null, connection: amqp.Connection):void{
    if(error0) throw error0;

    connection.createChannel(function(error1: Error | null, channel: amqp.Channel):void{
        if(error1) throw error1;

        let queue = 'convert';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log("[*] Waiting for messages in %s. To exit press CTRL + C", queue)
        channel.consume(queue, function(msg:any){
        console.log(" [X] Mensagem nova no convert hihi %s", msg.content.toString());
        },
        {
            noAck: true
        }  );
    })


})