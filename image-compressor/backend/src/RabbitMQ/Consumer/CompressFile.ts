import * as amqp from 'amqplib/callback_api';

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
            console.log(imageToJson);
        },
        {
            noAck: true
        }  );
    })


})


// function CompressImagem(imagem){
//     // Implementar a lógica para compressão da imagem

// }