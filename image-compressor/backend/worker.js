let amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost',function(error0, connection){
    if(error0) throw error0;

    connection.createChannel(function(error1, channel){
        if(error1) throw error1;

        let queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log("[*] Waiting for messages in %s. To exit press CTRL + C", queue)
        channel.consume(queue, function(msg){
        let secs = msg.content.toString().split('.').length - 1;
        let randomValue = Math.random();
        console.log(" [X] Received message %s", msg.content.toString());
        setTimeout(function() {
            console.log(" [x] Done!");
          },secs * 1000 * randomValue);
        },
        {
            noAck: true
        });
    })


})