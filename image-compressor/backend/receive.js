let amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost',function(error0, connection){
    if(error0) throw error0;

    connection.createChannel(function(error1, channel){
        if(error1) throw error1;

        let queue = 'hello1';

        channel.assertQueue('task_queue', {
            durable: true
        });

        console.log("[*] Waiting for messages in %s. To exit press CTRL + C", queue)
        channel.consume(queue, function(msg){
        console.log(" [X] Received message %s", msg.content.toString());
        },
        {
            noAck: true
        }  );
    })


})